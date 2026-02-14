(() => {
  // Prevent double init
  if (window.__auroraSiteInitialized__) return;
  window.__auroraSiteInitialized__ = true;

  const BREAKPOINT = 768; // 48rem to match your CSS

  const header = document.querySelector('.site-header');
  const checkbox = header?.querySelector('#nav-toggle');
  const label = header?.querySelector('.nav-toggle-label');
  const nav = header?.querySelector('.site-nav');

  if (!header || !checkbox || !label || !nav) return;

  // Ensure ARIA wiring
  if (!nav.id) nav.id = 'primary-nav';
  label.setAttribute('aria-controls', nav.id);
  checkbox.setAttribute('aria-controls', nav.id);

  // Sync aria-expanded with checkbox state
  const syncAria = () => {
    const expanded = checkbox.checked ? 'true' : 'false';
    label.setAttribute('aria-expanded', expanded);
    checkbox.setAttribute('aria-expanded', expanded);
    header.classList.toggle('nav-open', checkbox.checked);
    document.documentElement.classList.toggle('no-scroll', checkbox.checked && window.innerWidth < BREAKPOINT);
  };
  syncAria();

  // Toggle by clicking the label (already wired by for=), keep aria in sync
  checkbox.addEventListener('change', syncAria);

  // Close on Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && checkbox.checked) {
      checkbox.checked = false;
      syncAria();
      label.focus();
    }
  });

  // Close on outside click (mobile only)
  document.addEventListener('click', (e) => {
    if (window.innerWidth >= BREAKPOINT) return;
    if (!checkbox.checked) return;
    const insideHeader = header.contains(e.target);
    if (!insideHeader) {
      checkbox.checked = false;
      syncAria();
    }
  });

  // Close after navigating (mobile)
  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.innerWidth < BREAKPOINT && checkbox.checked) {
        checkbox.checked = false;
        syncAria();
      }
    });
  });

  // Reset when resizing up to desktop
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (window.innerWidth >= BREAKPOINT && checkbox.checked) {
        checkbox.checked = false;
        syncAria();
      }
    }, 120);
  });
})();