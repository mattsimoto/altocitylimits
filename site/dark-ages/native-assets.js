(()=>{
  const SELF=document.currentScript&&document.currentScript.src?document.currentScript.src:location.href;
  const BASE=new URL('assets/medieval/',SELF).href;
  const files={dragon:'dragon.webp',snail:'snail.webp',compass:'diagram-compass.webp'};
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
    if(hero){replace(hero.querySelector('img'),'compass','Illuminated compass artwork created for Alto City Limits');hero.appendChild(art('dragon','native-hero-dragon','Illuminated dragon created for Alto City Limits'));}
    const folio=['dragon','compass','snail'];qa('.folio-illumination').forEach((el,i)=>replace(el,folio[i%3],'Medieval manuscript ornament'));
    const caps=['compass','dragon','snail','dragon','compass','snail'];qa('.cap-illumination').forEach((el,i)=>replace(el,caps[i%6],'Medieval capability illustration'));
    qa('.illustration img').forEach((el,i)=>replace(el,i%2?'dragon':'compass','Medieval strategic illustration'));
    qa('.manuscript-portrait img').forEach(el=>replace(el,'dragon','Illuminated manuscript artwork'));
    const works=['compass','dragon','snail','dragon','compass','snail'];qa('.work-illumination').forEach((el,i)=>replace(el,works[i%6],'Medieval case-study ornament'));
    qa('.surprise-miniature').forEach((el,i)=>replace(el,['snail','dragon','compass'][i%3],'Medieval marginal miniature'));
    qa('.project-mark').forEach((el,i)=>replace(el,['dragon','compass','snail'][i%3],'Medieval project mark'));
    qa('.note-thumb').forEach((el,i)=>replace(el,['compass','dragon','snail'][i%3],'Medieval Field Notes illustration'));
    let f=0;qa('img').forEach(el=>{const s=el.getAttribute('src')||'';if(/wikimedia|wikipedia|alamy/i.test(s))replace(el,['dragon','snail','compass'][f++%3],'Alto City Limits medieval illustration')});
    const shell=q('.shell')||document.body;
    [['left','dragon'],['right','snail'],['left','compass'],['right','dragon']].forEach(([side,name],i)=>{const im=art(name,`native-marginalia ${side} m${i}`,'');im.setAttribute('aria-hidden','true');shell.appendChild(im)});
    qa('.section').forEach((section,i)=>{if(i%2===0){const row=document.createElement('div');row.className='native-art-divider';row.append(art(i%4===0?'dragon':'snail','', ''));section.appendChild(row)}});
    const bio=q('.bio p');if(bio){const im=art('dragon','native-initial','');im.setAttribute('aria-hidden','true');bio.prepend(im)}
    const nav=q('.utility .wrap');if(nav&&!q('.native-asset-link')){const a=document.createElement('a');a.className='native-asset-link';a.href='assets/medieval/';a.textContent='Asset Library';nav.appendChild(a)}
  }
  run();
  window.ALCMedieval={art,run,base:BASE};
})();
