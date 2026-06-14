/**
 * Modelli sorgente view - read-only template catalog
 * Extracted from APRI_MANAGER_CURRICOLO_ISTITUTO.html MGR-030B
 */

const WORK_PROFILE_FIELDS = [
  { id: "firstName", label: "Nome", placeholder: "Il tuo nome" },
  { id: "lastName", label: "Cognome", placeholder: "Il tuo cognome" },
  { id: "school", label: "Scuola / plesso", placeholder: "es. Primaria Don Lorenzo Milani" },
  { id: "orderLevel", label: "Ordine / livello", placeholder: "Infanzia, primaria, secondaria..." },
  { id: "discipline", label: "Disciplina / ambito", placeholder: "es. Italiano, matematica, sostegno..." },
  { id: "department", label: "Dipartimento / sezione / intersezione", placeholder: "es. Dipartimento STEM, sezione B..." }
];

const ROLE_OPTIONS = [
  { value: "", label: "Seleziona ruolo..." },
  { value: "docente", label: "Docente" },
  { value: "coordinatore", label: "Coordinatore dipartimento" },
  { value: "gruppo", label: "Gruppo curricolo" },
  { value: "staff", label: "Funzione strumentale" }
];

const PROFILE_STORAGE_KEY = "curriculumManager.userProfile";
const ONBOARDING_DISMISSED_KEY = "curriculumManager.onboardingDismissed";
const PROFILE_CONFIG_SEEN_KEY = "curriculumManager.profileConfigSeen";

// Utility functions (shared with app.js)
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

// SOURCE_TEMPLATE_CATALOG is loaded globally from sourceTemplateCatalog.js
// No init needed - catalog is already available as window.SOURCE_TEMPLATE_CATALOG

