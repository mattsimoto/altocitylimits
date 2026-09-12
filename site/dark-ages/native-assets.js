(()=>{
  const SELF=document.currentScript&&document.currentScript.src?document.currentScript.src:location.href;
  const BASE=new URL('assets/medieval/',SELF).href;
  const files={
    dragon:'dragon.webp',
    snail:'snail.webp',
    compass:'diagram-compass.webp',
    initialM:'initial-m.webp',
    grotesque:'grotesque-blue-devil.webp',
    border:'border-dragon-horizontal.webp',
    manicule:'manicule-bayeux.svg',
    vine:'bayeux-border-beasts.svg',
    horseman:'bayeux-horseman.svg',
    ship:'bayeux-ship.svg',
    banner:'bayeux-banner.svg',
    tree:'bayeux-tree.svg',
    shields:'bayeux-shields.svg',
    castle:'bayeux-castle.svg',
    hound:'bayeux-hound.svg',
    comet:'bayeux-comet.svg'
  };
  const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
  const src=name=>BASE+files[name];
  function art(name,cls='',alt=''){
    const im=document.createElement('img');
    im.src=src(name); im.className=('native-art '+cls).trim(); im.alt=alt;
    im.decoding='async'; im.loading='eager';
    return im;
  }
  function replace(el,name,alt=''){
    if(!el||!files[name])return null;
    const cls=[...(el.classList||[])].join(' ');
    const im=art(name,cls,alt); el.replaceWith(im); return im;
  }
  function run(){
    if(document.documentElement.dataset.directMedievalArt==='2')return;
    document.documentElement.dataset.directMedievalArt='2';
    document.documentElement.classList.add('direct-medieval-assets','bayeux-asset-pass');

    const hero=q('.hero-art');
    if(hero){
      replace(hero.querySelector('img'),'compass','Illuminated compass diagram created for Alto City Limits');
      hero.appendChild(art('dragon','native-hero-dragon','Illuminated dragon created for Alto City Limits'));
    }

    const folio=['initialM','compass','manicule','comet','banner'];
    qa('.folio-illumination').forEach((el,i)=>replace(el,folio[i%folio.length],'Medieval folio ornament'));

    const caps=['compass','banner','tree','horseman','ship','shields'];
    qa('.cap-illumination').forEach((el,i)=>replace(el,caps[i%caps.length],'Medieval capability illustration'));

    const analysis=qa('.illustration img');
    if(analysis[0])replace(analysis[0],'compass','Illuminated strategic diagram');
    if(analysis[1])replace(analysis[1],'castle','Bayeux-inspired fortified hall');

    qa('.manuscript-portrait img').forEach(el=>replace(el,'initialM','Illuminated M for Matthew Russell'));

    const works=['ship','horseman','shields','hound','banner','castle'];
    qa('.work-illumination').forEach((el,i)=>replace(el,works[i%works.length],'Medieval case-study ornament'));

    const surprises=['snail','manicule','hound'];
    qa('.surprise-miniature').forEach((el,i)=>replace(el,surprises[i%surprises.length],'Medieval marginal miniature'));

    const projects=['dragon','compass','initialM','ship'];
    qa('.project-mark').forEach((el,i)=>replace(el,projects[i%projects.length],'Medieval project mark'));

    const notes=['manicule','vine','banner'];
    qa('.note-thumb').forEach((el,i)=>replace(el,notes[i%notes.length],'Medieval Field Notes illustration'));

    const fallback=['dragon','snail','compass','horseman','ship','hound']; let f=0;
    qa('img').forEach(el=>{const s=el.getAttribute('src')||'';if(/wikimedia|wikipedia|alamy/i.test(s))replace(el,fallback[f++%fallback.length],'Alto City Limits medieval illustration')});

    const shell=q('.shell')||document.body;
    [['left','horseman'],['right','snail'],['left','manicule'],['right','hound']].forEach(([side,name],i)=>{
      const im=art(name,`native-marginalia ${side} m${i}`,''); im.setAttribute('aria-hidden','true'); shell.appendChild(im);
    });

    qa('.section').forEach((section,i)=>{
      if(i%2===0){const row=document.createElement('div');row.className='native-art-divider';row.append(art(i%4===0?'vine':'border','', ''));section.appendChild(row)}
    });

    const bio=q('.bio p');
    if(bio){const im=art('initialM','native-initial','');im.setAttribute('aria-hidden','true');bio.prepend(im)}

    qa('.work-card:nth-child(odd),.note-card:first-child').forEach(el=>{
      const im=art('vine','native-border-fragment',''); im.setAttribute('aria-hidden','true'); el.appendChild(im);
    });

    const nav=q('.utility .wrap');
    if(nav&&!q('.native-asset-link')){const a=document.createElement('a');a.className='native-asset-link';a.href='assets/medieval/';a.textContent='Asset Library';nav.appendChild(a)}
  }
  run();
  window.ALCMedieval={art,run,base:BASE,files};
})();
