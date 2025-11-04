// Esporta l'array dei comandi in Italiano come default
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
  },
  {
    id: "list",
    nome: "LIST",
    categoria: "Ispezione",
    sintassi: "LIST [start[-end]]",
    sommario: "Stampa il sorgente del programma o un intervallo di linee.",
    descrizione: `
      Senza argomenti, elenca tutto il programma. Con un intervallo <code>start-end</code>
      mostra solo le linee in quel range. <code>start-</code> significa da start alla fine.
    `,
    esempi: [
      { code: "LIST", note: "Mostra tutto il listato." },
      { code: "LIST 100-200", note: "Mostra tra 100 e 200." },
      { code: "LIST 300-", note: "Da 300 in poi." }
    ]
  },
  {
    id: "save",
    nome: "SAVE",
    categoria: "File",
    sintassi: "SAVE \"nome\"",
    sommario: "Salva il programma corrente con un nome.",
    descrizione: `Salva il programma nella memoria persistente con il nome indicato.`,
    esempi: [{ code: "SAVE \"HELLO\"", note: "Salva come HELLO." }]
  },
  {
    id: "load",
    nome: "LOAD",
    categoria: "File",
    sintassi: "LOAD \"nome\"",
    sommario: "Carica in memoria un programma salvato.",
    descrizione: `Sostituisce il programma in memoria con quello salvato con il nome indicato.`,
    esempi: [{ code: "LOAD \"HELLO\"", note: "Carica HELLO in memoria." }]
  }
];