function renderModelliSorgenteView() {
  const el = document.getElementById("modelliSorgente");
  const profile = loadWorkProfile();
  const profileConfigSeen = localStorage.getItem(PROFILE_CONFIG_SEEN_KEY);
  const showProfileConfig = !hasWorkProfile(profile) && profileConfigSeen !== "true";
  const savedRole = profile.role || loadRolePath();
  const currentPhase = getCurrentPhase();
  const suggestedPath = getSuggestedPath(profile.role, profile);

  const onboardingSeen = localStorage.getItem(ONBOARDING_DISMISSED_KEY);
  const onboardingHtml = onboardingSeen ? "" : `
    <div class="card" id="onboardingCard" style="border-left:4px solid var(--primary); margin-bottom:20px">
      <h3>Benvenuto in Curriculum Manager</h3>
      <p style="margin-top:8px">Strumento read-only per la gestione curricolare dell'istituto. Segui il percorso guidato per iniziare.</p>
      <div class="toolbar" style="margin-top:12px">
        <button type="button" id="skipOnboardingButton" class="action secondary">Salta introduzione</button>
        <button type="button" id="startWorkflowButton" class="action" style="margin-left:8px">Inizia dal percorso guidato</button>
      </div>
    </div>
  `;

  el.innerHTML = `
    ${renderWorkProfileConfigCard(showProfileConfig, profile)}
    ${onboardingHtml}

    <div class="card" style="border-left:4px solid var(--primary); padding:18px; margin-bottom:20px">
      <span class="badge ok">Percorso guidato</span>
      <h2 style="margin-top:8px; margin-bottom:4px">Percorso di aggiornamento del curricolo</h2>
      <p class="simple-help">In base al tuo profilo di lavoro, puoi iniziare da qui.</p>
      <div class="toolbar" style="margin-top:14px">
        <button type="button" id="homePrimaryCta" class="action">Apri il percorso suggerito</button>
        <button type="button" id="homeRevisionCta" class="action secondary" style="margin-left:8px">Vai alla revisione</button>
      </div>
      <div class="grid cols-2" style="margin-top:18px">
        <div>
          <div class="template-meta" style="margin-bottom:8px">
            <span class="badge warn">${esc(suggestedPath.status)}</span>
            <span class="badge secondary">${esc(suggestedPath.title)}</span>
          </div>
          <p style="font-size:13px; margin:4px 0"><strong>Azione consigliata:</strong> ${esc(suggestedPath.doNow)}</p>
          <p style="font-size:13px; margin:4px 0"><strong>Output:</strong> ${esc(suggestedPath.deliver)}</p>
          <button type="button" id="currentPhaseCta" class="action secondary" style="font-size:12px; margin-top:8px">Vai alla fase</button>
        </div>
        <div>
          <div style="font-size:13px; margin-bottom:6px"><strong>Profilo:</strong> <span id="profileSummary">${renderProfileSummary(profile)}</span></div>
          <div style="font-size:13px; margin-bottom:6px"><strong>Ruolo:</strong> <span id="roleSummary">${renderRoleSummary(profile.role)}</span></div>
          ${renderSuggestedContext(profile)}
          <div class="toolbar" style="margin:0; gap:6px">
            <button type="button" id="editWorkProfileButton" class="action secondary" style="font-size:12px">Modifica profilo</button>
            <button type="button" id="resetWorkProfileButton" class="action secondary" style="font-size:12px; background:#fff0f0; border-color:#efb5b5; color:#912828">Reset profilo</button>
          </div>
          <div style="font-size:11px; color:var(--muted); margin-top:6px">Questi dati restano solo su questo dispositivo.</div>
        </div>
      </div>
    </div>

    <div class="card" style="margin-top:14px">
      <h3 style="font-size:16px; margin-top:0">Prossime azioni</h3>
      <p style="font-size:13px; color:var(--muted); margin-bottom:12px">Tre scelte semplici per continuare senza cercare dove andare.</p>
      <div class="toolbar" style="margin:0">
        <button type="button" id="activityDocumentsCta" class="action secondary">Consulta documenti</button>
        <button type="button" id="activityRevisionCta" class="action secondary" style="margin-left:8px">Apri revisione</button>
        <button type="button" id="activityMaterialsCta" class="action secondary" style="margin-left:8px">Prepara output</button>
      </div>
    </div>

    <div class="card" id="timelineSection" style="margin-top:14px; margin-bottom:16px">
      <h3 style="font-size:16px; margin-top:0">Dove sono nel percorso?</h3>
      <p style="font-size:13px; color:var(--muted)">Il sistema accompagna il lavoro dalla rilettura del curricolo alla preparazione dei materiali da consegnare.</p>
      <button type="button" class="action secondary" id="timelineToggleBtn">Mostra fasi lavoro</button>
      <div id="timelineDetail" style="display:none; margin-top:12px"></div>
    </div>

    <div class="grid cols-2" style="margin-top:14px">
      <div class="card">
        <h3 style="font-size:16px; margin-top:0">Il mio ruolo</h3>
        <select id="roleSelector" style="width:100%;padding:8px;font-size:14px;border-radius:8px;border:1px solid var(--line)">
          <option value="">Seleziona ruolo...</option>
          <option value="docente">Docente</option>
          <option value="coordinatore">Coordinatore dipartimento</option>
          <option value="gruppo">Gruppo curricolo</option>
          <option value="staff">Funzione strumentale</option>
        </select>
        <div id="roleDetails" style="margin-top:10px; font-size:12px; color:var(--muted)"></div>
      </div>
      <div class="card">
        <h3 style="font-size:16px; margin-top:0">Stato processo</h3>
        <div style="font-size:13px">
          <div class="row"><strong>Documenti disponibili</strong><span class="badge">10 documenti</span></div>
          <div class="row"><strong>Materiali</strong><span class="badge">10 sorgenti</span></div>
          <div class="row"><strong>Note locali</strong><span class="badge ok">0 attive</span></div>
        </div>
      </div>
    </div>

    <div class="card" id="templatesSection" style="display:none; margin-top:14px">
      <div class="toolbar no-print" style="margin-top:0">
        <h2 style="margin:0">Materiali di lavoro</h2>
        <button type="button" id="closeMaterialsButton" class="action secondary">Nascondi materiali</button>
      </div>
      <p class="simple-help">Materiali Markdown non ufficiali, da validare prima dell'uso.</p>

      <div class="notice warn">
        <strong>Attenzione:</strong> questi materiali sono basi di lavoro non ufficiali. Servono come punto di partenza e non sostituiscono la validazione dell'istituto scolastico.
      </div>

      <div class="notice">
        <strong>Dati personali:</strong> non inserire dati personali, dati identificativi, nomi reali di studenti, famiglie, docenti o istituzioni senza verifica e procedure autorizzate.
      </div>

      <div class="notice">
        <strong>Validazione umana:</strong> ogni documento compilato richiede validazione umana prima di essere considerato bozza, revisionato, validato o approvato.
      </div>

      <div class="notice">
        <strong>Limitazione tecnica:</strong> questa sezione non genera DOCX o PDF e non modifica il motore di export. I materiali sono file Markdown sorgente da aprire e compilare manualmente.
      </div>

      <div class="notice warn">
        <strong>Riferimenti normativi:</strong> il riferimento ad AgID e alle fonti normative ha valore prudenziale per leggibilità, accessibilità e chiarezza documentale; non costituisce certificazione di conformità.
      </div>

      <div class="card" style="margin-top:14px">
        <h3>Come usare questi materiali</h3>
        <ol>
          <li>Scegli il materiale di lavoro più vicino al documento da preparare.</li>
          <li>Apri o copia il percorso del file Markdown.</li>
          <li>Compila una copia del modello, mantenendo placeholder e avvisi finché il contenuto non è verificato.</li>
          <li>Esegui la validazione umana e normativa secondo le procedure dell'istituto.</li>
          <li>Usa il Manager principale per documenti istituzionali prodotti.</li>
        </ol>
        <div class="notice" style="margin-top:10px">
          <strong>Materiali di lavoro</strong> = base Markdown non ufficiale. <strong>Documenti</strong> = area di lavoro per documenti verificati.
        </div>
      </div>

      <div class="institutional-template-grid">
        ${SOURCE_TEMPLATE_CATALOG.map(renderTemplateCard).join("")}
      </div>
    </div>
  `;

  bindHomeEvents();
  bindWorkProfileEvents();

  const roleSelector = document.getElementById("roleSelector");
  if (roleSelector) {
    roleSelector.value = savedRole;
    roleSelector.addEventListener("change", () => saveRolePath(roleSelector.value));
  }
  renderRoleDetails(savedRole);
}

