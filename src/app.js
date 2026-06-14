/**
 * App entry point - vanilla JS no dependencies
 * Uses shared shell components
 */

// Utility functions (from monolite)
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function jsAttr(value) {
  return String(value ?? "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\n/g, " ");
}

// View router
function showView(id) {
  document.querySelectorAll("nav button[data-view]").forEach(b => {
    b.classList.toggle("active", b.dataset.view === id);
  });
  document.querySelectorAll("section.view").forEach(s => {
    s.classList.toggle("active", s.id === id);
  });
  renderView(id);
}

function renderView(id) {
  const renderers = {
    modelliSorgente: renderModelliSorgenteView,
    documentiIstituzionali: renderDocumentiIstituzionaliView,
    matriceRevisione: renderMatriceRevisioneView
  };
  if (renderers[id]) renderers[id]();
}

// Event handlers
document.addEventListener("DOMContentLoaded", () => {
  // Catalogs are loaded globally via script tags - no init needed
  // Use shared sidebar
  const sidebarEl = document.getElementById("sidebar");
  if (sidebarEl && typeof renderSidebar === "function") {
    sidebarEl.innerHTML = renderSidebar({ activeView: "modelliSorgente" });
  }
  // Bind navigation
  document.querySelectorAll("nav button[data-view]").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.view));
  });
  renderModelliSorgenteView();
});