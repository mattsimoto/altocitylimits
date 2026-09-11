(()=>{
  const SELF=document.currentScript&&document.currentScript.src?document.currentScript.src:location.href;
  const BASE=new URL('assets/medieval/',SELF).href;
  const files={
    dragon:'dragon.webp',
    snail:'snail.webp',
    compass:'diagram-compass.webp',
    manicule:'manicule-blue.webp',
    vine:'vine-01.webp',
    initialM:'initial-m.webp',
    grotesque:'grotesque-blue-devil.webp',
    border:'border-dragon-horizontal.webp'
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
    if(!el)return null;
    const cls=[...(el.classList||[])].join(' ');
    const im=art(name,cls,alt); el.replaceWith(im); return im;
  }
  function run(){
    if(document.documentElement.dataset.directMedievalArt==='1')return;
    document.documentElement.dataset.directMedievalArt='1';
    document.documentElement.classList.add('direct-medieval-assets');

    const hero=q('.hero-art');
    if(hero){
      replace(hero.querySelector('img'),'compass','Illuminated compass diagram created for Alto City Limits');
      hero.appendChild(art('dragon','native-hero-dragon','Illuminated dragon created for Alto City Limits'));
    }

    const folio=['initialM','compass','manicule','snail'];
    qa('.folio-illumination').forEach((el,i)=>replace(el,folio[i%folio.length],'Medieval folio ornament'));

    const caps=['compass','manicule','vine','dragon','snail','compass'];
    qa('.cap-illumination').forEach((el,i)=>replace(el,caps[i%caps.length],'Medieval capability illustration'));

    const analysis=qa('.illustration img');
    if(analysis[0])replace(analysis[0],'compass','Illuminated strategic diagram');
    if(analysis[1])replace(analysis[1],'grotesque','Illuminated bestiary grotesque');

    qa('.manuscript-portrait img').forEach(el=>replace(el,'initialM','Illuminated M for Matthew Russell'));

    const works=['compass','dragon','grotesque','snail','vine','border'];
    qa('.work-illumination').forEach((el,i)=>replace(el,works[i%works.length],'Medieval case-study ornament'));

    const surprises=['snail','manicule','grotesque'];
    qa('.surprise-miniature').forEach((el,i)=>replace(el,surprises[i%surprises.length],'Medieval marginal miniature'));

    const projects=['dragon','compass','initialM','snail'];
    qa('.project-mark').forEach((el,i)=>replace(el,projects[i%projects.length],'Medieval project mark'));

    const notes=['manicule','vine','grotesque'];
    qa('.note-thumb').forEach((el,i)=>replace(el,notes[i%notes.length],'Medieval Field Notes illustration'));

    const fallback=['dragon','snail','compass','grotesque']; let f=0;
    qa('img').forEach(el=>{const s=el.getAttribute('src')||'';if(/wikimedia|wikipedia|alamy/i.test(s))replace(el,fallback[f++%fallback.length],'Alto City Limits medieval illustration')});

    const shell=q('.shell')||document.body;
    [['left','dragon'],['right','snail'],['left','manicule'],['right','grotesque']].forEach(([side,name],i)=>{
      const im=art(name,`native-marginalia ${side} m${i}`,''); im.setAttribute('aria-hidden','true'); shell.appendChild(im);
    });

    qa('.section').forEach((section,i)=>{
      if(i%2===0){const row=document.createElement('div');row.className='native-art-divider';row.append(art('vine','', ''));section.appendChild(row)}
    });

    const bio=q('.bio p');
    if(bio){const im=art('initialM','native-initial','');im.setAttribute('aria-hidden','true');bio.prepend(im)}

    qa('.work-card:nth-child(odd),.note-card:first-child').forEach(el=>{
      const im=art('border','native-border-fragment',''); im.setAttribute('aria-hidden','true'); el.appendChild(im);
    });

    const nav=q('.utility .wrap');
    if(nav&&!q('.native-asset-link')){const a=document.createElement('a');a.className='native-asset-link';a.href='assets/medieval/';a.textContent='Asset Library';nav.appendChild(a)}
  }
  run();
  window.ALCMedieval={art,run,base:BASE,files};
})();
