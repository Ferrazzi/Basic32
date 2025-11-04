/* =========================================================
   BASIC32 — Manual (CORE)
   - Lingua dinamica: ./manual.<lang>.js
   - Ricerca testo, tendina "Index" con tutti i comandi (filtrata dalla ricerca)
   - Deep link #cmd-<id> e ?lang=<code>
   ========================================================= */

const $  = (sel, ctx = document) => ctx.querySelector(sel);

const langSel    = $("#lang");
const searchBox  = $("#search");
const indexSel   = $("#index");
const contentEl  = $("#manual-content");

let currentLang = "it";
let currentData = []; // array di comandi della lingua corrente

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

/* ---------- Popola la tendina "Index" ---------- */
function buildIndexOptions() {
  const q = (searchBox.value || "").trim().toLowerCase();

  const items = currentData
    .filter(cmd => matchesQuery(cmd, q))
    .slice()
    .sort((a,b)=>a.nome.localeCompare(b.nome));

  const prev = indexSel.value;
  indexSel.innerHTML = `<option value="">— Select command —</option>` +
    items.map(cmd => `<option value="${escapeHTML(cmd.id)}">${escapeHTML(cmd.nome)}</option>`).join("");

  // prova a ripristinare la scelta precedente
  if ([...indexSel.options].some(o => o.value === prev)) indexSel.value = prev;
}

/* ---------- Contenuto del manuale (tutte le sezioni) ---------- */
function renderContent() {
  contentEl.innerHTML = "";
  const items = currentData.slice().sort((a,b)=>a.nome.localeCompare(b.nome));

  for (const cmd of items) {
    const section = document.createElement("section");
    section.id = `cmd-${cmd.id}`;
    section.innerHTML = `
      <h2>${cmd.nome}</h2>
      ${cmd.sintassi ? `<p><strong>Syntax:</strong> <code>${cmd.sintassi}</code></p>` : ""}
      ${cmd.sommario ? `<p><strong>Summary:</strong> ${cmd.sommario}</p>` : ""}
      ${cmd.descrizione ? `<h3>Description</h3><p>${cmd.descrizione}</p>` : ""}
      ${Array.isArray(cmd.esempi) && cmd.esempi.length ? `
        <h3>Examples</h3>
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

/* ---------- Caricamento lingua ---------- */
async function loadLanguage(code){
  const url = `./manual.${code}.js`;
  try {
    const mod = await import(url);
    const data = mod.default;
    if (!Array.isArray(data)) throw new Error("Language module must export default array.");

    currentLang = code;
    currentData = data;

    langSel.value = code;
    renderContent();
    buildIndexOptions();

    // aggiorna URL (?lang=)
    const params = new URLSearchParams(location.search);
    params.set("lang", code);
    history.replaceState(null, "", `${location.pathname}?${params.toString()}${location.hash}`);

    if (location.hash) focusHash(false);
  } catch (e) {
    console.error(e);
    contentEl.innerHTML = `
      <p class="noscript">Unable to load language "<strong>${escapeHTML(code)}</strong>".</p>
      <p class="hint">Ensure <code>manual.${escapeHTML(code)}.js</code> exists and exports <code>default</code>.</p>
    `;
  }
}

/* ---------- Event wiring ---------- */
function init(){
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") || langSel.value || "it";

  loadLanguage(lang);

  // Ricerca: filtra le opzioni dell'indice
  searchBox.addEventListener("input", () => buildIndexOptions());

  // Cambio lingua
  langSel.addEventListener("change", () => loadLanguage(langSel.value));

  // Selezione dall'indice: vai alla sezione
  indexSel.addEventListener("change", () => {
    const id = indexSel.value;
    if (!id) return;
    const params = new URLSearchParams(location.search);
    params.set("lang", currentLang);
    const hash = `#cmd-${id}`;
    history.pushState(null, "", `${location.pathname}?${params.toString()}${hash}`);
    focusHash();
  });

  // Deep link manuale
  window.addEventListener("hashchange", () => focusHash());
}

document.addEventListener("DOMContentLoaded", init);