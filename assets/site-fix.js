(() => {
  'use strict';

  const pages = new Set(['home','about','products','services','contact']);

  // Use real file paths, independent from the older asset loader.
  document.querySelectorAll('[data-asset="logo"]').forEach(img => {
    img.src = 'assets/logo.webp';
    img.removeAttribute('data-asset');
  });
  document.querySelectorAll('[data-asset="dragon"]').forEach(img => {
    img.src = 'assets/dragon-hq.webp';
    img.removeAttribute('data-asset');
  });

  // About story illustration: remove the obsolete missing image and keep a designed CSS panel.
  document.querySelectorAll('.story-image img').forEach(img => img.remove());

  // Make the navigation real links, while preserving translation attributes/classes.
  document.querySelectorAll('button.navlink[data-go]').forEach(btn => {
    const a = document.createElement('a');
    [...btn.attributes].forEach(attr => {
      if (attr.name !== 'type') a.setAttribute(attr.name, attr.value);
    });
    a.href = '#' + btn.dataset.go;
    a.innerHTML = btn.innerHTML;
    btn.replaceWith(a);
  });

  const productCards = [
    {title:'Farm Blocks Battle', meta:'Puzzle • Casual', cat:'puzzle casual', src:'assets/products/farm-blocks.svg'},
    {title:'World Fishing', meta:'Simulation • Adventure', cat:'adventure casual', src:'assets/products/world-fishing.svg'},
    {title:'Card Arena', meta:'Cards • Strategy', cat:'strategy casual', src:'assets/products/card-arena.svg'},
    {title:'Arcade Rush', meta:'Arcade • Casual', cat:'arcade casual', src:'assets/products/arcade-rush.svg'},
    {title:'Puzzle Worlds', meta:'Puzzle • Family', cat:'puzzle casual', src:'assets/products/puzzle-worlds.svg'},
    {title:'Adventure Tales', meta:'Adventure • Casual', cat:'adventure casual', src:'assets/products/adventure-tales.svg'},
    {title:'Speed League', meta:'Arcade • Competition', cat:'arcade', src:'assets/products/speed-league.svg'}
  ];

  const cardHTML = c => `<article class="game-card" data-cat="${c.cat}"><img src="${c.src}" alt="${c.title} artwork"><div class="game-meta"><h3>${c.title}</h3><p>${c.meta}</p></div></article>`;

  const featured = document.querySelector('.games-grid');
  if (featured) featured.innerHTML = productCards.slice(0,4).map(cardHTML).join('');
  const products = document.querySelector('.products-grid');
  if (products) products.innerHTML = productCards.map(cardHTML).join('');

  function showView(id, updateHistory = true) {
    if (!pages.has(id)) id = 'home';
    document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === id));
    document.querySelectorAll('.navlink[data-go]').forEach(link => link.classList.toggle('active', link.dataset.go === id));
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.getElementById('menuBtn');
    mobileMenu?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded','false');
    if (updateHistory) {
      const url = id === 'home' ? location.pathname + location.search : '#' + id;
      history.pushState({view:id}, '', url);
    }
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // Capture before the legacy click handlers, so navigation cannot be broken by old code.
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-go]');
    if (!trigger || !pages.has(trigger.dataset.go)) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    showView(trigger.dataset.go, true);
  }, true);

  // Rebuild mobile-menu handling independently.
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const open = mobileMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    }, true);
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      mobileMenu?.classList.remove('open');
      menuBtn?.setAttribute('aria-expanded','false');
    }
  });

  window.addEventListener('popstate', () => showView((location.hash || '#home').slice(1), false));
  window.addEventListener('hashchange', () => showView((location.hash || '#home').slice(1), false));

  // Filters on the rebuilt product grid.
  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', event => {
      event.stopImmediatePropagation();
      document.querySelectorAll('.filter').forEach(x => x.classList.remove('on'));
      button.classList.add('on');
      const filter = button.dataset.filter;
      document.querySelectorAll('.products-grid .game-card').forEach(card => {
        card.classList.toggle('hidden', filter !== 'all' && !card.dataset.cat.split(' ').includes(filter));
      });
    }, true);
  });

  // Favicon built from the uploaded dragon head.
  let favicon = document.querySelector('link[rel~="icon"]');
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    document.head.appendChild(favicon);
  }
  favicon.href = 'assets/favicon-dragon.png?v=1';

  showView((location.hash || '#home').slice(1), false);
})();