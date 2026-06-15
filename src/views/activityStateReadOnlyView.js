/**
 * Activity State Read-Only View
 * Vanilla JS, no dependencies
 */

const activityStateCatalog = window.activityStateFixtureCatalog || { activities: [], states: [] };

function renderActivityStateReadOnlyView() {
  const el = document.getElementById("activityStateReadOnly");
  if (!el) return;

  const stateLookup = new Map((activityStateCatalog.states || []).map((s) => [s.state, s.label || s.state]));

  const cards = (activityStateCatalog.activities || [])
    .map((act) => {
      const badge = stateLookup.get(act.state) || act.state;
      const evidence = Array.isArray(act.evidenceRefs) && act.evidenceRefs.length
        ? `<div class="as-evidence"><strong>Evidenze:</strong> ${act.evidenceRefs.map(esc).join(", ")}</div>`
        : "";
      const blocked = act.blockedReason
        ? `<div class="as-blocked"><strong>Motivo blocco:</strong> ${esc(act.blockedReason)}</div>`
        : "";
      const note = act.validationStatus === "approved"
        ? `<div class="as-validation-note">Validazione registrata da persona autorizzata (dato di esempio).</div>`
        : act.validationRequired
        ? `<div class="as-validation-note">Validazione umana richiesta.</div>`
        : "";

      return `
        <div class="card as-card">
          <div class="as-header">
            <h3>${esc(act.title)}</h3>
            <span class="badge as-badge">${esc(badge)}</span>
          </div>
          <p class="as-area">${esc(act.area || "")}</p>
          <p class="as-desc">${esc(act.stateDescription || "")}</p>
          ${evidence}
          ${blocked}
          ${note}
          <div class="as-readonly-notice">Dati di esempio, sola lettura. Nessun salvataggio o validazione automatica.</div>
        </div>
      `;
    })
    .join("");

  el.innerHTML = `
    <div class="as-container">
      <div class="as-header-section">
        <h1>Stati attività</h1>
        <p class="as-intro">
          Veste informativa di example data. Mostra gli stati attività del Curriculum di Istituto.
          Non sostituisce la validazione ufficiale, non è un registro e non salva alcun dato.
        </p>
      </div>

      <div class="as-legend">
        <span class="as-legend-item"><span class="as-dot as-dot-orientation"></span> Orientamento</span>
        <span class="as-legend-item"><span class="as-dot as-dot-work"></span> Lavoro</span>
        <span class="as-legend-item"><span class="as-dot as-dot-review"></span> Revisione</span>
        <span class="as-legend-item"><span class="as-dot as-dot-ready"></span> Pronta per controllo umano</span>
        <span class="as-legend-item"><span class="as-dot as-dot-validated"></span> Validata da persona autorizzata</span>
        <span class="as-legend-item"><span class="as-dot as-dot-blocked"></span> Bloccata</span>
        <span class="as-legend-item"><span class="as-dot as-dot-na"></span> Non applicabile</span>
      </div>

      <div class="as-cards">
        ${cards}
      </div>

      <div class="as-footer-notice">
        <p>
          Questa vista è solo un esempio statico. Lo stato non viene salvato, né sincronizzato, né validato automaticamente.
          La validazione resta umana, collegiale o istituzionale.
        </p>
      </div>
    </div>
  `;
}
