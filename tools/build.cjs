'use strict';
const fs=require('node:fs'),path=require('node:path');const root=path.resolve(__dirname,'..');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8'),css=fs.readFileSync(path.join(root,'src/style.css'),'utf8');
css=css.replace(/url\('\.\.\/assets\/([^']+)'\)/g,(_,name)=>"url('data:image/png;base64,"+fs.readFileSync(path.join(root,'assets',name)).toString('base64')+"')");
html=html.replace('<link rel="stylesheet" href="src/style.css">',()=>'<style>'+css+'</style>');
for(const file of ['content.js','engine.js','audio.js','app.js']){const code=fs.readFileSync(path.join(root,'src',file),'utf8').replace(/<\/script/gi,'<\\/script');html=html.replace('<script src="src/'+file+'"></script>',()=>'<script>\n'+code+'\n</script>');}
fs.writeFileSync(path.join(root,'JOUER-NACRE.html'),html);
console.log('JOUER-NACRE.html : '+(Buffer.byteLength(html)/1048576).toFixed(2)+' Mio · autonome, aucune dépendance réseau.');
