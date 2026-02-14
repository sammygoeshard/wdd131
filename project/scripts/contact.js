//*CONTACT FORN JS== SAMUEL JASPE


(() => {
  const form   = document.getElementById('contactForm');
  const nameEl = document.getElementById('name');
  const emailEl= document.getElementById('email');
  const msgEl  = document.getElementById('message');
  const topicEl= document.getElementById('topic');
  const subEl  = document.getElementById('subscribe');
  const note   = document.getElementById('formNote');
  const mapDiv = document.getElementById('mapEmbed');

  const STORAGE_KEY = 'aurora:lastContact';

  // --- Helpers
  const setError = (el, helpId, msg) => {
    const help = document.getElementById(helpId);
    if (help) help.textContent = msg;
    el.setAttribute('aria-invalid', 'true');
  };

  const clearError = (el, helpId) => {
    const help = document.getElementById(helpId);
    if (help) help.textContent = '';
    el.removeAttribute('aria-invalid');
  };

  const validEmail = (v) => /\S+@\S+\.\S+/.test(v);

  // --- Live validation
  nameEl.addEventListener('input', () => {
    if (nameEl.value.trim().length >= 2) clearError(nameEl, 'nameHelp');
  });
  emailEl.addEventListener('input', () => {
    if (validEmail(emailEl.value)) clearError(emailEl, 'emailHelp');
  });
  msgEl.addEventListener('input', () => {
    if (msgEl.value.trim().length > 0) clearError(msgEl, 'messageHelp');
  });

  // --- Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let ok = true;

    if (!nameEl.value.trim()) {
      setError(nameEl, 'nameHelp', 'Please enter your name.');
      ok = false;
    }
    if (!validEmail(emailEl.value)) {
      setError(emailEl, 'emailHelp', 'Enter a valid email address.');
      ok = false;
    }
    if (!msgEl.value.trim()) {
      setError(msgEl, 'messageHelp', 'Please include a message.');
      ok = false;
    }

    if (!ok) return;

    const payload = {
      name: nameEl.value.trim(),
      email: emailEl.value.trim(),
      topic: topicEl.value,
      subscribe: subEl.checked,
      ts: Date.now()
    };

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch {}

    form.reset();
    note.textContent = `Thanks, ${payload.name}! Your message about “${payload.topic}” has been recorded. We’ll reply to ${payload.email} soon.`;
  });

  // --- Prefill from localStorage (nice touch)
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const last = JSON.parse(raw);
      if (last.name)  nameEl.value  = last.name;
      if (last.email) emailEl.value = last.email;
    }
  } catch {}

  // --- Progressive Map Loading (click or keyboard)
  const loadMap = () => {
    const src = mapDiv?.dataset.src;
    if (!mapDiv || !src || mapDiv.dataset.loaded === 'true') return;
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.title = 'Google Map';
    iframe.loading = 'lazy';
    iframe.width = '100%';
    iframe.height = '450';
    iframe.style.border = '0';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    mapDiv.replaceChildren(iframe);
    mapDiv.dataset.loaded = 'true';
    mapDiv.removeAttribute('role');
    mapDiv.removeAttribute('tabindex');
    mapDiv.removeAttribute('aria-label');
  };

  mapDiv?.addEventListener('click', loadMap);
  mapDiv?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      loadMap();
    }
  });
})();