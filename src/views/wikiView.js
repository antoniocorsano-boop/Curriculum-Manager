/**
 * Wiki/view - documentazione e guida per l'utilizzo del Manager Curricolo
 * Contenuto di aiuto in sola lettura, basato su cataloghi di dati
 */

// Utility functions
function _esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function renderWikiView() {
  const catalog = window.WIKI_CATALOG || [];
  const el = document.getElementById("wiki");

  // Gruppa i contenuti per categoria per una migliore organizzazione
  const groupedByCategory = {};
  catalog.forEach(item => {
    if (!groupedByCategory[item.category]) {
      groupedByCategory[item.category] = [];
    }
    groupedByCategory[item.category].push(item);
  });

  // Ordina le categorie in modo logico
  const categoryOrder = [
    "Informazioni generali",
    "Guide pratiche",
    "Concetti chiave",
    "Funzionalità"
  ];

  el.innerHTML = `
    <div class="wiki-container">
      <h1>Guida e aiuto</h1>
      <p class="simple-help">Documentazione completa per utilizzare al meglio il Manager Curricolo d'Istituto.</p>

      ${Object.keys(groupedByCategory)
        .filter(cat => categoryOrder.includes(cat)) // Solo categorie conosciute nell'ordine voluto
        .concat(Object.keys(groupedByCategory).filter(cat => !categoryOrder.includes(cat))) // Altro
        .map(category => {
          const items = groupedByCategory[category];
          return `
            <div class="wiki-category-section" style="margin-bottom:24px;">
              <h2 style="border-bottom:2px solid var(--line); padding-bottom:4px;">${_esc(category)}</h2>
              <div class="wiki-items-grid">
                ${items.map(item => renderWikiItem(item)).join("")}
              </div>
            </div>
          `;
        }).join("")}
    </div>
  `;
}

function renderWikiItem(item) {
  return `
    <article class="wiki-item-card">
      <h3>${_esc(item.title)}</h3>
      <div class="wiki-item-content">
        ${item.content.trim().split('\n\n').map(part => {
          // Gestione semplice di liste e paragrafi
          if (part.startsWith('- ') || part.startsWith('* ')) {
            const lines = part.split('\n').map(line => line.trim());
            return `<ul>${lines.map(line => `<li>${_esc(line.substring(2))}</li>`).join('')}</ul>`;
          }
          if (part.startsWith('1. ') || part.startsWith('2. ') || part.startsWith('3. ')) {
            const lines = part.split('\n').map(line => line.trim());
            return `<ol>${lines.map(line => `<li>${_esc(line.substring(3))}</li>`).join('')}</ol>`;
          }
          return `<p>${_esc(part)}</p>`;
        }).join('')}
      </div>
    </article>
  `;
}