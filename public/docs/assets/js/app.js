/* ============================================================
   ADEMY DOCS — App JS
   Handles: dark/light mode, mobile sidebar, copy buttons,
            endpoint accordion, active nav link
   ============================================================ */

(function () {
  'use strict';

  /* ── Theme ─────────────────────────────────────────────── */
  const THEME_KEY = 'ademy-docs-theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? iconSun() : iconMoon();
    btn.title = theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  }

  function toggleTheme() {
    const current = getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    // Switch highlight.js theme
    switchHljsTheme(next);
  }

  /* ── Highlight.js theme switching ─────────────────────── */
  function switchHljsTheme(theme) {
    const link = document.getElementById('hljs-theme');
    if (!link) return;
    link.href = theme === 'dark'
      ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
  }

  /* ── Copy buttons ──────────────────────────────────────── */
  function addCopyButtons() {
    document.querySelectorAll('pre').forEach(function (pre) {
      if (pre.closest('.code-block')) return; // already wrapped
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copiar';
      btn.addEventListener('click', function () {
        const text = pre.querySelector('code')
          ? pre.querySelector('code').innerText
          : pre.innerText;
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = '✓ Copiado';
          setTimeout(function () { btn.textContent = 'Copiar'; }, 2000);
        });
      });
      wrapper.appendChild(btn);
    });
  }

  /* ── Endpoint accordion ────────────────────────────────── */
  function initEndpointCards() {
    document.querySelectorAll('.endpoint-header').forEach(function (header) {
      header.addEventListener('click', function () {
        const card = header.closest('.endpoint-card');
        card.classList.toggle('open');
      });
    });
  }

  /* ── Mobile sidebar ────────────────────────────────────── */
  function initMobileSidebar() {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (!btn || !sidebar) return;

    btn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
    if (overlay) {
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }
  }

  /* ── Active nav link ───────────────────────────────────── */
  function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(function (item) {
      const href = item.getAttribute('href');
      if (href && (href === currentPage || href.endsWith('/' + currentPage))) {
        item.classList.add('active');
      }
    });
  }

  /* ── SVG icons ─────────────────────────────────────────── */
  function iconSun() {
    return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  }
  function iconMoon() {
    return '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* ── Init ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    // Apply saved theme
    const theme = getTheme();
    applyTheme(theme);
    switchHljsTheme(theme);

    // Theme toggle button
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);

    // Highlight.js
    if (typeof hljs !== 'undefined') {
      hljs.highlightAll();
    }

    addCopyButtons();
    initEndpointCards();
    initMobileSidebar();
    setActiveNav();
  });
})();
