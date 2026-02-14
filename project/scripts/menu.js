// scripts/menu.js
(() => {
  if (window.__auroraMenuInitialized__) return;
  window.__auroraMenuInitialized__ = true;

  const STORAGE_KEY = 'aurora:lastCategory';
  const DEFAULT_CATEGORY = 'all';

  // 1) Data with image + alt (supply images you added under images/menu/)
  const MENU_ITEMS = [
    // Coffee & Espresso
    {
      id: 'c1',
      name: 'Aurora Latte',
      category: 'coffee',
      price: 3.95,
      tags: ['milk'],
      desc: 'Velvety espresso latte with caramel drizzle.',
      image: 'images/special-1.webp',
      alt: 'Aurora Latte with caramel drizzle'
    },
    {
      id: 'c2',
      name: 'Espresso',
      category: 'coffee',
      price: 2.50,
      tags: ['strong'],
      desc: 'Rich, aromatic single shot.',
      image: 'images/espresso.webp',
      alt: 'A single shot of espresso with crema'
    },
    {
      id: 'c3',
      name: 'Cappuccino',
      category: 'coffee',
      price: 3.60,
      tags: ['foam'],
      desc: 'Classic foam-forward balance.',
      image: 'images/cappuccino.webp',
      alt: 'Cappuccino in a ceramic cup'
    },

    // Teas & Cold Drinks
    {
      id: 't1',
      name: 'Iced Matcha',
      category: 'tea',
      price: 4.50,
      tags: ['green-tea'],
      desc: 'Ceremonial-grade matcha over ice.',
      image: 'images/special-2.webp',
      alt: 'Iced matcha latte in a glass'
    },
    {
      id: 't2',
      name: 'Chai Latte',
      category: 'tea',
      price: 3.95,
      tags: ['spiced'],
      desc: 'Spiced black tea with steamed milk.',
      image: 'images/chai-latte.webp',
      alt: 'Chai latte topped with spices'
    },
    {
      id: 't3',
      name: 'Cold Brew',
      category: 'tea',
      price: 3.25,
      tags: ['cold'],
      desc: 'Slow-steeped, smooth cold brew.',
      image: 'images/cold-brew.webp',
      alt: 'Cold brew with ice'
    },

    // Pastries & Snacks
    {
      id: 'p1',
      name: 'Chocolate Croissant',
      category: 'pastry',
      price: 2.95,
      tags: ['veg'],
      desc: 'Buttery layers, dark chocolate bar.',
      image: 'images/special-3.webp',
      alt: 'Chocolate croissant, flaky layers'
    },
    {
      id: 'p2',
      name: 'Blueberry Muffin',
      category: 'pastry',
      price: 2.50,
      tags: ['veg'],
      desc: 'Tender crumb with bursting berries.',
      image: 'images/blueberry-muffin.webp',
      alt: 'Blueberry muffin on a plate'
    },

    // Seasonal / Student Picks
    {
      id: 's1',
      name: 'Pumpkin Spice Latte',
      category: 'seasonal',
      price: 4.25,
      tags: ['seasonal'],
      desc: 'Comforting spice blend & microfoam.',
      image: 'images/pumpkin-latte.webp',
      alt: 'Pumpkin spice latte with cinnamon'
    },
    {
      id: 's2',
      name: 'Affogato',
      category: 'seasonal',
      price: 4.75,
      tags: ['dessert'],
      desc: 'Vanilla ice cream “drowned” in espresso.',
      image: 'images/affogato.webp',
      alt: 'Affogato dessert with espresso and ice cream'
    },
  ];

  const grid = document.getElementById('menu-grid');
  const filterBar = document.querySelector('.menu-filters');
  const countEl = document.getElementById('menu-count');

  if (!grid || !filterBar) {
    console.warn('menu.js: Missing #menu-grid or .menu-filters; aborting render.');
    return;
  }

  const formatPrice = (n) => `$${n.toFixed(2)}`;

  const getSavedCategory = () => {
    try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_CATEGORY; }
    catch { return DEFAULT_CATEGORY; }
  };

  const saveCategory = (cat) => { try { localStorage.setItem(STORAGE_KEY, cat); } catch {} };

  const filterItems = (category) =>
    (!category || category === 'all') ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === category);

  // 2) Template: include optional thumbnail (supports image or imageUrl)
  function itemTemplate(item) {
    const tagBadges = item.tags?.map(t => `<span class="tag">${t}</span>`).join(' ') || '';

    const src = item.image ?? item.imageUrl;     // <-- support both fields
    const alt = item.alt || item.name || 'menu item';

    const imageBlock = src
      ? `<figure class="menu-card__media">
           <img src="${src}" alt="${alt}" loading="lazy" decoding="async"
                onerror="this.onerror=null; this.src='images/menu/placeholder.jpg'; this.alt='Image not available';">
         </figure>`
      : '';

    return `
      <article class="menu-card" data-id="${item.id}" data-category="${item.category}">
        ${imageBlock}
        <div class="menu-card__body">
          <header class="menu-card__header">
            <h3 class="menu-card__title">${item.name}</h3>
            <span class="menu-card__price">${formatPrice(item.price)}</span>
          </header>
          <p class="menu-card__desc">${item.desc}</p>
          <p class="menu-card__tags" aria-label="Dietary or notes">${tagBadges}</p>
        </div>
      </article>
    `;
  }

  function categoryLabel(cat) {
    switch (cat) {
      case 'coffee': return 'Coffee & Espresso';
      case 'tea': return 'Teas & Cold Drinks';
      case 'pastry': return 'Pastries & Snacks';
      case 'seasonal': return 'Seasonal / Student Picks';
      default: return 'All';
    }
  }

  function render(category) {
    const items = filterItems(category);
    grid.innerHTML = items.map(itemTemplate).join('');

    if (countEl) {
      const label = category === 'all' ? 'All items' : categoryLabel(category);
      countEl.textContent = `${label}: ${items.length} ${items.length === 1 ? 'item' : 'items'}`;
    }

    // Update button aria-selected
    const buttons = filterBar.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
      const selected = btn.dataset.filter === category || (category === 'all' && btn.dataset.filter === 'all');
      btn.setAttribute('aria-selected', selected ? 'true' : 'false');
      btn.classList.toggle('is-active', selected);
    });
  }

  // Events
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const category = btn.dataset.filter || DEFAULT_CATEGORY;
    render(category);
    saveCategory(category);
  });

  filterBar.addEventListener('keydown', (e) => {
    const buttons = Array.from(filterBar.querySelectorAll('.filter-btn'));
    const currentIndex = buttons.findIndex(b => b.getAttribute('aria-selected') === 'true');
    if (currentIndex === -1) return;
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') nextIndex = (currentIndex + 1) > (buttons.length - 1) ? 0 : currentIndex + 1;
    if (e.key === 'ArrowLeft') nextIndex = (currentIndex - 1) < 0 ? buttons.length - 1 : currentIndex - 1;
    if (nextIndex !== currentIndex) {
      e.preventDefault();
      buttons[nextIndex].focus();
      buttons[nextIndex].click();
    }
  });

  // Init
  render(getSavedCategory());
})();