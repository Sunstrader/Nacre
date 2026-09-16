(function(root){
'use strict';
const C=typeof module!=='undefined'&&module.exports?require('./content.js'):root.NACRE_CONTENT;
const copy=x=>JSON.parse(JSON.stringify(x));
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const DIFFS=['story','normal','tactical'];
const ECHOS=['harbor','market','archive','garden','turbine','spire'];
class Game{
 constructor(meta={}){this.meta={achievements:Array.isArray(meta?.achievements)?meta.achievements.filter(k=>C.achievements.some(a=>a.id===k)):[],endings:Array.isArray(meta?.endings)?meta.endings.filter(k=>Object.hasOwn(C.endings,k)):[],gallery:Array.isArray(meta?.gallery)?meta.gallery.filter(k=>Object.values(C.rooms).some(r=>r.art===k)):[],runs:Number.isFinite(meta?.runs)?Math.max(0,meta.runs):0};this.s=null;this.notices=[];}
 newGame(difficulty='normal',ng=false){
  if(!DIFFS.includes(difficulty))difficulty='normal';
  if(ng&&!this.meta.endings.length)throw Error('Terminez une traversée pour ouvrir le Nouveau Voyage+.');
  this.meta.runs++;if(!this.meta.gallery.includes('a0'))this.meta.gallery.push('a0');
  this.s={schema:1,version:C.version,difficulty,ng,room:'harbor',echo:false,hp:64,focus:5,xp:0,level:1,gold:18,resonance:0,resolve:0,turns:0,flags:{},completed:{},inventory:{herb:2,tonic:2,tea:1},companions:[],active:null,relations:{ilyan:0,sera:0,orin:0},rep:{keepers:0,free:0},visited:['harbor'],journal:[],dialogue:null,battle:null,puzzle:null,bond:null,ending:null,started:Date.now(),playSeconds:0};
  this.openEvent(ng?'ng_memory':'intro');if(ng)this.unlock('ngplus');return this.s;
 }
 get maxHP(){return 64+(this.s.level-1)*8;}
 get maxFocus(){return 5+Math.floor((this.s.level-1)/2);}
 get echoCount(){return ECHOS.filter(k=>this.s.flags['echo_'+k]).length;}
 get chapter(){const f=this.s.flags;return f.ended?4:f.act4?3:f.act3?2:f.act2?1:0;}
 get busy(){return !!(this.s.dialogue||this.s.battle||this.s.puzzle||this.s.ending);}
 has(r={}){const s=this.s;return !(r.flags||[]).some(k=>!s.flags[k])&&!(r.not||[]).some(k=>s.flags[k])&&(!r.gold||s.gold>=r.gold)&&(!r.resonance||s.resonance>=r.resonance)&&(!r.echoes||this.echoCount>=r.echoes)&&(!r.companions||s.companions.length>=r.companions)&&(!r.companion||s.companions.includes(r.companion))&&Object.entries(r.rep||{}).every(([k,n])=>(s.rep[k]||0)>=n)&&Object.entries(r.items||{}).every(([k,n])=>(s.inventory[k]||0)>=n);}
 apply(e={}){
  const s=this.s,oldLevel=s.level;
  for(const [k,n]of Object.entries(e.items||{}))s.inventory[k]=clamp((s.inventory[k]||0)+n,0,999);
  for(const [k,n]of Object.entries(e.flags||{}))s.flags[k]=!!n;
  for(const [k,n]of Object.entries(e.rel||{}))s.relations[k]=clamp((s.relations[k]||0)+n,-10,30);
  for(const [k,n]of Object.entries(e.rep||{}))s.rep[k]=clamp((s.rep[k]||0)+n,-10,30);
  for(const k of ['gold','xp','resonance','resolve'])if(e[k])s[k]=clamp(s[k]+e[k],0,9999);
  if(e.companions)for(const k of e.companions)if(!s.companions.includes(k)){s.companions.push(k);if(!s.active)s.active=k;}
  s.level=clamp(1+Math.floor(s.xp/65),1,10);
  if(s.level>oldLevel){s.hp=Math.min(this.maxHP,s.hp+16);s.focus=this.maxFocus;this.notice('Niveau '+s.level+' · Votre maîtrise grandit.');}
  if(e.heal)s.hp=clamp(s.hp+e.heal,1,this.maxHP);
  if(e.focus)s.focus=clamp(s.focus+e.focus,0,this.maxFocus);
  if(e.journal)this.log(e.journal);
  if(e.bond){s.bond=e.bond;this.notice('Un lien choisi.');}
  this.evaluate();
 }
 notice(text){this.notices.push(text);}
 drainNotices(){return this.notices.splice(0);}
 log(text){this.s.journal.push({text,room:this.s.room,turn:this.s.turns});if(this.s.journal.length>300)this.s.journal.shift();}
 unlock(id){if(!this.meta.achievements.includes(id)){this.meta.achievements.push(id);const a=C.achievements.find(x=>x.id===id);if(a)this.notice('Souvenir accompli · '+a.name);}}
 evaluate(){const s=this.s,f=s.flags;
  if(this.echoCount)this.unlock('first_echo');if(this.echoCount===6)this.unlock('atlas');
  if(s.companions.length===3)this.unlock('trio');if(f.garden_done)this.unlock('garden');
  if(f.proof_found)this.unlock('truth');if(f.evac_done)this.unlock('evac');
  if(['ilyan','sera','orin'].some(k=>f['bond_'+k]))this.unlock('bond');
  // Pression temporelle AAA — urgences narratives
  if(f.welcome && !f.pressure_rumor){f.pressure_rumor=true;}
  if(f.lens && !f.pressure_water){f.pressure_water=true;}
  if(f.name && !f.pressure_custode){f.pressure_custode=true;}
 }
 move(id){
  if(this.busy)throw Error('Terminez l’action en cours.');
  const r=C.rooms[id];if(!r||!this.has(r.requires))throw Error('Ce passage n’est pas encore accessible.');
  if(id!=='harbor'&&!this.s.flags.welcome)throw Error('Écoutez d’abord Ilyan.');
  this.s.room=id;this.s.echo=false;this.s.turns++;
  if(!this.s.visited.includes(id))this.s.visited.push(id);if(!this.meta.gallery.includes(r.art))this.meta.gallery.push(r.art);
  if(r.intro&&!this.s.completed[r.intro])this.openEvent(r.intro);
 }
 toggleEcho(){if(this.busy)throw Error('Terminez l’action en cours.');this.s.echo=!this.s.echo;return this.s.echo;}
 availableSpots(){return C.rooms[this.s.room].spots.filter(p=>this.has(p.requires)&&!(p.unless||[]).some(f=>this.s.flags[f])&&(!p.echo||this.s.echo));}
 isDone(p){return p.kind==='event'?!!this.s.completed[p.target]:p.kind==='gather'?!!this.s.flags[p.target]:false;}
 interact(id){
  if(this.busy)throw Error('Une action est déjà en cours.');
  const p=this.availableSpots().find(x=>x.id===id);if(!p)throw Error('Ce repère n’est pas accessible.');
  if(this.isDone(p)){this.notice('Vous avez déjà exploré ce souvenir.');return 'done';}
  if(p.kind==='event')this.openEvent(p.target);
  if(p.kind==='battle')this.startBattle(p.target);
  if(p.kind==='puzzle')this.startPuzzle(p.target);
  if(p.kind==='gather'){this.apply(p.reward);this.s.flags[p.target]=true;this.notice('Provisions récupérées.');}
  if(p.kind==='rest')this.rest();
  this.s.turns++;
  return p.kind;
 }
 openEvent(id){if(!C.events[id])throw Error('Dialogue introuvable : '+id);this.s.dialogue={id,page:0};}
 advance(){
  const d=this.s.dialogue;if(!d)return false;
  if(d.reaction){const c=C.events[d.id].choices[d.reaction.choice];this.completeChoice(c);return true;}
  const paragraphs=C.paragraphs(d.id,this.s);if(d.page<paragraphs.length-1){d.page++;return true;}return false;
 }
 completeChoice(c){
  const s=this.s;s.dialogue=null;
  if(c.next)this.openEvent(c.next);
  if(c.battle)this.startBattle(c.battle);
  if(c.ending)this.finish(c.ending);
 }
 choose(index){
  const s=this.s,d=s.dialogue;if(!d)throw Error('Aucun dialogue en cours.');
  const e=C.events[d.id],c=e.choices[index],paragraphs=C.paragraphs(d.id,s);if(!c||d.reaction||d.page!==paragraphs.length-1||!this.has(c.requires))throw Error('Ce choix n’est pas disponible.');
  if(c.effects.bond&&s.bond&&s.bond!==c.effects.bond)throw Error('Vous avez déjà choisi une relation amoureuse dans cette traversée. L’amitié reste possible.');
  if(s.completed[d.id]&&!['final_choice','bridge_decision','heart_intro'].includes(d.id))throw Error('Ce dialogue est déjà terminé.');
  this.apply(c.effects);if(!c.battle)s.completed[d.id]=true;s.turns++;
  if(c.consequence)this.log(c.consequence);
  if(c.response){d.reaction={choice:index};return;}
  this.completeChoice(c);
 }
 companionOptions(k){
  if(!this.s.companions.includes(k))return [];
  const a=[],f=this.s.flags;
  if(!f[k+'_talk'])a.push({id:k+'_talk',label:'Prendre le temps de parler'});
  if(k==='ilyan'&&f.letter_found&&!f.letter_done)a.push({id:'ilyan_letter',label:'Remettre la lettre de son père'});
  if(!f['bond_'+k]&&this.s.relations[k]>=4)a.push({id:k+'_bond',label:'Un moment à deux'});
  return a;
 }
 talk(k,id){if(this.busy||this.s.room!=='camp'||!this.companionOptions(k).some(o=>o.id===id))throw Error('Cette conversation n’est pas disponible.');this.openEvent(id);}
 setCompanion(k){if(this.s.battle)throw Error('Choisissez votre partenaire avant le combat.');if(!this.s.companions.includes(k))throw Error('Compagnon absent.');this.s.active=k;}
 rest(){if(this.s.room!=='camp'||this.s.battle)throw Error('Rejoignez le camp pour vous reposer.');this.s.hp=this.maxHP;this.s.focus=this.maxFocus;this.notice('Le repos vous a rendu vos forces.');}
 canCraft(id){const r=C.recipes.find(x=>x.id===id);return !!r&&(!r.unique||!this.s.inventory[id])&&this.has({items:r.cost});}
 craft(id){if(this.busy||this.s.room!=='workshop')throw Error('Rejoignez l’atelier.');if(!this.canCraft(id))throw Error('Il manque des matériaux, ou cet équipement est déjà acquis.');const r=C.recipes.find(x=>x.id===id);for(const[k,n]of Object.entries(r.cost))this.s.inventory[k]-=n;this.s.inventory[id]=(this.s.inventory[id]||0)+r.out;this.unlock('artisan');this.notice(C.items[id].name+' fabriqué.');this.s.turns++;}
 buy(id){const prices={herb:3,glass:4,scrap:3,tonic:7,tea:6};if(this.busy||this.s.room!=='market'||!own(prices,id))throw Error('Échange indisponible.');const n=prices[id];if(this.s.gold<n)throw Error('Pas assez d’éclats.');this.s.gold-=n;this.s.inventory[id]=(this.s.inventory[id]||0)+1;this.notice(C.items[id].name+' obtenu.');}
 useItem(id){if(this.s.battle)return this.combat('item',id);if(this.s.dialogue||this.s.puzzle||this.s.ending)throw Error('Terminez l’action en cours.');if(!['tonic','tea'].includes(id)||!this.s.inventory[id])throw Error('Objet indisponible.');if(id==='tonic'&&this.s.hp===this.maxHP||id==='tea'&&this.s.focus===this.maxFocus)throw Error('Votre jauge est déjà pleine.');this.s.inventory[id]--;this.apply(id==='tonic'?{heal:24}:{focus:3});this.notice(C.items[id].name+' utilisé.');}
 startPuzzle(id){const p=C.puzzles[id];if(!p||this.s.flags['puzzle_'+id])throw Error('Ce mécanisme est déjà résolu.');this.s.puzzle={id,values:p.start.slice(),attempts:0,hint:false};}
 puzzleStep(i,delta=1){const q=this.s.puzzle;if(!q)throw Error('Aucun mécanisme.');const p=C.puzzles[q.id];if(!Number.isInteger(i)||i<0||i>=q.values.length)return;if(p.type==='lights'){for(const k of[i-1,i,i+1])if(k>=0&&k<q.values.length)q.values[k]=1-q.values[k];}else q.values[i]=(q.values[i]+delta+p.options.length)%p.options.length;}
 resetPuzzle(){const q=this.s.puzzle;if(q)q.values=C.puzzles[q.id].start.slice();}
 checkPuzzle(){const q=this.s.puzzle;if(!q)return false;const p=C.puzzles[q.id];q.attempts++;if(q.values.every((x,i)=>x===p.solution[i])){this.apply(p.reward);this.notice(p.success);this.log('Mécanisme résolu : '+p.name+'.');this.s.puzzle=null;return true;}this.notice('Le mécanisme ne s’accorde pas encore. Aucun objet n’a été perdu.');return false;}
 closePuzzle(){this.s.puzzle=null;}
 startBattle(id){
  const e=C.enemies[id];if(!e||this.s.flags['won_'+id])throw Error('Cette confrontation est déjà résolue.');
  this.s.dialogue=null;
  this.s.battle={id,hp:e.hp,turn:0,calm:0,shield:e.shield,cooldown:0,log:['Observez l’intention adverse avant de choisir.'],result:null,lastAction:null};
 }
 intent(){const b=this.s.battle,e=C.enemies[b.id];return e.intents[b.turn%e.intents.length];}
 combat(action,item){
  const s=this.s,b=s.battle;if(!b||b.result)throw Error('Aucune confrontation en cours.');
  const e=C.enemies[b.id],intent=this.intent(),messages=[];
  let guard=0,dodge=false,damage=0;
  if(action==='strike'){damage=10+s.level*2+(s.inventory.blade?3:0);s.focus=Math.min(this.maxFocus,s.focus+1);messages.push('Vous frappez et retrouvez votre concentration.');}
  else if(action==='guard'){guard=10+Math.floor(s.level/2)+Math.min(3,s.resolve);s.focus=Math.min(this.maxFocus,s.focus+2);messages.push('Vous vous ancrez. Garde et +2 concentration.');}
  else if(action==='dodge'){if(s.focus<1)throw Error('Il faut 1 concentration.');s.focus--;dodge=true;messages.push('Vous échappez au mouvement adverse.');}
  else if(action==='resonate'){if(s.focus<2)throw Error('Il faut 2 concentration.');s.focus-=2;damage=17+s.level*2;b.shield=0;s.resonance=Math.min(99,s.resonance+1);messages.push('Votre résonance traverse la protection.');}
  else if(action==='calm'){if(s.focus<1)throw Error('Il faut 1 concentration.');s.focus--;b.calm++;messages.push('Vous donnez une place à la peur : apaisement '+b.calm+'/'+e.calm+'.');}
  else if(action==='companion'){
   if(!s.active||b.cooldown>0)throw Error('Votre compagnon doit reprendre son souffle.');
   if(s.active==='ilyan'){guard=9;damage=5;messages.push('Ilyan vous couvre et riposte.');}
   if(s.active==='sera'){damage=10+Math.floor(s.level/2);b.shield=0;messages.push('Séra court-circuite la protection.');}
   if(s.active==='orin'){s.hp=Math.min(this.maxHP,s.hp+13);s.focus=Math.min(this.maxFocus,s.focus+1);messages.push('Orin vous ramène au présent : +13 vitalité.');}
   b.cooldown=4;
  }else if(action==='item'){
   if(!['tonic','tea','bomb'].includes(item)||!s.inventory[item])throw Error('Objet indisponible.');
   if(item==='tonic'&&s.hp===this.maxHP||item==='tea'&&s.focus===this.maxFocus)throw Error('Votre jauge est déjà pleine.');
   s.inventory[item]--;
   if(item==='tonic')s.hp=Math.min(this.maxHP,s.hp+24);
   if(item==='tea')s.focus=Math.min(this.maxFocus,s.focus+3);
   if(item==='bomb'){damage=22;b.shield=0;}
   messages.push(C.items[item].name+' utilisé.');
  }else if(action==='flee'){this.retreat();return;}else throw Error('Action inconnue.');
  if(damage){damage=Math.max(1,damage-b.shield);b.hp=Math.max(0,b.hp-damage);messages.push('−'+damage+' vitalité adverse.');}
  b.lastAction=action;
  if(b.hp<=0||b.calm>=e.calm){
   const peaceful=b.calm>=e.calm;b.result='win';s.flags['won_'+b.id]=true;
   this.apply(e.reward);this.unlock('first_win');if(peaceful)this.unlock('mercy');
   const text=peaceful?e.peace:e.win;messages.push(text);this.log(text);
   b.log=[...b.log,...messages].slice(-8);return;
  }
  b.shield=e.shield;
  const scale=s.difficulty==='story'?0.55:s.difficulty==='tactical'?1.25:1;
  let hit=intent==='heavy'?e.damage*2:['strike','drain'].includes(intent)?e.damage:0;
  if(intent==='guard'){b.shield+=4;messages.push('L’adversaire renforce sa protection.');}
  if(intent==='charge')messages.push('L’adversaire prépare une frappe lourde.');
  if(intent==='recover')messages.push('L’adversaire hésite.');
  if(hit){hit=dodge?0:Math.max(0,Math.round(hit*scale)-guard-(s.inventory.ward?2:0));s.hp=Math.max(0,s.hp-hit);messages.push(hit?'Vous perdez '+hit+' vitalité.':'Vous évitez tous les dégâts.');if(intent==='drain'&&!dodge)s.focus=Math.max(0,s.focus-1);}
  b.turn++;b.cooldown=Math.max(0,b.cooldown-1);s.turns++;
  if(s.hp<=0){b.result='defeat';messages.push('Vos compagnons vous ramènent en sécurité. Vous pouvez préparer une nouvelle tentative.');}
  b.log=[...b.log,...messages].slice(-8);
 }
 retreat(){this.s.battle=null;this.s.room=this.s.flags.sera_met?'camp':'harbor';this.s.echo=false;this.s.hp=this.maxHP;this.s.focus=this.maxFocus;if(!this.s.visited.includes(this.s.room))this.s.visited.push(this.s.room);this.notice('Repli en sécurité. Les objets dépensés restent dépensés.');}
 endBattle(){const b=this.s.battle;if(!b||!b.result)return;if(b.result==='defeat'){this.retreat();return;}this.s.battle=null;this.s.focus=Math.min(this.maxFocus,this.s.focus+2);if(b.id==='final')this.openEvent('final_choice');}
 finish(id){if(!C.endings[id])throw Error('Fin inconnue.');this.s.ending=id;this.s.flags.ended=true;this.s.dialogue=null;this.s.echo=false;if(!this.meta.endings.includes(id))this.meta.endings.push(id);this.unlock('ending');if(id==='shared')this.unlock('shared');if(this.meta.endings.length===6)this.unlock('all_endings');this.log('Fin : '+C.endings[id].title+'.');}
 epilogue(){
  const s=this.s,f=s.flags,lines=[];
  if(s.ending==='tide')lines.push(f.evac_done?'Les neuf barques étaient prêtes. La traversée se fait sans laisser un nom sur le quai.':'Faute de préparatifs, le départ tourne à la confusion. Des familles sont séparées entre les premières îles. Vous passez les semaines suivantes à les réunir.');
  if(f.child_done)lines.push('Mina porte le petit soleil de Lio à son tablier. Elle raconte sa vie avant de raconter son absence.');
  if(f.garden_done)lines.push(f.seed_abroad?'La graine emportée germe sur une autre rive. Séra construit une barrière pour que les chèvres ne mangent pas l’avenir.':'Dans la serre, une nouvelle branche s’ouvre. Ysse la nomme « Peut-être ».');
  if(f.debt_done)lines.push('Daren et Séra rouvrent un atelier. Au-dessus de la porte : « On répare aussi ce qui fonctionne mal depuis trop longtemps. »');
  if(f.proof_done)lines.push('Orin conserve les vrais registres dans un lieu où chacun peut les lire, et ajouter ce qu’ils oublient. Il n’attend plus le pardon. Il attend les questions.');
  // Secrets & agency AAA
  if(f.ilyan_talk)lines.push('Ilyan a fini par dire ce qu’il avait fermé. La porte n’est plus un secret. Elle reste une cicatrice.');
  if(f.sera_talk)lines.push('Séra a cessé de faire tourner ce qui prélevait trop. Elle répare encore. Elle choisit maintenant ce qui mérite de l’être.');
  if(f.accepted_blame)lines.push('Vous portez le nom de première veilleuse sans le fuir. Certains vous en veulent encore. D’autres vous regardent comme quelqu’un qui a choisi de rester.');
  if(f.claimed_present)lines.push('Deux signatures coexistent dans la pierre. Le passé n’est pas effacé. Il n’est plus seul.');
  if(s.bond&&s.ending!=='crown'&&s.ending!=='sacrifice')lines.push(C.characters[s.bond].name+' vous retrouve chaque matin. Votre lien ne résout pas tout ; il vous laisse affronter le reste à deux.');
  else if(s.ending==='crown'&&s.bond)lines.push(C.characters[s.bond].name+' refuse de devenir un sujet de votre couronne. Le lien demeure dans la mémoire, mais la confiance doit désormais être réparée.');
  else if(s.ending!=='sacrifice')lines.push('Vous gardez votre propre chambre, votre propre chemin. L’amitié n’est pas une fin incomplète.');
  return lines;
 }
 objective(){
  const f=this.s.flags;
  if(f.ended)return 'Une rive atteinte. D’autres traversées vous attendent.';
  // Urgences temporelles AAA
  let pressure='';
  if(f.pressure_custode)pressure=' [La Custode exige une réponse.]';
  else if(f.pressure_water)pressure=' [L’eau monte.]';
  else if(f.pressure_rumor)pressure=' [La rumeur circule.]';
  if(!f.welcome)return 'Écouter Ilyan, puis explorer le port.';
  if(!f.archive_open)return 'Rencontrer Séra au quartier des Lanternes.'+pressure;
  if(!f.lens)return 'Aux archives, lire la leçon des marées et ouvrir le coffre.'+pressure;
  if(!f.won_lock)return 'Rejoindre l’écluse par l’atelier ou le jardin.'+pressure;
  if(!f.heart)return 'Équilibrer la turbine et récupérer son cœur.'+pressure;
  if(!f.bridge_open)return 'Convaincre les gardes du pont ou relever leur défi.'+pressure;
  if(!f.name)return 'Dans le quartier englouti, retrouver votre empreinte.'+pressure;
  if(!f.final_open)return 'Accorder l’astrolabe à la flèche de veille.'+pressure;
  if(!f.won_final)return 'Descendre au cœur de Nacre. Vous pouvez encore vous préparer.'+pressure;
  return 'Choisir à qui appartient demain.'+pressure;
 }
 export(){return {app:'nacre',schema:1,exportedAt:new Date().toISOString(),state:copy(this.s),meta:copy(this.meta)};}
 load(payload){const parsed=Game.validate(payload);this.s=parsed.state;const m=parsed.meta;this.meta={achievements:[...new Set([...this.meta.achievements,...m.achievements])],endings:[...new Set([...this.meta.endings,...m.endings])],gallery:[...new Set([...this.meta.gallery,...m.gallery,...this.s.visited.map(k=>C.rooms[k].art)])],runs:Math.max(this.meta.runs,m.runs)};this.evaluate();return this.s;}
 static validate(p){
  if(!p||p.app!=='nacre'||p.schema!==1||!p.state||p.state.schema!==1)throw Error('Ce fichier n’est pas une sauvegarde NACRE compatible.');
  const s=p.state,good=()=>{throw Error('La sauvegarde est incomplète ou endommagée.');};
  if(!own(C.rooms,s.room)||!DIFFS.includes(s.difficulty))good();
  for(const k of ['hp','focus','xp','level','gold','resonance','resolve','turns','started','playSeconds'])if(!Number.isFinite(s[k])||s[k]<0)good();
  if(!Number.isInteger(s.level)||s.level<1||s.level>10||s.hp>64+(s.level-1)*8||s.focus>5+Math.floor((s.level-1)/2))good();
  if(!Array.isArray(s.companions)||s.companions.some(k=>!['ilyan','sera','orin'].includes(k))||new Set(s.companions).size!==s.companions.length)good();
  if(s.active&&!s.companions.includes(s.active)||s.bond&&!s.companions.includes(s.bond))good();
  if(!Array.isArray(s.visited)||s.visited.some(k=>!own(C.rooms,k))||!Array.isArray(s.journal)||s.journal.length>300||s.journal.some(x=>!x||typeof x.text!=='string'||x.text.length>3000))good();
  for(const k of ['flags','completed','inventory','relations','rep'])if(!s[k]||typeof s[k]!=='object'||Array.isArray(s[k]))good();
  for(const[k,n]of Object.entries(s.inventory))if(!own(C.items,k)||!Number.isInteger(n)||n<0||n>999)good();
  for(const k of ['ilyan','sera','orin'])if(!Number.isFinite(s.relations[k])||s.relations[k]<-10||s.relations[k]>30)good();
  for(const k of ['keepers','free'])if(!Number.isFinite(s.rep[k])||s.rep[k]<-10||s.rep[k]>30)good();
  if(typeof s.echo!=='boolean'||typeof s.ng!=='boolean')good();
  for(const[k,v]of Object.entries(s.flags))if(!/^[a-z0-9_]+$/.test(k)||['__proto__','constructor','prototype'].includes(k)||typeof v!=='boolean')good();
  for(const[k,v]of Object.entries(s.completed))if(!own(C.events,k)||typeof v!=='boolean')good();
  if(s.dialogue){
   const d=s.dialogue,e=C.events[d.id],paragraphs=e&&C.paragraphs(d.id,s);
   if(!e||!Number.isInteger(d.page)||d.page<0||d.page>=paragraphs.length)good();
   if(d.reaction&&(!Number.isInteger(d.reaction.choice)||d.reaction.choice<0||d.reaction.choice>=e.choices.length||!e.choices[d.reaction.choice].response))good();
  }
  if(s.puzzle){const q=s.puzzle,d=C.puzzles[q.id];if(!d||!Array.isArray(q.values)||q.values.length!==d.start.length||q.values.some(n=>!Number.isInteger(n)||n<0||n>=(d.type==='lights'?2:d.options.length)))good();}
  if(s.battle){const b=s.battle,d=C.enemies[b.id];if(!d||!Number.isFinite(b.hp)||b.hp<0||b.hp>d.hp||!Number.isInteger(b.turn)||b.turn<0||!Number.isInteger(b.calm)||b.calm<0||!Number.isFinite(b.shield)||b.shield<0||!Number.isInteger(b.cooldown)||b.cooldown<0||b.cooldown>4||!Array.isArray(b.log)||b.log.some(x=>typeof x!=='string'||x.length>3000)||![null,'win','defeat'].includes(b.result))good();}
  if(s.battle&&s.flags['won_'+s.battle.id]&&s.battle.result!=='win')good();
  if(s.ending&&!s.flags.ended)good();
  if([s.dialogue,s.battle,s.puzzle,s.ending].filter(Boolean).length>1||s.ending&&!own(C.endings,s.ending))good();
  const meta=p.meta||{};
  return {state:copy(s),meta:{achievements:(Array.isArray(meta.achievements)?meta.achievements:[]).filter(k=>C.achievements.some(a=>a.id===k)),endings:(Array.isArray(meta.endings)?meta.endings:[]).filter(k=>own(C.endings,k)),gallery:(Array.isArray(meta.gallery)?meta.gallery:[]).filter(k=>Object.values(C.rooms).some(r=>r.art===k)),runs:Number.isFinite(meta.runs)?clamp(Math.floor(meta.runs),0,99999):0}};
 }
}
if(typeof module!=='undefined'&&module.exports)module.exports={Game,C};else root.NacreGame=Game;
})(typeof window!=='undefined'?window:globalThis);
