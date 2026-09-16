(function(root){
'use strict';
class AudioSystem{
 constructor(){this.ctx=null;this.sfx=true;this.volume=.28;this.voice=false;this.voiceURI='';this.rate=.95;this.duck=false;this.generation=0;this.player=new Audio();this.player.preload='metadata';this.tracks=[];this.trackIndex=0;this.musicVolume=.25;this.player.addEventListener('ended',()=>{if(this.tracks.length){this.trackIndex=(this.trackIndex+1)%this.tracks.length;this.playTrack();}});}
 init(){try{if(!this.ctx){const AC=root.AudioContext||root.webkitAudioContext;if(AC)this.ctx=new AC();}if(this.ctx&&this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});}catch(_){}}
 effect(type='click'){
  if(!this.sfx||!this.volume)return;this.init();if(!this.ctx)return;
  const t=this.ctx.currentTime,o=this.ctx.createOscillator(),g=this.ctx.createGain(),freq={click:440,echo:180,success:690,hit:90,step:310}[type]||440;
  o.type=type==='hit'?'triangle':'sine';o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(type==='success'?920:type==='echo'?410:freq*.7,t+.16);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(this.volume*(this.duck?.25:1)*.13,t+.015);g.gain.exponentialRampToValueAtTime(.0001,t+.25);o.connect(g);g.connect(this.ctx.destination);o.start(t);o.stop(t+.27);o.onended=()=>{o.disconnect();g.disconnect();};
 }
 voices(){return 'speechSynthesis'in root?speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith('fr')):[];}
 speak(text){this.stopVoice();if(!this.voice||!('speechSynthesis'in root))return;const seq=this.generation;const parts=(text.match(/[^.!?]+[.!?…]?/g)||[text]).filter(x=>x.trim());const next=()=>{if(seq!==this.generation||!this.voice)return;const part=parts.shift();if(!part){this.setDuck(false);return;}const u=new SpeechSynthesisUtterance(part.trim());u.lang='fr-FR';u.rate=this.rate;u.volume=1;const voices=this.voices();u.voice=voices.find(v=>v.voiceURI===this.voiceURI)||voices.find(v=>v.localService)||voices[0]||null;u.onend=next;u.onerror=()=>{if(seq===this.generation)this.setDuck(false);};this.setDuck(true);speechSynthesis.speak(u);};next();}
 stopVoice(){this.generation++;if('speechSynthesis'in root)speechSynthesis.cancel();this.setDuck(false);}
 setDuck(v){this.duck=v;this.player.volume=Math.max(0,Math.min(1,this.musicVolume*(v?.25:1)));}
 loadTracks(files){this.clearTracks();this.tracks=[...files].filter(f=>f.type.startsWith('audio/')||/\.(mp3|wav|ogg|m4a|flac)$/i.test(f.name)).map(f=>({name:f.name,url:URL.createObjectURL(f)}));if(this.tracks.length)this.playTrack();return this.tracks.length;}
 playTrack(){const x=this.tracks[this.trackIndex];if(!x)return;this.player.src=x.url;this.setDuck(this.duck);this.player.play().catch(()=>{});}
 clearTracks(){this.player.pause();this.player.removeAttribute('src');for(const t of this.tracks)URL.revokeObjectURL(t.url);this.tracks=[];this.trackIndex=0;}
 pause(){this.player.pause();this.stopVoice();}
}
root.NacreAudio=AudioSystem;
})(window);
