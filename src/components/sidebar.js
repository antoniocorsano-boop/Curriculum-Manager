/**
 * Sidebar component - navigation for standard app
 * Vanilla JS, no dependencies
 */

function renderSidebar({ activeView = "modelliSorgente" } = {}) {
  const views = [
    { id: "modelliSorgente", label: "Materiali" },
    { id: "documentiIstituzionali", label: "Documenti" },
    { id: "documentOutputCenter", label: "Output" },
    { id: "matriceRevisione", label: "Revisione" },
    { id: "completionMap", label: "Mappa" },
    { id: "activityStateReadOnly", label: "Stati attività" },
    { id: "wiki", label: "Wiki" }
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