(()=>{
  const SELF=document.currentScript&&document.currentScript.src?document.currentScript.src:location.href;
  const BASE=new URL('assets/medieval/',SELF).href;

  const files={
    dragon:'dragon.webp',
    snail:'snail.webp',
    compass:'diagram-compass.webp',
    initialM:'initial-m.webp',
    grotesque:'grotesque-blue-devil.webp',
    dragonBorder:'border-dragon-horizontal.webp',
    manicule:'manicule-bayeux.svg',
    beastBorder:'bayeux-border-beasts.svg',
    horseman:'bayeux-horseman.svg',
    ship:'bayeux-ship.svg',
    banner:'bayeux-banner.svg',
    tree:'bayeux-tree.svg',
    shields:'bayeux-shields.svg',
    castle:'bayeux-castle.svg',
    hound:'bayeux-hound.svg',
    comet:'bayeux-comet.svg'
  };

  /* Quality pass: older WebP manuscript assets remain primary art.
     The current Bayeux SVGs are kept as small supporting marks only until
     they are replaced with richer Bayeux-style WebP scenes. */
  const approvedMap={
    hero:{main:'compass',support:'dragonBorder',corner:'dragon'},
    capabilities:['compass','initialM','dragon','grotesque','compass','snail'],
    observations:{main:'compass',divider:'dragonBorder',ornament:'manicule'},
    about:{main:'initialM',initial:'initialM',ornament:'manicule'},
    record:{accent:'dragonBorder',divider:'dragonBorder',cardAccent:'shields'},
    work:['compass','dragon','initialM','grotesque','dragonBorder','snail'],
    tools:{accent:'compass',ornament:'shields',divider:'dragonBorder'},
    projects:['snail','compass','dragonBorder','dragon'],
    fieldNotes:{cards:['initialM','compass','dragon'],divider:'dragonBorder'},
    random:['snail','manicule','grotesque'],
    marginalia:['dragon','snail','manicule','grotesque']
  };

  const q=s=>document.querySelector(s);
  const qa=s=>[...document.querySelectorAll(s)];
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

  function add(el,name,cls='',alt='',where='append'){
    if(!el||!files[name])return null;
    const im=art(name,cls,alt);
    if(!im)return null;
    if(where==='prepend')el.prepend(im);else el.appendChild(im);
    return im;
  }

  function sectionByText(rx){
    return qa('section,.section,.folio,article,main > div').find(el=>rx.test((el.textContent||'').replace(/\s+/g,' ')));
  }

  function divider(section,name,cls=''){
    if(!section||section.querySelector(`.native-art-divider[data-divider="${name}"]`))return;
    const row=document.createElement('div');
    row.className=('native-art-divider '+cls).trim();
    row.dataset.divider=name;
    add(row,name,'native-divider-image','', 'append');
    section.appendChild(row);
  }

  function cornerOrnament(section,name,cls=''){
    if(!section||section.querySelector(`.native-corner-ornament[data-asset="${name}"]`))return;
    const im=add(section,name,`native-corner-ornament ${cls}`,'','append');
    if(im)im.setAttribute('aria-hidden','true');
  }

  function run(){
    if(document.documentElement.dataset.directMedievalArt==='quality-pass-1')return;
    document.documentElement.dataset.directMedievalArt='quality-pass-1';
    document.documentElement.classList.add('direct-medieval-assets','bayeux-quality-pass');

    const hero=q('.hero-art');
    if(hero){
      replace(hero.querySelector('img'),approvedMap.hero.main,'Illuminated compass diagram created for Alto City Limits');
      if(!hero.querySelector('.native-hero-support'))add(hero,approvedMap.hero.support,'native-hero-support','Illuminated manuscript border fragment');
      if(!hero.querySelector('.native-hero-dragon'))add(hero,approvedMap.hero.corner,'native-hero-dragon','Illuminated dragon created for Alto City Limits');
    }

    const folio=['initialM','compass','dragon','grotesque','dragonBorder','snail'];
    qa('.folio-illumination').forEach((el,i)=>replace(el,folio[i%folio.length],'Medieval folio ornament'));

    qa('.cap-illumination').forEach((el,i)=>replace(el,approvedMap.capabilities[i%approvedMap.capabilities.length],'Medieval capability illustration'));

    const observations=sectionByText(/Where Good Marketing Loses the Plot|Observations|Problem|Failure|Loses the Plot/i);
    const analysis=qa('.illustration img');
    if(analysis[0])replace(analysis[0],approvedMap.observations.main,'Illuminated strategic diagram');
    if(analysis[1])replace(analysis[1],'grotesque','Illuminated bestiary grotesque');
    divider(observations,approvedMap.observations.divider,'observations-divider');
    cornerOrnament(observations,approvedMap.observations.ornament,'observations-manicule');

    qa('.manuscript-portrait img').forEach(el=>replace(el,approvedMap.about.main,'Illuminated M for Matthew Russell'));
    const about=sectionByText(/Matthew Russell|About Matthew|Your Guide/i);
    const bio=q('.bio p');
    if(bio&&!bio.querySelector('.native-initial')){
      const im=art(approvedMap.about.initial,'native-initial','');
      if(im){im.setAttribute('aria-hidden','true');bio.prepend(im)}
    }
    cornerOrnament(about,approvedMap.about.ornament,'about-manicule');

    const record=sectionByText(/Campaign Record|The Record|Results|monthly leads|inbound traffic/i);
    qa('.record-card,.metric,.metric-card,[class*="record"] [class*="card"]').forEach((el,i)=>{
      if(!el.querySelector('.native-record-accent'))add(el,approvedMap.record.cardAccent,'native-record-accent','', 'prepend');
    });
    divider(record,approvedMap.record.divider,'record-divider');

    qa('.work-illumination').forEach((el,i)=>replace(el,approvedMap.work[i%approvedMap.work.length],'Medieval case-study illustration'));

    const tools=sectionByText(/Capabilities & Tools|Inventory|Toolchain|Tools/i);
    cornerOrnament(tools,approvedMap.tools.ornament,'tools-shields');
    divider(tools,approvedMap.tools.divider,'tools-divider');

    qa('.project-mark').forEach((el,i)=>replace(el,approvedMap.projects[i%approvedMap.projects.length],'Medieval project mark'));

    qa('.note-thumb').forEach((el,i)=>replace(el,approvedMap.fieldNotes.cards[i%approvedMap.fieldNotes.cards.length],'Medieval Field Notes illustration'));
    const fieldNotes=sectionByText(/Field Notes|Dispatches|Articles/i);
    divider(fieldNotes,approvedMap.fieldNotes.divider,'field-notes-divider');

    qa('.surprise-miniature').forEach((el,i)=>replace(el,approvedMap.random[i%approvedMap.random.length],'Medieval marginal miniature'));

    const fallback=['compass','dragon','initialM','grotesque','dragonBorder','snail']; let f=0;
    qa('img').forEach(el=>{
      const s=el.getAttribute('src')||'';
      if(/wikimedia|wikipedia|alamy/i.test(s))replace(el,fallback[f++%fallback.length],'Alto City Limits medieval illustration');
    });

    const shell=q('.shell')||document.body;
    if(!shell.querySelector('.native-marginalia')){
      [['left','dragon'],['right','snail'],['left','manicule'],['right','grotesque']].forEach(([side,name],i)=>{
        const im=add(shell,name,`native-marginalia ${side} m${i}`,'');
        if(im)im.setAttribute('aria-hidden','true');
      });
    }

    qa('.work-card:nth-child(odd),.note-card:first-child').forEach(el=>{
      if(!el.querySelector('.native-border-fragment')){
        const im=add(el,'dragonBorder','native-border-fragment','');
        if(im)im.setAttribute('aria-hidden','true');
      }
    });

    const nav=q('.utility .wrap');
    if(nav&&!q('.native-asset-link')){
      const a=document.createElement('a');
      a.className='native-asset-link';
      a.href='assets/medieval/';
      a.textContent='Asset Library';
      nav.appendChild(a);
    }
  }

  run();
  window.ALCMedieval={art,run,base:BASE,files,approvedMap};
})();
