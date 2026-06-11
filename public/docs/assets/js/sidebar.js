/* ============================================================
   ADEMY DOCS — Sidebar Injection
   Injects the shared sidebar HTML into #sidebar-container

   Para actualizar la versión de la documentación cambia DOCS_VERSION.
   Para actualizar el copyright cambia COPYRIGHT_YEAR / COMPANY_NAME.
   ============================================================ */
(function () {
  // ── Configuración central ───────────────────────────────────
  var DOCS_VERSION    = 'v1.0';
  var COMPANY_NAME    = 'AlphaTechnologies';
  var COPYRIGHT_YEAR  = '2026';
  // ────────────────────────────────────────────────────────────
  const sidebar = `
<aside class="sidebar">
  <div class="sidebar-logo">
    <img src="assets/images/ademy-blanco.png" alt="Ademy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
    <img src="assets/images/ADEMY.png" alt="Ademy" style="display:none;filter:brightness(0) invert(1)">
    <div class="logo-sub">Documentación</div>
  </div>

  <nav class="sidebar-nav">
    <div class="nav-category">Inicio</div>
    <a class="nav-item" href="index.html">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      Bienvenida
    </a>

    <div class="nav-category">Manuales</div>
    <a class="nav-item" href="guia-usuario.html">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Guía de Usuario
    </a>
    <a class="nav-item" href="roles-permisos.html">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      Roles y Permisos
    </a>
    <a class="nav-item" href="reglas-negocio.html">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
      Reglas de Negocio
    </a>

    <div class="nav-category">Técnico</div>
    <a class="nav-item" href="arquitectura.html">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="6" height="6" rx="1"/><rect x="16" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M5 9v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9M12 14v1"/></svg>
      Arquitectura
    </a>
    <a class="nav-item" href="api.html">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      API Reference
    </a>
    <a class="nav-item" href="base-datos.html">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
      Base de Datos
    </a>
    <a class="nav-item" href="despliegue.html">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      Despliegue
    </a>

    <div class="nav-category">Migraciones</div>
    <a class="nav-item" href="migraciones.html">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      Guía de Migración
    </a>
  </nav>

  <div class="sidebar-footer">
    <div class="copyright">&copy; ${COPYRIGHT_YEAR} ${COMPANY_NAME}</div>
    <div class="version">Docs ${DOCS_VERSION}</div>
  </div>
</aside>
<div class="sidebar-overlay"></div>
`;

  document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('sidebar-container');
    if (container) container.innerHTML = sidebar;
  });
})();
