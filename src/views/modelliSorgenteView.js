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
  el.innerHTML = `
    <div class="card">
      <h2>Modelli sorgente istituzionali</h2>
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