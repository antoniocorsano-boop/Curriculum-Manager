/**
 * Modelli sorgente view - read-only template catalog
 * Extracted from APRI_MANAGER_CURRICOLO_ISTITUTO.html MGR-030B
 */

// Import catalog - will be loaded via script tag in index.html
let SOURCE_TEMPLATE_CATALOG = [];

function initSourceTemplateCatalog(catalog) {
  SOURCE_TEMPLATE_CATALOG = catalog || [];
}

function renderModelliSorgenteView() {
   const el = document.getElementById("modelliSorgente");

const onboardingSeen = localStorage.getItem("cmOnboardingSeen");
    const onboardingHtml = onboardingSeen ? "" : `
      <div class="card" id="onboardingCard" style="border-left:4px solid var(--primary); margin-bottom:20px">
        <h3>Benvenuto in Curriculum Manager</h3>
        <p style="margin-top:8px">Strumento read-only per la gestione curricolare dell'istituto. Segui il percorso guidato per iniziare.</p>
        <div class="toolbar" style="margin-top:12px">
          <button type="button" class="action secondary" onclick="skipOnboarding()">Salta introduzione</button>
          <button type="button" class="action" style="margin-left:8px" onclick="startWorkflow()">Inizia dal percorso guidato</button>
        </div>
      </div>
    `;

    // Pre-select saved role
    const savedRole = loadRolePath();

    el.innerHTML = `
      ${onboardingHtml}
      <div class="card">
        <h2>Dashboard Curriculum Manager</h2>
        <p class="simple-help">Stato processo curricolare e azioni rapide.</p>

<div class="grid cols-2">
           <div>
             <div class="card">
               <h3 style="font-size:16px; margin-top:0">Stato processo</h3>
               <div class="row"><strong>Documenti</strong><span class="badge">10 in catalogo</span></div>
               <div class="row"><strong>Template</strong><span class="badge">10 sorgenti</span></div>
               <div class="row"><strong>Note locali</strong><span class="badge ok">0 attive</span></div>
             </div>
           </div>
           <div>
             <div class="card">
               <h3 style="font-size:16px; margin-top:0">Il mio ruolo</h3>
               <select id="roleSelector" onchange="saveRolePath(this.value)" style="width:100%;padding:8px;font-size:14px;border-radius:8px;border:1px solid var(--line)">
                 <option value="">Seleziona ruolo...</option>
                 <option value="docente">Docente</option>
                 <option value="coordinatore">Coordinatore dipartimento</option>
                 <option value="gruppo">Gruppo curricolo</option>
                 <option value="staff">Funzione strumentale</option>
               </select>
               <div id="roleDetails" style="margin-top:10px; font-size:12px; color:var(--muted)"></div>
             </div>
           </div>
         </div>

        <h2 style="margin-top:20px">Modelli sorgente istituzionali</h2>
        <p class="simple-help">Template Markdown non ufficiali, da validare prima dell'uso.</p>

      <div class="notice warn">
        <strong>Attenzione:</strong> questi modelli sono sorgenti non ufficiali. Servono come base di lavoro e non sostituiscono la validazione dell'istituto scolastico.
      </div>

      <div class="notice">
        <strong>Dati personali:</strong> non inserire dati personali, dati identificativi, nomi reali di studenti, famiglie, docenti o istituzioni senza verifica e procedure autorizzate.
      </div>

      <div class="notice">
        <strong>Validazione umana:</strong> ogni documento compilato richiede validazione umana prima di essere considerato bozza, revisionato, validato o approvato.
      </div>

      <div class="notice">
        <strong>Limitazione tecnica:</strong> questa sezione non genera DOCX o PDF e non modifica il motore di export. I template sono file Markdown sorgente da aprire e compilare manualmente.
      </div>

      <div class="notice warn">
        <strong>Riferimenti normativi:</strong> il riferimento ad AgID e alle fonti normative ha valore prudenziale per leggibilità, accessibilità e chiarezza documentale; non costituisce certificazione di conformità.
      </div>

      <div class="card" style="margin-top:14px">
        <h3>Come usare questi modelli</h3>
        <ol>
          <li>Scegli il modello sorgente più vicino al documento da preparare.</li>
          <li>Apri o copia il percorso del file Markdown.</li>
          <li>Compila una copia del modello, mantenendo placeholder e avvisi finché il contenuto non è verificato.</li>
          <li>Esegui la validazione umana e normativa secondo le procedure dell'istituto.</li>
          <li>Usa il Manager principale per documenti istituzionali prodotti.</li>
        </ol>
        <div class="notice" style="margin-top:10px">
          <strong>Modelli sorgente</strong> = base Markdown non ufficiale. <strong>Documenti istituzionali</strong> = area di lavoro/export per documenti verificati.
        </div>
      </div>

      <div class="institutional-template-grid">
        ${SOURCE_TEMPLATE_CATALOG.map(renderTemplateCard).join("")}
      </div>
    </div>
  `;
}

function renderTemplateCard(t) {
  return `
    <article class="institutional-template-card">
      <h3>${esc(t.title)}</h3>
      <div class="template-meta">
        <span class="badge">${esc(t.category)}</span>
        <span class="badge warn">TEMPLATE SORGENTE — NON UFFICIALE</span>
      </div>
      <p>${esc(t.description)}</p>
      <div class="template-sections">
        <strong>Percorso:</strong>
        <span class="path-pill" title="${esc(t.path)}">${esc(t.path)}</span>
      </div>
      <div class="toolbar">
        <button type="button" class="action secondary mini" onclick="copyPath('${jsAttr(t.path)}')">Copia percorso</button>
      </div>
      <div class="notice warn" style="margin-top:10px">
        <strong>Richiede validazione umana</strong>
      </div>
    </article>
  `;
}

// Onboarding functions - client-side, skippable
function skipOnboarding() {
  localStorage.setItem("cmOnboardingSeen", "true");
  document.getElementById("onboardingCard").style.display = "none";
}

function startWorkflow() {
  localStorage.setItem("cmOnboardingSeen", "true");
  showView("matriceRevisione");
  setTimeout(() => {
    const workflowBtn = document.querySelector("button[onclick='toggleWorkflow()']");
    if (workflowBtn) workflowBtn.click();
  }, 300);
}

function showOnboarding() {
  localStorage.removeItem("cmOnboardingSeen");
  renderModelliSorgenteView();
}

// Copy path handler - simple implementation
function copyPath(path) {
  navigator.clipboard.writeText(path).then(() => {
    const statusbar = document.getElementById("statusbar");
    if (statusbar) statusbar.textContent = "Percorso copiato: " + path;
    setTimeout(() => {
      if (statusbar) statusbar.textContent = "Pronto";
    }, 2000);
  }).catch(() => {
    alert("Non riesco a copiare. Percorso: " + path);
  });
}

// Role work paths - client-side, no auth
function loadRolePath() {
  return localStorage.getItem("cmRolePath") || "";
}

function saveRolePath(roleId) {
  localStorage.setItem("cmRolePath", roleId);
  const path = window.ROLE_WORK_PATHS_CATALOG?.find(r => r.id === roleId);
  const detailsEl = document.getElementById("roleDetails");
  if (path && detailsEl) {
    detailsEl.innerHTML = `<strong>Obiettivo:</strong> ${path.objective}<br><strong>Output:</strong> ${path.output}`;
  } else if (detailsEl) {
    detailsEl.innerHTML = "";
  }
}