/* Stores only the visitor's light/dark appearance preference. */
(() => {
  const key = 'showcase-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  let choice = null;
  try {
    const saved = window.localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark') choice = saved;
  } catch (_) { /* Appearance still works when browser storage is unavailable. */ }
  const current = () => choice || (system.matches ? 'dark' : 'light');
  function paint() {
    const mode = current();
    document.documentElement.dataset.theme = mode;
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    toggle.hidden = false;
    toggle.setAttribute('aria-checked', String(mode === 'dark'));
    toggle.title = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    toggle.querySelector('[data-theme-label]').textContent = mode === 'dark' ? 'Dark' : 'Light';
  }
  paint();
  document.addEventListener('DOMContentLoaded', () => {
    paint();
    document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
      choice = current() === 'dark' ? 'light' : 'dark';
      try { window.localStorage.setItem(key, choice); } catch (_) {}
      paint();
    });
  });
  system.addEventListener('change', () => { if (!choice) paint(); });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    choice = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : null;
    paint();
  });
})();
