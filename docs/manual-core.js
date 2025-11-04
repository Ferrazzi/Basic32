/* =========================================================
   BASIC32 — Manuale (CORE)
   - Caricamento dinamico lingua: ./manual.<lang>.js (ES module)
   - Ricerca, indice, contenuto, deep link, querystring ?lang=
   - Per aggiungere una lingua: crea manual.<codice>.js che esporta default = array comandi
   ========================================================= */

const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const langSel   = $("#lang");
const searchBox = $("#search");
const listEl    = $("#command-list");
const contentEl = $("#manual-content");

let currentLang = "it";
let currentData = []; // array di comandi dell’attuale lingua

/* ---------- Utilità UI ---------- */
function escapeHTML(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;");
}

function matches(cmd, q) {
  return [cmd.nome, cmd.sintassi, cmd.sommario, cmd.categoria]
    .filter(Boolean)
    .some(s => s.toLowerCase().includes(q));
}

function renderIndex(query = "") {
  listEl.innerHTML = "";

  const items = currentData.slice().sort((a,b)=>a.nome.localeCompare(b.nome));
  const q = query.trim().toLowerCase();

  const byCat = {};
  for (const cmd of items) {
    if (q && !matches(cmd, q)) continue;
    (byCat[cmd.categoria] ||= []).push(cmd);
  }

  const cats = Object.keys(byCat).sort((a,b)=>a.localeCompare(b));
  if (!cats.length) {
    listEl.innerHTML = `<p class="hint" style="padding:6px">Nessun risultato.</p>`;
    return;
  }

  for (const cat of cats) {
    const h = document.createElement("div");
    h.className = "section-title";
    h.textContent = cat;
    listEl.appendChild(h);

    for (const cmd of byCat[cat]) {
      const a = document.createElement("a");
      a.href = `#cmd-${cmd.id}`;
      a.textContent = cmd.nome;
      a.setAttribute("data-cmd", cmd.id);
      listEl.appendChild(a);
    }
  }
}

function renderContent() {
  contentEl.innerHTML = "";

  const items = currentData.slice().sort((a,b)=>a.nome.localeCompare(b.nome));
  for (const cmd of items) {
    const section = document.createElement("section");
    section.id = `cmd-${cmd.id}`;
    section.innerHTML = `
      <h2>${cmd.nome}</h2>
      ${cmd.sintassi ? `<p><strong>Sintassi:</strong> <code>${cmd.sintassi}</code></p>` : ""}
      ${cmd.sommario ? `<p><strong>Sommario:</strong> ${cmd.sommario}</p>` : ""}
      ${cmd.descrizione ? `<h3>Descrizione</h3><p>${cmd.descrizione}</p>` : ""}
      ${Array.isArray(cmd.esempi) && cmd.esempi.length ? `
        <h3>Esempi</h3>
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

function focusHash(smooth = true){
  if (!location.hash) return;
  const target = document.getElementById(location.hash.slice(1));
  if (target){
    target.setAttribute("tabindex","-1");
    target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    target.focus({ preventScroll: true });
  }
}

/* ---------- Caricamento dinamico lingua ---------- */
async function loadLanguage(code){
  // Prova a importare ./manual.<code>.js
  const url = `./manual.${code}.js`;
  try {
    const mod = await import(url);
    const data = mod.default;
    if (!Array.isArray(data)) throw new Error("Il modulo non esporta un array di comandi.");
    currentLang = code;
    currentData = data;

    // Aggiorna UI
    langSel.value = code;
    renderContent();
    renderIndex(searchBox.value);

    // Aggiorna querystring mantenendo hash
    const params = new URLSearchParams(location.search);
    params.set("lang", code);
    history.replaceState(null, "", `${location.pathname}?${params.toString()}${location.hash}`);

    // Se c’è un hash, prova a focussare dopo il render
    if (location.hash) focusHash(false);
  } catch (e) {
    console.error(e);
    contentEl.innerHTML = `
      <p class="noscript">Impossibile caricare la lingua "<strong>${escapeHTML(code)}</strong>".</p>
      <p class="hint">Verifica che esista il file <code>manual.${escapeHTML(code)}.js</code> e che esporti <code>default</code>.</p>
    `;
  }
}

/* ---------- Event wiring ---------- */
function init(){
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang") || langSel.value || "it";

  loadLanguage(lang);

  // Ricerca
  searchBox.addEventListener("input", () => {
    renderIndex(searchBox.value);
  });

  // Cambio lingua
  langSel.addEventListener("change", () => {
    loadLanguage(langSel.value);
  });

  // Click indice: conserva ?lang= nell’URL
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
