(()=>{
  const A='assets/medieval/';
  const set=(el,name,alt='Alto City Limits medieval manuscript ornament')=>{if(!el)return;el.src=A+name;el.alt=alt;el.loading='lazy';el.decoding='async';};
  const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
  const run=()=>{
    document.documentElement.classList.add('native-medieval-assets');

    const hero=q('.hero-art');
    if(hero){
      set(hero.querySelector('img'),'diagram-compass.svg','Illuminated compass diagram created for Alto City Limits');
      const d=document.createElement('img'); d.className='native-hero-dragon'; d.src=A+'dragon.svg'; d.alt='Illuminated red and blue dragon created for Alto City Limits'; hero.appendChild(d);
    }

    const folios=['initial-m.svg','diagram-compass.svg','vine.svg','grotesque.svg'];
    qa('.folio-illumination').forEach((el,i)=>set(el,folios[i%folios.length],'Native illuminated folio ornament'));

    const caps=['dragon.svg','snail.svg','manicule.svg','diagram-compass.svg','grotesque.svg','border-dragon.svg'];
    qa('.cap-illumination').forEach((el,i)=>set(el,caps[i%caps.length],'Native medieval capability illustration'));

    qa('.illustration img').forEach((el,i)=>set(el,i%2?'grotesque.svg':'diagram-compass.svg','Native medieval strategic illustration'));
    qa('.manuscript-portrait img').forEach(el=>set(el,'initial-m.svg','Illuminated M for Matthew Russell'));

    const works=['diagram-compass.svg','dragon.svg','grotesque.svg','snail.svg','vine.svg','border-dragon.svg'];
    qa('.work-illumination').forEach((el,i)=>set(el,works[i%works.length],'Native medieval case-study illustration'));

    const surprises=['snail.svg','manicule.svg','grotesque.svg'];
    qa('.surprise-miniature').forEach((el,i)=>set(el,surprises[i%surprises.length],'Native medieval marginal miniature'));

    const projects=['grotesque.svg','diagram-compass.svg','initial-m.svg','snail.svg'];
    qa('.project-mark').forEach((el,i)=>set(el,projects[i%projects.length],'Native medieval project mark'));

    const notes=['diagram-compass.svg','dragon.svg','border-dragon.svg'];
    qa('.note-thumb').forEach((el,i)=>set(el,notes[i%notes.length],'Native medieval Field Notes illustration'));

    const fallback=['dragon.svg','snail.svg','diagram-compass.svg','grotesque.svg','vine.svg'];
    let f=0;
    qa('img').forEach(el=>{const src=el.getAttribute('src')||'';if(src.includes('wikimedia')||src.includes('wikipedia')||src.includes('alamy'))set(el,fallback[(f++)%fallback.length]);});

    const shell=q('.shell')||document.body;
    [['left','dragon','dragon.svg'],['right','snail','snail.svg'],['left','manicule','manicule.svg'],['right','grotesque','grotesque.svg']].forEach(([side,type,file])=>{const im=document.createElement('img');im.className=`native-marginalia ${side} ${type}`;im.src=A+file;im.alt='';im.setAttribute('aria-hidden','true');shell.appendChild(im);});

    const sections=qa('.section');
    [0,2,4,6].forEach(idx=>{const s=sections[idx];if(!s)return;const im=document.createElement('img');im.className='native-vine-divider';im.src=A+'vine.svg';im.alt='';im.setAttribute('aria-hidden','true');s.appendChild(im);});

    const bio=q('.bio p');
    if(bio){const im=document.createElement('img');im.className='native-initial';im.src=A+'initial-m.svg';im.alt='Illuminated M';bio.prepend(im);bio.classList.add('has-native-initial');}

    qa('.work-card:nth-child(odd),.note-card:first-child').forEach(el=>{const im=document.createElement('img');im.className='native-border-fragment';im.src=A+'border-dragon.svg';im.alt='';im.setAttribute('aria-hidden','true');el.appendChild(im);});

    const nav=q('.utility .wrap');
    if(nav&&!q('.native-asset-link')){const a=document.createElement('a');a.className='native-asset-link';a.href='assets/medieval/';a.textContent='Asset Library';nav.appendChild(a);}
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
