(()=>{
  const NS='http://www.w3.org/2000/svg';
  const XL='http://www.w3.org/1999/xlink';
  const SELF=document.currentScript&&document.currentScript.src?document.currentScript.src:location.href;
  const ATLAS=new URL('assets/medieval/original-art-atlas.webp',SELF).href;
  const ATLAS_W=1600, ATLAS_H=1280;

  // Tight crops of the ORIGINAL generated manuscript artwork.
  const S={
    dragon:[6,16,308,288],
    snail:[327,41,307,237],
    maniculeBlue:[649,100,303,123],
    maniculeRed:[969,93,303,134],
    maniculeFloral:[1289,90,304,137],
    vine1:[8,437,304,87],
    vine2:[329,428,303,103],
    initialA:[695,333,216,297],
    initialM:[1015,326,217,301],
    initialC:[1320,333,232,301],
    compass:[24,654,279,296],
    elements:[341,654,277,300],
    cosmos:[651,646,298,301],
    devil:[966,678,299,237],
    lion:[1293,689,301,221],
    bird:[13,1010,301,226],
    rabbit:[326,986,301,271],
    borderDragon:[648,1091,304,57],
    borderBird:[968,1087,304,65],
    cornerRabbit:[1301,966,269,303]
  };

  function sprite(name,cls='',alt=''){
    const b=S[name];
    if(!b) return null;
    const svg=document.createElementNS(NS,'svg');
    svg.setAttribute('viewBox',b.join(' '));
    svg.setAttribute('preserveAspectRatio','xMidYMid meet');
    svg.setAttribute('class',('native-sprite '+cls).trim());
    svg.setAttribute('focusable','false');
    if(alt){
      svg.setAttribute('role','img');
      const title=document.createElementNS(NS,'title');
      title.textContent=alt;
      svg.appendChild(title);
    }else{
      svg.setAttribute('aria-hidden','true');
    }
    const image=document.createElementNS(NS,'image');
    image.setAttribute('href',ATLAS);
    image.setAttributeNS(XL,'href',ATLAS);
    image.setAttribute('x','0');
    image.setAttribute('y','0');
    image.setAttribute('width',String(ATLAS_W));
    image.setAttribute('height',String(ATLAS_H));
    image.setAttribute('preserveAspectRatio','none');
    svg.appendChild(image);
    return svg;
  }

  function replace(el,name,alt=''){
    if(!el) return null;
    const classes=[...(el.classList||[])].join(' ');
    const s=sprite(name,classes,alt);
    if(!s) return null;
    el.replaceWith(s);
    return s;
  }

  const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];

  function run(){
    document.documentElement.classList.add('native-medieval-assets');

    // Hero: coherent cosmology + dragon, matching the generated manuscript direction.
    const hero=q('.hero-art');
    if(hero){
      replace(hero.querySelector('img'),'cosmos','Original illuminated cosmology diagram created for Alto City Limits');
      const d=sprite('dragon','native-hero-dragon','Original illuminated red and blue dragon created for Alto City Limits');
      if(d) hero.appendChild(d);
    }

    // Folio markers: initials and diagrams rather than random creatures.
    const folios=['initialA','initialC','compass','initialM','elements','initialC','cosmos','initialA'];
    qa('.folio-illumination').forEach((el,i)=>replace(el,folios[i%folios.length],'Original illuminated folio ornament'));

    // Capability imagery chosen to make visual sense with the subject.
    const caps=['compass','maniculeBlue','vine1','dragon','elements','cosmos'];
    qa('.cap-illumination').forEach((el,i)=>replace(el,caps[i%caps.length],'Original medieval capability illustration'));

    // Analysis imagery stays diagrammatic/bestiary, not arbitrary.
    const analysis=qa('.illustration img');
    if(analysis[0]) replace(analysis[0],'elements','Original illuminated systems diagram');
    if(analysis[1]) replace(analysis[1],'lion','Original illuminated bestiary figure');

    // About uses a true illuminated M rather than pretending a creature is a portrait.
    qa('.manuscript-portrait img').forEach(el=>replace(el,'initialM','Original illuminated M for Matthew Russell'));

    // Work imagery rotates through the strongest original generated pieces.
    const works=['compass','dragon','devil','snail','cosmos','borderBird'];
    qa('.work-illumination').forEach((el,i)=>replace(el,works[i%works.length],'Original medieval case-study ornament'));

    const surprises=['snail','maniculeRed','devil'];
    qa('.surprise-miniature').forEach((el,i)=>replace(el,surprises[i%surprises.length],'Original medieval marginal miniature'));

    const projects=['bird','compass','initialC','rabbit'];
    qa('.project-mark').forEach((el,i)=>replace(el,projects[i%projects.length],'Original medieval project mark'));

    const notes=['maniculeFloral','elements','bird'];
    qa('.note-thumb').forEach((el,i)=>replace(el,notes[i%notes.length],'Original medieval Field Notes illustration'));

    // Remove any remaining borrowed manuscript scans from the active page.
    const fallback=['dragon','snail','compass','bird','vine2','cornerRabbit'];
    let f=0;
    qa('img').forEach(el=>{
      const src=el.getAttribute('src')||'';
      if(src.includes('wikimedia')||src.includes('wikipedia')||src.includes('alamy')){
        replace(el,fallback[(f++)%fallback.length],'Original Alto City Limits medieval illustration');
      }
    });

    // Wide-screen marginalia. These disappear before they can crowd the content.
    const shell=q('.shell')||document.body;
    [['left','dragon','dragon'],['right','snail','snail'],['left','manicule','maniculeRed'],['right','grotesque','devil']]
      .forEach(([side,type,name])=>{
        const s=sprite(name,`native-marginalia ${side} ${type}`,'');
        if(s) shell.appendChild(s);
      });

    // Alternate the original vine flourishes as quiet section dividers.
    const sections=qa('.section');
    [0,2,4,6].forEach((idx,n)=>{
      if(sections[idx]){
        const s=sprite(n%2?'vine2':'vine1','native-vine-divider','');
        if(s) sections[idx].appendChild(s);
      }
    });

    const bio=q('.bio p');
    if(bio){
      const s=sprite('initialM','native-initial','Illuminated M');
      if(s){bio.prepend(s);bio.classList.add('has-native-initial');}
    }

    qa('.work-card:nth-child(odd),.note-card:first-child').forEach((el,i)=>{
      const s=sprite(i%2?'borderBird':'borderDragon','native-border-fragment','');
      if(s) el.appendChild(s);
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

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();

  window.ALCMedieval={sprite,atlas:ATLAS,sprites:S};
})();
