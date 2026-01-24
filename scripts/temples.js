//hamburger menu functionality
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menuButton');
  const navList = document.getElementById('primaryNav');
  if (!btn || !navList) return;

  const iconEl = btn.querySelector('.hamburger-icon');
  const mqLarge = window.matchMedia('(min-width: 820px)');

  // Helper to open/close menu
  function setMenu(open) {
    if (open) {
      navList.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close menu');
      if (iconEl) iconEl.textContent = '✕';
    } else {
      navList.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
      if (iconEl) iconEl.textContent = '☰';
    }
  }

  // Initial state: closed on mobile (matches CSS), auto-open visual on large
  function syncToViewport(e) {
    if (mqLarge.matches) {
      // Large: menu should be visible via CSS; keep ARIA consistent
      setMenu(true);
    } else {
      // Small: collapsed by default
      setMenu(false);
    }
  }

  // Toggle on click/Enter/Space (button handles keyboard by default)
  btn.addEventListener('click', () => {
    const isOpen = navList.classList.contains('is-open');
    setMenu(!isOpen);
  });

  // Keep state sane during viewport changes
  mqLarge.addEventListener?.('change', syncToViewport);
  // Fallback for older browsers:
  window.addEventListener('resize', () => {
    // Debounce a bit
    clearTimeout(window.__menuResizeTO);
    window.__menuResizeTO = setTimeout(syncToViewport, 100);
  });

  // Initialize
  syncToViewport();
});
