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
  }
];
