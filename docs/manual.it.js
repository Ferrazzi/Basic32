// manual.it.js — Manuale italiano
export default [
  {
    id: "intro",
    tipo: "introduzione",
    titolo: "Introduzione a Basic32 – Interprete BASIC per ESP32",
    contenuto: `
      <p><strong>Basic32</strong> è un potente ma leggero interprete BASIC sviluppato per la scheda ESP32, progettato per rendere la programmazione dell'ESP32 accessibile anche senza conoscenze di C/C++ o ambienti di sviluppo complessi.</p>

      <p>Con Basic32 puoi scrivere, salvare ed eseguire codice BASIC in tempo reale, utilizzando un qualsiasi terminale seriale. Questo approccio elimina completamente la necessità di ricompilare il firmware ad ogni modifica del programma.</p>

      <h3>Caratteristiche principali</h3>
      <ul>
        <li>Scrittura diretta del codice BASIC da terminale seriale (es. PuTTY, Arduino Serial Monitor, etc.)</li>
        <li>Salvataggio e caricamento dei listati su memoria interna (SPIFFS) o su scheda SD (se presente)</li>
        <li>Memorizzazione del programma in RAM con supporto a variabili, array, funzioni e strutture di controllo</li>
        <li>Controllo I/O GPIO: lettura/scrittura digitale e analogica, configurazione pin</li>
        <li>Funzioni di tempo e generazione casuale</li>
        <li>Comandi integrati: <code>LIST</code>, <code>RUN</code>, <code>NEW</code>, <code>HELP</code>, <code>SAVE</code>, <code>LOAD</code></li>
      </ul>

      <h3>Requisiti hardware</h3>
      <ul>
        <li>Scheda ESP32 con supporto SPIFFS e interfaccia SD opzionale</li>
        <li>Connessione seriale al PC</li>
        <li>(Opzionale) Scheda SD collegata ai pin:
          <ul>
            <li>MOSI → GPIO 23</li>
            <li>MISO → GPIO 19</li>
            <li>SCK → GPIO 18</li>
            <li>CS → GPIO 15</li>
          </ul>
        </li>
      </ul>

      <h3>Utilizzo SPI multipli</h3>
      <p>L’ESP32 dispone di bus SPI hardware condivisibili fra più periferiche (display, RFID, touch, SD...). Ogni dispositivo deve avere un Chip Select (CS) dedicato.</p>

      <h3>Esempio</h3>
      <pre><code>
10 PINMODE 17 OUTPUT NOPULL
20 DWRITE 17 1
30 PINMODE 4 OUTPUT NOPULL
40 DWRITE 4 1
50 PINMODE 13 OUTPUT NOPULL
60 DWRITE 13 1
70 INITSD 13 23 19 18
80 ILI INIT 17 16 5 3
90 ILI LED 32 1
100 ILI TEXT 10 50 2 SDFREE 0 255 255
      </code></pre>
    `
  },

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
