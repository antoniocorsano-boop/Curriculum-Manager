/**
 * Sidebar component - navigation for standard app
 * Vanilla JS, no dependencies
 */

function renderSidebar({ activeView = "modelliSorgente" } = {}) {
  const views = [
    { id: "modelliSorgente", label: "Modelli sorgente" },
    { id: "documentiIstituzionali", label: "Documenti istituzionali" },
    { id: "matriceRevisione", label: "Matrice revisione" }
  ];

  const navButtons = views.map(v => `
    <button data-view="${v.id}" class="${activeView === v.id ? "active" : ""}">
      ${v.label}
    </button>
  `).join("");

  return `
    <div class="nav-title">Navigazione</div>
    ${navButtons}
  `;
}