function renderTemplateCard(t) {
  return `
    <article class="institutional-template-card">
      <h3>${esc(t.title)}</h3>
      <div class="template-meta">
        <span class="badge">${esc(t.category)}</span>
        <span class="badge warn">MATERIALE DI LAVORO — DA VALIDARE</span>
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

function renderWorkProfileConfigCard(show, currentProfile) {
  if (!show) return "";
  const profile = currentProfile || {};

  const textFields = WORK_PROFILE_FIELDS.map(field => `
    <label style="display:block; margin-bottom:10px">
      <strong>${esc(field.label)}</strong>
      <input type="text" name="${esc(field.id)}" value="${esc(profile[field.id] || "")}" placeholder="${esc(field.placeholder)}" style="width:100%; margin-top:4px; padding:8px; border:1px solid var(--line); border-radius:8px; font-size:14px">
    </label>
  `).join("");

  const roleOptions = ROLE_OPTIONS.map(opt => `
    <option value="${opt.value}" ${profile.role === opt.value ? "selected" : ""}>${opt.label}</option>
  `).join("");

  return `
    <div class="card" id="workProfileConfigCard" style="border-left:4px solid var(--primary); margin-bottom:20px">
      <h3>Configura il tuo profilo di lavoro</h3>
      <p style="margin-top:8px">Poche risposte aiutano il Manager a suggerirti il percorso più utile. Il profilo resta solo in questo browser: niente login, niente invio dati.</p>
      <form id="workProfileForm" style="margin-top:12px">
        <div class="grid cols-2">
          ${textFields}
          <label style="display:block; margin-bottom:10px">
            <strong>Ruolo di lavoro</strong>
            <select name="role" style="width:100%; margin-top:4px; padding:8px; border:1px solid var(--line); border-radius:8px; font-size:14px">
              ${roleOptions}
            </select>
          </label>
        </div>
        <div class="toolbar" style="margin-top:12px">
          <button type="submit" class="action">Salva profilo</button>
          <button type="button" id="skipWorkProfileButton" class="action secondary">Salta per ora</button>
        </div>
      </form>
    </div>
  `;
}

function renderReadableWorkProfile(profile) {
  const roleTitle = getRolePath(profile.role)?.title || "Percorso da definire";
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "Da configurare";
  const percorso = [roleTitle, profile.discipline].filter(Boolean).join(" / ") || "Da configurare";

  if (!hasWorkProfile(profile)) {
    return `<p style="font-size:13px; color:var(--muted); margin:0">Profilo non ancora configurato. Puoi compilarlo quando vuoi.</p>`;
  }

  const lines = [
    ["Nome", fullName],
    ["Scuola/plesso", profile.school],
    ["Ordine", profile.orderLevel],
    ["Ambito", profile.discipline],
    ["Percorso", percorso]
  ].filter(([, value]) => value).map(([label, value]) => `
    <div style="display:grid; grid-template-columns: 130px minmax(0, 1fr); gap:8px; margin-bottom:6px">
      <span style="color:var(--muted)">${esc(label)}</span>
      <strong>${esc(value)}</strong>
    </div>
  `).join("");

  return `
    <div style="font-size:13px; margin-bottom:8px">
      ${lines}
      <div style="display:grid; grid-template-columns: 130px minmax(0, 1fr); gap:8px; margin-top:8px">
        <span style="color:var(--muted)">Privacy</span>
        <strong>Resta locale: non viene inviato a server esterni.</strong>
      </div>
    </div>
  `;
}

function renderProfileSummary(profile) {
  const parts = [profile.school, profile.orderLevel].filter(Boolean);
  return parts.length > 0 ? esc(parts.join(" / ")) : '<span style="color:var(--muted)">Non configurato</span>';
}

function renderRoleSummary(roleId) {
  if (!roleId) return '<span style="color:var(--muted)">Seleziona ruolo</span>';
  const role = window.ROLE_WORK_PATHS_CATALOG?.find(r => r.id === roleId);
  return role ? esc(role.title) : esc(roleId);
}

function getSuggestedPath(roleId, profile) {
  const role = window.ROLE_WORK_PATHS_CATALOG?.find(r => r.id === roleId);
  if (!roleId) {
    return {
      title: "Orientamento",
      status: "Profilo non configurato",
      doNow: "Completa il profilo per ricevere un orientamento più preciso.",
      deliver: "Quadro delle aree da aggiornare.",
      action: "modelliSorgente"
    };
  }
  return {
    title: role.title,
    status: "Pronto",
    doNow: role.objective,
    deliver: role.output,
    action: role.actions?.[0] || "matriceRevisione"
  };
}

function renderSuggestedContext(profile) {
  if (!profile.role && !profile.discipline) return "";
  const parts = [];
  if (profile.discipline) parts.push(`<div style="font-size:12px; margin-bottom:4px"><strong>Ambito:</strong> ${esc(profile.discipline)}</div>`);
  if (profile.school) parts.push(`<div style="font-size:12px; margin-bottom:4px"><strong>Scuola:</strong> ${esc(profile.school)}</div>`);
  if (profile.orderLevel) parts.push(`<div style="font-size:12px; margin-bottom:4px"><strong>Ordine:</strong> ${esc(profile.orderLevel)}</div>`);
  return `<div style="margin-top:8px; padding-top:8px; border-top:1px solid var(--line)">${parts.join("")}</div>`;
}

function getCurrentPhase() {
  const phase = (window.PROCESS_TIMELINE_CATALOG || [])[0];
  if (!phase) {
    return {
      title: "Avvio",
      status: "Da avviare",
      doNow: "Seleziona il tuo ruolo per vedere il percorso suggerito.",
      deliver: "Quadro delle aree da aggiornare.",
      action: "modelliSorgente"
    };
  }

  return {
    title: phase.title,
    status: phase.status,
    doNow: phase.activity,
    deliver: phase.output,
    action: phase.action
  };
}

function bindHomeEvents() {
   const skipOnboarding = document.getElementById("skipOnboardingButton");
   if (skipOnboarding) skipOnboarding.addEventListener("click", skipOnboardingHandler);

   const startWorkflowButton = document.getElementById("startWorkflowButton");
   if (startWorkflowButton) startWorkflowButton.addEventListener("click", startWorkflow);

   const homePrimary = document.getElementById("homePrimaryCta");
   if (homePrimary) homePrimary.addEventListener("click", openHomeGuidedPath);

   const homeRevision = document.getElementById("homeRevisionCta");
   if (homeRevision) homeRevision.addEventListener("click", () => showView("matriceRevisione"));

   const currentPhaseCta = document.getElementById("currentPhaseCta");
   if (currentPhaseCta) currentPhaseCta.addEventListener("click", () => {
     const profile = loadWorkProfile();
     const path = getSuggestedPath(profile.role, profile);
     showView(path.action);
   });

   const timelineBtn = document.getElementById("timelineToggleBtn");
   if (timelineBtn) timelineBtn.addEventListener("click", toggleTimeline);

   const activityDocuments = document.getElementById("activityDocumentsCta");
   if (activityDocuments) activityDocuments.addEventListener("click", () => showView("documentiIstituzionali"));

   const activityRevision = document.getElementById("activityRevisionCta");
   if (activityRevision) activityRevision.addEventListener("click", () => showView("matriceRevisione"));

   const activityMaterials = document.getElementById("activityMaterialsCta");
   if (activityMaterials) activityMaterials.addEventListener("click", toggleMaterialsSection);

   const closeMaterials = document.getElementById("closeMaterialsButton");
   if (closeMaterials) closeMaterials.addEventListener("click", toggleMaterialsSection);
 }

function bindWorkProfileEvents() {
  const form = document.getElementById("workProfileForm");
  if (form) form.addEventListener("submit", saveWorkProfileFromForm);

  const skipButton = document.getElementById("skipWorkProfileButton");
  if (skipButton) skipButton.addEventListener("click", skipWorkProfileConfig);

  const resetButton = document.getElementById("resetWorkProfileButton");
  if (resetButton) resetButton.addEventListener("click", resetWorkProfile);

  const editButton = document.getElementById("editWorkProfileButton");
  if (editButton) editButton.addEventListener("click", openWorkProfileConfig);
}

function openHomeGuidedPath() {
   const profile = loadWorkProfile();
   const path = getSuggestedPath(profile.role, profile);
   showView(path.action);
 }

function toggleMaterialsSection() {
  const section = document.getElementById("templatesSection");
  if (!section) return;
  const willOpen = section.style.display === "none";
  section.style.display = willOpen ? "block" : "none";
  if (willOpen) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setTimelineVisible(visible) {
  const detail = document.getElementById("timelineDetail");
  const btn = document.getElementById("timelineToggleBtn");
  if (!detail || !btn) return;
  detail.style.display = visible ? "block" : "none";
  btn.textContent = visible ? "Nascondi fasi lavoro" : "Mostra fasi lavoro";
  if (visible) renderProcessTimeline();
}

// Onboarding functions - client-side, skippable
function skipOnboardingHandler() {
  localStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
  document.getElementById("onboardingCard").style.display = "none";
}

function startWorkflow() {
  localStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
  showView("matriceRevisione");
  setTimeout(() => {
    const workflowBtn = document.querySelector("button[onclick='toggleWorkflow()']");
    if (workflowBtn) workflowBtn.click();
  }, 300);
}

function showOnboarding() {
  localStorage.removeItem(ONBOARDING_DISMISSED_KEY);
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
  const profile = loadWorkProfile();
  return profile.role || "";
}

function saveRolePath(roleId) {
  const profile = loadWorkProfile();
  profile.role = roleId;
  saveWorkProfile(profile);
  renderRoleDetails(roleId);
}

function renderRoleDetails(roleId) {
  const path = window.ROLE_WORK_PATHS_CATALOG?.find(r => r.id === roleId);
  const detailsEl = document.getElementById("roleDetails");
  if (path && detailsEl) {
    detailsEl.innerHTML = `<strong>Obiettivo:</strong> ${esc(path.objective)}<br><strong>Materiale da consegnare:</strong> ${esc(path.output)}`;
  } else if (detailsEl) {
    detailsEl.innerHTML = "";
  }
}

function toggleTimeline() {
  const detail = document.getElementById("timelineDetail");
  setTimelineVisible(detail.style.display === "none");
}

function renderProcessTimeline() {
  const catalog = window.PROCESS_TIMELINE_CATALOG || [];
  const el = document.getElementById("timelineDetail");
  el.innerHTML = catalog.map((phase, idx) => `
    <div style="padding:10px; border-left:3px solid var(--primary); margin-bottom:10px; background:var(--panel)">
      <strong>${idx + 1}. ${esc(phase.title)}</strong>
      <p style="margin:4px 0; font-size:13px">${esc(phase.objective)}</p>
      <span class="badge warn" style="font-size:11px">${esc(phase.status)}</span>
      <button type="button" class="action secondary" style="margin-left:8px; font-size:11px" onclick="showView('${phase.action}')">Vai alla fase</button>
    </div>
  `).join("");
}

function loadWorkProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveWorkProfile(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

function hasWorkProfile(profile) {
  return WORK_PROFILE_FIELDS.some(field => Boolean(profile[field.id]));
}

function saveWorkProfileFromForm(event) {
  event.preventDefault();
  const form = event.target;
  const profile = {};
  WORK_PROFILE_FIELDS.forEach(field => {
    profile[field.id] = form.elements[field.id].value.trim();
  });
  if (form.elements.role) {
    profile.role = form.elements.role.value;
  }
  saveWorkProfile(profile);
  localStorage.setItem(PROFILE_CONFIG_SEEN_KEY, "true");
  renderModelliSorgenteView();
}

function skipWorkProfileConfig() {
  localStorage.setItem(PROFILE_CONFIG_SEEN_KEY, "true");
  renderModelliSorgenteView();
}

function openWorkProfileConfig() {
  localStorage.removeItem(PROFILE_CONFIG_SEEN_KEY);
  renderModelliSorgenteView();
}

function resetWorkProfile() {
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  localStorage.removeItem(PROFILE_CONFIG_SEEN_KEY);
  renderModelliSorgenteView();
}

function getRolePath(roleId) {
  return window.ROLE_WORK_PATHS_CATALOG?.find(r => r.id === roleId);
}
