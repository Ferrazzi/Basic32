// Export the commands array in English as default
export default [
  {
    id: "run",
    nome: "RUN",
    categoria: "Execution",
    sintassi: "RUN [line]",
    sommario: "Runs the program from the beginning or from a specific line.",
    descrizione: `
      Starts executing the program in memory. If a <em>line</em> is provided,
      execution begins at that line number.
    `,
    esempi: [
      { code: "RUN", note: "Run from the start." },
      { code: "RUN 200", note: "Run starting at line 200." }
    ],
    note: "Press <kbd>CTRL+C</kbd> to stop execution."
  },
  {
    id: "list",
    nome: "LIST",
    categoria: "Inspection",
    sintassi: "LIST [start[-end]]",
    sommario: "Prints the program or a range of lines.",
    descrizione: `
      Without arguments it lists the whole program. With a <code>start-end</code> range
      it lists only those lines. <code>start-</code> means from start to the end.
    `,
    esempi: [
      { code: "LIST", note: "Show the full listing." },
      { code: "LIST 100-200", note: "Only lines 100 to 200." },
      { code: "LIST 300-", note: "From 300 to the end." }
    ]
  },
  {
    id: "save",
    nome: "SAVE",
    categoria: "File",
    sintassi: "SAVE \"name\"",
    sommario: "Saves the current program under a name.",
    descrizione: `Saves the program to persistent storage under the given name.`,
    esempi: [{ code: "SAVE \"HELLO\"", note: "Save as HELLO." }]
  },
  {
    id: "load",
    nome: "LOAD",
    categoria: "File",
    sintassi: "LOAD \"name\"",
    sommario: "Loads a saved program into memory.",
    descrizione: `Replaces the program in memory with the one previously saved under that name.`,
    esempi: [{ code: "LOAD \"HELLO\"", note: "Load HELLO into memory." }]
  }
];
