// manual.it.js — Manuale italiano
export default [
  {
  "id": "intro",
  "tipo": "introduzione",
  "titolo": "Introduzione a Basic32 – Interprete BASIC per ESP32",
  "contenuto": `
    <p><strong>Basic32</strong> è un potente ma leggero interprete BASIC sviluppato per la scheda ESP32, progettato per rendere la programmazione dell'ESP32 accessibile anche senza conoscenze di C/C++ o ambienti di sviluppo complessi.</p>
    <p>Con Basic32 puoi scrivere, salvare ed eseguire codice BASIC in tempo reale, utilizzando un qualsiasi terminale seriale. Questo approccio elimina completamente la necessità di ricompilare il firmware ad ogni modifica del programma.</p>

    <h3>Caratteristiche principali</h3>
    <ul>
      <li>Scrittura diretta del codice BASIC da terminale seriale (es. PuTTY, Arduino Serial Monitor, etc.)</li>
      <li>Salvataggio e caricamento dei listati su memoria interna (SPIFFS) o su scheda SD (se presente)</li>
      <li>Memorizzazione del programma in RAM con supporto a:
        <ul>
          <li>variabili numeriche, stringhe, array</li>
          <li>funzioni definite dall’utente</li>
          <li>flusso di controllo (IF, GOTO, GOSUB, FOR/NEXT)</li>
        </ul>
      </li>
      <li>Controllo I/O GPIO: lettura/scrittura digitale e analogica, configurazione pin</li>
      <li>Funzioni di tempo e generazione casuale</li>
      <li>Interprete interattivo: ogni riga può essere digitata e valutata in tempo reale</li>
    </ul>

    <h3>Gestione di file BASIC tramite comandi su SD o SPIFFS</h3>
    <p><strong>Basic32</strong> è pensato per:</p>
    <ul>
      <li>appassionati di retro-programmazione</li>
      <li>maker che vogliono controllare ESP32 in modo semplice</li>
      <li>chi cerca un ambiente educativo e interattivo</li>
      <li>chi vuole fare prototipazione rapida senza compilazioni continue</li>
    </ul>

    <h3>Requisiti hardware</h3>
    <ul>
      <li>Scheda ESP32 (qualsiasi modello con supporto SPIFFS e interfaccia SD opzionale)</li>
      <li>Connessione seriale al PC</li>
      <li>(Opzionale) Scheda SD collegata ai pin definiti nel codice:
        <ul>
          <li>MOSI → GPIO 23</li>
          <li>MISO → GPIO 19</li>
          <li>SCK → GPIO 18</li>
          <li>CS → GPIO 15</li>
        </ul>
      </li>
    </ul>

    <h3>Utilizzo di più dispositivi SPI su ESP32 con Basic32</h3>
    <p>L’ESP32 dispone di bus SPI hardware che possono essere condivisi tra più periferiche (display TFT, lettore RFID, touch screen, scheda SD, ecc.). Tutti i dispositivi SPI utilizzano in comune i pin MOSI, MISO e SCK, ma ciascun dispositivo deve avere un Chip Select (CS) dedicato.</p>

    <h4>Per evitare conflitti sul bus SPI:</h4>
    <ol>
      <li>Assegna un pin CS dedicato a ogni dispositivo (es. TFT_CS=17, SD_CS=13, TOUCH_CS=4, RFID_CS=25).</li>
      <li>Mantieni i CS alti (HIGH) quando il dispositivo non è in uso, così non interferisce con gli altri.</li>
      <li>Imposta i CS come OUTPUT e portali HIGH prima di inizializzare i moduli.</li>
      <li>Inizializza i dispositivi con i relativi comandi (INITSD, ILI INIT, RFID INIT, ecc.).</li>
    </ol>

    <h3>Esempio: Display ILI9341 con SD e Touch integrati</h3>
    <pre><code>
10 PINMODE 17 OUTPUT NOPULL   ' TFT_CS come output
20 DWRITE 17 1                ' tiene inattivo il display
30 PINMODE 4 OUTPUT NOPULL    ' TOUCH_CS come output
40 DWRITE 4 1                 ' tiene inattivo il touch
50 PINMODE 13 OUTPUT NOPULL    ' SD_CS come output
60 DWRITE 13 1                 ' tiene inattiva sd
70 INITSD 13 23 19 18         ' inizializza SD (CS=13, MOSI=23, MISO=19, SCK=18)
80 ILI INIT 17 16 5 3         ' inizializza TFT (CS=17, DC=16, RST=5, rotazione=3)
90 ILI LED 32 1               ' accende retroilluminazione su GPIO32
100 ILI TEXT 10 50 2 SDFREE 0 255 255  ' stampa spazio libero su SD in giallo
    </code></pre>

    <p><strong>Nota:</strong> Se aggiungi altre periferiche SPI (es. RFID RC522), assegna loro un CS dedicato, imposta PINMODE &lt;CS&gt; OUTPUT e DWRITE &lt;CS&gt; 1 prima di eseguire il rispettivo INIT. Con questa sequenza, ogni dispositivo è pronto a lavorare senza disturbare gli altri sul bus SPI.</p>

    <h3>Cosa puoi fare con Basic32?</h3>
    <ul>
      <li>Scrivere e testare algoritmi BASIC in tempo reale</li>
      <li>Costruire applicazioni interattive su ESP32 senza compilare</li>
      <li>Salvare programmi per riutilizzarli o modificarli in futuro</li>
      <li>Controllare sensori e attuatori con semplici comandi BASIC</li>
    </ul>

    <h3>Installazione e Primo Avvio</h3>
    <p>Questa sezione ti guida passo passo nell’installazione di Basic32 su una scheda ESP32, utilizzando un firmware già compilato. Non è necessario usare l’Arduino IDE: basta scaricare il file .bin e flasharlo direttamente nella memoria del dispositivo.</p>

    <h4>1. Requisiti</h4>
    <ul>
      <li>Scheda ESP32 (qualsiasi modello con supporto SPIFFS e SD opzionale)</li>
      <li>Cavo USB per collegare l’ESP32 al PC</li>
      <li>Tool per flash firmware:
        <ul>
          <li>Basic32 Terminal (Windows)</li>
          <li>esptool.py (Linux/macOS/Windows via Python)</li>
        </ul>
      </li>
      <li>Terminale seriale (es. Basic32 Terminal, PuTTY, TeraTerm, Arduino Serial Monitor)</li>
    </ul>

    <h4>2. File da scaricare</h4>
    <ul>
      <li>Basic32.bin → firmware precompilato (fornito su GitHub del progetto)</li>
      <li>Eventuali file .bas di esempio (opzionali)</li>
    </ul>

    <h4>3. Flash del Firmware su ESP32</h4>
    <p><strong>Metodo 1:</strong> con Basic32 Terminal (Windows)</p>
    <ol>
      <li>Installa Basic32 Terminal (se non l’hai già fatto):<br>
      <a href="https://github.com/Ferrazzi/Basic32/tree/main/Basic32Terminal" target="_blank">https://github.com/Ferrazzi/Basic32/tree/main/Basic32Terminal</a></li>
      <li>Collega l’ESP32 e dalle icone seleziona quella per flashare il firmware</li>
      <li>Seleziona se flasharlo da file o tramite internet, seleziona il tuo modello di ESP32 e clicca su <strong>Flash</strong></li>
    </ol>

    <p><strong>Metodo 2:</strong> con esptool.py (multipiattaforma)</p>
    <ol>
      <li>Installa esptool.py (se non l’hai già fatto):<br>
      pip install esptool</li>
      <li>Collega l’ESP32 e identifica la porta seriale (es: COM3 su Windows o /dev/ttyUSB0 su Linux)</li>
      <li>Flasha il firmware con questo comando:<br>
      esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x10000 Basic32.bin</li>
    </ol>

    <h4>4. Primo Avvio</h4>
    <pre><code>
10 PRINT "HELLO BASIC32"
20 GOTO 10
RUN
    </code></pre>

    <h4>5. Utilizzo SPIFFS</h4>
    <pre><code>
ESAVE "programma.bas"
ELOAD "programma.bas"
    </code></pre>

    <h4>6. Utilizzo scheda SD (opzionale)</h4>
    <table>
      <tr><th>Segnale</th><th>GPIO ESP32</th></tr>
      <tr><td>MISO</td><td>19</td></tr>
      <tr><td>MOSI</td><td>23</td></tr>
      <tr><td>SCK</td><td>18</td></tr>
      <tr><td>CS</td><td>15</td></tr>
    </table>
    <pre><code>
SAVE "programma.bas"
LOAD "programma.bas"
    </code></pre>

    <h3>Gestione File e Memoria</h3>
    <h4>1. Memoria SPIFFS (interna)</h4>
    <ul>
      <li>I nomi dei file sono case-insensitive.</li>
      <li>L’estensione .bas è convenzionale, ma non obbligatoria.</li>
      <li>La dimensione disponibile dipende dalla partizione SPIFFS (tipicamente 1MB–2MB).</li>
    </ul>

    <h4>2. Scheda SD (esterna, opzionale)</h4>
    <ul>
      <li>Il sistema rileva automaticamente la presenza della scheda SD.</li>
      <li>La SD deve essere formattata in FAT32.</li>
    </ul>
  `
},
{
  id: "abs",
  nome: "ABS(x)",
  categoria: "Funzioni matematiche",
  sintassi: "ABS(x)",
  sommario: "Restituisce il valore assoluto di un numero.",
  descrizione: `
    La funzione <code>ABS(x)</code> restituisce il valore assoluto di <em>x</em>, cioè il numero senza segno.
    È utilizzabile in espressioni aritmetiche, assegnazioni e condizioni logiche.
    Accetta sia numeri interi che decimali. Se il numero è già positivo o zero, non viene modificato.
  `,
  esempi: [
    {
      code: `
10 A = -42
20 B = ABS(A)
30 PRINT "VALORE ASSOLUTO: "; B
RUN
      `,
      note: "Calcola il valore assoluto di un intero negativo.\nOutput: VALORE ASSOLUTO: 42"
    },
    {
      code: `
10 PRINT "ABS(-3.14) = "; ABS(-3.14)
RUN
      `,
      note: "Funziona anche con numeri decimali (float).\nOutput: ABS(-3.14) = 3.14"
    },
    {
      code: `
10 A = -7
20 IF ABS(A) = 7 THEN PRINT "È UGUALE A 7"
RUN
      `,
      note: "Esempio d’uso diretto in una condizione IF.\nOutput: È UGUALE A 7"
    }
  ],
  note: "ABS è una funzione pura: non modifica variabili, restituisce solo un valore numerico positivo."
},
{
  id: "acs-calib-setoffset",
  nome: "ACS CALIB SETOFFSET",
  categoria: "ACS712",
  sintassi: "ACS CALIB SETOFFSET mv",
  sommario: "Imposta manualmente l’offset di zero in millivolt.",
  descrizione: `
    Imposta manualmente l’offset di zero in mV (tipicamente attorno a <em>Vcc/2</em>).
    Utile se conosci già l’offset misurato con un multimetro o desideri forzarlo manualmente.
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 20
20 ACS CALIB SETOFFSET 1650
30 ACS READ I
40 PRINT I
      `,
      note: "Imposta offset manuale a 1650 mV e legge la corrente."
    }
  ],
  note: "Non sostituisce la calibrazione automatica. Puoi combinare <code>ZERO</code> e <code>SETOFFSET</code> (l’ultimo chiamato prevale)."
},
{
  id: "acs-calib-show",
  nome: "ACS CALIB SHOW",
  categoria: "ACS712",
  sintassi: "ACS CALIB SHOW",
  sommario: "Mostra su seriale la configurazione corrente del sensore ACS.",
  descrizione: `
    Visualizza su seriale i parametri attuali del modulo ACS: pin, modello, sensibilità (mV/A),
    tensione di riferimento (<em>vref</em>), offset di zero (mV) e numero di campioni mediati.
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 5
20 ACS CALIB SHOW
      `,
      note: "Mostra la configurazione attuale via seriale."
    }
  ],
  note: "L’output viene inviato tramite <code>Serial.printf(...)</code>, come per gli altri comandi diagnostici."
},
{
  id: "acs-calib-zero",
  nome: "ACS CALIB ZERO",
  categoria: "ACS712",
  sintassi: "ACS CALIB ZERO [samples]",
  sommario: "Esegue la calibrazione dello zero (nessuna corrente nel sensore).",
  descrizione: `
    Legge un certo numero di campioni (<em>samples</em>) e imposta l’offset di zero in mV.
    Assicurati che non scorra corrente durante la calibrazione per ottenere una misura accurata.
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 5
20 PRINT "Togli corrente e premi INVIO"
30 WAIT 3000
40 ACS CALIB ZERO 256
50 ACS CALIB SHOW
      `,
      note: "Calibrazione accurata con 256 campioni."
    }
  ],
  note: "Più campioni → offset più stabile (consigliati 128–512)."
},
{
  id: "acs-init",
  nome: "ACS INIT (acs712)",
  categoria: "ACS712",
  sintassi: "ACS INIT pin model [vref_mv] [avgSamples]",
  sommario: "Inizializza il sensore ACS712 e imposta i parametri di base.",
  descrizione: `
    Inizializza il sensore ACS712 specificando il pin ADC, il modello (5/20/30 A),
    e opzionalmente la tensione di riferimento (<em>vref_mv</em>) e il numero di campioni mediati.
    <ul>
      <li><b>pin</b>: GPIO ADC1 consigliato (32–39)</li>
      <li><b>model</b>: 5, 20 o 30 → imposta automaticamente mV/A (185 / 100 / 66)</li>
      <li><b>vref_mv</b>: opzionale; usato come fallback se non disponibile <code>analogReadMilliVolts</code></li>
      <li><b>avgSamples</b>: opzionale; predefinito 32</li>
    </ul>
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 5
20 ACS CALIB SHOW
      `,
      note: "Inizializza un modulo ACS712 5 A collegato al pin GPIO34."
    }
  ],
  note: `
    <b>Note hardware:</b><br>
    Collega OUT del modulo ACS712 al pin ADC scelto (preferibilmente ADC1).<br>
    Alimenta il modulo secondo specifiche (di solito 5 V). L’uscita è centrata su Vcc/2.<br>
    Per ESP32, l’attenuazione 11 dB (~3.3 V full-scale) è già impostata nel codice.
  `
},
{
  id: "acs-read",
  nome: "ACS READ",
  categoria: "ACS712",
  sintassi: "ACS READ var",
  sommario: "Legge la corrente DC media (Ampere) e salva il valore in una variabile.",
  descrizione: `
    Esegue una lettura media della corrente DC (in Ampere) utilizzando il numero di campioni
    definito in <code>avgSamples</code>. Il risultato viene assegnato alla variabile indicata.
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 20
20 ACS CALIB ZERO 256
30 ACS READ I
40 PRINT "I=";I;" A"
50 WAIT 200
60 GOTO 30
      `,
      note: "Lettura continua della corrente DC media."
    }
  ],
  note: "Adatto per DC o AC rettificata/filtrata. Per AC pura, usa <code>ACS RMS</code>."
},
{
  id: "acs-rms",
  nome: "ACS RMS",
  categoria: "ACS712",
  sintassi: "ACS RMS window_ms var",
  sommario: "Misura la corrente AC RMS (Ampere) su una finestra temporale specificata.",
  descrizione: `
    Calcola la corrente RMS (radice della media dei quadrati) su una finestra di durata <em>window_ms</em>.
    Per ogni campione rimuove l’offset (zero) e calcola <code>sqrt(media(x^2))</code>.
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 20
20 ACS CALIB ZERO 256
30 ACS RMS 500 IRMS
40 PRINT "Irms=";IRMS;" A"
50 WAIT 500
60 GOTO 30
      `,
      note: "Misura corrente AC RMS su finestra di 500 ms (ideale per 50 Hz)."
    }
  ],
  note: "Per 50 Hz, usare finestre di 200–500 ms. Finestra più lunga → misura più stabile. Calibrare lo zero senza carico prima dell’uso."
}
];