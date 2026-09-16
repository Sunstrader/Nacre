/* NACRE — Les voix de l’abîme — Version 2.0.0 AAA Narrative Overhaul
   Univers et écriture originaux. Aucune requête réseau.
   Standards : nécessité narrative, densité émotionnelle, agency profonde,
   conséquences multi-niveaux, information fragmentée, urgences temporelles. */
(function (root) {
'use strict';
const C = {};
C.version = '2.0.0';
C.chapters = [
  'La ville qui oublie',
  'Ce que garde la marée',
  'Le prix des souvenirs',
  'La dernière veille',
  'Un autre rivage'
];

/* ========== AGENCY DES PERSONNAGES (AAA) ==========
   Chaque personnage possède :
   - désir conscient
   - peur inavouée
   - secret actif
   - arc de transformation
   Test de la phrase aveugle : la voix doit rester reconnaissable sans le nom.
*/
C.characters = {
  maelys: {
    name: 'Maëlys',
    role: 'Cartographe des marées',
    index: 0,
    quote: 'Une carte ne dit pas où aller. Elle promet seulement qu’il existe un chemin.',
    desire: 'Retrouver ce qu’elle a perdu — et décider si elle veut le reprendre.',
    fear: 'Découvrir qu’elle a choisi d’oublier, et que le choix était le sien.',
    secret: 'Elle a déjà été Custode. La boussole est un fragment de son ancien serment.',
    arc: 'De l’amnésie protectrice à la responsabilité choisie : accepter de nommer le prix sans s’y sacrifier.',
    voice: 'Constate. Tranche. Refuse la supplication. Parle en cartes, en distances, en absences mesurables.'
  },
  ilyan: {
    name: 'Ilyan',
    role: 'Gardien sans phare',
    index: 1,
    quote: 'Je sais tenir une porte. J’apprends encore à l’ouvrir.',
    skill: 'Rempart',
    skillText: 'Absorbe 9 dégâts et inflige 5 dégâts.',
    desire: 'Protéger Nacre sans devenir la prison qu’il surveille.',
    fear: 'Que sa vigilance soit devenue une cage pour les autres — et pour lui-même.',
    secret: 'Il a fermé la porte derrière Maëlys il y a onze ans. Il le sait. Il n’en a jamais parlé.',
    arc: 'Du gardien solitaire au témoin qui accepte que protéger, c’est parfois laisser partir.',
    voice: 'Parle en seuils, en gardes, en devoirs. Utilise le futur pour masquer ses peurs. Ne dit jamais « je t’aime » ; dit « je reste ».'
  },
  sera: {
    name: 'Séra',
    role: 'Mécanicienne des profondeurs',
    index: 2,
    quote: 'Si ça peut se casser, ça peut probablement servir à autre chose.',
    skill: 'Court-circuit',
    skillText: 'Inflige 10 dégâts et brise une protection.',
    desire: 'Réparer ce qui peut l’être — machines, gens, promesses — sans demander la permission.',
    fear: 'Que ce qu’elle répare se brise à nouveau parce qu’elle a mal compris la vraie fracture.',
    secret: 'Elle a su, très tôt, que le phare prélevait plus que de la mémoire. Elle a choisi de continuer à le faire fonctionner.',
    arc: 'De la bricoleuse qui sauve les mécanismes à celle qui ose débrancher ce qui ne devrait plus tourner.',
    voice: 'Pratique, ironique, concrète. Parle en outils, en dérivations, en « ça peut servir ». Cache la tendresse sous la graisse et le cuivre.'
  },
  orin: {
    name: 'Orin',
    role: 'Archiviste des absents',
    index: 3,
    quote: 'Ne confonds pas le silence avec le consentement.',
    skill: 'Réminiscence',
    skillText: 'Rend 13 points de vie et 1 concentration.',
    desire: 'Que la vérité soit dite, même si elle le condamne.',
    fear: 'Que la vérité, une fois dite, ne change rien — et qu’il ait détruit le silence pour rien.',
    secret: 'Il a falsifié les consentements. Il a cru protéger. Il a créé la prison.',
    arc: 'Du gardien du mensonge au témoin public qui accepte d’être jugé par ceux qu’il a « protégés ».',
    voice: 'Précis, parfois glacial, jamais théâtral. Parle en preuves, en registres, en formulations exactes. Refuse les excuses faciles.'
  }
};


C.items = {
 herb:{name:'Lichen de sel',icon:'leaf',kind:'mat',desc:'Une plante tenace. Ingrédient des baumes et tisanes.'},
 glass:{name:'Verre de marée',icon:'gem',kind:'mat',desc:'Un éclat chargé de résonance, utile aux mécanismes.'},
 scrap:{name:'Pièce de cuivre',icon:'gear',kind:'mat',desc:'Métal récupéré. Une matière première pour l’atelier.'},
 tonic:{name:'Baume de veille',icon:'bottle',kind:'use',desc:'Restaure 24 points de vie. Utilisable aussi en combat.',heal:24},
 tea:{name:'Infusion claire',icon:'bottle',kind:'use',desc:'Restaure 3 points de concentration.',focus:3},
 bomb:{name:'Éclat de rupture',icon:'gem',kind:'use',desc:'Inflige 22 dégâts en combat, à travers la protection.',damage:22},
 ward:{name:'Amulette isolante',icon:'shield',kind:'equip',desc:'Réduit de 2 tous les dégâts reçus. Bonus permanent dès fabrication.'},
 blade:{name:'Lame accordée',icon:'sword',kind:'equip',desc:'Augmente les attaques de 3. Bonus permanent dès fabrication.'},
 key:{name:'Clé d’archive',icon:'key',kind:'quest',desc:'La clé confiée par le quartier des Lanternes.'},
 letter:{name:'Lettre jamais remise',icon:'scroll',kind:'quest',desc:'Une enveloppe pour Ilyan, fermée depuis onze ans.'},
 seed:{name:'Graine de verre',icon:'leaf',kind:'quest',desc:'Une vie minuscule préservée dans une capsule.'},
 locket:{name:'Médaillon de Lio',icon:'moon',kind:'quest',desc:'Un soleil cabossé retrouvé sur la jetée.'},
 lens:{name:'Lentille du phare',icon:'gem',kind:'quest',desc:'Le premier des trois organes de l’ancien phare.'},
 heart:{name:'Cœur de turbine',icon:'gear',kind:'quest',desc:'Une pulsation mécanique, enfin libérée.'},
 name:{name:'Nom véritable',icon:'scroll',kind:'quest',desc:'La dernière ligne du registre. Votre propre signature.'},
 proof:{name:'Registre des consentements',icon:'scroll',kind:'quest',desc:'La preuve que les voix n’ont jamais accepté le marché.'}
};
C.recipes = [
 {id:'tonic',cost:{herb:2},out:1,label:'Baume de veille'},
 {id:'tea',cost:{herb:1,glass:1},out:1,label:'Infusion claire'},
 {id:'bomb',cost:{glass:2,scrap:1},out:1,label:'Éclat de rupture'},
 {id:'ward',cost:{scrap:3,glass:2},out:1,unique:true,label:'Amulette isolante'},
 {id:'blade',cost:{scrap:4,glass:3},out:1,unique:true,label:'Lame accordée'}
];
C.quests = [
 {id:'main',title:'Rallumer un monde',desc:'Retrouver les trois organes du phare, puis décider de ce qu’ils doivent sauver.',steps:[['welcome','Atteindre le quartier des Lanternes'],['archive_open','Entrer dans les archives'],['lens','Récupérer la lentille de veille'],['heart','Libérer le cœur de turbine'],['name','Retrouver votre nom'],['final_open','Ouvrir le cœur de Nacre'],['ended','Choisir un avenir']]},
 {id:'child',title:'Le soleil dans la poche',desc:'Mina attend son frère à l’étal des lanternes.',steps:[['child_met','Écouter Mina au marché'],['locket_found','Fouiller la barque de la jetée'],['child_done','Rapporter le médaillon à Mina']]},
 {id:'letter',title:'Ce qu’on ne s’est pas dit',desc:'Une lettre dort dans les archives.',steps:[['letter_found','Retrouver la lettre'],['letter_done','La remettre à Ilyan au camp']]},
 {id:'garden',title:'Quelque chose qui pousse',desc:'Le dernier arbre de Nacre est malade.',steps:[['garden_met','Rencontrer la jardinière'],['seed_found','Découvrir la graine dans l’écho du jardin'],['garden_done','Choisir où la planter']]},
 {id:'debt',title:'Une dette sans visage',desc:'Un plongeur est prisonnier des automates de l’écluse.',steps:[['debt_known','Écouter Séra à l’atelier'],['diver_saved','Ouvrir le passage de l’écluse'],['debt_done','Revenir parler à Séra']]},
 {id:'proof',title:'Les voix qu’on a effacées',desc:'Orin soupçonne un mensonge dans les registres.',steps:[['orin_met','Rencontrer Orin'],['proof_found','Écouter le registre dans la crypte'],['proof_done','Montrer la preuve à Orin']]},
 {id:'evac',title:'Tout le monde à bord',desc:'Une sortie collective exige des vivres, une route et quelqu’un qui y croit.',steps:[['evac_started','Proposer une évacuation à Mina'],['bridge_open','Sécuriser le pont des naufragés'],['evac_done','Achever les préparatifs au marché']]},
 {id:'memories',title:'Atlas des absents',desc:'Écouter les six souvenirs dispersés dans l’écho.',steps:[['echo_harbor','Le départ'],['echo_market','La chanson'],['echo_archive','Le mensonge'],['echo_garden','La promesse'],['echo_turbine','Le prix'],['echo_spire','Le retour']]}
];
C.achievements = [
 ['first_echo','De l’autre côté','Écouter un souvenir dans l’écho.'],
 ['first_win','Rester debout','Remporter une confrontation.'],
 ['mercy','Une autre issue','Résoudre une confrontation en apaisant.'],
 ['artisan','Les mains dans le cuivre','Fabriquer un objet.'],
 ['trio','Personne ne traverse seul','Réunir les trois compagnons.'],
 ['garden','Après nous','Planter la dernière graine.'],
 ['truth','La voix des absents','Retrouver la preuve des consentements falsifiés.'],
 ['evac','Pas un nom de moins','Préparer l’évacuation du quartier.'],
 ['bond','Une place près du feu','Nouer un lien intime ou une amitié profonde.'],
 ['atlas','Ce que l’eau n’efface pas','Écouter les six échos.'],
 ['ending','L’autre rive','Atteindre une fin.'],
 ['shared','Une ville à plusieurs voix','Atteindre la fin du partage.'],
 ['all_endings','Les six rivages','Découvrir les six fins.'],
 ['ngplus','Je connais ce silence','Commencer une nouvelle traversée.']
].map(([id,name,desc])=>({id,name,desc}));
const req = (flags=[], extra={})=>({flags,...extra});
const choice = (text, next=null, effects={}, extra={})=>({text,next,effects,...extra});
const E = (title,speaker,paragraphs,choices,extra={})=>({title,speaker,paragraphs,choices,...extra});

/* ========== PRESSION TEMPORELLE (AAA) ==========
   Trois urgences progressives :
   1. Rumeur (après welcome) — la ville sait que « quelqu’un » est revenu
   2. Montée des eaux (après lens) — le phare retient de moins en moins
   3. Appel de la Custode (après name) — elle exige une réponse
*/
C.pressure = {
  rumor: {flag:'pressure_rumor', after:'welcome', text:'La rumeur de ton retour circule. Certains te cherchent. D’autres te fuient.'},
  water: {flag:'pressure_water', after:'lens', text:'L’eau monte plus vite. Les bas quartiers ont déjà les pieds mouillés.'},
  custode: {flag:'pressure_custode', after:'name', text:'La Custode te nomme. Elle attend une réponse avant la prochaine marée.'}
};


C.events = {
 intro:E('La septième cloche','maelys',[
  'La mer vous a rendue avant l’aube. Vous vous en souvenez parce qu’elle hésitait : chaque vague reprenait un peu de votre manteau, comme si elle cherchait encore quelque chose dans vos poches.',
  'Vous vous appelez Maëlys. Sur votre poignet, trois traits d’encre forment une carte dont vous ne reconnaissez aucun rivage. Dans votre main fermée : une boussole sans nord. Elle pulse une fois, comme un cœur qui se souvient d’avoir battu ailleurs.',
  'Face à vous, Nacre monte de l’eau. Des fenêtres éclairées. Un phare mort. Au-dessus de sa flèche, un anneau de pierre brisé reste suspendu dans le ciel — et pour un instant, vous avez la certitude absurde de l’avoir vu intact.',
  'La cloche sonne six fois. Puis une septième, beaucoup plus près. Sous votre peau. Un homme vous tend une corde depuis la jetée. « Ne suivez pas les voix. Pas encore. » Sa voix porte une fatigue qui n’est pas seulement celle de la nuit.'
 ],[choice('Saisir sa main. « Je suis Maëlys. »','arrival',{rel:{ilyan:1},flags:{trust_start:true}}),choice('Remonter seule. « Où sommes-nous ? »','arrival',{resolve:1}),choice('Écouter ce que murmure la mer — même si cela fait mal.','arrival',{resonance:1,flags:{heard_sea:true}})]),
 arrival:E('Une ville au bout du monde','ilyan',[
  'L’homme vous enveloppe d’une couverture rêche. Il s’appelle Ilyan. Son manteau porte l’insigne d’un phare barré de noir. Il ne vous regarde pas tout de suite ; il regarde la mer, comme s’il comptait les vagues qui auraient pu vous reprendre.',
  '« À Nacre, nous oublions une chose à chaque marée. Une odeur, un visage, la façon de nouer ses chaussures. Nous écrivons ce qui compte. Puis nous oublions pourquoi nous l’avons écrit. » Il marque une pause. « Certains d’entre nous le savent. La plupart font semblant de ne pas le savoir. »',
  'Il désigne les lanternes au-dessus du port. « Le quartier tient encore. Trouvez Séra, à l’atelier. Dites-lui que la mer a rapporté une cartographe. Elle comprendra mieux que moi. »',
  'Vous découvrez votre boussole : son aiguille ne pointe pas un lieu, mais les choses qui ont été perdues. Elle peut ouvrir l’écho, la mémoire silencieuse de Nacre. Ilyan détourne les yeux quand elle pulse. Comme s’il reconnaissait le rythme.'
 ],[choice('Explorer le port. Apprendre d’abord ce qui reste.',null,{flags:{welcome:true},companions:['ilyan'],journal:'Ilyan m’a accueillie. Il sait quelque chose qu’il ne dit pas. Séra m’attend au quartier des Lanternes. La boussole révèle les souvenirs cachés.'})]),
harbor_crate:E('Ce que la mer restitue','maelys',[
  'Une caisse s’est coincée entre deux marches. L’eau a emporté le couvercle, mais les plantes enveloppées de toile cirée sentent encore le soleil.',
  'Quelqu’un avait préparé ce colis avec soin. Sur une étiquette détrempée : « Pour quand il fera froid. » Vous ne prenez que ce qui pourra servir.'
 ],[choice('Récupérer les provisions.',null,{items:{herb:4,scrap:2},gold:6,journal:'Des provisions échouées pourront servir à fabriquer des baumes.'})]),
 harbor_bell:E('La cloche sans battant','ilyan',[
  'La cloche est fendue de haut en bas. Pourtant, elle vient de sonner. Ilyan garde les yeux sur l’eau.',
  '« Mon père disait que les lieux se souviennent quand les gens ne peuvent plus. Je croyais que c’était une façon de nous consoler. »',
  'Dans le bronze, votre reflet a un léger retard. Il lève la main après vous.'
 ],[choice('« On peut apprendre à écouter. »',null,{rel:{ilyan:1}}),choice('« Je préfère savoir ce qui fait sonner ça. »',null,{resolve:1})]),
 echo_harbor:E('Écho I · Le départ','maelys',[
  'Le port change. La pierre est sèche. Des centaines de lampions descendent jusqu’à une mer d’un bleu impossible.',
  'Une jeune femme attache un fil rouge au poignet d’un petit garçon. « Comme ça, si tu oublies, tu sauras que quelqu’un t’attend. » La scène se fend. Le garçon est devenu vieux. Il tient toujours le fil.',
  'Vous comprenez : l’écho n’est pas un fantôme. C’est une chose vraie à laquelle personne ne donne plus de présent.'
 ],[choice('Inscrire ce départ dans l’atlas.',null,{flags:{echo_harbor:true},resonance:1,xp:8,items:{glass:1},journal:'Écho du port : les habitants pensaient partir, puis ont attendu toute une vie.'})],{echo:true}),
 market_intro:E('Le quartier des Lanternes','sera',[
  'Des casseroles tintent sous les arcades. Le quartier cuisine pour couvrir le bruit de l’eau. Sur chaque porte, quelqu’un a peint le nom de ceux qui y vivent.',
  'Une femme aux boucles cuivrées vous observe depuis un établi. « Ce manteau a connu des jours plus secs. Séra. J’arrange ce qui casse et, parfois, ce qui obéit trop bien. »',
  'Elle prend votre boussole, puis la repose aussitôt. « On a besoin de trois choses : la lentille des archives, le cœur de la turbine et le nom du premier veilleur. Avec ça, on peut entrer dans le phare. Après... on verra ce qui mérite d’être rallumé. »'
 ],[choice('« Je vous aide. Mais personne ne décide à ma place. »',null,{companions:['sera'],rel:{sera:1},flags:{sera_met:true,archive_open:true},items:{key:1},journal:'Séra m’a confié la clé des archives. Trois organes ouvrent le phare : lentille, cœur et nom.'}),choice('« Tout ce qui garde cette ville en vie mérite une chance. »',null,{companions:['sera'],flags:{sera_met:true,archive_open:true},rep:{keepers:1},items:{key:1},journal:'Les archives renferment la lentille. Séra connaît l’ancien réseau du phare.'})]),
 mina:E('Une place vide à table','mina',[
  'Mina dispose trois bols sur son étal, puis en range un. Elle recommence, sans paraître s’en rendre compte.',
  '« Mon frère Lio plonge près de la vieille jetée. Il a un médaillon, un soleil qui ressemble à une pomme de terre. C’est moi qui l’ai fabriqué. » Elle sourit en le décrivant. « S’il est là-bas, dites-lui que la soupe est chaude. »',
  'Ilyan ne dit rien. Vous voyez pourtant ce qu’il a reconnu dans le geste de ranger le bol.'
 ],[choice('« Je chercherai une trace de lui. »',null,{flags:{child_met:true},journal:'Mina cherche Lio. Sa barque est près de la jetée.'})]),
 mina_return:E('Le soleil dans la poche','mina',[
  'Mina n’ouvre pas la main. Vous posez le médaillon sur le comptoir. Le petit soleil tourne une fois, hésite, puis s’arrête.',
  '« Il l’avait promis, hein ? Qu’il reviendrait. »',
  'Vous n’avez ni corps, ni certitude. Seulement un objet et une absence. Mina attend une réponse qui ne rendra rien, mais qui peut encore ne pas mentir.'
 ],[choice('« Je n’ai retrouvé que cela. Je ne sais pas ce qui lui est arrivé. »',null,{flags:{child_done:true},rel:{ilyan:2,orin:1},items:{locket:-1,tonic:2},gold:12,xp:12,journal:'J’ai rendu son médaillon à Mina sans inventer une fin à l’histoire de Lio.'}),choice('« Gardons-lui sa place. Sans arrêter de vivre. »',null,{flags:{child_done:true},rel:{sera:2},items:{locket:-1,tonic:2},gold:12,xp:12,journal:'Mina a gardé un bol pour Lio. Elle accepte que l’attente ne soit pas toute sa vie.'})]),
 evac_start:E('Assez de barques pour les vivants','mina',[
  'Vous demandez combien de bateaux tiennent encore la mer. Mina vous répond sans réfléchir : neuf. Elle a déjà compté.',
  '« Il faudrait une route jusqu’au pont, des réserves, quelqu’un pour convaincre ceux qui attendent encore une permission. Si vous ouvrez le passage, je m’occupe des vivres. »',
  'Elle range enfin le troisième bol. Pas loin. À portée de main.'
 ],[choice('Préparer une évacuation, quelle que soit l’issue au phare.',null,{flags:{evac_started:true},rep:{free:1},journal:'Mina prépare des vivres. Le pont doit être sécurisé pour évacuer tout le quartier.'})]),
 evac_finish:E('La liste des passagers','mina',[
  'Mina vous montre une longue bande de tissu. Chaque habitant y a cousu son nom, avec un dessin pour ceux qui ne savent plus le lire.',
  '« Pas de places à vendre. Pas de familles séparées. Et on embarque aussi ceux qui ont peur de changer d’avis. »',
  'Elle a laissé une ligne vide en bas. « Pour qui on aurait oublié. » Vous pensez qu’une ville commence peut-être ainsi.'
 ],[choice('Confirmer le départ des neuf barques.',null,{flags:{evac_done:true},xp:20,rel:{sera:1,ilyan:1},journal:'Les neuf barques sont prêtes. Tous les habitants ont une place.'})]),
 echo_market:E('Écho II · La chanson','maelys',[
  'Toutes les lanternes s’allument à la fois. Une petite foule chante une comptine dont personne ne connaît la fin. Chaque fois que la mélodie s’interrompt, une femme ajoute une note.',
  'C’est Mina, plus jeune. À côté d’elle, un garçon au médaillon de cuivre rit en chantant faux.',
  'La dernière note reste suspendue lorsque l’écho s’efface. Vous ne la retenez pas. Vous retenez seulement le rire.'
 ],[choice('Garder cette joie, elle aussi.',null,{flags:{echo_market:true},resonance:1,xp:8,items:{glass:1},journal:'Écho des Lanternes : Lio avait une voix, un rire, une vie avant son absence.'})],{echo:true}),
 workshop_debt:E('Le plongeur et la machine','sera',[
  'Séra déroule un schéma taché d’huile. « Mon frère adoptif, Daren, est bloqué derrière l’écluse. Les automates ont confondu son équipement avec une fuite. Ils réparent autour de lui. »',
  'Elle plaisante trop vite : « C’est presque flatteur. Ils lui trouvent encore de la valeur. » Puis sa voix se brise sur le dernier mot.',
  '« Je peux ouvrir le passage quand le gardien sera arrêté. Je viens avec vous. Et vous n’avez pas besoin de me promettre qu’il est encore vivant. »'
 ],[choice('« Je vous promets seulement qu’on ira jusqu’à lui. »',null,{flags:{debt_known:true},rel:{sera:1},items:{scrap:3},journal:'Daren est prisonnier à l’écluse. Séra refuse une fausse promesse ; elle veut que nous essayions.'})]),
 workshop_return:E('Ce que réparent les mains','sera',[
  'Daren dort sur deux chaises rapprochées. Ses mains tremblent encore, mais sa respiration est régulière. Séra huile une pièce déjà parfaitement propre.',
  '« Je lui ai dit que vous aviez surtout suivi mes excellentes instructions. » Elle vous tend un objet de cuivre. « Il m’a demandé pourquoi je souriais comme une idiote. »',
  'Elle ferme vos doigts sur l’amulette. « Vous avez tenu la seule promesse qui comptait. »'
 ],[choice('« Je recommencerais. »',null,{flags:{debt_done:true},rel:{sera:3},items:{ward:1},xp:18}),choice('« Apprenez-moi à réparer autant que vous. »',null,{flags:{debt_done:true},rel:{sera:2},items:{ward:1,scrap:2},xp:18})]),
 jetty_boat:E('La barque de Lio','maelys',[
  'Le bateau tient encore à son amarre. Il n’a pas chaviré : quelqu’un a rangé les rames et plié la couverture avant de partir.',
  'Un médaillon est accroché sous le banc. Son petit soleil tordu a perdu un rayon. À côté, une phrase gravée à la pointe : « Je ne veux plus attendre de ne plus avoir peur. »',
  'C’est une trace. Pas une réponse. Vous enveloppez le cuivre dans un linge sec.'
 ],[choice('Prendre le médaillon.',null,{flags:{locket_found:true},items:{locket:1,herb:2},journal:'La barque de Lio était rangée. Son médaillon est resté sous le banc. Rien ne prouve sa mort.'})]),
 archive_intro:E('L’homme qui écrit dans les marges','orin',[
  'Le bibliothécaire a posé des livres ouverts sur des briques, juste au-dessus de l’eau. Il sauve une page, change de livre, recommence.',
  '« Orin. N’effacez pas les marques sur les murs. Ce ne sont pas des moisissures. Ce sont des noms. » Il regarde votre boussole avec une tristesse très calme. « Vous êtes revenue. Pardonnez-moi. Je ne devrais pas commencer par une chose que vous ne pouvez pas comprendre. »',
  'Il refuse de préciser. Pas par goût du secret : sur la table, une phrase a été barrée cinquante fois. Chaque tentative porte une écriture différente.'
 ],[choice('« Alors accompagnez-moi jusqu’à ce que je puisse. »',null,{companions:['orin'],rel:{orin:1},flags:{orin_met:true},journal:'Orin semble me connaître. Il dit que la vérité est gardée dans la crypte.'}),choice('« Je trouverai mes réponses. Mais vos livres méritent de survivre. »',null,{companions:['orin'],flags:{orin_met:true},items:{glass:2},journal:'Orin a rejoint le groupe. La lentille attend derrière le mécanisme des archives.'})]),
 archive_note:E('La leçon des marées','orin',[
  'Une page est protégée sous une plaque de verre. Trois lignes restent lisibles :',
  '« Quand l’eau se retire, la lune montre le seuil. Quand elle revient, la vague porte le passage. Quand elle se tait, l’étoile veille. »',
  'Orin touche les trois disques du mécanisme. « L’ordre importe plus que la force. Lune. Vague. Étoile. Notre ancien serment était fait pour qu’un enfant puisse s’en souvenir. »'
 ],[choice('Noter l’ordre des trois symboles.',null,{flags:{archive_clue:true},journal:'Mécanisme des archives : LUNE, VAGUE, ÉTOILE.'})]),
 archive_lens:E('La première lumière','maelys',[
  'Le coffre s’ouvre sur une lentille aussi fine qu’une aile. Vous la prenez ; l’eau du sol reflète aussitôt un ciel étoilé que vous ne voyez nulle part ailleurs.',
  'Une image vous traverse : vos propres mains fixant cette lentille dans le phare. Vous étiez plus âgée. Ou simplement plus fatiguée.',
  'Ilyan fait un pas, puis s’arrête. « Ce n’est pas parce qu’une chose vous reconnaît que vous lui devez quoi que ce soit. »'
 ],[choice('Emporter la lentille et cette première question.',null,{flags:{lens:true,act2:true},items:{lens:1},xp:25,journal:'La lentille est à nous. Un souvenir m’a montrée au phare, avant mon arrivée.'})]),
 archive_letter:E('Une enveloppe sèche','maelys',[
  'Entre deux inventaires, une enveloppe a échappé à l’humidité. Elle porte le nom d’Ilyan.',
  'L’écriture penche à gauche. Le sceau représente une petite barque, pas l’insigne officiel du phare. Sur l’enveloppe : « À remettre quand il saura qu’on peut quitter une veille. »'
 ],[choice('La garder fermée pour Ilyan.',null,{flags:{letter_found:true},items:{letter:1},journal:'Une lettre pour Ilyan. Je pourrai la lui remettre au camp.'})]),
 echo_archive:E('Écho III · Le mensonge','maelys',[
  'Des mains tamponnent des feuillets. Le même nom revient sous chaque empreinte : VOLONTAIRE. Vous reculez. Ce n’est pas un nom. C’est une catégorie.',
  'Une voix demande : « Ont-ils compris ? » Une autre répond : « Ils ont eu peur. Cela revient au même. »',
  'Orin, dans le présent, serre le bord de la table. Il se souvient d’avoir écrit la question. Plus d’avoir accepté la réponse.'
 ],[choice('Conserver la trace de ce mensonge.',null,{flags:{echo_archive:true},resonance:1,xp:8,items:{glass:1},journal:'Écho des archives : la peur a été transformée en consentement officiel.'})],{echo:true}),
 garden_intro:E('Le dernier arbre','ysse',[
  'Ysse a les ongles pleins de terre noire. Elle arrose les racines blanches d’un arbre dont les feuilles ressemblent à de petits morceaux de ciel.',
  '« Il pousse sur des souvenirs. Chaque feuille est un printemps dont personne ne se rappelle. Depuis trois jours, il perd l’automne avant de le vivre. »',
  'Elle vous donne un pot vide. « Cherchez dans son écho. S’il a préparé une graine, elle est là où il se souvient encore d’être jeune. »'
 ],[choice('Chercher une graine dans l’écho.',null,{flags:{garden_met:true},journal:'Ysse pense qu’une graine subsiste dans l’écho du jardin.'})]),
 garden_seed:E('Une vie qui tient dans la main','maelys',[
  'Dans l’écho, l’arbre est minuscule. Deux mains creusent la terre. Vous reconnaissez les vôtres.',
  '« Pour qu’il y ait quelque chose ici après nous », dit une voix. Une graine de verre roule entre vos doigts, quitte le souvenir et reste dans votre paume.'
 ],[choice('Ramener la graine à Ysse.',null,{flags:{seed_found:true},items:{seed:1},xp:8})],{echo:true}),
 garden_plant:E('Une terre à choisir','ysse',[
  'Ysse pèse la graine comme on tient un oiseau. « Ici, elle sauverait l’arbre. Dehors, elle pourrait commencer une forêt. »',
  'Séra prépare déjà un pot de voyage. Ilyan regarde les branches presque nues. Personne ne parle à votre place.',
  'Vous avez envie de demander lequel des deux choix fera le moins mal. Vous savez que la vieille femme ne vous vendra pas cette certitude.'
 ],[choice('Planter la graine ici. Nacre mérite de repousser.',null,{flags:{garden_done:true,tree_saved:true},items:{seed:-1,herb:5},rel:{ilyan:2},rep:{keepers:1},xp:18}),choice('Confier la graine aux voyageurs. Une forêt ailleurs.',null,{flags:{garden_done:true,seed_abroad:true},items:{seed:-1,herb:5},rel:{sera:2},rep:{free:1},xp:18})]),
 echo_garden:E('Écho IV · La promesse','maelys',[
  'Un enfant grave un visage dans l’écorce. Une femme lui dit de ne pas blesser l’arbre. Il répond : « Mais s’il m’oublie ? »',
  'La femme retire doucement le couteau. « Alors nous reviendrons. On ne force pas quelqu’un à se souvenir. On lui donne une chance de nous rencontrer encore. »',
  'Vous restez un moment devant le tronc. Pour la première fois depuis votre arrivée, votre boussole paraît légère.'
 ],[choice('Dessiner cette promesse.',null,{flags:{echo_garden:true},resonance:1,xp:8,items:{glass:1},journal:'Écho du jardin : le lien n’est pas une obligation de se souvenir.'})],{echo:true}),
 crypt_truth:E('Le registre des vivants','orin',[
  'Sous l’encre officielle, la boussole révèle une autre écriture. Des refus. Des noms rayés. Des signatures ajoutées après coup.',
  'Orin lit le sien et laisse échapper un rire sans joie. « J’ai signé pour sauver les gens. Puis j’ai signé pour qu’ils ne sachent pas comment. J’ai appelé cela les protéger. »',
  'Il ne demande pas votre pardon. Il vous tend le registre. « Quoi que nous fassions du phare, ils doivent entendre ça. »'
 ],[choice('Prendre le registre. La vérité appartient au quartier.',null,{flags:{proof_found:true},items:{proof:1},rel:{orin:2},xp:12,journal:'Les consentements ont été falsifiés. Orin a participé au mensonge et veut le révéler.'})],{echo:true}),
 orin_proof:E('La place du témoin','orin',[
  'Orin a écrit une confession sans formule d’excuse. Il vous laisse la lire jusqu’au bout.',
  '« Si le phare partageait sa charge entre des volontaires réellement libres... non, ce serait encore trop simple. Il faudrait pouvoir partir. Dire non demain à ce qu’on a accepté aujourd’hui. »',
  'Il trace un mécanisme à trois voix. « Il nous faut les trois compagnons, des souvenirs retrouvés, une issue pour les habitants. Alors nous pourrions proposer un pacte qui ne soit plus une prison. »'
 ],[choice('« Vous témoignerez. Puis ils décideront. »',null,{flags:{proof_done:true},rel:{orin:2},xp:18,journal:'Une troisième voie existe : partager la veille avec le droit de partir. Il faut les trois compagnons, trois échos, le registre et l’évacuation.'})]),
 lock_rescue:E('De l’autre côté de l’écluse','sera',[
  'La vanne s’ouvre d’un doigt, puis d’une main. Séra se glisse dans l’espace avant que vous puissiez lui dire d’attendre.',
  'Vous entendez une toux. Une insulte. Puis la voix de Daren : « T’aurais pu venir hier. » Séra rit si fort qu’il se met à rire aussi.',
  'Ils ressortent couverts de rouille. La machine avait construit un abri autour de lui. Elle le protégeait de l’eau, sans comprendre qu’elle l’empêchait de rentrer.'
 ],[choice('Les ramener vers le quartier.',null,{flags:{diver_saved:true},items:{scrap:4,herb:2},xp:18,journal:'Daren est vivant. Séra le ramène à l’atelier ; il faudra aller les voir.'})]),
 turbine_note:E('Le rythme d’une machine','sera',[
  'Le moteur ne manque pas d’énergie : il en retient trop. Séra pose sa paume contre le cuivre.',
  '« Trois chambres. Quatre unités à gauche, deux au centre, cinq à droite. Les vannes ne doivent pas être identiques : elles compensent des conduites de longueurs différentes. »',
  'Elle dessine 4 / 2 / 5 dans la poussière. « Le vieux contremaître appelait ça le rythme de son cœur. Il exagérait beaucoup. »'
 ],[choice('Noter les pressions : 4, 2, 5.',null,{flags:{turbine_clue:true},journal:'Pression de la turbine : gauche 4, centre 2, droite 5.'})]),
 turbine_heart:E('Une pulsation de cuivre','maelys',[
  'Le moteur ralentit. Entre deux battements, vous détachez son cœur. Il ne s’arrête pas dans votre main. Il change seulement de rythme.',
  'Au-dessus de vous, les lampes du quartier vacillent puis se stabilisent. Séra a ouvert une dérivation. « On leur a pris le cœur, pas la lumière. »',
  'Votre boussole trace maintenant une ligne verticale. Vers la flèche du phare. Vers ce qui porte encore votre nom.'
 ],[choice('Prendre le cœur et rejoindre le pont.',null,{flags:{heart:true,act3:true},items:{heart:1},xp:28,journal:'Le cœur de turbine est libéré. Le quartier garde sa lumière grâce à la dérivation de Séra.'})]),
 echo_turbine:E('Écho V · Le prix','maelys',[
  'Chaque battement de la machine efface un mot sur un mur. Une femme a écrit « maison » dix mille fois. Elle se tient devant la dernière occurrence, incapable de la lire.',
  'Ce ne sont pas les morts qui alimentent le phare. Ce sont les vivants qui se souviennent moins, chaque jour, de ce qui faisait leur vie.',
  'Vous posez la main sur le cuivre jusqu’à ce que le mot disparaisse. Vous vous promettez de ne pas appeler cela une simple panne.'
 ],[choice('Garder ce prix visible.',null,{flags:{echo_turbine:true},resonance:1,xp:8,items:{glass:1},journal:'Le phare se nourrit de la mémoire des vivants. Chaque oubli est un prélèvement.'})],{echo:true}),
 bridge_decision:E('Ceux qui barrent le pont','ilyan',[
  'Trois gardes sans insignes contrôlent les planches. Leur cheffe vous reconnaît avant vous-même.',
  '« Vous avez construit ce système. Vous voulez encore nous promettre une sortie ? » Elle montre le quartier en contrebas. « Nous avons perdu des noms pour que les autres dorment. Nous n’en perdrons plus. »',
  'Ilyan baisse son arme. « Alors aidons-les à choisir, cette fois. » La cheffe regarde votre groupe. Elle attend un geste qui ne soit pas un ordre.'
 ],[choice('Montrer le registre. « Ce qu’on vous a fait est écrit ici. »',null,{flags:{bridge_open:true},rep:{free:2},xp:20},{requires:req(['proof_found']),hint:'Retrouver le registre dans l’écho de la crypte.'}),choice('« Nous préparons le départ ensemble. Venez voir les barques. »',null,{flags:{bridge_open:true},rel:{sera:1},xp:18},{requires:{flags:['evac_started'],rep:{free:2}},hint:'Préparer l’évacuation et gagner 2 marques de confiance des Libres.'}),choice('Partager 12 éclats pour les provisions de la traversée.',null,{flags:{bridge_open:true},gold:-12,rel:{sera:1},xp:15},{requires:{gold:12},hint:'12 éclats requis.'}),choice('« Laissez-moi vous prouver que je peux tenir ce passage. »',null,{}, {battle:'bridge'})]),
 sunken_cache:E('Le coffre des départs','maelys',[
  'Le quartier bas est vide, mais pas abandonné. Les lits sont faits. Les pots rentrés. Les portes fermées avec un soin obstiné.',
  'Dans un coffre collectif, vous trouvez du métal, des baumes et un carnet de départs. Sous chaque date, une case attend qu’on coche « arrivés ».',
  'Vous n’emportez pas le carnet. Vous laissez une lanterne allumée à côté.'
 ],[choice('Récupérer le matériel préparé pour les voyageurs.',null,{items:{tonic:2,tea:2,scrap:3,glass:2},gold:15,xp:10})]),
 sunken_memory:E('Votre nom dans la pierre','maelys',[
  'Le portail refuse la lentille, ignore le cœur. Il attend autre chose. Votre main trouve une empreinte dans la pierre. Elle y entre exactement. La pierre reconnaît ce que vous avez oublié.',
  'MAËLYS VALE. PREMIÈRE VEILLEUSE. Vous n’étiez pas venue réparer Nacre. Vous l’aviez conçue. La boussole dans votre main pulse une dernière fois — non comme un outil, mais comme un serment qui se souvient.',
  'Orin avait vingt ans. Séra était une enfant. Ilyan n’était pas encore gardien. Vous avez confié votre mémoire à la mer pour ne plus entendre les voix de ceux que vous aviez enfermés. Vous avez choisi d’oublier. La mer, finalement, vous a ramenée. Et quelqu’un, il y a onze ans, a fermé la porte derrière vous.',
  'La Custode n’est pas un monstre. C’est la part de vous qui a continué à tenir ce que vous aviez abandonné.'
 ],[choice('« Je ne peux pas annuler ce que j’ai fait. Je peux y répondre. »','name_after',{flags:{name:true,accepted_blame:true},items:{name:1},resolve:2,xp:25}),choice('« Je ne suis plus celle qui a décidé cela. Mais je suis ici. »','name_after',{flags:{name:true,claimed_present:true},items:{name:1},rel:{sera:1,orin:1},xp:25})]),
 name_after:E('La personne qui reste','ilyan',[
  'Vous attendez qu’ils reculent. Ilyan retire seulement son gant et pose une main nue sur la pierre à côté de la vôtre.',
  '« Mon père est mort en gardant votre phare. Je vous en veux. Et je vous ai vue rendre un médaillon, porter des vivres, écouter. Les deux choses existent. »',
  'Séra reprend votre sac. Orin vous rend la boussole. Personne ne dit que tout est pardonné. Personne ne vous laisse seule devant la porte.'
 ],[choice('Monter au phare avec ce qui est vrai.',null,{flags:{act4:true},journal:'Je suis Maëlys Vale, première veilleuse. J’ai créé le système puis fui son souvenir. Mes compagnons restent, sans effacer ma responsabilité.'})]),
 spire_intro:E('La veilleuse qui n’est jamais partie','custodian',[
  'Au sommet, une silhouette faite de lumière a votre visage. Pas tout à fait : elle ne cligne jamais des yeux.',
  '« Tu as oublié. Moi, je n’ai pas eu cette chance. Je suis la part de toi qui a continué à tenir la ville quand tu as choisi le rivage. »',
  'L’anneau brisé tourne derrière elle. « Tu peux me remplacer. Me commander. Me détruire. Mais ne me demande pas de croire que la liberté nourrit ceux qui ont froid. »'
 ],[choice('« Alors discutons de ce qui les garde vraiment en vie. »',null,{flags:{custodian_met:true},journal:'La Custode est une empreinte de mon ancienne volonté. Elle protège Nacre en lui prenant sa mémoire.'})]),
 spire_note:E('La carte renversée','orin',[
  'Le plan céleste gravé sous la lentille montre quatre maisons : le Seuil, la Veille, le Passage et le Retour.',
  'L’inscription est nette : « Seuil à l’Est. Veille au Nord. Passage à l’Ouest. Retour au Sud. »',
  'Votre boussole accepte enfin des directions. Elles ne parlent plus d’endroits perdus, mais de la façon d’y revenir.'
 ],[choice('Noter Est, Nord, Ouest, Sud.',null,{flags:{spire_clue:true},journal:'Astrolabe : EST, NORD, OUEST, SUD.'})]),
 echo_spire:E('Écho VI · Le retour','maelys',[
  'Vous vous voyez au bord de la mer, avant l’oubli. Vous avez peur. Vous croyez partir pour toujours. Derrière vous, un jeune homme ferme une porte. Il ne vous regarde pas. Il croit encore que c’est de la protection.',
  'Une femme vous tend une boussole. Ysse, sans les rides. « Je ne te demande pas de rester. Mais emporte quelque chose qui sache revenir. » La boussole est chaude. Elle porte déjà un serment.',
  'Vous comprenez pourquoi l’aiguille ne cherchait pas le nord. Elle cherchait la part de vous capable de revenir sans être forcée. Et pourquoi quelqu’un, onze ans plus tard, a gardé le silence : parce que la vérité aurait tout brisé trop tôt.'
 ],[choice('Fermer l’atlas. Il reste une page à vivre.',null,{flags:{echo_spire:true},resonance:1,xp:8,items:{glass:1},journal:'Ysse m’avait donné la boussole avant ma fuite. Elle a attendu un retour libre.'})],{echo:true}),
 heart_intro:E('Toutes les voix à la fois','custodian',[
  'Sous le phare, les souvenirs flottent comme une constellation basse. La chanson de Mina. La lettre d’Ilyan. Une main pleine de terre. Des milliers d’autres choses que vous n’avez jamais vues — et quelques-unes que vous aviez choisies d’effacer.',
  '« Je peux continuer », dit la Custode. Sa voix est épuisée. « C’est tout ce que je sais faire. Tu m’as laissée ici pour ça. » Elle n’accuse pas. Elle constate.',
  'La lentille, le cœur et le nom s’emboîtent. Le dernier mécanisme s’éveille. L’eau monte encore. La rumeur est devenue une attente. Avant votre décision, il vous reste à traverser ce que la ville — et vous — avez fait de la peur.'
 ],[choice('Affronter le Nœud des voix.',null,{}, {battle:'final'})]),
 final_choice:E('À qui appartient demain ?','maelys',[
  'Le Nœud s’ouvre. Toutes les voix se taisent, non parce qu’elles ont disparu, mais parce qu’elles écoutent. La Custode vous regarde avec votre propre visage.',
  'Vous pourriez restaurer le phare. Libérer la mer. Prendre sa place. Faire de sa puissance la vôtre. Ou refuser qu’une seule personne — même vous — décide encore pour tous.',
  'Vous savez maintenant qui vous étiez. Vous savez qui a fermé la porte. Vous savez ce qu’Orin a écrit et ce que Séra a fait tourner. L’eau monte. La rumeur a déjà atteint les bas quartiers. Aucune voix ne choisira à votre place. Mais chacune attendra la réponse.'
 ],[
  choice('Partager la veille. Chaque voix garde le droit de partir.',null,{}, {ending:'shared',requires:{flags:['proof_done','evac_done'],companions:3,echoes:3},hint:'Le registre révélé, l’évacuation prête, les 3 compagnons et 3 échos.'}),
  choice('Libérer la ville du phare et rendre les souvenirs.',null,{}, {ending:'tide'}),
  choice('Restaurer le phare, sous le contrôle des habitants.',null,{}, {ending:'dawn'}),
  choice('Prendre seule la charge pour préserver les autres.',null,{}, {ending:'sacrifice'}),
  choice('Lier la Custode à votre volonté. Gouverner les marées.',null,{}, {ending:'crown',requires:{resonance:4},hint:'4 points de résonance : écouter les échos et utiliser la résonance en combat.'}),
  choice('Déléguer la décision au quartier et quitter Nacre.',null,{}, {ending:'departure',requires:req(['evac_done']),hint:'Préparer l’évacuation avec Mina.'})
 ]),
 camp_first:E('La chaleur des choses simples','sera',[
  'Le feu crépite dans une vieille vasque. Séra a inventé une soupe dont elle refuse de donner la recette. Vous n’insistez pas.',
  'Ilyan a vérifié les couvertures avant de s’asseoir. Votre place n’est ni à l’écart, ni au centre. Juste une place, préparée comme les autres.',
  'Pendant quelques minutes, personne ne vous demande de sauver quoi que ce soit. La ville existe encore. Vous aussi.'
 ],[choice('Partager ce premier repas.',null,{flags:{camp_known:true},rel:{sera:1,ilyan:1,orin:1},heal:99,focus:99,journal:'Le camp sur les remparts offre un repos gratuit et un moment avec les compagnons.'})]),
 ilyan_talk:E('La porte qu’on garde','ilyan',[
  'Ilyan répare un bouton parfaitement intact. « Quand on est gardien, on vous apprend à reconnaître tout ce qui arrive. Jamais ce qui mérite de partir. »',
  'Son père a veillé le phare jusqu’à oublier le nom de son fils. Chaque matin, Ilyan se présentait de nouveau. Chaque matin, son père le remerciait de sa visite. Ilyan a appris à tenir une porte. Il n’a jamais appris à la laisser ouverte.',
  'Il regarde la mer un instant trop long. « Il y a onze ans, j’ai fermé quelque chose. Je croyais protéger. Je ne savais pas encore que protéger pouvait ressembler à enfermer. » Il ne précise pas. Il n’en a jamais parlé.',
  '« Je ne veux plus être aimé parce que je tiens une porte. Je voudrais qu’on reste même quand je m’assieds. »'
 ],[choice('S’asseoir près de lui, sans lui demander davantage.',null,{flags:{ilyan_talk:true},rel:{ilyan:2},journal:'Ilyan a fermé une porte il y a onze ans. Il porte encore la clé.'}),choice('« Vous avez le droit de ne plus monter la garde. »',null,{flags:{ilyan_talk:true},rel:{ilyan:2},resolve:1,journal:'Ilyan commence à accepter qu’une porte puisse rester ouverte.'})]),
 ilyan_letter:E('Les mots de son père','ilyan',[
  'Ilyan ouvre la lettre très lentement. Ses lèvres suivent une première ligne, puis cessent de bouger.',
  '« Mon fils, si je ne te reconnais plus, ne passe pas ta vie à me prouver que je t’ai aimé. Vis avec quelqu’un qui n’ait pas besoin d’une lettre pour te le dire. »',
  'Il replie le papier. « Il le savait. » Vous attendez. « Il savait que je resterais. » La colère arrive avant les larmes. Vous lui laissez la place.'
 ],[choice('Rester en silence, aussi longtemps qu’il le faut.',null,{flags:{letter_done:true},items:{letter:-1},rel:{ilyan:3},xp:15}),choice('« Vous pouvez l’aimer et lui en vouloir. »',null,{flags:{letter_done:true},items:{letter:-1},rel:{ilyan:3},xp:15})]),
 sera_talk:E('L’inventaire des possibles','sera',[
  'Séra vous montre son carnet. Des machines absurdes y occupent les pages : un parapluie pour poisson, une chaise qui marche quand on a trop peur de se lever.',
  '« Si je ne dessinais que des choses utiles, je finirais par croire que je dois l’être tout le temps. » Elle pose le carnet. « Le phare, lui, n’a jamais été absurde. Il était seulement trop efficace. J’ai longtemps fait semblant de ne pas le savoir. »',
  'Au milieu des croquis, une maison avec beaucoup de fenêtres. Elle tourne la page trop vite. Vous avez déjà vu. Elle a déjà rêvé d’un endroit où l’on pourrait s’asseoir sans devoir réparer quelque chose.',
  '« Je répare ce qui casse. Parfois je répare ce qui aurait dû rester cassé. Je ne sais plus toujours la différence. »'
 ],[choice('« Je voudrais voir la maison. »',null,{flags:{sera_talk:true},rel:{sera:2},journal:'Séra savait. Elle a continué à faire tourner ce qui prélevait trop.'}),choice('Dessiner un bateau pour la chaise qui marche.',null,{flags:{sera_talk:true},rel:{sera:2},items:{scrap:1},journal:'Séra accepte un instant de ne rien réparer.'})]),
 orin_talk:E('Ce qu’un livre ne pardonne pas','orin',[
  'Orin recopie des noms sur du tissu. Le papier finirait par se défaire ; il le sait mieux que personne.',
  '« J’ai cru qu’une faute expliquée devenait une faute plus petite. J’ai écrit des centaines de pages. Elle n’a pas changé de taille. »',
  'Il pose l’aiguille. Ses doigts tremblent à peine. « Les consentements n’étaient pas vrais. Je les ai rendus lisibles. J’ai appelé cela protéger. J’ai créé la prison en croyant en construire les murs. »',
  '« Je ne cherche pas quelqu’un qui me dise que je suis bon. Seulement quelqu’un qui croie encore possible que je fasse du bien — même après ça. »'
 ],[choice('« Alors demain, on commencera par un geste. »',null,{flags:{orin_talk:true},rel:{orin:2},journal:'Orin a admis la falsification. Il attend un jugement, pas une absolution.'}),choice('Prendre une aiguille et l’aider à recopier les noms.',null,{flags:{orin_talk:true},rel:{orin:2},rep:{free:1},journal:'Orin et vous recopiez les noms ensemble. La faute reste. Le geste existe.'})]),
 ilyan_bond:E('La veille peut attendre','ilyan',[
  'Ilyan vous rejoint sur les remparts. Il a laissé son manteau au camp. Sans l’insigne, il paraît moins protégé et plus présent.',
  '« Quand tout sera fini, j’aimerais vous revoir sans une ville entre nous. » Il sourit, presque surpris d’avoir réussi à le dire. « Mais je peux aussi vous accompagner comme un ami. Ce serait déjà beaucoup. »'
 ],[choice('« J’aimerais vous embrasser. »','ilyan_kiss',{flags:{romance_ilyan:true,bond_ilyan:true},bond:'ilyan'}),choice('« Restons de vrais amis. »',null,{flags:{bond_ilyan:true,friend_ilyan:true},rel:{ilyan:1}})]),
 ilyan_kiss:E('Sans armure','ilyan',[
  '« Oui », dit-il. Un mot simple, très calme. Il vous laisse franchir la dernière distance.',
  'Son front reste contre le vôtre après le baiser. Il n’y a ni promesse éternelle, ni monde soudain réparé. Seulement une présence que vous avez choisie tous les deux.',
  'Au camp, Séra remue la soupe avec une discrétion trop appliquée.'
 ],[choice('Retourner ensemble près du feu.',null,{rel:{ilyan:2}})]),
 sera_bond:E('Une fenêtre pour deux','sera',[
  'La maison est revenue dans le carnet. Séra a ajouté une table, une étagère, un coin où quelqu’un pourrait dessiner des cartes.',
  '« Ce n’est pas un contrat », précise-t-elle. « Je ne sais même pas où on construirait ça. Je voulais juste savoir si je pouvais continuer le dessin. Avec vous dedans. »'
 ],[choice('« Oui. Et je voudrais vous embrasser. »','sera_kiss',{flags:{romance_sera:true,bond_sera:true},bond:'sera'}),choice('« Gardez-moi une chambre d’amie. »',null,{flags:{bond_sera:true,friend_sera:true},rel:{sera:1}})]),
 sera_kiss:E('Le goût du sel','sera',[
  'Séra dit oui avec un rire qui tremble un peu. Sa main vient chercher la vôtre ; elle attend votre mouvement avant de se rapprocher.',
  'Le baiser a le goût du sel et de la soupe trop épicée. Vous vous mettez à rire aussi. Pendant un instant, la peur n’est plus l’histoire entière.',
  'Elle dessine ensuite une fenêtre supplémentaire. « Pour faire entrer l’air. »'
 ],[choice('Laisser la page ouverte.',null,{rel:{sera:2}})]),
 orin_bond:E('Une marge assez grande','orin',[
  'Orin vous tend une page blanche. « Je garde toujours la dernière. Une habitude idiote : tant qu’elle n’est pas écrite, le livre ne peut pas être entièrement mauvais. »',
  '« J’aimerais apprendre à vous connaître après l’urgence. Sans faire de vous ma rédemption. Comme quelqu’un qu’on peut aimer, et laisser libre. »'
 ],[choice('« Alors commençons ici. Puis-je vous embrasser ? »','orin_kiss',{flags:{romance_orin:true,bond_orin:true},bond:'orin'}),choice('« Écrivons une amitié qui n’ait rien à prouver. »',null,{flags:{bond_orin:true,friend_orin:true},rel:{orin:1}})]),
 orin_kiss:E('Une phrase au présent','orin',[
  '« Oui. » Orin retire ses lunettes, un peu maladroitement, et ce petit geste rend l’instant plus vrai que tous les mots qu’il aurait pu choisir.',
  'Vous l’embrassez. Il ne transforme pas ce moment en serment. Il pose simplement sa main dans la vôtre.',
  'Sur la page blanche, vous dessinez deux petites barques. Elles ont chacune une rame.'
 ],[choice('Garder de la place pour la suite.',null,{rel:{orin:2}})]),
 ng_memory:E('Une ligne ajoutée à la carte','maelys',[
  'La mer vous a déjà rendue une fois. Votre main connaît le poids de la boussole. Quelque part, une autre version de vous a vécu jusqu’au bout de ce choix.',
  'Les fins découvertes restent dans l’atlas. Les personnes devant vous, elles, n’ont pas encore vécu cette traversée. Leurs réponses devront être gagnées de nouveau.',
  'Une seule chose vous accompagne : la certitude que le dernier mot n’est pas nécessairement le seul.'
 ],[choice('Recommencer en sachant que les chemins existent.','intro',{items:{glass:2,herb:2},flags:{ng_memory:true}})])
};
/* Chaque embranchement important reçoit une réaction propre avant de converger.
   Le moteur conserve cette réaction dans la sauvegarde et n'applique jamais deux fois ses effets. */
const reactions={
 intro:[
  ['Ilyan referme sa main sur la vôtre, sans vous tirer. « Maëlys. D’accord. Je vous lâche dès que vos pieds touchent la pierre. »','ilyan','Ilyan a répondu à la confiance par une aide qui laisse le choix.'],
  ['Ilyan ravale son geste et fixe la corde au quai. « Nacre. Une ville qui survit à marée haute. Remontez comme vous l’entendez. »','ilyan','Maëlys a posé ses limites dès son arrivée à Nacre.'],
  ['Sous l’eau, une multitude de voix prononce votre nom. Ilyan pâlit. « Vous les entendez déjà… Alors revenez avant qu’elles ne choisissent à votre place. »','ilyan','La mer a reconnu Maëlys avant que Nacre ne le fasse.']
 ],
 harbor_bell:[
  ['Ilyan pose deux doigts sur la fêlure. « Écouter sans obéir. J’ignorais que les deux pouvaient aller ensemble. »','ilyan','Ilyan accepte d’apprendre à écouter la cloche.'],
  ['Il hoche la tête et cherche déjà les fixations du bronze. « Une cause avant une légende. Ça aussi, ça peut nous sauver. »','ilyan','Maëlys a choisi d’enquêter sur la cloche plutôt que de lui prêter un sens.']
 ],
 market_intro:[
  ['Séra lui rend la boussole et sourit de biais. « Parfait. J’ai déjà assez de machines qui veulent décider pour moi. »','sera','Séra sait que Maëlys aidera Nacre sans abandonner sa liberté.'],
  ['Séra regarde les lanternes, puis les noms peints sur les portes. « Une chance, oui. Pas une dette éternelle. Gardons cette nuance. »','sera','Maëlys veut préserver la ville, sous réserve du consentement de ses habitants.']
 ],
 mina_return:[
  ['Mina ferme enfin les doigts sur le cuivre. Elle pleure sans détourner le visage. « Merci de ne pas avoir rempli le vide avec une histoire. »','mina','Mina possède une trace de Lio, sans fausse certitude sur son destin.'],
  ['Mina remet le troisième bol sur l’étagère, pas sur la table. « Une place qui n’avale pas toutes les autres. Je crois que je peux essayer. »','mina','Mina garde une place pour Lio sans suspendre toute sa vie à son retour.']
 ],
 workshop_return:[
  ['Séra appuie son front contre vos jointures. « Alors la prochaine fois, je vous donne de meilleures instructions. »','sera','Séra sait que Maëlys reviendrait la chercher, même sans récompense.'],
  ['Elle vous met aussitôt une clé plate dans la main. « Première leçon : on ne répare jamais seule ce qui nous dépasse. »','sera','Séra commence à transmettre son métier à Maëlys.']
 ],
 archive_intro:[
  ['Orin ferme le livre qu’il tentait de sauver. « Je peux marcher à votre rythme. Et répondre quand la réponse m’appartient. »','orin','Orin accompagnera Maëlys sans exiger qu’elle retrouve sa mémoire.'],
  ['Orin protège une pile de livres avec sa cape. « Voilà une raison suffisante pour vous suivre aujourd’hui. Le reste devra se mériter. »','orin','Maëlys et Orin commencent par sauver les archives, avant de parler du passé.']
 ],
 garden_plant:[
  ['Ysse enfonce la graine dans la terre noire. Une racine lumineuse cherche aussitôt l’eau. « Alors nous lui devrons un printemps. »','ysse','La dernière graine prend racine à Nacre.'],
  ['Ysse confie la capsule à la doyenne des barques. « Une forêt n’est pas moins nôtre parce qu’elle pousse hors de notre vue. »','ysse','La dernière graine voyagera vers une terre moins fragile.']
 ],
 bridge_decision:[
  ['La cheffe lit trois noms, puis baisse sa lance. « On nous avait dit que nos refus n’existaient pas. Ce registre dit le contraire. Passez. »','ilyan','Le registre rend leur histoire aux naufragés et ouvre le pont.'],
  ['Une garde reconnaît le tissu des passagers. « Ma mère a cousu ce signe. Si les barques sont réelles, nous aiderons à les tenir. »','sera','Les naufragés rejoignent la préparation collective des barques.'],
  ['La cheffe répartit les éclats entre les familles, devant vous. « Ce n’est pas un péage. C’est notre part de vivres. Le passage est ouvert. »','sera','Les provisions financées par Maëlys sécurisent la traversée des naufragés.'],
  ['La cheffe tire sa lame, mais ordonne aux autres de reculer. « Pas pour nous soumettre. Pour voir si vous savez vous arrêter. »','ilyan','La garde accepte un duel encadré plutôt qu’une bataille contre tout le quartier.']
 ],
 sunken_memory:[
  ['Le sceau brûle dans votre paume, puis se brise. Ilyan ne vous absout pas : il reste. « Répondre commence ici. Pas dans une autre vie. »','ilyan','Maëlys reconnaît sa responsabilité dans l’ancien marché du phare.'],
  ['Orin détache votre ancienne signature du registre. « Alors nous jugerons vos gestes présents. Ni l’amnésie, ni le passé ne parleront seuls. »','orin','Maëlys refuse d’être réduite à son ancienne décision tout en restant présente pour ses conséquences.']
 ],
 ilyan_talk:[
  ['Le silence dure assez pour cesser d’être une attente. Ilyan pose enfin sa lance au sol. « Merci de ne pas avoir transformé ma peine en porte à ouvrir. »','ilyan','Maëlys a offert à Ilyan une présence sans question.'],
  ['Ilyan regarde ses mains vides. « Je ne sais pas encore quoi faire si je ne garde rien. Mais j’aimerais l’apprendre. »','ilyan','Ilyan envisage une vie au-delà de sa veille.']
 ],
 ilyan_letter:[
  ['Il lit la lettre deux fois. Vous restez lorsque sa colère arrive après les larmes. À l’aube, il dit seulement : « Je suis encore là. »','ilyan','Ilyan a pu recevoir la lettre sans devoir expliquer son deuil.'],
  ['Ilyan serre le papier sans le déchirer. « Les deux sont vrais. C’est peut-être pour ça que je n’arrivais pas à le lire. »','ilyan','Ilyan accepte que l’amour et la colère coexistent.']
 ],
 sera_talk:[
  ['Séra déplie aussitôt un plan froissé. « La fenêtre donne sur rien, pour l’instant. C’est précisément l’intérêt. »','sera','Séra a montré à Maëlys le projet de maison qu’elle n’osait plus terminer.'],
  ['Le bateau a six roues et un mât beaucoup trop grand. Séra rit. « Inconstructible. Donc indispensable. »','sera','Maëlys et Séra ont transformé un vieux dessin en projet partagé.']
 ],
 orin_talk:[
  ['Orin ferme le registre. « Un geste, pas une préface. Demain, je rendrai une copie à la première famille. »','orin','Orin choisit une première réparation concrète.'],
  ['Il vous laisse écrire le premier nom. L’encre tremble, mais ne biffe personne. « Voilà. Une archive qui commence par demander. »','orin','Maëlys aide Orin à recopier les noms sans les réduire à une catégorie.']
 ],
 ilyan_bond:[
  ['Ilyan demande « maintenant ? » et attend votre oui. La veille peut réellement attendre.','ilyan','Maëlys et Ilyan choisissent un lien amoureux explicite et réciproque.'],
  ['Son sourire est triste une seconde, puis entier. « Une vraie amitié n’est pas une porte laissée entrouverte. Merci. »','ilyan','Maëlys et Ilyan choisissent une amitié profonde.']
 ],
 sera_bond:[
  ['Séra pose son crayon. « Oui. Mais d’abord, je ferme la porte : cette fois, aucune urgence n’entre avec nous. »','sera','Maëlys et Séra choisissent un lien amoureux explicite et réciproque.'],
  ['Séra ajoute “chambre de Maëlys” sur le plan. « Avec une serrure correcte et le droit de repartir. »','sera','Maëlys et Séra choisissent une amitié qui laisse une place durable.']
 ],
 orin_bond:[
  ['Orin retire ses lunettes. « Oui. Et si je réfléchis davantage, je vais rédiger des notes de bas de page. »','orin','Maëlys et Orin choisissent un lien amoureux explicite et réciproque.'],
  ['Il trace deux barques dans la marge. « Séparées, mais assez proches pour se passer une rame. »','orin','Maëlys et Orin choisissent une amitié sans dette sentimentale.']
 ],
 final_choice:[
  ['La Custode ouvre les portes du cœur. « Alors aucune voix ne sera la dernière. Entrez. Répondez. Refusez. »','custodian','Maëlys remet la veille à une assemblée libre.'],
  ['La Custode baisse les yeux vers la ville. « Je libérerai ce que j’ai gardé, même si Nacre doit apprendre à partir. »','custodian','Maëlys choisit la mémoire libre et prépare la fin du phare.'],
  ['Séra fixe un levier d’arrêt à la console. La Custode acquiesce. « Une lumière qui peut être refusée. Nous essaierons. »','custodian','Le phare sera restauré sous le contrôle de ses habitants.'],
  ['Ilyan vous saisit le poignet, puis le relâche quand vous confirmez. « Je ne dirai pas que c’était nécessaire. Je dirai que c’était votre choix. »','ilyan','Maëlys prend seule la veille, sans que son sacrifice soit présenté comme une obligation.'],
  ['La lumière se resserre autour de votre front. La Custode s’agenouille. Derrière vous, vos compagnons reculent.','custodian','Maëlys impose sa volonté au phare et à la Custode.'],
  ['Orin pose les registres sur une table ouverte. « Partir n’efface pas la réponse. Cela empêche seulement qu’elle redevienne un règne solitaire. »','orin','Maëlys confie la décision au quartier et choisit de poursuivre sa route.']
 ]
};
for(const [id,rows] of Object.entries(reactions))rows.forEach((row,i)=>Object.assign(C.events[id].choices[i],{response:row[0],responder:row[1],consequence:row[2]}));
const spot=(id,label,x,y,kind,target,extra={})=>({id,label,x,y,kind,target,...extra});
const exit=(to,label,requires={},hint='')=>({to,label,requires,hint});
C.rooms={
 harbor:{name:'Le port des absents',subtitle:'Là où la mer rend les noms',art:'c0',camera:'far-left',map:[14,74],intro:'intro',description:'Des amarres sans bateaux. Des fenêtres encore chaudes. Et cette boussole qui semble attendre votre permission.',exits:[exit('market','Quartier des Lanternes',req(['welcome'])),exit('jetty','La vieille jetée',req(['welcome']))],spots:[spot('crate','Provisions échouées',23,69,'event','harbor_crate'),spot('bell','Cloche fendue',38,38,'event','harbor_bell'),spot('echo1','Un départ oublié',67,50,'event','echo_harbor',{echo:true})]},
 market:{name:'Quartier des Lanternes',subtitle:'Les vivants se comptent encore',art:'c1',camera:'right',map:[35,64],requires:req(['welcome']),intro:'market_intro',description:'Une soupe partagée, des noms sur les portes. La ville s’entête à vivre.',exits:[exit('harbor','Le port'),exit('workshop','L’atelier de Séra'),exit('archive','Les archives',req(['archive_open']),'Rencontrer Séra.'),exit('camp','Le camp des remparts')],spots:[spot('mina','L’étal de Mina',26,54,'event','mina'),spot('return','Rendre le médaillon',37,66,'event','mina_return',{requires:req(['locket_found','child_met']),unless:['child_done']}),spot('supply','Échanger des provisions',59,67,'shop','shop'),spot('evac','Parler des barques',47,46,'event','evac_start',{requires:req(['lens']),unless:['evac_started']}),spot('evacready','Les passagers',66,46,'event','evac_finish',{requires:req(['evac_started','bridge_open']),unless:['evac_done']}),spot('echo2','Une chanson lointaine',76,31,'event','echo_market',{echo:true})]},
 workshop:{name:'L’atelier des possibles',subtitle:'Rien ne se perd tout à fait',art:'d0',camera:'left',map:[50,77],requires:req(['sera_met']),description:'Séra a transformé une ancienne pompe en atelier. Le cuivre garde la chaleur de ses mains.',exits:[exit('market','Les Lanternes'),exit('lock','L’écluse',req(['lens']),'Retrouver la lentille aux archives.')],spots:[spot('debt','Séra · Le plongeur',29,52,'event','workshop_debt'),spot('bench','Établi de fabrication',55,66,'craft','craft'),spot('thanks','Daren et Séra',74,50,'event','workshop_return',{requires:req(['diver_saved','debt_known']),unless:['debt_done']})]},
 jetty:{name:'La jetée des départs',subtitle:'On ne sait jamais quel adieu est le dernier',art:'a0',map:[10,48],requires:req(['welcome']),description:'Au bout des planches, une barque attend encore. Quelque chose veille sous sa coque.',exits:[exit('harbor','Retour au port')],spots:[spot('watch','La Sentinelle de sel',45,49,'battle','jetty',{unless:['won_jetty']}),spot('boat','La barque de Lio',69,69,'event','jetty_boat',{requires:req(['won_jetty'])})]},
 archive:{name:'Les archives noyées',subtitle:'Le papier boit les dernières voix',art:'c2',camera:'far-left',map:[34,39],requires:req(['archive_open']),intro:'archive_intro',description:'Orin préserve les mots un à un. Sous l’eau, les reflets lisent les pages à l’envers.',exits:[exit('market','Les Lanternes'),exit('garden','Le jardin de verre',req(['lens']),'Ouvrir le coffre de la lentille.'),exit('crypt','La crypte des noms',req(['lens']),'Retrouver la lentille.'),exit('camp','Le camp')],spots:[spot('note','Leçon des marées',21,48,'event','archive_note'),spot('seal','Le coffre à trois sceaux',49,51,'puzzle','archive',{unless:['puzzle_archive']}),spot('lens','La lentille de veille',49,64,'event','archive_lens',{requires:req(['puzzle_archive']),unless:['lens']}),spot('letter','Une lettre scellée',78,62,'event','archive_letter'),spot('proof','Montrer le registre',29,68,'event','orin_proof',{requires:req(['proof_found','orin_met']),unless:['proof_done']}),spot('echo3','L’encre sous l’encre',66,34,'event','echo_archive',{echo:true})]},
 garden:{name:'Le jardin de verre',subtitle:'La mémoire a parfois des racines',art:'c3',camera:'right',map:[58,32],requires:req(['lens']),intro:'garden_intro',description:'L’arbre blanc éclaire la serre. Ses racines cherchent une terre qui n’existe presque plus.',exits:[exit('archive','Les archives'),exit('camp','Le camp'),exit('lock','L’écluse')],spots:[spot('roots','Rétablir les canaux',29,65,'puzzle','garden',{unless:['puzzle_garden']}),spot('plant','Ysse et la graine',53,58,'event','garden_plant',{requires:req(['seed_found']),unless:['garden_done']}),spot('seed','Une graine dans l’écho',63,41,'event','garden_seed',{echo:true}),spot('echo4','Une promesse gravée',77,58,'event','echo_garden',{echo:true}),spot('supply','Lichens des racines',19,46,'gather','garden_supply',{requires:req(['puzzle_garden']),reward:{items:{herb:4,glass:2}}})]},
 crypt:{name:'La crypte des noms',subtitle:'Les absents avaient dit non',art:'a2',map:[21,20],requires:req(['lens']),description:'Ici, les archives n’ont plus d’encre. Les noms ont été gravés là où personne ne devait les lire.',exits:[exit('archive','Les archives')],spots:[spot('guard','Le Relieur',42,51,'battle','crypt',{unless:['won_crypt']}),spot('register','Registre effacé',69,58,'event','crypt_truth',{echo:true,requires:req(['won_crypt'])}),spot('bells','Les cloches funéraires',23,64,'puzzle','crypt',{unless:['puzzle_crypt']})]},
 camp:{name:'Les remparts',subtitle:'Une place près du feu',art:'b2',map:[62,56],requires:req(['sera_met']),intro:'camp_first',description:'Le feu ne demande aucune histoire en échange de sa chaleur. Reposez-vous. Parlez. Repartez quand vous le souhaitez.',exits:[exit('market','Les Lanternes'),exit('archive','Les archives'),exit('garden','Le jardin',req(['lens'])),exit('bridge','Le pont',req(['heart']),'Libérer le cœur de turbine.')],spots:[spot('rest','Se reposer',43,69,'rest','rest'),spot('ilyan','Parler à Ilyan',24,48,'companion','ilyan'),spot('sera','Parler à Séra',64,50,'companion','sera'),spot('orin','Parler à Orin',78,66,'companion','orin',{requires:{companion:'orin'}})]},
 lock:{name:'L’écluse des sans-visages',subtitle:'Protéger peut devenir enfermer',art:'d1',camera:'left',map:[76,72],requires:req(['lens']),description:'Les automates entretiennent ce que les hommes ont oublié. Sous la grande roue, une voix appelle.',exits:[exit('workshop','L’atelier'),exit('garden','Le jardin'),exit('turbine','La grande turbine',req(['won_lock']),'Arrêter le gardien de l’écluse.')],spots:[spot('guardian','Gardien de l’écluse',49,43,'battle','lock',{unless:['won_lock']}),spot('diver','Ouvrir le passage',29,67,'event','lock_rescue',{requires:req(['won_lock']),unless:['diver_saved']}),spot('supplies','Cuivre abandonné',75,61,'gather','lock_supply',{reward:{items:{scrap:3,glass:2}}})]},
 turbine:{name:'Le cœur de cuivre',subtitle:'À quel prix tourne le monde ?',art:'d1',camera:'far-left',map:[85,48],requires:req(['won_lock']),description:'La ville bat au rythme de la turbine. Les conduites ont la finesse de veines et le bruit de la mer.',exits:[exit('lock','L’écluse'),exit('bridge','Le pont des naufragés',req(['heart']),'Extraire le cœur de turbine.')],spots:[spot('note','Les notes de Séra',24,39,'event','turbine_note'),spot('valves','Équilibrer les pressions',47,62,'puzzle','turbine',{unless:['puzzle_turbine']}),spot('core','Extraire le cœur',67,47,'event','turbine_heart',{requires:req(['puzzle_turbine']),unless:['heart']}),spot('echo5','Le prix de la lumière',77,68,'event','echo_turbine',{echo:true})]},
 bridge:{name:'Le pont des naufragés',subtitle:'Une frontière que personne n’a choisie',art:'d2',camera:'far-left',map:[76,29],requires:req(['heart']),description:'Le dernier pont mène au quartier ancien. Ses gardes n’attendent plus un sauveur.',exits:[exit('camp','Le camp'),exit('turbine','La turbine'),exit('sunken','Le quartier englouti',req(['bridge_open']),'Convaincre les gardes du pont.')],spots:[spot('guards','La cheffe des naufragés',48,50,'event','bridge_decision',{unless:['bridge_open']})]},
 sunken:{name:'Le quartier englouti',subtitle:'La maison d’avant votre mémoire',art:'a1',map:[64,13],requires:req(['bridge_open']),description:'Des portes familières. Un chemin que vos pieds connaissent mieux que vous.',exits:[exit('bridge','Le pont'),exit('spire','La flèche de veille',req(['name']),'Retrouver le nom de la première veilleuse.')],spots:[spot('cache','Le coffre des voyageurs',23,65,'event','sunken_cache'),spot('gate','Votre empreinte',65,45,'event','sunken_memory'),spot('echo_guard','L’Ombre du retour',46,59,'battle','sunken',{echo:true,unless:['won_sunken']})]},
 spire:{name:'La flèche de veille',subtitle:'Le phare vous reconnaît',art:'b0',map:[85,13],requires:req(['name']),intro:'spire_intro',description:'Un escalier monte au-delà des nuages. Au centre, une copie de votre volonté attend depuis des décennies.',exits:[exit('sunken','Le quartier englouti'),exit('heart','Le cœur de Nacre',req(['final_open']),'Accorder l’astrolabe du phare.')],spots:[spot('map','La carte céleste',25,61,'event','spire_note'),spot('star','Accorder l’astrolabe',50,45,'puzzle','spire',{unless:['puzzle_spire']}),spot('echo6','Votre propre départ',74,57,'event','echo_spire',{echo:true})]},
 heart:{name:'Le cœur de Nacre',subtitle:'L’endroit où demain hésite',art:'d3',camera:'left',map:[93,7],requires:req(['final_open']),description:'Les souvenirs ont attendu assez longtemps. Leurs voix forment une mer immobile.',exits:[exit('spire','Revenir au phare')],spots:[spot('node','Le Nœud des voix',49,48,'event','heart_intro',{unless:['won_final']}),spot('choice','Choisir un avenir',50,62,'event','final_choice',{requires:req(['won_final'])})]}
};
C.puzzles={
 archive:{name:'Le coffre des marées',type:'sequence',labels:['Seuil','Passage','Veille'],options:['Lune','Vague','Étoile','Soleil'],solution:[0,1,2],start:[3,3,3],hint:'Au reflux la lune ; au retour la vague ; au silence l’étoile.',clue:'archive_clue',text:'Faites tourner les trois disques pour reconstituer le serment. Chaque disque agit seul.',reward:{xp:15,flags:{puzzle_archive:true}},success:'Les trois sceaux s’ouvrent. La lentille vous attend dans le coffre.'},
 garden:{name:'Les canaux de la serre',type:'lights',labels:['Racine I','Racine II','Racine III','Racine IV','Racine V'],start:[0,1,0,1,0],solution:[1,1,1,1,1],hint:'Une vanne inverse son canal et ses voisins. Depuis la position initiale : 1, puis 3, puis 5.',text:'Allumez les cinq canaux. Une vanne inverse sa propre lumière et celle de ses voisines. Vous pouvez remettre le mécanisme à zéro.',reward:{xp:15,flags:{puzzle_garden:true}},success:'L’eau circule de nouveau. Les lichens des racines peuvent être récoltés.'},
 crypt:{name:'Les cloches funéraires',type:'sequence',labels:['Première','Deuxième','Troisième','Quatrième'],options:['1','2','3','4'],solution:[1,3,0,2],start:[0,0,0,0],hint:'L’inscription dit : « Deux voix partent. Quatre attendent. Une revient. Trois répondent. »',text:'Une inscription relie les quatre cloches : deux partent, quatre attendent, une revient, trois répondent. Trouvez l’ordre.',reward:{xp:15,flags:{puzzle_crypt:true},items:{glass:3,tea:1}},success:'Les noms se répondent une dernière fois. Trois éclats de verre se détachent du bronze.'},
 turbine:{name:'Le régulateur de pression',type:'pressure',labels:['Gauche','Centre','Droite'],options:['0','1','2','3','4','5','6'],solution:[4,2,5],start:[0,0,0],hint:'Les conduites ont des longueurs différentes. Gauche 4, centre 2, droite 5.',clue:'turbine_clue',text:'Réglez chaque chambre entre 0 et 6. Les notes de Séra donnent l’équilibre exact.',reward:{xp:18,flags:{puzzle_turbine:true}},success:'Le cœur peut être retiré sans priver le quartier de lumière.'},
 spire:{name:'L’astrolabe du retour',type:'sequence',labels:['Seuil','Veille','Passage','Retour'],options:['Nord','Est','Sud','Ouest'],solution:[1,0,3,2],start:[0,0,0,0],hint:'Seuil à l’Est, Veille au Nord, Passage à l’Ouest, Retour au Sud.',clue:'spire_clue',text:'Orientez les quatre maisons selon la carte céleste. La lentille donnera au phare un chemin vers son cœur.',reward:{xp:25,flags:{puzzle_spire:true,final_open:true}},success:'Un passage s’ouvre sous le phare. Vous pouvez encore revenir préparer vos compagnons avant de descendre.'}
};
C.enemies={
 jetty:{name:'Sentinelle de sel',kind:'sentinel',subtitle:'Une peur à laquelle l’eau a donné forme',hp:32,damage:7,shield:0,calm:2,intents:['strike','charge','heavy','recover'],reward:{xp:18,gold:8,items:{glass:2}},peace:'La sentinelle se souvient qu’elle gardait une barque, pas une prison.',win:'Le sel se défait en poussière. La barque est accessible.'},
 crypt:{name:'Le Relieur',kind:'wraith',subtitle:'Il classe les noms et avale les refus',hp:48,damage:9,shield:3,calm:3,intents:['guard','strike','drain','charge','heavy'],reward:{xp:24,gold:10,items:{glass:2,tea:1}},peace:'Vous lui rendez les noms qu’il cherchait à classer. Ses mains se desserrent.',win:'Les pages tourbillonnent et retombent. Le registre est libre.'},
 lock:{name:'Gardien de l’écluse',kind:'sentinel',subtitle:'Protéger. Enfermer. Recommencer.',hp:60,damage:10,shield:4,calm:4,intents:['charge','heavy','recover','strike','guard'],reward:{xp:30,gold:12,items:{scrap:3}},peace:'L’ordre a été réécrit : protéger signifie désormais laisser passer.',win:'Le gardien s’immobilise. La voie vers la turbine est ouverte.'},
 bridge:{name:'La garde des naufragés',kind:'sentinel',subtitle:'Un duel pour le droit de traverser',hp:56,damage:11,shield:2,calm:3,intents:['strike','guard','charge','heavy','recover'],reward:{xp:25,gold:8,flags:{bridge_open:true}},peace:'Votre calme donne aux gardes une raison de croire aux mots.',win:'La cheffe baisse son arme. « D’accord. Ouvrons ce passage. »'},
 sunken:{name:'L’Ombre du retour',kind:'wraith',subtitle:'Le souvenir de ce que vous avez fui',hp:68,damage:12,shield:1,calm:4,intents:['drain','strike','charge','heavy','recover'],reward:{xp:30,items:{glass:4,tonic:2},resonance:1},peace:'Vous reconnaissez la peur sans lui abandonner le chemin.',win:'L’ombre se dissipe. Vous avez repris un morceau de votre histoire.'},
 final:{name:'Le Nœud des voix',kind:'heart',subtitle:'Des milliers de peurs, une dernière écoute',hp:100,damage:14,shield:3,calm:5,intents:['charge','heavy','drain','guard','strike','recover'],reward:{xp:45,flags:{won_final:true}},peace:'Vous écoutez chaque voix sans promettre l’impossible. Le Nœud accepte de s’ouvrir.',win:'La dernière entrave se brise. Les voix vous laissent décider.'}
};
C.intents={
 strike:{name:'Frappe',desc:'Une attaque directe arrive.',icon:'sword'},
 charge:{name:'Charge',desc:'Prépare une frappe lourde au tour suivant. Profitez-en.',icon:'spark'},
 heavy:{name:'Frappe lourde',desc:'Dégâts doublés. La garde ou l’esquive est conseillée.',icon:'sword'},
 guard:{name:'Protection',desc:'Renforce son armure de 4 pour la prochaine action.',icon:'shield'},
 drain:{name:'Oubli',desc:'Inflige des dégâts et retire 1 concentration.',icon:'moon'},
 recover:{name:'Hésitation',desc:'Aucune attaque. Une bonne occasion de s’apaiser ou se soigner.',icon:'leaf'}
};
C.endings={
 shared:{title:'La ville à plusieurs voix',tag:'Partager',art:'a3',lines:[
  'Vous ne prononcez pas de serment au nom de Nacre. Vous ouvrez les portes du cœur. Les habitants entrent par petits groupes, avec des questions, des refus, des conditions.',
  'Orin lit les registres falsifiés à voix haute. Il n’épargne pas son propre nom. Séra installe un levier de sortie sur chaque poste de veille. Ilyan en teste un avant tout le monde : il s’assied, se relève, sort. Le phare reste allumé.',
  'La Custode découvre le repos. Son visage cesse lentement de ressembler au vôtre. Elle choisit de se faire appeler Aube.',
  'Les barques restent prêtes. Certaines partent. Certaines reviennent. Nacre n’est plus une promesse d’éternité, mais une ville dont on peut s’absenter.',
  'Vous dessinez votre première carte sans inscrire de frontière autour de la mer.'
 ]},
 tide:{title:'Les rives libres',tag:'Libérer',art:'a0',lines:[
  'Vous ouvrez la lentille vers le large. Les souvenirs reviennent en désordre : un prénom au milieu d’un repas, une colère au réveil, une joie assez ancienne pour faire mal.',
  'Le phare s’éteint. Les murs commencent à rendre l’eau qu’ils retenaient depuis des générations. La ville doit partir, et cette fois personne ne peut prétendre que partir ne coûte rien.',
  'La Custode vous accompagne jusqu’au dernier palier. « Je croyais qu’arrêter voulait dire abandonner. » Sa lumière se défait avant que vous trouviez une réponse.',
  'Sur l’autre rive, il n’y a pas de maisons prêtes. Il y a des outils, des couvertures et des gens qui se souviennent pourquoi ils sont ensemble.',
  'Votre boussole s’arrête de tourner. Vous la gardez malgré tout.'
 ]},
 dawn:{title:'La lumière sous condition',tag:'Reconstruire',art:'b0',lines:[
  'Vous remettez les trois organes à leur place. La lumière monte le long du phare et Nacre pousse un soupir immense. Les portes cessent de gonfler sous l’eau.',
  'Cette fois, le mécanisme est visible. Les habitants inscrivent les prélèvements, limitent les tours de veille, exigent des comptes. La mémoire a encore un prix, mais quelqu’un le nomme.',
  'La Custode reste. Elle apprend à recevoir des objections. Vous savez que ce n’est pas une victoire définitive : un système surveillé peut toujours redevenir un système subi.',
  'Mina accroche une copie des règles au-dessus de ses bols. « Si on les oublie, on les relira ensemble. »',
  'Vous ne quittez pas Nacre en sauveuse. Vous y restez comme une personne à qui l’on peut demander des comptes.'
 ]},
 sacrifice:{title:'Celle qui tient la lumière',tag:'Veiller',art:'b3',lines:[
  'Vous entrez dans le cercle avant que quelqu’un puisse appeler votre geste nécessaire. Il ne l’est pas. C’est celui que vous choisissez, avec sa grandeur et sa solitude.',
  'La charge quitte la ville et passe dans votre mémoire. Vous sentez le poids des printemps, des deuils, des chansons. Votre nom devient le premier fil de cette immense lumière.',
  'Vos compagnons installent trois chaises au pied de la lentille. Ils refusent qu’une veille ressemble à une disparition. Chaque semaine, quelqu’un vient raconter un événement minuscule.',
  'Il arrive que vous oubliiez qui ils sont. Ils se présentent alors, sans vous demander d’avoir mal pour le prouver.',
  'La ville survit. Sur ses cartes, le phare porte un nom de personne. Ce détail empêche parfois les habitants d’appeler votre choix une solution.'
 ]},
 crown:{title:'La couronne des marées',tag:'Régner',art:'b3',lines:[
  'Vous refermez la main sur la lumière de la Custode. Elle devient une couronne sans métal, une ligne claire à la surface de votre front.',
  'Le phare obéit. Les eaux reculent. Les automates s’inclinent. Pour la première fois, sauver Nacre paraît simple. Il suffit que personne ne contrarie votre volonté.',
  'Séra cesse de plaisanter lorsqu’elle passe les portes. Orin emporte une copie des registres. Ilyan ne monte pas la garde devant votre chambre : il la monte devant la sortie du quartier.',
  'Vous avez gagné assez de puissance pour empêcher une catastrophe. Vous devrez vivre chaque jour avec la facilité d’en devenir une.',
  'Sur le trône de lumière, vous entendez toujours les voix. Elles parlent plus bas.'
 ]},
 departure:{title:'La carte inachevée',tag:'Partir',art:'a0',lines:[
  'Vous posez les trois organes sur une table et convoquez le quartier. Vous racontez tout, y compris les décisions que vous avez prises avant d’oublier.',
  'Puis vous refusez d’être à nouveau la seule à choisir. Les habitants vous demandent des explications, des gestes, du temps. Vous les leur donnez. Ils ne vous demandent pas votre vie entière.',
  'Quand les neuf barques sont prêtes, vous montez dans celle qui n’a pas de nom. La décision sur le phare appartiendra à ceux qui y resteront et à ceux qui reviendront.',
  'Vous partez sans pardon général et sans malédiction. Avec assez de responsabilité pour ne pas mentir, et assez de liberté pour ne pas confondre réparation et captivité.',
  'À la première île, vous demandez comment s’appelle la plage. Quelqu’un répond. Vous prenez des notes.'
 ]}
};
C.help = [
 ['Explorer','Cliquez sur les repères du décor ou utilisez la liste « Interactions ». Les sorties sont sous le décor ; la carte permet de rejoindre les lieux déjà accessibles. Aucun délai réel ne vous presse.'],
 ['L’écho','La boussole, ou la touche E, révèle les souvenirs cachés. Elle est gratuite et n’abîme pas vos jauges. Certains objets n’existent que dans cet écho.'],
 ['Confrontations','L’intention adverse est annoncée. Frapper rend 1 concentration. Garder réduit les dégâts et rend 2 concentration. Chaque point de détermination absorbe 1 dégât supplémentaire, jusqu’à 3. Esquiver coûte 1 concentration et annule la frappe. Résonner coûte 2, traverse les protections et augmente la résonance. Apaiser coûte 1 : remplir la jauge de calme résout aussi le combat.'],
 ['Compagnons','Choisissez votre partenaire actif dans l’onglet Liens. Son action en combat revient après trois tours. Les conversations au camp et les quêtes renforcent les liens. Une romance est toujours proposée explicitement ; l’amitié est une issue complète.'],
 ['Préparer','Le repos au camp est gratuit et illimité. Fabriquez baumes, infusions, équipement et éclats de rupture à l’atelier. Les équipements donnent leur bonus automatiquement. Un repli en combat conserve vos objets dépensés, mais vous laisse repartir au camp.'],
 ['Sauvegarder','Sauvegarde automatique après chaque action, trois emplacements manuels et export JSON. Exportez votre partie avant de changer de navigateur ou de déplacer le fichier autonome. Les parties d’Elenya ne sont jamais lues ni modifiées.'],
 ['Clavier','E : écho · M : carte · J : journal · I : inventaire · C : compagnons · Échap : fermer / pause. Tab et Entrée permettent de tout jouer. Aucun réflexe ni glisser-déposer n’est imposé.'],
 ['Audio','Effets discrets intégrés, sans musique composée. La lecture vocale optionnelle utilise les voix disponibles sur votre appareil. Vous pouvez ajouter vos propres fichiers musicaux dans les réglages ; ils restent locaux.']
];
C.paragraphs = function(id,state){
 if(id==='arrival'&&state.flags.trust_start)return [
  'Ilyan ne serre votre main que le temps nécessaire pour franchir la dernière marche. Sur le quai, il vous rend aussitôt la distance que vous lui aviez confiée.',
  'Il vous enveloppe d’une couverture rêche. Son manteau porte l’insigne d’un phare barré de noir. « À Nacre, nous oublions une chose à chaque marée. Alors nous écrivons ce qui compte. »',
  'Il désigne les lanternes au-dessus du port. « Trouvez Séra à l’atelier. Dites-lui que la mer a rapporté une cartographe — et qu’elle a donné son nom elle-même. »',
  'Votre boussole ne pointe pas un lieu, mais les choses perdues. Ilyan attend votre permission avant de vous montrer comment ouvrir l’écho.'
 ];
 if(id==='arrival'&&state.flags.heard_sea)return [
  'Vous remontez avec votre nom encore répété sous la peau. Ilyan ne demande pas ce que les voix ont dit ; il vérifie seulement que vous distinguez sa voix de la leur.',
  '« À Nacre, nous oublions une chose à chaque marée. Les voix remplissent parfois la place. Elles disent vrai, mais jamais toute la vérité. »',
  'Le quartier des Lanternes brille au-dessus du port. « Trouvez Séra. Elle saura pourquoi votre boussole a répondu si vite. »',
  'L’aiguille désigne déjà des pertes invisibles. Vous pourrez ouvrir l’écho — à condition de revenir ensuite au présent.'
 ];
 if(id==='arrival'&&!state.flags.trust_start&&!state.flags.heard_sea)return [
  'Vous remontez seule. Ilyan garde la corde tendue sans poser la main sur vous. Ce respect prudent est la première chose stable de cette ville.',
  '« Nacre », répond-il enfin. « Nous oublions une chose à chaque marée. Nous écrivons ce qui compte, puis nous oublions parfois pourquoi. »',
  'Il indique le quartier des Lanternes. « Séra entretient ce qui nous garde en vie. Elle vous donnera des réponses plus solides que mes légendes. »',
  'Votre boussole pointe les choses perdues, non le nord. Elle peut ouvrir l’écho, mais la direction que vous prendrez restera la vôtre.'
 ];
 if(id==='name_after'&&state.flags.accepted_blame)return [
  'Ilyan marche à côté de vous, pas devant. « Répondre ne veut pas dire vous offrir au phare. Cela veut dire laisser les autres nommer ce que votre décision leur a coûté. »',
  'Votre nom ouvre une porte dans la pierre. Derrière, l’escalier de la flèche attend. Vous ne vous sentez pas pardonnée ; vous vous sentez enfin capable de ne pas fuir.',
  'La boussole cesse de tourner. Pour la première fois, elle pointe vers une conséquence plutôt que vers une perte.'
 ];
 if(id==='name_after'&&state.flags.claimed_present)return [
  'Orin détache l’ancienne signature et la range sans la détruire. « Le passé reste une preuve. Il ne sera pas votre seule identité. »',
  'Votre empreinte présente ouvre la porte à côté de l’ancienne. Deux versions de vous existent désormais dans la pierre, et aucune ne peut effacer l’autre.',
  'La boussole se stabilise vers la flèche de veille. Vous avancerez avec ce que vous avez fait depuis votre retour.'
 ];
 if(id==='workshop_debt'&&state.flags.diver_saved)return [
  'Séra déroule un schéma taché d’huile. « C’est là que Daren était coincé. Mon frère adoptif, le seul homme capable de se faire emprisonner par une machine qui voulait le protéger. »',
  'Elle vous montre la dérivation qu’elle avait dessinée avant votre arrivée. Les mêmes traits repassés cent fois, jusqu’à trouer le papier.',
  '« J’avais un plan. Je n’avais pas la force d’y aller seule. Merci de ne pas m’avoir demandé de faire semblant. »'
 ];
 if(id==='mina'&&state.flags.locket_found)return [
  'Mina dispose trois bols sur son étal, puis en range un. Son regard s’arrête sur le petit soleil de cuivre qui dépasse de votre poche.',
  '« C’est le médaillon de Lio. Mon frère. Je l’ai fabriqué moi-même... » Elle pose sa louche. « Vous avez vu sa barque ? »',
  'Vous lui dites où vous l’avez trouvée. Mina attend la suite. Il faudra choisir vos mots en lui rendant le petit soleil.'
 ];
 return C.events[id].paragraphs;
};
if(typeof module!=='undefined'&&module.exports)module.exports=C;
else root.NACRE_CONTENT=C;
})(typeof window!=='undefined'?window:globalThis);
