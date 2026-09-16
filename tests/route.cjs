'use strict';
const {Game,C}=require('../src/engine');
function finishDialogue(g,index=0){let safety=0;while(g.s.dialogue){if(++safety>100)throw Error('Dialogue cycle');const d=g.s.dialogue;if(d.reaction){g.advance();continue;}const pages=C.paragraphs(d.id,g.s);while(g.s.dialogue&&!g.s.dialogue.reaction&&g.s.dialogue.page<pages.length-1)g.advance();if(g.s.dialogue&&!g.s.dialogue.reaction)g.choose(index);index=0;}}
function event(g,spot,index=0){g.interact(spot);finishDialogue(g,index);}
function travel(g,id){g.move(id);finishDialogue(g);}
function echo(g,spot){if(!g.s.echo)g.toggleEcho();event(g,spot);if(g.s.echo)g.toggleEcho();}
function puzzle(g,spot){g.interact(spot);const p=C.puzzles[g.s.puzzle.id];if(p.type==='lights'){for(const i of [0,2,4])g.puzzleStep(i);}else p.solution.forEach((n,i)=>{let cap=0;while(g.s.puzzle.values[i]!==n){g.puzzleStep(i);if(++cap>10)throw Error('Unsolvable puzzle');}});if(!g.checkPuzzle())throw Error('Puzzle failed');}
function fight(g,peace=true){let n=0;while(g.s.battle&&!g.s.battle.result){if(++n>120)throw Error('Battle stalled '+g.s.battle.id);const s=g.s,b=s.battle,intent=g.intent();if(s.hp<22&&s.inventory.tonic)g.combat('item','tonic');else if(s.active==='orin'&&b.cooldown===0&&s.hp<g.maxHP-14)g.combat('companion');else if(intent==='heavy')g.combat(s.focus?'dodge':'guard');else if(peace)g.combat(s.focus?'calm':'guard');else if(s.focus>=2)g.combat('resonate');else g.combat('strike');}if(g.s.battle?.result!=='win')throw Error('Defeated '+g.s.battle?.id);g.endBattle();}
function route(difficulty='normal',all=true,peace=true){
 const g=new Game();g.newGame(difficulty);finishDialogue(g);event(g,'crate');event(g,'bell');echo(g,'echo1');
 travel(g,'market');event(g,'mina');
 travel(g,'workshop');event(g,'debt');
 travel(g,'archive');g.setCompanion('orin');event(g,'note');puzzle(g,'seal');event(g,'lens');event(g,'letter');echo(g,'echo3');
 travel(g,'camp');g.rest();g.talk('ilyan','ilyan_talk');finishDialogue(g);g.talk('ilyan','ilyan_letter');finishDialogue(g);g.talk('sera','sera_talk');finishDialogue(g);g.talk('orin','orin_talk');finishDialogue(g);
 travel(g,'jetty');g.interact('watch');fight(g,peace);event(g,'boat');
 travel(g,'market');event(g,'return');event(g,'evac');echo(g,'echo2');
 travel(g,'garden');puzzle(g,'roots');g.interact('supply');echo(g,'seed');event(g,'plant');echo(g,'echo4');
 travel(g,'camp');g.rest();travel(g,'crypt');puzzle(g,'bells');g.interact('guard');fight(g,peace);echo(g,'register');
 travel(g,'archive');event(g,'proof');
 travel(g,'camp');g.rest();travel(g,'workshop');g.craft('blade');
 travel(g,'lock');g.interact('supplies');g.interact('guardian');fight(g,peace);event(g,'diver');
 travel(g,'workshop');event(g,'thanks');
 travel(g,'turbine');event(g,'note');puzzle(g,'valves');event(g,'core');echo(g,'echo5');
 travel(g,'camp');g.rest();travel(g,'bridge');event(g,'guards');
 travel(g,'market');event(g,'evacready');
 travel(g,'camp');g.rest();g.talk('sera','sera_bond');finishDialogue(g);g.talk('ilyan','ilyan_bond');finishDialogue(g,1);g.talk('orin','orin_bond');finishDialogue(g,1);
 travel(g,'sunken');event(g,'cache');event(g,'gate');
 if(all){g.toggleEcho();g.interact('echo_guard');fight(g,peace);g.toggleEcho();}
 travel(g,'camp');g.rest();travel(g,'spire');event(g,'map');puzzle(g,'star');echo(g,'echo6');
 travel(g,'heart');event(g,'node');fight(g,peace);
 return g;
}
module.exports={route,finishDialogue,event,travel,echo,puzzle,fight};
