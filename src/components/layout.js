/**
 * Layout component - shared shell for standard app
 * Vanilla JS, no dependencies
 */

function _esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function renderLayout({ navigationHtml = "", contentHtml = "" }) {
  return `
    <div class="layout">
      <nav class="app-sidebar">${navigationHtml}</nav>
      <main class="app-main">${contentHtml}</main>
    </div>
  `;
}

function renderHeader({ title = "Manager Curricolo d'Istituto", subtitle = "" }) {
  return `
    <header>
      <h1 id="appTitle">${_esc(title)}</h1>
      ${subtitle ? `<p id="appSubtitle">${_esc(subtitle)}</p>` : ""}
    </header>
  `;
}