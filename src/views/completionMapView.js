/**
 * Completion Map View - mappa read-only del completamento del Curriculum di Istituto
 * Solo visualizzazione, nessun salvataggio, nessun autosave, nessun storage
 */

const STATUS_LABELS = {
  non_avviato: "Non avviato",
  parziale: "Parziale",
  in_lavorazione: "In lavorazione",
  incompleto: "Incompleto",
  da_revisionare: "Da revisionare",
  pronto_per_validazione: "Pronto per validazione",
  validato_fuori_dall_app: "Validato fuori dall'app"
};

const STATUS_BADGE = {
  non_avviato: "",
  parziale: "warn",
  in_lavorazione: "",
  incompleto: "danger",
  da_revisionare: "warn",
  pronto_per_validazione: "ok",
  validato_fuori_dall_app: "ok"
};

function renderCompletionMapView() {
  const catalog = window.completionMapCatalog || { areas: [], summary: {} };
  const el = document.getElementById("completionMap");

  const areaCards = catalog.areas.map(area => {
    const badgeClass = STATUS_BADGE[area.status] || "";
    const statusLabel = STATUS_LABELS[area.status] || area.status;

    const presentItems = area.present.length > 0
      ? `<div class="cm-present"><strong>Cosa c'è:</strong> ${area.present.map(_esc).join(", ")}</div>`
      : "";
    const missingItems = area.missing.length > 0
      ? `<div class="cm-missing"><strong>Cosa manca:</strong> ${area.missing.map(_esc).join(", ")}</div>`
      : "";
    const evidenceItems = area.evidences.length > 0
      ? `<div class="cm-evidence"><strong>Evidenze:</strong> ${area.evidences.map(_esc).join(", ")}</div>`
      : "";
    const documentItems = area.documents.length > 0
      ? `<div class="cm-docs"><strong>Documenti:</strong> ${area.documents.map(_esc).join(", ")}</div>`
      : "";
    const linkItems = area.targetView
      ? `<button class="cm-link-btn" data-view="${_esc(area.targetView)}">${_esc(area.targetLabel || "Apri sezione")}</button>`
      : "";

    return `
      <div class="cm-area-card">
        <div class="cm-area-header">
          <h3>${_esc(area.title)}</h3>
          <span class="badge ${badgeClass}">${_esc(statusLabel)}</span>
        </div>
        <p class="cm-area-desc">${_esc(area.description)}</p>
        ${presentItems}
        ${missingItems}
        ${evidenceItems}
        ${documentItems}
        ${linkItems}
        <div class="cm-validation-note">${_esc(area.validationNote)}</div>
      </div>
    `;
  }).join("");

  el.innerHTML = `
    <div class="cm-container">
      <div class="cm-header">
        <h1>Mappa completamento curricolo</h1>
        <p class="cm-intro">
          Questa mappa mostra l'avanzamento del Curriculum di Istituto.
          Aiuta a capire cosa è fatto, cosa manca e cosa va validato.
          Non sostituisce la validazione umana/collegiale.
        </p>
      </div>

      <div class="cm-summary">
        <div class="cm-summary-item">
          <strong>${catalog.summary.totalAreas || 0}</strong>
          <span>Aree totali</span>
        </div>
        <div class="cm-summary-item">
          <strong>${catalog.summary.inProgress || 0}</strong>
          <span>In lavorazione</span>
        </div>
        <div class="cm-summary-item">
          <strong>${catalog.summary.partial || 0}</strong>
          <span>Parziali</span>
        </div>
        <div class="cm-summary-item">
          <strong>${catalog.summary.notStarted || 0}</strong>
          <span>Non avviate</span>
        </div>
        <div class="cm-summary-item">
          <strong>${catalog.summary.review || 0}</strong>
          <span>Da revisionare</span>
        </div>
      </div>

      <div class="cm-areas">
        ${areaCards}
      </div>

      <div class="cm-footer-notice">
        <p>
          La mappa è in sola lettura. La validazione ufficiale resta umana, collegiale o istituzionale.
          Nessun dato viene salvato o sincronizzato automaticamente.
        </p>
      </div>
    </div>
  `;

  el.querySelectorAll(".cm-link-btn").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.view));
  });
}
