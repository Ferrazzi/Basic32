/* =========================================================
   BASIC32 — Manual (CORE) robusto
   - Carica lingua da diversi nomi file possibili
   - Supporta export default [], export const commands = [], export const DATA = { it:[] }
   - Ricerca + tendina Index
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

function matchesQuery(cmd, q) {
  if (!q) return true;
  const hay = [cmd.nome, cmd.sintassi, cmd.sommario, cmd.categoria]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

/* ---------- Build tendina Index ---------- */
function buildIndexOptions() {
  const q = (searchBox.value || "").trim().toLowerCase();

  const items = currentData
    .filter(cmd => matchesQuery(cmd, q))
    .slice()
    .sort((a,b)=>a.nome.localeCompare(b.nome));

  const prev = indexSel.value;
  indexSel.innerHTML = `<option value="">— Select command —</option>` +
    items.map(cmd => `<option value="${escapeHTML(cmd.id)}">${escapeHTML(cmd.nome)}</option>`).join("");

  if ([...indexSel.options].some(o => o.value === prev)) indexSel.value = prev;
}

/* ---------- Render contenuto (tutte le sezioni) ---------- */
function renderContent() {
  contentEl.innerHTML = "";
  const items = currentData.slice().sort((a,b)=>a.nome.localeCompare(b.nome));

  for (const cmd of items) {
    const section = document.createElement("section");
    section.id = `cmd-${cmd.id}`;
    section.innerHTML = `
      <h2>${cmd.nome}</h2>
      ${cmd.sintassi ? `<p><strong>${i18n('Syntax')}:</strong> <code>${cmd.sintassi}</code></p>` : ""}
      ${cmd.sommario ? `<p><strong>${i18n('Summary')}:</strong> ${cmd.sommario}</p>` : ""}
      ${cmd.descrizione ? `<h3>${i18n('Description')}</h3><p>${cmd.descrizione}</p>` : ""}
      ${Array.isArray(cmd.esempi) && cmd.esempi.length ? `
        <h3>${i18n('Examples')}</h3>
        <div>${cmd.esempi.map(ex => `
          <pre><code>${escapeHTML(ex.code)}</code></pre>
          ${ex.note ? `<p class="hint">${escapeHTML(ex.note)}</p>` : "" }
        `).join("")}</div>
      ` : "" }
      ${cmd.note ? `<p class="hint">${cmd.note}</p>` : "" }
      <hr style="border:0;border-top:2px dashed var(--c64-border);opacity:.6;margin:14px 0;">
    `;
    contentEl.appendChild(section);
  }
}

/* ---------- i18n etichette base ---------- */
function i18n(key){
  const map = {
    Syntax:     { it: "Sintassi",    en: "Syntax" },
    Summary:    { it: "Sommario",    en: "Summary" },
    Description:{ it: "Descrizione", en: "Description" },
    Examples:   { it: "Esempi",      en: "Examples" }
  };
  return (map[key] && map[key][currentLang]) || key;
}

/* ---------- Focus su sezione da hash ---------- */
function focusHash(smooth = true){
  if (!location.hash) return;
  const target = document.getElementById(location.hash.slice(1));
  if (target){
    target.setAttribute("tabindex","-1");
    target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    target.focus({ preventScroll: true });
  }
}

/* ---------- Estrarre dati dal modulo importato ---------- */
function extractCommandsFromModule(mod, langCode){
  // 1) export default [] (preferito)
  if (Array.isArray(mod.default)) return mod.default;

  // 2) export const commands = []
  if (Array.isArray(mod.commands)) return mod.commands;

  // 3) export const DATA = { it:[], en:[] }
  if (mod.DATA && Array.isArray(mod.DATA[langCode])) return mod.DATA[langCode];

  return null;
}

/* ---------- Prova più nomi file per la lingua ---------- */
async function tryImportLanguage(code){
  // Ordine: stessa cartella, poi cartella "manual/"
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
      // continua con il prossimo
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
    renderContent();
    buildIndexOptions();

    const params = new URLSearchParams(location.search);
    params.set("lang", code);
    history.replaceState(null, "", `${location.pathname}?${params.toString()}${location.hash}`);

    if (location.hash) focusHash(false);
    // Log utile in console per capire quale file è stato effettivamente caricato
    console.info(`[manual-core] Loaded language "${code}" from: ${url}`);
  } catch (info) {
    // Messaggio chiaro a schermo
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

  // Ricerca → filtra le opzioni dell'indice
  searchBox.addEventListener("input", () => buildIndexOptions());

  // Cambio lingua
  langSel.addEventListener("change", () => loadLanguage(langSel.value));

  // Selezione dall'indice → vai alla sezione
  indexSel.addEventListener("change", () => {
    const id = indexSel.value;
    if (!id) return;
    const qs = new URLSearchParams(location.search);
    qs.set("lang", currentLang);
    const hash = `#cmd-${id}`;
    history.pushState(null, "", `${location.pathname}?${qs.toString()}${hash}`);
    focusHash();
  });

  window.addEventListener("hashchange", () => focusHash());
}

document.addEventListener("DOMContentLoaded", init);