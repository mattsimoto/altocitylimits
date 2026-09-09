(()=>{
  const SELF=document.currentScript&&document.currentScript.src?document.currentScript.src:location.href;
  const ATLAS=new URL('assets/medieval/original-art-atlas.webp?v=6',SELF).href;
  const ATLAS_W=1600, ATLAS_H=1280;

  const S={
    dragon:[6,16,308,288],snail:[327,41,307,237],maniculeBlue:[649,100,303,123],maniculeRed:[969,93,303,134],maniculeFloral:[1289,90,304,137],vine1:[8,437,304,87],vine2:[329,428,303,103],initialA:[695,333,216,297],initialM:[1015,326,217,301],initialC:[1320,333,232,301],compass:[24,654,279,296],elements:[341,654,277,300],cosmos:[651,646,298,301],devil:[966,678,299,237],lion:[1293,689,301,221],bird:[13,1010,301,226],rabbit:[326,986,301,271],borderDragon:[648,1091,304,57],borderBird:[968,1087,304,65],cornerRabbit:[1301,966,269,303]
  };

  const atlasImage=new Image();
  atlasImage.decoding='async';
  atlasImage.src=ATLAS;
  const pending=[];

  function draw(canvas,name){
    const b=S[name];
    if(!b||!canvas)return;
    const [x,y,w,h]=b;
    canvas.width=w;
    canvas.height=h;
    canvas.style.aspectRatio=`${w}/${h}`;
    const paint=()=>{
      const ctx=canvas.getContext('2d');
      if(!ctx)return;
      ctx.clearRect(0,0,w,h);
      ctx.imageSmoothingEnabled=true;
      ctx.imageSmoothingQuality='high';
      ctx.drawImage(atlasImage,x,y,w,h,0,0,w,h);
      canvas.dataset.rendered='1';
    };
    if(atlasImage.complete&&atlasImage.naturalWidth)paint();
    else pending.push(paint);
  }

  atlasImage.addEventListener('load',()=>{pending.splice(0).forEach(fn=>fn());document.documentElement.dataset.medievalAtlas='loaded';},{once:true});
  atlasImage.addEventListener('error',()=>{document.documentElement.dataset.medievalAtlas='error';console.error('Dark Ages atlas failed to load:',ATLAS);},{once:true});

  function sprite(name,cls='',alt=''){
    const b=S[name];if(!b)return null;
    const c=document.createElement('canvas');
    c.className=('native-sprite '+cls).trim();
    c.dataset.sprite=name;
    if(alt){c.setAttribute('role','img');c.setAttribute('aria-label',alt)}else c.setAttribute('aria-hidden','true');
    draw(c,name);
    return c;
  }

  function replace(el,name,alt=''){
    if(!el)return null;
    const classes=[...(el.classList||[])].join(' ');
    const s=sprite(name,classes,alt);
    if(!s)return null;
    el.replaceWith(s);
    return s;
  }
  const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];

  function run(){
    if(document.documentElement.dataset.medievalArtLoaded==='1')return;
    document.documentElement.dataset.medievalArtLoaded='1';
    document.documentElement.classList.add('native-medieval-assets');

    const hero=q('.hero-art');
    if(hero){replace(hero.querySelector('img'),'cosmos','Original illuminated cosmology diagram created for Alto City Limits');const d=sprite('dragon','native-hero-dragon','Original illuminated red and blue dragon created for Alto City Limits');if(d)hero.appendChild(d)}

    const folios=['initialA','initialC','compass','initialM','elements','initialC','cosmos','initialA'];qa('.folio-illumination').forEach((el,i)=>replace(el,folios[i%folios.length],'Original illuminated folio ornament'));
    const caps=['compass','maniculeBlue','vine1','dragon','elements','cosmos'];qa('.cap-illumination').forEach((el,i)=>replace(el,caps[i%caps.length],'Original medieval capability illustration'));
    const analysis=qa('.illustration img');if(analysis[0])replace(analysis[0],'elements','Original illuminated systems diagram');if(analysis[1])replace(analysis[1],'lion','Original illuminated bestiary figure');
    qa('.manuscript-portrait img').forEach(el=>replace(el,'initialM','Original illuminated M for Matthew Russell'));
    const works=['compass','dragon','devil','snail','cosmos','borderBird'];qa('.work-illumination').forEach((el,i)=>replace(el,works[i%works.length],'Original medieval case-study ornament'));
    const surprises=['snail','maniculeRed','devil'];qa('.surprise-miniature').forEach((el,i)=>replace(el,surprises[i%surprises.length],'Original medieval marginal miniature'));
    const projects=['bird','compass','initialC','rabbit'];qa('.project-mark').forEach((el,i)=>replace(el,projects[i%projects.length],'Original medieval project mark'));
    const notes=['maniculeFloral','elements','bird'];qa('.note-thumb').forEach((el,i)=>replace(el,notes[i%notes.length],'Original medieval Field Notes illustration'));

    const fallback=['dragon','snail','compass','bird','vine2','cornerRabbit'];let f=0;qa('img').forEach(el=>{const src=el.getAttribute('src')||'';if(src.includes('wikimedia')||src.includes('wikipedia')||src.includes('alamy'))replace(el,fallback[(f++)%fallback.length],'Original Alto City Limits medieval illustration')});

    const shell=q('.shell')||document.body;[['left','dragon','dragon'],['right','snail','snail'],['left','manicule','maniculeRed'],['right','grotesque','devil']].forEach(([side,type,name])=>{const s=sprite(name,`native-marginalia ${side} ${type}`,'');if(s)shell.appendChild(s)});
    const sections=qa('.section');[0,2,4,6].forEach((idx,n)=>{if(sections[idx]){const s=sprite(n%2?'vine2':'vine1','native-vine-divider','');if(s)sections[idx].appendChild(s)}});
    const bio=q('.bio p');if(bio){const s=sprite('initialM','native-initial','Illuminated M');if(s){bio.prepend(s);bio.classList.add('has-native-initial')}}
    qa('.work-card:nth-child(odd),.note-card:first-child').forEach((el,i)=>{const s=sprite(i%2?'borderBird':'borderDragon','native-border-fragment','');if(s)el.appendChild(s)});
    const nav=q('.utility .wrap');if(nav&&!q('.native-asset-link')){const a=document.createElement('a');a.className='native-asset-link';a.href='assets/medieval/';a.textContent='Asset Library';nav.appendChild(a)}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  window.ALCMedieval={sprite,atlas:ATLAS,sprites:S,run};
})();
