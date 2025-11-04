/* =========================================================
   BASIC32 — Manual (CORE)
   - Caricamento dinamico lingua: ./manual.<lang>.js
   - Ricerca, filtro di categoria, indice semplice, deep link
   - Per aggiungere lingua: crea manual.<code>.js che esporta default = array comandi
   ========================================================= */

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const langSel    = $("#lang");
const searchBox  = $("#search");
const catSel     = $("#category");
const listEl     = $("#command-list");
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

function matchesCategory(cmd, catValue) {
  if (!catValue || catValue === "__all__") return true;
  return (cmd.categoria || "").toLowerCase() === catValue.toLowerCase();
}

/* ---------- Popola la tendina delle categorie ---------- */
function buildCategoryOptions() {
  const cats = Array.from(new Set(currentData.map(c => c.categoria).filter(Boolean))).sort((a,b)=>a.localeCompare(b));
  const current = catSel.value || "__all__";
  catSel.innerHTML = `<option value="__all__">All</option>` +
    cats.map(c => `<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("");
  // ripristina selezione precedente se possibile
  const hasPrev = Array.from(catSel.options).some(o => o.value === current);
  catSel.value = hasPrev ? current : "__all__";
}

/* ---------- Indice: elenco semplice (no intestazioni categoria) ---------- */
function renderIndex() {
  listEl.innerHTML = "";
  const q = searchBox.value.trim().toLowerCase();
  const cat = catSel.value;

  const items = currentData
    .filter(cmd => matchesQuery(cmd, q) && matchesCategory(cmd, cat))
    .slice()
    .sort((a,b)=>a.nome.localeCompare(b.nome));

  if (!items.length) {
    listEl.innerHTML = `<p class="hint" style="padding:6px">No results.</p>`;
    return;
  }

  for (const cmd of items) {
    const a = document.createElement("a");
    a.href = `#cmd-${cmd.id}`;
    a.textContent = cmd.nome;
    a.setAttribute("data-cmd", cmd.id);
    listEl.appendChild(a);
  }
}

/* ---------- Contenuto del manuale ---------- */
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

/* ---------- Focus su hash ---------- */
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
    // ricostruisci categorie per la lingua
    buildCategoryOptions();
    // render UI
    renderContent();
    renderIndex();

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

  // ricerca testuale
  searchBox.addEventListener("input", () => renderIndex());
  // filtro categoria
  catSel.addEventListener("change", () => renderIndex());
  // cambio lingua
  langSel.addEventListener("change", () => loadLanguage(langSel.value));

  // click sulla lista comandi: conserva ?lang= e aggiorna hash
  listEl.addEventListener("click", (e) => {
    if (e.target.matches("a[data-cmd]")){
      const params = new URLSearchParams(location.search);
      params.set("lang", currentLang);
      const href = e.target.getAttribute("href"); // #cmd-xxx
      history.pushState(null, "", `${location.pathname}?${params.toString()}${href}`);
      focusHash();
      e.preventDefault();
    }
  });

  window.addEventListener("hashchange", () => focusHash());
}

document.addEventListener("DOMContentLoaded", init);