(function setCurrentYear() {
  const yearEl = document.getElementById('currentyear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

// 2) date and hour of last modification
(function setLastModified() {
  const lastModEl = document.getElementById('lastModified');
  if (lastModEl) {
    const raw = document.lastModified;

    let formatted = raw;
    const parsed = Date.parse(raw);
    if (!Number.isNaN(parsed)) {
      const dt = new Date(parsed);
      formatted = dt.toLocaleString(navigator.language || 'en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }

    lastModEl.textContent = `Last Modification ${formatted}`;
  }
})();
