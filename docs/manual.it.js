// manual.it.js — Manuale italiano
export default [
  {
    id: "run",
    nome: "RUN",
    categoria: "Esecuzione",
    sintassi: "RUN [linea]",
    sommario: "Esegue il programma o parte di esso a partire dalla linea indicata.",
    descrizione: `
      Avvia l'esecuzione del programma in memoria. Se specifichi un numero di <em>linea</em>,
      l'esecuzione parte da quella linea.
    `,
    esempi: [
      { code: "RUN", note: "Esegue dall'inizio." },
      { code: "RUN 200", note: "Esegue a partire dalla linea 200." }
    ],
    note: "Durante l’esecuzione, premi <kbd>CTRL+C</kbd> per interrompere."
  }
];
