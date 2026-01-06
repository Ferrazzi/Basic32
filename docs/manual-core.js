/* =========================================================
   BASIC32 — Manual (CORE) robusto
   - Carica lingua da diversi nomi file possibili
   - Supporta export default [], export const commands = [], export const DATA = { it:[] }
   - Ricerca + tendina Index
   - SINGLE VIEW: mostra 1 comando/introduzione alla volta (no scroll su pagina lunga)
   ========================================================= */

const $  = (sel, ctx = document) => ctx.querySelector(sel);

const langSel    = $("#lang");
const searchBox  = $("#search");
const indexSel   = $("#index");
const contentEl  = $("#manual-content");

let currentLang = "it";
let currentData = []; // array comandi lingua corrente

/* ---------- Utilità ---------- */
function escapeHTML(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;");
}

// per ricerca su comandi
function matchesQuery(cmd, q) {
  if (!q) return true;
  const hay = [cmd.nome, cmd.sintassi, cmd.sommario, cmd.categoria]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

// per ricerca su introduzioni (titolo + contenuto testuale base)
function matchesIntroQuery(intro, q) {
  if (!q) return true;
  const hay = [intro.titolo, intro.nome, intro.contenuto]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

function setHint(){
  contentEl.innerHTML = `<p class="hint">Seleziona un comando o una sezione di introduzione dall’indice, oppure usa la ricerca.</p>`;
}

/* ---------- i18n etichette base ---------- */
function i18n(key){
  const map = {
    Syntax:      { it: "Sintassi",    en: "Syntax" },
    Summary:     { it: "Sommario",    en: "Summary" },
    Description: { it: "Descrizione", en: "Description" },
    Examples:    { it: "Esempi",      en: "Examples" },
    Notes:       { it: "Note",        en: "Notes" },
    Intro:       { it: "Introduzione", en: "Introduction" },
    Commands:    { it: "Comandi",      en: "Commands" },
  };
  return (map[key] && map[key][currentLang]) || key;
}

/* =========================================================
   INDEX: ora include INTRO + COMANDI (con optgroup)
   - value prefissati per evitare collisioni: "intro:<id>" e "cmd:<id>"
   ========================================================= */
function buildIndexOptions() {
  const q = (searchBox.value || "").trim().toLowerCase();
  const prev = indexSel.value;

  const intros = currentData
    .filter(x => x.tipo === "introduzione")
    .filter(x => matchesIntroQuery(x, q))
    .slice()
    .sort((a, b) => String(a.titolo || a.nome || "").localeCompare(String(b.titolo || b.nome || "")));

  const cmds = currentData
    .filter(x => x.tipo !== "introduzione")
    .filter(x => matchesQuery(x, q))
    .slice()
    .sort((a, b) => a.nome.localeCompare(b.nome));

  // build HTML con optgroup
  let html = `<option value="">— Select item —</option>`;

  if (intros.length) {
    html += `<optgroup label="${escapeHTML(i18n("Intro"))}">` +
      intros.map(intro => {
        const id = intro.id ?? intro.nome ?? intro.titolo; // fallback robusto
        const label = intro.titolo || intro.nome || "Introduzione";
        return `<option value="intro:${escapeHTML(String(id))}">${escapeHTML(String(label))}</option>`;
      }).join("") +
    `</optgroup>`;
  }

  if (cmds.length) {
    html += `<optgroup label="${escapeHTML(i18n("Commands"))}">` +
      cmds.map(cmd =>
        `<option value="cmd:${escapeHTML(cmd.id)}">${escapeHTML(cmd.nome)}</option>`
      ).join("") +
    `</optgroup>`;
  }

  indexSel.innerHTML = html;

  // ripristina selezione se ancora presente
  if ([...indexSel.options].some(o => o.value === prev)) indexSel.value = prev;
}

/* =========================================================
   RENDER: SINGLE VIEW
   - mostra SOLO l'item selezionato
   ========================================================= */
function renderIntro(intro){
  const title = intro.titolo || intro.nome || i18n("Intro");
  contentEl.innerHTML = `
    <section class="manual-single" id="intro-view">
      <h2>${escapeHTML(title)}</h2>
      <div class="intro-text">${intro.contenuto || ""}</div>
    </section>
  `;
  contentEl.focus();
}

function renderCommand(cmd){
  contentEl.innerHTML = `
    <section class="manual-single" id="cmd-view">
      <h2>${escapeHTML(cmd.nome)}</h2>
      ${cmd.sintassi ? `<p><strong>${escapeHTML(i18n('Syntax'))}:</strong> <code>${escapeHTML(cmd.sintassi)}</code></p>` : ""}
      ${cmd.sommario ? `<p><strong>${escapeHTML(i18n('Summary'))}:</strong> ${escapeHTML(cmd.sommario)}</p>` : ""}
      ${cmd.descrizione ? `<h3>${escapeHTML(i18n('Description'))}</h3><p>${escapeHTML(cmd.descrizione)}</p>` : ""}
      ${Array.isArray(cmd.esempi) && cmd.esempi.length ? `
        <h3>${escapeHTML(i18n('Examples'))}</h3>
        <div>
          ${cmd.esempi.map(ex => `
            <pre><code>${escapeHTML(ex.code)}</code></pre>
            ${ex.note ? `<p class="hint">${escapeHTML(ex.note)}</p>` : "" }
          `).join("")}
        </div>
      ` : ""}
      ${cmd.note ? `<h3>${escapeHTML(i18n('Notes'))}</h3><p class="hint">${escapeHTML(cmd.note)}</p>` : ""}
    </section>
  `;
  contentEl.focus();
}

function renderSelection(value){
  if (!value) { setHint(); return; }

  const [kind, rawId] = String(value).split(":");
  const id = rawId ?? "";

  if (kind === "intro") {
    // supporta intro con id o fallback su titolo/nome
    const intro = currentData.find(x =>
      x.tipo === "introduzione" &&
      String(x.id ?? x.nome ?? x.titolo) === String(id)
    );
    if (intro) return renderIntro(intro);
  }

  if (kind === "cmd") {
    const cmd = currentData.find(x => x.tipo !== "introduzione" && String(x.id) === String(id));
    if (cmd) return renderCommand(cmd);
  }

  // se non trovato
  setHint();
}

/* =========================================================
   HASH: invece di scroll, apre la vista singola
   - supporta #cmd-RUN e #intro-qualcosa
   ========================================================= */
function applyHashToView(){
  if (!location.hash) return;

  const h = location.hash.slice(1); // es: "cmd-RUN" o "intro-intro1"
  if (h.startsWith("cmd-")) {
    const id = h.slice(4);
    const v = `cmd:${id}`;
    indexSel.value = v;
    renderSelection(v);
    return;
  }
  if (h.startsWith("intro-")) {
    const id = h.slice(6);
    const v = `intro:${id}`;
    indexSel.value = v;
    renderSelection(v);
    return;
  }
}

/* ---------- Estrarre dati dal modulo importato ---------- */
function extractCommandsFromModule(mod, langCode){
  if (Array.isArray(mod.default)) return mod.default;
  if (Array.isArray(mod.commands)) return mod.commands;
  if (mod.DATA && Array.isArray(mod.DATA[langCode])) return mod.DATA[langCode];
  return null;
}

/* ---------- Prova più nomi file per la lingua ---------- */
async function tryImportLanguage(code){
  const candidates = [
    `./manual.${code}.js`,
    `./manual-${code}.js`,
    `./manual${code.toUpperCase()}.js`,
    `./manual${code[0].toUpperCase()+code.slice(1)}.js`,
    `manual/manual.${code}.js`,
    `manual/manual-${code}.js`,
    `manual/manual${code.toUpperCase()}.js`,
    `manual/manual${code[0].toUpperCase()+code.slice(1)}.js`,
  ];

  const tried = [];
  for (const url of candidates) {
    try {
      const mod = await import(url);
      const data = extractCommandsFromModule(mod, code);
      if (!data) throw new Error("Module found but no commands array exported.");
      return { data, url };
    } catch (e) {
      tried.push({ url, error: String(e.message || e) });
    }
  }
  throw { tried };
}

/* ---------- Caricamento lingua (robusto) ---------- */
async function loadLanguage(code){
  try {
    const { data, url } = await tryImportLanguage(code);

    currentLang = code;
    currentData = data;

    langSel.value = code;

    // SINGLE VIEW: non renderizzare tutto, solo hint (o hash)
    setHint();
    buildIndexOptions();

    const params = new URLSearchParams(location.search);
    params.set("lang", code);
    history.replaceState(null, "", `${location.pathname}?${params.toString()}${location.hash}`);

    if (location.hash) applyHashToView();

    console.info(`[manual-core] Loaded language "${code}" from: ${url}`);
  } catch (info) {
    const list = (info?.tried || []).map(t => `• ${escapeHTML(t.url)}`).join("<br>");
    contentEl.innerHTML = `
      <p class="noscript">Unable to load language "<strong>${escapeHTML(code)}</strong>".</p>
      <p class="hint">I tried these files (same origin required):<br>${list || "(no candidates)"}<br><br>
      Make sure one of them exists and exports either <code>export default [...]</code>, or
      <code>export const commands=[...]</code>, or <code>export const DATA={ ${escapeHTML(code)}:[...] }</code>.
      </p>
    `;
    console.error("[manual-core] Failed to load language", code, info);
  }
}

/* ---------- Event wiring ---------- */
function init(){
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") || langSel.value || "it";

  loadLanguage(lang);

  searchBox.addEventListener("input", () => buildIndexOptions());

  langSel.addEventListener("change", () => loadLanguage(langSel.value));

  // Selezione dall'indice → SINGLE VIEW + hash
  indexSel.addEventListener("change", () => {
    const v = indexSel.value;
    if (!v) { setHint(); return; }

    const qs = new URLSearchParams(location.search);
    qs.set("lang", currentLang);

    const [kind, id] = v.split(":");
    const hash = kind === "intro" ? `#intro-${id}` : `#cmd-${id}`;

    history.pushState(null, "", `${location.pathname}?${qs.toString()}${hash}`);
    renderSelection(v);
  });

  window.addEventListener("hashchange", () => applyHashToView());
}

document.addEventListener("DOMContentLoaded", init);
