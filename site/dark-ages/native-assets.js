(()=>{
  const SELF=document.currentScript&&document.currentScript.src?document.currentScript.src:location.href;
  const BASE=new URL('assets/medieval/',SELF).href;
  const files={
    dragon:'dragon.webp',
    snail:'snail.webp',
    compass:'diagram-compass.webp',
    initialM:'initial-m.webp',
    grotesque:'grotesque-blue-devil.webp',
    border:'border-dragon-horizontal.webp'
  };
  const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
  const src=name=>BASE+files[name];
  function art(name,cls='',alt=''){
    if(!files[name])return null;
    const im=document.createElement('img');
    im.src=src(name);
    im.className=('native-art '+cls).trim();
    im.alt=alt;
    im.decoding='async';
    im.loading='eager';
    im.dataset.asset=name;
    return im;
  }
  function replace(el,name,alt=''){
    if(!el||!files[name])return null;
    const cls=[...(el.classList||[])].join(' ');
    const im=art(name,cls,alt);
    if(!im)return null;
    el.replaceWith(im);
    return im;
  }
  function addStrip(section,i){
    if(!section||section.querySelector('.tapestry-strip'))return;
    const row=document.createElement('div');
    row.className='tapestry-strip';
    row.setAttribute('aria-hidden','true');
    section.appendChild(row);
  }
  function run(){
    if(document.documentElement.dataset.directMedievalArt==='tapestry-elements-1')return;
    document.documentElement.dataset.directMedievalArt='tapestry-elements-1';
    document.documentElement.classList.add('direct-medieval-assets','tapestry-fragment-pass');

    const hero=q('.hero-art');
    if(hero){
      replace(hero.querySelector('img'),'compass','Illuminated compass diagram created for Alto City Limits');
      if(!hero.querySelector('.native-hero-dragon'))hero.appendChild(art('dragon','native-hero-dragon','Illuminated dragon created for Alto City Limits'));
    }

    const folio=['initialM','compass','border','snail'];
    qa('.folio-illumination').forEach((el,i)=>replace(el,folio[i%folio.length],'Medieval folio ornament'));

    const caps=['compass','initialM','dragon','border','snail','compass'];
    qa('.cap-illumination').forEach((el,i)=>replace(el,caps[i%caps.length],'Medieval capability illustration'));

    const analysis=qa('.illustration img');
    if(analysis[0])replace(analysis[0],'compass','Illuminated strategic diagram');
    if(analysis[1])replace(analysis[1],'grotesque','Illuminated bestiary grotesque');

    qa('.manuscript-portrait img').forEach(el=>replace(el,'initialM','Illuminated M for Matthew Russell'));

    const works=['compass','dragon','grotesque','snail','initialM','border'];
    qa('.work-illumination').forEach((el,i)=>replace(el,works[i%works.length],'Medieval case-study ornament'));

    const surprises=['snail','initialM','grotesque'];
    qa('.surprise-miniature').forEach((el,i)=>replace(el,surprises[i%surprises.length],'Medieval marginal miniature'));

    const projects=['dragon','compass','initialM','snail'];
    qa('.project-mark').forEach((el,i)=>replace(el,projects[i%projects.length],'Medieval project mark'));

    const notes=['initialM','border','grotesque'];
    qa('.note-thumb').forEach((el,i)=>replace(el,notes[i%notes.length],'Medieval Field Notes illustration'));

    const fallback=['dragon','snail','compass','grotesque']; let f=0;
    qa('img').forEach(el=>{const s=el.getAttribute('src')||'';if(/wikimedia|wikipedia|alamy/i.test(s))replace(el,fallback[f++%fallback.length],'Alto City Limits medieval illustration')});

    const shell=q('.shell')||document.body;
    if(!shell.querySelector('.native-marginalia')){
      [['left','dragon'],['right','snail'],['right','grotesque']].forEach(([side,name],i)=>{
        const im=art(name,`native-marginalia ${side} m${i}`,'');
        if(im){im.setAttribute('aria-hidden','true');shell.appendChild(im)}
      });
    }

    qa('.section').forEach((section,i)=>{ if(i>0&&i%2===0)addStrip(section,i); });

    const bio=q('.bio p');
    if(bio&&!bio.querySelector('.native-initial')){const im=art('initialM','native-initial','');if(im){im.setAttribute('aria-hidden','true');bio.prepend(im)}}

    qa('.work-card:nth-child(odd),.note-card:first-child').forEach(el=>{
      if(!el.querySelector('.native-border-fragment')){
        const im=art('border','native-border-fragment','');
        if(im){im.setAttribute('aria-hidden','true');el.appendChild(im)}
      }
    });
  }
  run();
  window.ALCMedieval={art,run,base:BASE,files};
})();
