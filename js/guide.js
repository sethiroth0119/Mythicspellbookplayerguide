/* Mythic Spellbook — shared guide behaviours (vanilla) */
(function(){
  // Reading progress bar
  var bar=document.querySelector('.progress');
  function prog(){
    if(!bar)return;
    var h=document.documentElement;
    var max=h.scrollHeight-h.clientHeight;
    bar.style.width=(max>0?(h.scrollTop/max*100):0)+'%';
  }
  window.addEventListener('scroll',prog,{passive:true});
  window.addEventListener('resize',prog);prog();

  // Scroll reveal
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.14,rootMargin:'0px 0px -8% 0px'});
  function bind(){ document.querySelectorAll('.reveal:not(.in)').forEach(function(el){ io.observe(el); }); }
  bind();

  // Starter-hero selector / dossier expand
  document.querySelectorAll('[data-hero]').forEach(function(card){
    card.addEventListener('click',function(){
      var id=card.getAttribute('data-hero');
      var open=card.classList.contains('open');
      document.querySelectorAll('[data-hero]').forEach(function(c){ c.classList.remove('open','dim'); });
      document.querySelectorAll('[data-dossier]').forEach(function(d){ d.classList.remove('show'); });
      if(!open){
        card.classList.add('open');
        document.querySelectorAll('[data-hero]').forEach(function(c){ if(c!==card)c.classList.add('dim'); });
        var dos=document.querySelector('[data-dossier="'+id+'"]');
        if(dos){ dos.classList.add('show'); bind();
          requestAnimationFrame(function(){
            var y=dos.getBoundingClientRect().top+window.scrollY-90;
            window.scrollTo({top:y,behavior:'smooth'});
          });
        }
      }
    });
  });

  // Card-type flip / detail toggle
  document.querySelectorAll('[data-flip]').forEach(function(el){
    el.addEventListener('click',function(){ el.classList.toggle('flipped'); });
  });

  // Generic accordion (battle UI annotations etc.)
  document.querySelectorAll('[data-acc]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var p=btn.closest('[data-acc-item]');
      var wasOpen=p.classList.contains('open');
      var group=btn.closest('[data-acc-group]');
      if(group) group.querySelectorAll('[data-acc-item]').forEach(function(i){i.classList.remove('open');});
      if(!wasOpen)p.classList.add('open');
    });
  });
})();
