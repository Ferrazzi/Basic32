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
},
{
  id: "acs-samples",
  nome: "ACS SAMPLES",
  categoria: "ACS712",
  sintassi: "ACS SAMPLES n",
  sommario: "Imposta il numero di campioni per le letture DC mediate (ACS READ).",
  descrizione: `
    Imposta il numero di campioni utilizzati per calcolare la media durante le letture di corrente DC con <code>ACS READ</code>.
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 5
20 ACS SAMPLES 64
30 ACS READ I
40 PRINT I
      `,
      note: "Imposta 64 campioni per la media delle letture DC."
    }
  ],
  note: "Non influisce su <code>ACS RMS</code>, che usa la propria finestra temporale."
},

{
  id: "acs-sens",
  nome: "ACS SENS",
  categoria: "ACS712",
  sintassi: "ACS SENS mv_per_A",
  sommario: "Imposta manualmente la sensibilità (mV/A) del sensore ACS.",
  descrizione: `
    Imposta manualmente la sensibilità in mV/A del modulo ACS712.  
    Utile se il modulo non corrisponde ai modelli standard o per tarature personalizzate.
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 5
20 ACS SENS 100
30 ACS READ I
40 PRINT I
      `,
      note: "Forza una sensibilità di 100 mV/A."
    }
  ],
  note: "Valori tipici per ACS712: 185 (5 A), 100 (20 A), 66 (30 A)."
},

{
  id: "acs-vref",
  nome: "ACS VREF",
  categoria: "ACS712",
  sintassi: "ACS VREF mv",
  sommario: "Imposta la tensione di riferimento ADC in millivolt.",
  descrizione: `
    Imposta manualmente la tensione di riferimento ADC in millivolt (<em>mV</em>), usata come fallback
    se non è disponibile la funzione <code>analogReadMilliVolts</code>.
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 20 3300
20 ACS VREF 3300
      `,
      note: "Imposta la tensione di riferimento ADC a 3.3 V (3300 mV)."
    }
  ],
  note: "Su ESP32, se <code>analogReadMilliVolts</code> è disponibile, non serve impostare manualmente VREF."
},

{
  id: "acs-watch",
  nome: "ACS WATCH",
  categoria: "ACS712",
  sintassi: `
ACS WATCH limit GOTO line
ACS WATCH limit ABOVE GOTO line
ACS WATCH limit BELOW GOTO line
ACS WATCH limit GOTO line RMS window_ms
ACS WATCH limit ABOVE|BELOW GOTO line RMS window_ms
  `,
  sommario: "Esegue una lettura di corrente e salta alla linea specificata se la condizione è vera.",
  descrizione: `
    Valuta la corrente letta dal sensore e, se supera (o scende sotto) la soglia indicata, esegue un salto alla riga specificata.  
    - Default: <b>ABOVE</b> (salta se corrente ≥ limite)  
    - Con <b>BELOW</b>: salta se corrente ≤ limite  
    - Con <b>RMS</b>: misura la corrente AC RMS sulla finestra temporale specificata (<em>window_ms</em>)  
    - Senza RMS: usa la media DC
  `,
  esempi: [
    {
      code: `
10 ACS INIT 34 20
20 ACS CALIB ZERO 256
30 PRINT "Loop motore..."
40 ' ... comandi motore ...
50 ACS WATCH 2.5 GOTO 200
60 WAIT 50
70 GOTO 40
200 PRINT "ALLARME: sovracorrente!"
210 ' Spegni carico
      `,
      note: "Protezione DC per sovracorrente."
    },
    {
      code: `
10 ACS INIT 34 5
20 ACS CALIB ZERO 256
30 PRINT "Monitor corrente minima"
40 ACS WATCH 0.20 BELOW GOTO 100
50 WAIT 200
60 GOTO 40
100 PRINT "Corrente bassa! Verifica carico."
      `,
      note: "Soglia minima per corrente DC."
    },
    {
      code: `
10 ACS INIT 34 30
20 ACS CALIB ZERO 256
30 PRINT "Controllo AC RMS"
40 ACS WATCH 0.80 GOTO 100 RMS 400
50 WAIT 100
60 GOTO 40
100 PRINT "Soglia Irms raggiunta!"
      `,
      note: "Controllo RMS su finestra di 400 ms (AC 50 Hz)."
    },
    {
      code: `
10 ACS INIT 34 5
20 ACS CALIB ZERO 256
30 PRINT "Servo in movimento"
40 ' SERVOWRITE 1 90
50 ACS WATCH 1.2 GOTO 300
60 WAIT 50
70 GOTO 40
300 PRINT "STOP: corrente troppo alta"
310 ' SERVOWRITE 1 0
      `,
      note: "Stop servo su sovracorrente."
    }
  ],
  note: `
    • Il comando non mantiene stato interno: valuta e, se la condizione è vera, salta.  
    • Con <b>RMS</b> la chiamata è bloccante per circa <em>window_ms</em>.  
    • Eseguire <code>ACS CALIB ZERO</code> senza carico per una calibrazione stabile.  
    • È possibile usare più <code>ACS WATCH</code> con soglie diverse nello stesso loop (es. avviso e arresto).
  `
},

{
  id: "adc-cal-gain",
  nome: "ADC CAL GAIN",
  categoria: "ADC Calibrazione",
  sintassi: "ADC CAL GAIN <fattore>",
  sommario: "Imposta il guadagno moltiplicativo del convertitore ADC.",
  descrizione: `
    Imposta il guadagno moltiplicativo del convertitore ADC per correggere differenze di scala
    tra la tensione reale e quella misurata. Il valore predefinito è 1.0.
  `,
  esempi: [
    { code: "ADC CAL GAIN 1.015", note: "Aumenta la scala dell’1.5%." },
    { code: "ADC CAL GAIN 0.98", note: "Riduce la scala del 2%." }
  ],
  note: "GAIN deve essere > 0 (tipicamente tra 0.95 e 1.10). Si applica automaticamente a <code>VREAD</code> e <code>RREAD</code>."
},

{
  id: "adc-cal-measure",
  nome: "ADC CAL MEASURE",
  categoria: "ADC Calibrazione",
  sintassi: "ADC CAL MEASURE <pin> <volt_noto> [campioni]",
  sommario: "Esegue una calibrazione automatica del GAIN misurando una tensione nota.",
  descrizione: `
    Calibra automaticamente il GAIN leggendo una tensione nota sul pin ADC.  
    Confronta la lettura reale con il valore noto e regola il guadagno in modo che coincidano.
  `,
  esempi: [
    {
      code: `
ADC CAL RESET
ADC CAL REF 3.30
ADC CAL MEASURE 34 3.300 32
      `,
      note: "Calibrazione automatica a 3.300 V su GPIO34 (32 campioni)."
    },
    {
      code: `
ADC CAL MEASURE 34 2.500 16
      `,
      note: "Calibrazione a 2.500 V con 16 campioni."
    }
  ],
  note: "Aggiorna solo il GAIN. [campioni] è opzionale (default 16). Usare tensioni tra 1.0 V e 3.0 V reali e stabili."
},

{
  id: "adc-cal-offset",
  nome: "ADC CAL OFFSET",
  categoria: "ADC Calibrazione",
  sintassi: "ADC CAL OFFSET <volt>",
  sommario: "Applica un offset additivo (in volt) alle letture ADC.",
  descrizione: `
    Applica un offset costante alle letture ADC per correggere differenze di zero o errori sistematici.
    L’offset viene aggiunto dopo il calcolo del guadagno.
  `,
  esempi: [
    { code: "ADC CAL OFFSET -0.010", note: "Sottrae 10 mV (corregge una sovrastima)." },
    { code: "ADC CAL OFFSET 0.005", note: "Aggiunge 5 mV (compensa una sottostima)." }
  ],
  note: "Valori tipici da −0.020 V a +0.020 V. Utile per errori costanti a 0 V."
},

{
  id: "adc-cal-ref",
  nome: "ADC CAL REF",
  categoria: "ADC Calibrazione",
  sintassi: "ADC CAL REF <volt>",
  sommario: "Imposta la tensione di riferimento ADC.",
  descrizione: `
    Definisce la tensione massima corrispondente alla piena scala ADC.
    Serve per adattare le letture alla tensione reale di alimentazione del microcontrollore.
  `,
  esempi: [
    { code: "ADC CAL REF 3.30", note: "Usa 3.30 V come riferimento standard (ESP32)." },
    { code: "ADC CAL REF 3.28", note: "Imposta riferimento reale misurato di 3.28 V." }
  ],
  note: "REF deve essere > 0. Impostalo sul valore reale della Vcc. Combinalo con GAIN e OFFSET."
},

{
  id: "adc-cal-reset",
  nome: "ADC CAL RESET",
  categoria: "ADC Calibrazione",
  sintassi: "ADC CAL RESET",
  sommario: "Ripristina i valori di calibrazione ADC ai default di fabbrica.",
  descrizione: `
    Reimposta i parametri di calibrazione ai valori iniziali: REF=3.30 V, GAIN=1.0, OFFSET=0.0.
    Utile per annullare modifiche e ripartire da zero.
  `,
  esempi: [
    {
      code: `
ADC CAL RESET
ADC CAL STATUS
      `,
      note: "Reset completo dei parametri di calibrazione."
    }
  ],
  note: "Può essere eseguito più volte senza effetti collaterali. Consigliato prima di una nuova calibrazione."
},

{
  id: "adc-cal-status",
  nome: "ADC CAL STATUS",
  categoria: "ADC Calibrazione",
  sintassi: "ADC CAL STATUS",
  sommario: "Mostra i parametri di calibrazione attivi del sistema ADC.",
  descrizione: `
    Visualizza i valori correnti di riferimento (REF), guadagno (GAIN) e offset (OFFSET),
    permettendo di verificare la calibrazione in uso.
  `,
  esempi: [
    { code: "ADC CAL STATUS", note: "Mostra i parametri di calibrazione correnti via seriale." }
  ],
  note: "Non modifica alcun valore. Usalo dopo ogni calibrazione per confermare i parametri."
},

{
  id: "aread",
  nome: "AREAD(p)",
  categoria: "Funzioni ADC",
  sintassi: "AREAD(p)",
  sommario: "Legge il valore analogico da un pin ADC dell’ESP32.",
  descrizione: `
    Legge il valore analogico dal pin specificato (p), restituendo un numero tra 0 e 4095:
    <ul>
      <li>0 = 0 V</li>
      <li>4095 ≈ 3.3 V</li>
    </ul>
    Usato per sensori analogici (potenziometri, luce, temperatura, ecc.).  
    Pin tipici: GPIO 36, 39, 34, 35, 32, 33.  
    ⚠ Solo i pin ADC supportano lettura analogica.
  `,
  esempi: [
    {
      code: `
10 PRINT "LETTURA ANALOGICA:"
20 V = AREAD(36)
30 PRINT "VALORE: "; V
40 WAIT 1000
50 GOTO 20
RUN
      `,
      note: "Lettura continua dal pin GPIO36 (es. potenziometro)."
    },
    {
      code: `
10 LUX = AREAD(36)
20 IF LUX < 1000 THEN PRINT "LUCE OK" ELSE PRINT "LUCE BASSA"
30 WAIT 1000
40 GOTO 10
RUN
      `,
      note: "Verifica soglia di luminosità simulata."
    }
  ],
  note: "Restituisce valori 0–4095 proporzionali alla tensione analogica. Usa pin ADC validi."
},

{
  id: "and-or-not",
  nome: "AND, OR, NOT",
  categoria: "Operatori logici",
  sintassi: "A AND B | A OR B | NOT A",
  sommario: "Operatori logici per confronti e operazioni bit a bit.",
  descrizione: `
    Gli operatori logici <code>AND</code>, <code>OR</code> e <code>NOT</code> eseguono confronti logici o bitwise:
    <ul>
      <li><b>AND</b>: restituisce 1 se entrambi gli operandi ≠ 0</li>
      <li><b>OR</b>: restituisce 1 se almeno uno ≠ 0</li>
      <li><b>NOT</b>: inverte il valore logico (NOT 0 = -1, NOT 1 = 0)</li>
    </ul>
    Utilizzabili in <code>IF</code>, <code>LET</code> e operazioni binarie.
  `,
  esempi: [
    { code: "10 A=1: B=2\n20 IF A=1 AND B=2 THEN PRINT \"ENTRAMBI VERI\"\nRUN", note: "Uso con IF e AND." },
    { code: "10 A=0: B=5\n20 IF A<>0 OR B<>0 THEN PRINT \"ALMENO UNO È DIVERSO DA ZERO\"\nRUN", note: "Uso con OR." },
    { code: "10 A=0\n20 IF NOT A THEN PRINT \"A È ZERO\"\nRUN", note: "Uso con NOT." },
    { code: "10 X=7: MASK=4\n20 RESULT=X AND MASK\n30 PRINT \"RISULTATO:\"; RESULT\nRUN", note: "Maschera di bit con AND." },
    { code: "10 A=5\n20 B=(A>0) AND (A<10)\n30 PRINT B\nRUN", note: "Uso logico in assegnazione." }
  ],
  note: "Restituiscono valori numerici (0 o 1/-1). 0=FALSO, ≠0=VERO."
},

{
  id: "asc",
  nome: "ASC(stringa$)",
  categoria: "Stringhe",
  sintassi: "ASC(stringa$)",
  sommario: "Restituisce il codice ASCII del primo carattere della stringa.",
  descrizione: `
    La funzione <code>ASC</code> restituisce il codice ASCII del primo carattere della stringa.
    Utile per analizzare input, confronti e conversioni tra caratteri e codici numerici.
  `,
  esempi: [
    { code: "10 A$=\"A\"\n20 PRINT ASC(A$)\nRUN", note: "Restituisce 65." },
    { code: "10 C$=\"Z\"\n20 IF ASC(C$)=90 THEN PRINT \"È Z\"\nRUN", note: "Confronto con lettera specifica." },
    { code: "10 T$=\"C\"\n20 COD=ASC(T$)\n30 PRINT CHR$(COD)\nRUN", note: "Conversione da codice a carattere." },
    { code: "10 PRINT \"PREMI UN TASTO:\"\n20 GET K$\n30 PRINT \"CODICE ASCII:\"; ASC(K$)\nRUN", note: "Mostra il codice del tasto premuto." },
    { code: "10 S$=\"ABC\"\n20 FOR I=1 TO LEN(S$)\n30 PRINT MID$(S$,I,1);\"=\";ASC(MID$(S$,I,1))\n40 NEXT I\nRUN", note: "Itera e mostra i codici di ogni carattere." }
  ],
  note: "Solo il primo carattere viene considerato. Se la stringa è vuota, può restituire 0 o errore."
},
{
  id: "autorun",
  nome: "AUTORUN",
  categoria: "Sistema",
  sintassi: `
AUTORUN "file.bas"
AUTORUN "file.bas" PIN <numero>
AUTORUN OFF
  `,
  sommario: "Imposta o disattiva l’esecuzione automatica di un programma all’avvio.",
  descrizione: `
    <code>AUTORUN</code> configura l’avvio automatico di un programma BASIC all’accensione.
    Puoi specificare un file <code>.bas</code> e opzionalmente un pin di sicurezza (GPIO).
    <ul>
      <li><b>AUTORUN "file.bas"</b>: avvia il programma all’accensione (PIN 0 predefinito)</li>
      <li><b>AUTORUN "file.bas" PIN n</b>: usa un GPIO per controllo sicurezza</li>
      <li><b>AUTORUN OFF</b>: disattiva completamente l’autorun</li>
    </ul>
  `,
  esempi: [
    { code: "AUTORUN \"startup.bas\"", note: "Avvio automatico con PIN 0 predefinito." },
    { code: "AUTORUN \"demo.bas\" PIN 5", note: "Autorun con controllo su GPIO5." },
    { code: "AUTORUN OFF", note: "Disattiva l’autorun." }
  ],
  note: `
    • Il file deve esistere su SPIFFS ed avere estensione .bas.
    • Se il file non viene trovato, viene restituito un errore.
    • Il GPIO di sicurezza è opzionale e può bloccare l’esecuzione automatica in base al suo stato.
    • Il file di configurazione /autorun.cfg viene sovrascritto a ogni nuova impostazione.
    • L'esecuzione del programma avviene subito dopo la configurazione.
  `
},
{
  id: "awrite",
  nome: "AWRITE(pin, valore)",
  categoria: "PWM / Uscite analogiche",
  sintassi: "AWRITE pin valore",
  sommario: "Genera un segnale PWM sul pin per simulare un’uscita analogica (0–255).",
  descrizione: `
    Imposta un PWM (modulazione di larghezza d’impulso) su un pin dell’ESP32, simulando un valore analogico.
    Valori ammessi 0..255:
    • 0 = 0% duty (spento)
    • 255 = 100% duty (massimo)
    • intermedio proporzionale (es. 128 ≈ 50%)
    ⚠ Il pin deve essere prima configurato come OUTPUT con <code>PINMODE</code>.
  `,
  esempi: [
    {
      code: `
10 PINMODE 13 OUTPUT NOPULL
20 AWRITE 13 128
RUN
      `,
      note: "LED al 50% su GPIO13."
    },
    {
      code: `
10 PINMODE 2 OUTPUT NOPULL
20 FOR A = 0 TO 255 STEP 5
30 AWRITE 2 A
40 DELAY 50
50 NEXT A
60 FOR I = 255 TO 0 STEP -5
70 AWRITE 2 I
80 DELAY 50
90 NEXT I
RUN
      `,
      note: "Fading continuo."
    },
    {
      code: `
10 PINMODE 14 OUTPUT NOPULL
20 INPUT L
30 AWRITE 14 L
RUN
      `,
      note: "Controllo PWM guidato da variabile."
    }
  ],
  note: "Richiede ESP32 Arduino core 3.x+ (supporto analogWrite). Pin non-PWM possono non mostrare effetto. Valori >255 vengono limitati a 255."
},
{
  id: "breakpin",
  nome: "BREAKPIN",
  categoria: "Sistema / Sicurezza",
  sintassi: `
BREAKPIN pin
BREAKPIN pin PULLUP|PULLDOWN|NOPULL
BREAKPIN OFF
BREAKPIN ?
  `,
  sommario: "Configura un pin “di sicurezza” che interrompe subito il programma alla pressione.",
  descrizione: `
    Imposta un GPIO come pulsante di stop immediato del programma BASIC in esecuzione.
    • Modalità di ingresso:
      – PULLUP (default): pulsante verso GND; premuto = LOW
      – PULLDOWN: pulsante verso VCC; premuto = HIGH
      – NOPULL: nessuna resistenza interna; premuto = HIGH
    • OFF disabilita la funzione. La configurazione è salvata in EEPROM e ricaricata all’avvio.
  `,
  esempi: [
    { code: "BREAKPIN 0", note: "Stop con pull-up (pulsante a GND)." },
    { code: "BREAKPIN 12 PULLDOWN", note: "Stop con pull-down (pulsante a VCC)." },
    { code: "BREAKPIN 25 NOPULL", note: "Senza pull interne (hardware esterno)." },
    { code: "BREAKPIN OFF", note: "Disabilita il BREAKPIN." }
  ],
  note: "L’arresto è istantaneo (controllo a inizio riga). Evita pin critici di boot (0,2,15) se l’hardware non li gestisce. Indipendente dal SAFE MODE di AUTORUN."
},
{
  id: "bt-at",
  nome: "BT AT",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT AT \"cmd\" RESP var$ [timeout]",
  sommario: "Invia un comando AT e legge una riga di risposta entro il timeout.",
  descrizione: `
    Invia il comando AT (terminato da CRLF) verso il modulo BT e legge una riga di risposta
    entro <em>timeout</em> ms (se omesso usa <code>BT TIMEOUT</code>). La risposta viene salvata in <code>var$</code>.
    Richiede AT mode attivo.
  `,
  esempi: [
    { code: "10 BT AT \"AT\" RESP R$ 1000\n20 PRINT R$\nRUN", note: "Test base (atteso: OK)." },
    { code: "10 BT AT \"AT+NAME?\" RESP N$ 1000\n20 PRINT N$\nRUN", note: "Legge il nome del modulo." }
  ],
  note: "Abilita l’AT mode con <code>BT ATMODE ON</code> (o KEY alto all’avvio). Timeout in ms."
},
{
  id: "bt-atmode-off",
  nome: "BT ATMODE OFF",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT ATMODE OFF",
  sommario: "Esce dall’AT mode e riapre la UART alla baud dati salvata.",
  descrizione: `
    Porta <em>KEY</em> basso (se configurato) e riapre la UART in data mode alla velocità impostata.
  `,
  esempi: [
    { code: "10 BT ATMODE OFF\n20 PRINT \"DATA MODE\"\nRUN", note: "Ritorna al data mode." }
  ],
  note: "Dopo modifiche di baud in AT, riallinea la porta dati con <code>BT INIT</code>."
},
{
  id: "bt-atmode-on",
  nome: "BT ATMODE ON",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT ATMODE ON [keyPin]",
  sommario: "Entra in AT mode (KEY alto) e apre la UART alla baud AT.",
  descrizione: `
    Porta <em>KEY</em> alto (pin di <code>BT INIT</code> o <code>keyPin</code> passato) e apre la UART all’AT baud (tipicamente 38400 per HC-05).
  `,
  esempi: [
    {
      code: `
10 BT INIT 16 17 9600 4
20 BT ATMODE ON
30 BT AT "AT" RESP R$ 1000
40 PRINT R$
RUN
      `,
      note: "Entra in AT e testa con AT."
    }
  ],
  note: "Su molti HC-05 il vero AT richiede KEY alto all’accensione. Alcuni HC-06 restano in AT a 9600."
},
{
  id: "bt-available",
  nome: "BT AVAILABLE",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT AVAILABLE var",
  sommario: "Ritorna in var il numero di byte disponibili nel buffer RX BT.",
  descrizione: `
    Scrive in <code>var</code> la dimensione del buffer di ricezione disponibile (intero ≥ 0).
  `,
  esempi: [
    { code: "10 BT AVAILABLE N\n20 PRINT N\nRUN", note: "Stampa i byte attualmente disponibili (es. 0)." }
  ],
  note: "Usabile in PRINT/LET/IF."
},
{
  id: "bt-end",
  nome: "BT END",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT END",
  sommario: "Chiude la UART2 e disattiva la comunicazione BT.",
  descrizione: `
    Termina la comunicazione seriale con il modulo BT e libera le risorse.
  `,
  esempi: [
    { code: "10 BT END\n20 PRINT \"CHIUSO\"\nRUN", note: "Chiude la connessione BT." }
  ],
  note: "Usalo prima di cambiare pin/baud con un nuovo <code>BT INIT</code>."
},
{
  id: "bt-flush",
  nome: "BT FLUSH",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT FLUSH",
  sommario: "Svuota il buffer RX della UART BT.",
  descrizione: `
    Svuota i dati pendenti nella ricezione BT per ripartire da uno stato pulito.
  `,
  esempi: [
    { code: "10 BT FLUSH\n20 BT READLN S$\n30 PRINT LEN(S$)\nRUN", note: "Dopo flush, nessun dato (0)." }
  ],
  note: "Utile prima di un nuovo parsing."
},
{
  id: "bt-init",
  nome: "BT INIT",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT INIT rx tx baud [keyPin]",
  sommario: "Inizializza la UART2 verso HC-05/HC-06 in data mode.",
  descrizione: `
    Configura la UART2 con pin RX/TX, velocità baud e opzionale <em>keyPin</em> per AT mode.
  `,
  esempi: [
    { code: "10 BT INIT 16 17 9600\n20 PRINT \"OK\"\nRUN", note: "Inizializzazione base." },
    { code: "10 BT INIT 16 17 9600 4\n20 PRINT \"READY\"\nRUN", note: "Con KEY su GPIO4." }
  ],
  note: "Scegli pin compatibili con la tua board ESP32."
},
{
  id: "bt-print",
  nome: "BT PRINT",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT PRINT valore",
  sommario: "Converte un valore in testo e lo invia su BT (senza newline).",
  descrizione: `
    Invia la rappresentazione testuale di <em>valore</em> sulla porta BT.
  `,
  esempi: [
    { code: "10 LET A=42\n20 BT PRINT A\nRUN", note: "Invia “42” via BT." }
  ],
  note: "Per newline usa <code>BT SEND \"\\r\\n\"</code>."
},
{
  id: "bt-read",
  nome: "BT READ",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT READ var$ [n]",
  sommario: "Legge fino a n byte dal buffer RX in var$ (o tutto se n omesso).",
  descrizione: `
    Copia fino a <em>n</em> byte ricevuti in <code>var$</code>; se non ci sono dati, la stringa è vuota.
  `,
  esempi: [
    { code: "10 BT READ S$\n20 PRINT S$\nRUN", note: "Legge tutti i dati disponibili." },
    { code: "10 BT READ P$ 5\n20 PRINT P$\nRUN", note: "Legge esattamente 5 byte." }
  ],
  note: "Non attende newline."
},
{
  id: "bt-readln",
  nome: "BT READLN",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT READLN var$",
  sommario: "Legge fino a LF (\\n) ignorando CR (\\r); se assente, restituisce quanto presente.",
  descrizione: `
    Ideale per protocolli a riga singola con terminatore LF.
  `,
  esempi: [
    { code: "10 BT READLN CMD$\n20 IF LEN(CMD$)=0 THEN PRINT \"NESSUNA RIGA\"\nRUN", note: "Gestione riga assente." }
  ],
  note: "Ritorna anche stringa vuota se non arriva LF."
},
{
  id: "bt-send",
  nome: "BT SEND",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: `
BT SEND "testo"
BT SEND var$
  `,
  sommario: "Invia una stringa (letterale o variabile) così com’è sulla UART BT.",
  descrizione: `
    Spedisce il buffer esattamente come fornito. Nessuna terminazione automatica.
  `,
  esempi: [
    { code: "10 BT SEND \"READY\\r\\n\"\nRUN", note: "Invia CRLF esplicito." }
  ],
  note: "Aggiungi \\r\\n se richiesto dal peer."
},
{
  id: "bt-setbaud",
  nome: "BT SETBAUD",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT SETBAUD rate",
  sommario: "Imposta la baud dati del modulo e aggiorna la baud del data mode.",
  descrizione: `
    Tenta la sintassi HC-05 (<code>AT+UART=rate,0,0</code>). Dopo il cambio, riporta il modulo al data mode e re-inizializza.
  `,
  esempi: [
    {
      code: `
10 BT ATMODE ON
20 BT SETBAUD 9600
30 BT ATMODE OFF
40 BT END
50 BT INIT 16 17 9600
60 PRINT "BAUD OK"
RUN
      `,
      note: "Cambio baud completo."
    }
  ],
  note: "Su alcuni HC-05 serve <code>AT+RESET</code> per applicare la nuova UART."
},
{
  id: "bt-setname",
  nome: "BT SETNAME",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT SETNAME \"Nome\"",
  sommario: "Imposta il nome del modulo (helper per HC-05/HC-06).",
  descrizione: `
    Prova HC-05 (<code>AT+NAME=Nome</code>) e HC-06 (<code>AT+NOMENome</code>). Non legge l’OK.
  `,
  esempi: [
    {
      code: `
10 BT SETNAME "BASIC32"
20 BT AT "AT+NAME?" RESP N$ 1000
30 PRINT N$
RUN
      `,
      note: "Verifica del nome via AT."
    }
  ],
  note: "Usa <code>BT AT … RESP …</code> per controllare la risposta."
},
{
  id: "bt-setpin",
  nome: "BT SETPIN",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT SETPIN \"1234\"",
  sommario: "Imposta il PIN di pairing del modulo (helper).",
  descrizione: `
    Tenta HC-05 (<code>AT+PSWD=1234</code>) e HC-06 (<code>AT+PIN1234</code>). Non legge l’OK.
  `,
  esempi: [
    {
      code: `
10 BT SETPIN "1234"
20 BT AT "AT+PSWD?" RESP P$ 1000
30 PRINT P$
RUN
      `,
      note: "Verifica PIN su HC-05."
    }
  ],
  note: "La sintassi di lettura del PIN può variare per firmware."
},
{
  id: "bt-timeout",
  nome: "BT TIMEOUT",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT TIMEOUT ms",
  sommario: "Imposta il timeout predefinito (ms) per le letture in AT mode.",
  descrizione: `
    Definisce il timeout usato da <code>BT AT … RESP …</code> e <code>BT VERSION</code> quando non specificato.
  `,
  esempi: [
    { code: "10 BT TIMEOUT 1500\n20 PRINT \"TIMEOUT OK\"\nRUN", note: "Imposta timeout a 1500 ms." }
  ],
  note: "Influisce solo sulle letture AT con risposta a riga."
},
{
  id: "bt-version",
  nome: "BT VERSION",
  categoria: "Bluetooth (HC-05/HC-06)",
  sintassi: "BT VERSION var$",
  sommario: "Tenta AT+VERSION? (HC-05) o AT+VERSION (HC-06) e salva la risposta.",
  descrizione: `
    Richiede AT mode attivo. La risposta (se presente) viene salvata in <code>var$</code>.
  `,
  esempi: [
    {
      code: `
10 BT ATMODE ON
20 BT VERSION V$
21 IF LEN(V$)=0 THEN PRINT "NESSUNA RISPOSTA"
30 PRINT V$
RUN
      `,
      note: "Lettura versione firmware modulo."
    }
  ],
  note: "Se non in AT mode, la risposta può essere vuota."
},
{
  id: "callfunc",
  nome: "CALLFUNC",
  categoria: "Funzioni utente",
  sintassi: "CALLFUNC <nome>",
  sommario: "Esegue una funzione definita con FUNC una sola volta (bloccante).",
  descrizione: `
    Invoca l’implementazione definita con <code>FUNC ... ENDFUNC</code> e attende la sua conclusione prima di proseguire.
  `,
  esempi: [
    {
      code: `
5  PINMODE 2 OUTPUT NOPULL
10 FUNC LAMP
20 DWRITE 2 1
30 DELAY 500
40 DWRITE 2 0
50 DELAY 500
60 ENDFUNC
70 CALLFUNC LAMP
      `,
      note: "Esegue la funzione LAMP una volta."
    },
    {
      code: `
80 CALLFUNC LAMP
90 DELAY 1000
100 GOTO 80
      `,
      note: "Uso ripetuto della funzione."
    }
  ],
  note: "La funzione deve essere già definita e il nome deve corrispondere. Non usare per funzioni LOOP (usare STARTFUNC)."
},
{
  id: "chr",
  nome: "CHR$(x)",
  categoria: "Stringhe",
  sintassi: "CHR$(codice)",
  sommario: "Restituisce il carattere ASCII corrispondente a un valore numerico (0–255).",
  descrizione: `
    Converte un codice numerico nel carattere ASCII corrispondente. Utile per costruire stringhe o stampare caratteri speciali.
  `,
  esempi: [
    { code: "10 PRINT CHR$(65)\nRUN", note: "Stampa 'A'." },
    { code: "10 FOR I=65 TO 90\n20 PRINT CHR$(I);\n30 NEXT I\nRUN", note: "Stampa A..Z." },
    { code: "10 PRINT \"RIGA1\" + CHR$(10) + \"RIGA2\"\nRUN", note: "Usa LF per andare a capo." },
    { code: "10 PRINT \"NOME\" + CHR$(9) + \"VALORE\"\nRUN", note: "Inserisce un TAB." },
    { code: "10 T$ = CHR$(72) + CHR$(73)\n20 PRINT T$\nRUN", note: "Costruisce \"HI\"." }
  ],
  note: "CHR$(10)=LF, CHR$(13)=CR, CHR$(32)=spazio, CHR$(9)=TAB. Vedi anche <code>ASC</code>, <code>MID$</code>, <code>LEFT$</code>, <code>RIGHT$</code>."
},
{
  id: "cls",
  nome: "CLS",
  categoria: "Terminale",
  sintassi: "CLS",
  sommario: "Pulisce lo schermo inviando righe vuote sul terminale seriale.",
  descrizione: `
    Simula la pulizia dello schermo come nei vecchi ambienti BASIC, senza toccare codice o variabili.
  `,
  esempi: [
    { code: "10 CLS\n20 PRINT \"BENVENUTO NEL SISTEMA\"\nRUN", note: "Schermo “pulito” prima del messaggio." },
    { code: "10 PRINT \"PRIMA DEL CLS\"\n20 WAIT 2000\n30 CLS\n40 PRINT \"DOPO IL CLS\"\nRUN", note: "Intermezzo di pulizia tra due stampe." }
  ],
  note: "Effetto visivo; compatibilità massima ma meno “elegante” di <code>CLSANSI</code>."
},
{
  id: "clsansi",
  nome: "CLSANSI",
  categoria: "Terminale",
  sintassi: "CLSANSI",
  sommario: "Pulisce lo schermo usando ESC[2J (ANSI).",
  descrizione: `
    Invia la sequenza ANSI <code>ESC[2J</code> per cancellare lo schermo sui terminali compatibili (PuTTY, TeraTerm, minicom, ecc.).
  `,
  esempi: [
    { code: "10 CLSANSI\n20 PRINT \"PRONTO PER L'INPUT\"\nRUN", note: "Pulizia istantanea con ANSI." },
    {
      code: `
10 PRINT "USO CLS:"
20 CLS
30 PRINT "FATTO"
40 WAIT 2000
50 PRINT "USO CLSANSI:"
60 CLSANSI
70 PRINT "FINITO"
RUN
      `,
      note: "Confronto tra metodi di pulizia."
    }
  ],
  note: "Funziona solo su terminali che supportano escape ANSI."
},
{
  id: "copy",
  nome: "COPY",
  categoria: "File system",
  sintassi: `
COPY "file"
COPY FILE$
COPY "*"
  `,
  sommario: "Copia file da SPIFFS a SD (sovrascrive se esiste).",
  descrizione: `
    Copia i file dalla SPIFFS alla scheda SD. Accetta:
    • nomi tra virgolette
    • variabili/esp. stringa (es. FILE$)
    • "*" per copiare tutti i file presenti in SPIFFS
    Se il file è già presente sulla SD, viene sovrascritto.
  `,
  esempi: [
    {
      code: `
10 NAME$ = "init.bas"
20 COPY NAME$
30 PRINT "File copiato su SD"
      `,
      note: "Copia un file indicato in variabile."
    },
    {
      code: `
10 COPY "*"
20 PRINT "Tutti i file copiati dalla SPIFFS alla SD"
      `,
      note: "Copia massiva."
    }
  ],
  note: "Richiede SD montata. Nomi e path dipendono dal filesystem."
},
{
  id: "cos",
  nome: "COS(x)",
  categoria: "Funzioni matematiche",
  sintassi: "COS(x)",
  sommario: "Restituisce il coseno di x espresso in gradi.",
  descrizione: `
    <code>COS(x)</code> calcola il coseno dell’angolo <em>x</em> in gradi. Restituisce un valore tra -1 e 1.
    Per usare radianti, converti prima: <code>COS(x * 180 / PI)</code>.
  `,
  esempi: [
    { code: "10 PRINT \"COS(60) = \"; COS(60)\nRUN", note: "COS(60°)=0.5" },
    { code: "10 FOR A=0 TO 360 STEP 30\n20 PRINT \"COS(\";A;\") = \"; COS(A)\n30 NEXT A\nRUN", note: "Tabella rapida dei coseni." },
    { code: "10 A=135\n20 IF COS(A)<0 THEN PRINT \"COSENO NEGATIVO\"\nRUN", note: "Uso in condizione." }
  ],
  note: "Input in gradi; per precisione dei decimali dipende dal formato di stampa."
},
{
  id: "data",
  nome: "DATA",
  categoria: "Dati",
  sintassi: "DATA valore1, valore2, valore3, ...",
  sommario: "Dichiara costanti lette in seguito con READ.",
  descrizione: `
    <code>DATA</code> definisce una sequenza costante (numeri o stringhe) per <code>READ</code>.
    Le voci sono lette in ordine. Puoi riavviare con <code>RESTORE</code>.
  `,
  esempi: [
    {
      code: "10 DATA 100,200,300\n20 READ A,B,C\n30 PRINT A,B,C\nRUN",
      note: "Lettura di numeri."
    },
    {
      code: "10 DATA \"UNO\",\"DUE\",\"TRE\"\n20 READ A$,B$,C$\n30 PRINT A$,B$,C$\nRUN",
      note: "Lettura di stringhe."
    },
    {
      code: "10 DATA 1,2,3,4,5\n20 FOR I=1 TO 5\n30 READ X\n40 PRINT \"VALORE \";I;\": \";X\n50 NEXT I\nRUN",
      note: "Lettura in loop."
    },
    {
      code: "10 DATA 10,20\n20 READ A,B\n30 PRINT A,B\n40 RESTORE\n50 READ C\n60 PRINT C\nRUN",
      note: "Uso di RESTORE per ricominciare."
    }
  ],
  note: "Gli elementi DATA non vengono eseguiti; sono un archivio interno."
},
{
  id: "dated",
  nome: "DATED",
  categoria: "Data/Ora",
  sintassi: "DATED",
  sommario: "Ritorna il giorno corrente (1–31).",
  descrizione: `
    Restituisce il giorno del mese secondo l’orologio di sistema.
  `,
  esempi: [
    { code: "10 PRINT DATED\nRUN", note: "Stampa il giorno corrente." }
  ],
  note: "Ritorna intero; dipende dalla data impostata/sincronizzata."
},
{
  id: "datem",
  nome: "DATEM",
  categoria: "Data/Ora",
  sintassi: "DATEM",
  sommario: "Ritorna il mese corrente (1–12).",
  descrizione: `
    Restituisce il numero del mese secondo l’orologio interno.
  `,
  esempi: [
    { code: "10 PRINT DATEM\nRUN", note: "Stampa il mese corrente." }
  ],
  note: "Ritorna intero; dipende dalla data impostata/sincronizzata."
},
{
  id: "datey",
  nome: "DATEY",
  categoria: "Data/Ora",
  sintassi: "DATEY",
  sommario: "Ritorna l’anno corrente (es. 2025).",
  descrizione: `
    Restituisce l’anno secondo l’orologio interno.
  `,
  esempi: [
    { code: "10 PRINT DATEY\nRUN", note: "Stampa l’anno corrente." }
  ],
  note: "Intero a quattro cifre; dipende dall’RTC/sync."
},
{
  id: "debugmem",
  nome: "DEBUGMEM",
  categoria: "Diagnostica",
  sintassi: "DEBUGMEM",
  sommario: "Mostra stato memoria/risorse su monitor seriale.",
  descrizione: `
    Stampa heap disponibile, stack residuo (ESP32), conteggio/valore variabili numeriche e stringa,
    numero di array, sprite attivi (ID, X/Y, nome dati).
    Utile per analizzare consumi e possibili leak.
  `,
  esempi: [
    { code: "10 DEBUGMEM\nRUN", note: "Dump iniziale dello stato." },
    { code: "10 GOSUB 1000\n20 DEBUGMEM\nRUN", note: "Verifica risorse dopo animazioni/grafica." }
  ],
  note: "Non modifica lo stato; solo diagnostica. In loop aiuta a individuare perdite nel tempo."
},
{
  id: "def-fn",
  nome: "DEF FN",
  categoria: "Funzioni utente",
  sintassi: "DEF FNnome(arg1, arg2, ...) = espressione",
  sommario: "Definisce funzioni inline che restituiscono il valore di un’espressione.",
  descrizione: `
    Consente di definire funzioni personalizzate che accettano argomenti e ritornano il risultato di una espressione.
    Il nome deve iniziare con <code>FN</code> (es. <code>FNADD</code>). Non sono ammessi comandi (PRINT, GOTO, IF ecc.) all’interno: solo espressioni.
  `,
  esempi: [
    { code: "10 DEF FNADD(X,Y)=X+Y\n20 PRINT \"5 + 3 = \"; FNADD(5,3)\nRUN", note: "Somma a due argomenti." },
    { code: "10 DEF FNSQ(X)=X*X\n20 PRINT \"7^2 = \"; FNSQ(7)\nRUN", note: "Quadrato di un numero." },
    { code: "10 DEF FNAREA(R)=3.14*R*R\n20 INPUT R\n30 PRINT \"AREA = \"; FNAREA(R)\nRUN", note: "Area cerchio da input." },
    { code: "10 DEF FNTRIPLA(X)=X*3\n20 FOR I=1 TO 5\n30 PRINT \"TRIPLO DI \";I;\" = \"; FNTRIPLA(I)\n40 NEXT I\nRUN", note: "Richiamo multiplo in ciclo." }
  ],
  note: "Funzioni pure, senza effetti collaterali; richiamabili in espressioni."
},
{
  id: "del",
  nome: "DEL",
  categoria: "File system",
  sintassi: `
DEL "nomefile"
DEL variabile$
  `,
  sommario: "Elimina un file dalla SD (silenzioso se inesistente).",
  descrizione: `
    Cancella un file dalla memoria SD. Accetta nome tra virgolette o variabile stringa.
    Non genera errore se il file non esiste.
  `,
  esempi: [
    { code: "DEL \"prog1.bas\"", note: "Elimina file con nome diretto." },
    { code: "10 LET F$=\"prog1.bas\"\n20 DEL F$\nRUN", note: "Elimina file specificato in variabile." }
  ],
  note: "Opera su SD. Per SPIFFS usare i comandi dedicati (se previsti)."
},
{
  id: "deln",
  nome: "DELN",
  categoria: "Editor",
  sintassi: `
DELN n
DELN n1,n2,n3
DELN a-b
  `,
  sommario: "Elimina una o più righe dal programma in memoria.",
  descrizione: `
    Rimuove singole righe, liste di righe separate da virgole o intervalli continui.
    Se una riga non esiste, viene ignorata. Digitare solo il numero di riga (senza DELN) elimina comunque la riga.
  `,
  esempi: [
    {
      code: `
10 PRINT "Ciao"
20 PRINT "Riga da cancellare"
30 PRINT "Fine"
RUN
DELN 20
LIST
      `,
      note: "Elimina riga 20."
    },
    {
      code: `
10 PRINT "Riga1"
20 PRINT "Riga2"
30 PRINT "Riga3"
40 PRINT "Riga4"
DELN 10,30
LIST
      `,
      note: "Elimina più righe non contigue."
    },
    {
      code: `
100 PRINT "A"
110 PRINT "B"
120 PRINT "C"
130 PRINT "D"
DELN 100-120
LIST
      `,
      note: "Elimina intervallo."
    },
    { code: "DELN 500", note: "Riga inesistente: nessun errore." }
  ],
  note: "Agisce solo sul listato in RAM. Per salvare, usa SAVE."
},
{
  id: "delvar",
  nome: "DELVAR",
  categoria: "KV/JSON su SD",
  sintassi: `
DELVAR "file"
DELVAR "file" "chiave"
  `,
  sommario: "Elimina un file JSON intero o una singola chiave al suo interno (su SD).",
  descrizione: `
    Senza chiave: cancella l’intero file JSON. Con chiave: rimuove solo la voce specificata.
    ⚠ Agisce solo su SD; per SPIFFS usare <code>EDELVAR</code>.
  `,
  esempi: [
    { code: "10 DELVAR \"config.json\" \"NOME\"", note: "Elimina una chiave dal file." },
    { code: "10 DELVAR \"config.json\"", note: "Elimina completamente il file." }
  ],
  note: "Nessun effetto se il file/chiave non esiste."
},
{
  id: "delay",
  nome: "DELAY",
  categoria: "Temporizzazione",
  sintassi: "DELAY n",
  sommario: "Pausa bloccante di n millisecondi.",
  descrizione: `
    Sospende l’esecuzione per <em>n</em> ms. Durante il delay non viene eseguito altro codice.
  `,
  esempi: [
    { code: "10 PRINT \"CIAO\"\n20 DELAY 1000\n30 PRINT \"MONDO\"\nRUN", note: "Pausa di 1 s tra messaggi." },
    { code: "10 CLS\n20 PRINT \"☼\"\n30 DELAY 500\n40 CLS\n50 DELAY 500\n60 GOTO 10\nRUN", note: "Lampeggio a 0.5 s." },
    { code: "10 INPUT \"NOME: \"; N$\n20 PRINT \"ATTENDI...\"\n30 DELAY 2000\n40 PRINT \"BENVENUTO \"; N$\nRUN", note: "Ritardo dopo input." },
    { code: "10 FOR I=5 TO 1 STEP -1\n20 PRINT I\n30 DELAY 1000\n40 NEXT I\n50 PRINT \"VIA!\"\nRUN", note: "Countdown." }
  ],
  note: "Bloccante. Unità: millisecondi (1000 = 1 s)."
},
{
  id: "dev-auto",
  nome: "DEV AUTO",
  categoria: "Developer Console",
  sintassi: `
DEV AUTO ON
DEV AUTO OFF
  `,
  sommario: "Abilita/disabilita l’avvio automatico della modalità developer al boot.",
  descrizione: `
    Se ON, al riavvio inizializza display e tastiera PS/2 configurati senza reinserire i comandi.
  `,
  esempi: [
    {
      code: `
10 DEV AUTO ON
20 DEV OLED SET 21 22 0x3C 128 64 0
30 DEV DISPLAY OLED
40 DEV ON
RUN
      `,
      note: "Alla successiva accensione parte in dev mode con OLED pronto."
    }
  ],
  note: "La configurazione viene salvata."
},
{
  id: "dev-clear",
  nome: "DEV CLEAR",
  categoria: "Developer Console",
  sintassi: "DEV CLEAR",
  sommario: "Pulisce lo schermo del display corrente in dev mode.",
  descrizione: `
    Cancella la console del display selezionato (non disattiva dev mode).
  `,
  esempi: [
    { code: "DEV CLEAR", note: "Schermata pulita." }
  ],
  note: "Utile per ripartire da una console vuota."
},
{
  id: "dev-cursor",
  nome: "DEV CURSOR",
  categoria: "Developer Console",
  sintassi: `
DEV CURSOR ON
DEV CURSOR OFF
  `,
  sommario: "Mostra/nasconde il cursore lampeggiante della console DEV.",
  descrizione: `
    Abilita o disabilita il cursore per distinguere stati di input.
  `,
  esempi: [
    { code: "DEV CURSOR ON", note: "Abilita cursore." },
    { code: "DEV CURSOR OFF", note: "Disabilita cursore." }
  ],
  note: "Persistenza dipende dall’implementazione."
},
{
  id: "dev-display",
  nome: "DEV DISPLAY",
  categoria: "Developer Console",
  sintassi: `
DEV DISPLAY OLED
DEV DISPLAY ILI
DEV DISPLAY LCD
  `,
  sommario: "Seleziona il display per l’output della console DEV.",
  descrizione: `
    Sceglie il device di output (OLED/ILI/LCD) per PRINT/LIST/EDIR ecc.
    La selezione viene salvata e resta attiva ai riavvii. Il display deve essere stato configurato in precedenza.
  `,
  esempi: [
    { code: "10 DEV DISPLAY OLED\n20 DEV CLEAR\n30 PRINT \"Benvenuto su OLED\"\nRUN", note: "Console su OLED." },
    { code: "10 DEV DISPLAY ILI\n20 DEV CLEAR\n30 PRINT \"Schermo ILI attivo\"\nRUN", note: "Console su ILI9341." },
    { code: "10 DEV DISPLAY LCD\n20 DEV CLEAR\n30 PRINT \"LCD operativo\"\nRUN", note: "Console su LCD caratteri." }
  ],
  note: "Errore se il dispositivo non è configurato o non inizializza; resta il precedente."
},
{
  id: "dev-font",
  nome: "DEV FONT",
  categoria: "Developer Console",
  sintassi: "DEV FONT <size>",
  sommario: "Imposta il fattore di scala del font della console DEV.",
  descrizione: `
    Modifica la dimensione del font. Minimo 1. Il cambio effettua un clear.
  `,
  esempi: [
    { code: "DEV FONT 1", note: "Dimensione base." },
    { code: "DEV FONT 2", note: "Font più grande." }
  ],
  note: "Il clear è automatico al cambio di font."
},
{
  id: "dev-ili-set",
  nome: "DEV ILI SET",
  categoria: "Developer Console",
  sintassi: "DEV ILI SET <CS> <DC> <RST> <LED> [SCK MOSI MISO] [ROT]",
  sommario: "Configura pin e opzioni per un display ILI9341.",
  descrizione: `
    Imposta pin di controllo (CS, DC, RST, LED), opzionale bus SPI personalizzato (SCK/MOSI/MISO) e rotazione (ROT).
  `,
  esempi: [
    {
      code: "DEV ILI SET 17 16 5 32 18 23 19 3\nDEV DISPLAY ILI\nDEV ON",
      note: "ILI9341 con retroilluminazione su GPIO32."
    }
  ],
  note: "Richiede collegamenti corretti ai pin specificati."
},
{
  id: "dev-lcd-i2c-set",
  nome: "DEV LCD I2C SET",
  categoria: "Developer Console",
  sintassi: "DEV LCD I2C SET <addr> <cols> <rows> <sda> <scl>",
  sommario: "Configura un display LCD via adattatore I²C.",
  descrizione: `
    Imposta indirizzo I²C, colonne/righe e pin SDA/SCL del display LCD.
  `,
  esempi: [
    { code: "DEV LCD I2C SET 3C 16 2 21 22\nDEV DISPLAY LCD\nDEV ON", note: "LCD 16x2 a 0x3C su SDA=21, SCL=22." }
  ],
  note: "Indirizzo in hex senza 0x."
},
{
  id: "dev-lcd-par-set",
  nome: "DEV LCD PAR SET",
  categoria: "Developer Console",
  sintassi: "DEV LCD PAR SET <rs> <en> <d4> <d5> <d6> <d7> <cols> <rows>",
  sommario: "Configura un LCD parallelo (4 bit).",
  descrizione: `
    Richiede pin RS/EN/D4..D7 e dimensioni (cols, rows).
  `,
  esempi: [
    { code: "DEV LCD PAR SET 12 11 5 4 3 2 20 4\nDEV DISPLAY LCD\nDEV ON", note: "LCD 20x4 in parallelo." }
  ],
  note: "Verifica compatibilità pin con la board."
},
{
  id: "dev-mapcols",
  nome: "DEV MAPCOLS",
  categoria: "Developer Console",
  sintassi: "DEV MAPCOLS <n>",
  sommario: "Imposta le colonne logiche della console DEV.",
  descrizione: `
    Mappa correttamente la stampa su display grafici definendo il numero di colonne virtuali.
  `,
  esempi: [
    { code: "DEV MAPCOLS 40", note: "40 colonne virtuali." }
  ],
  note: "Usare insieme a risoluzione/display per layout coerente."
},
{
  id: "dev-maprows",
  nome: "DEV MAPROWS",
  categoria: "Developer Console",
  sintassi: "DEV MAPROWS <n>",
  sommario: "Imposta le righe logiche della console DEV.",
  descrizione: `
    Definisce il numero di righe virtuali per la console.
  `,
  esempi: [
    { code: "DEV MAPROWS 20", note: "20 righe virtuali." }
  ],
  note: "Si combina con MAPCOLS per l’impaginazione."
},
{
  id: "dev-oled-set",
  nome: "DEV OLED SET",
  categoria: "Developer Console",
  sintassi: "DEV OLED SET <width> <height> <addr> <sda> <scl> <rst>",
  sommario: "Configura un OLED SSD1306 su I²C.",
  descrizione: `
    Richiede dimensioni, indirizzo I²C e pin SDA/SCL/RST.
  `,
  esempi: [
    { code: "DEV OLED SET 128 64 3C 21 22 0\nDEV DISPLAY OLED\nDEV ON", note: "OLED 128x64 @0x3C." }
  ],
  note: "Indirizzo in hex senza 0x."
},
{
  id: "dev-onoff",
  nome: "DEV ON / OFF",
  categoria: "Developer Console",
  sintassi: `
DEV ON
DEV OFF
  `,
  sommario: "Abilita/disabilita la console developer sul display selezionato.",
  descrizione: `
    DEV ON: duplica le stampe Serial anche sul display. DEV OFF: disattiva la console su display.
    L’attivazione può richiedere un riavvio per inizializzare.
  `,
  esempi: [
    { code: "DEV DISPLAY OLED\nDEV ON", note: "Abilita console su OLED e mirror Serial→Display." },
    { code: "DEV OFF", note: "Torna alla sola seriale." }
  ],
  note: "All’attivazione può riavviare l’ESP per applicare la config."
},
{
  id: "dev-ps2-off",
  nome: "DEV PS2 OFF",
  categoria: "Developer Console",
  sintassi: "DEV PS2 OFF",
  sommario: "Disabilita la tastiera PS/2 in dev mode.",
  descrizione: `
    Interrompe la lettura della tastiera PS/2.
  `,
  esempi: [
    { code: "DEV PS2 OFF", note: "PS/2 disabilitata." }
  ],
  note: "Nessuna configurazione eliminata."
},
{
  id: "dev-ps2-on",
  nome: "DEV PS2 ON",
  categoria: "Developer Console",
  sintassi: "DEV PS2 ON",
  sommario: "Abilita la tastiera PS/2 per la console DEV.",
  descrizione: `
    Attiva l’input PS/2; richiede configurazione pin con <code>DEV PS2 SET</code>.
  `,
  esempi: [
    { code: "DEV PS2 ON", note: "PS/2 attivata." }
  ],
  note: "Assicurarsi che i pin siano stati configurati."
},
{
  id: "dev-ps2-set",
  nome: "DEV PS2 SET",
  categoria: "Developer Console",
  sintassi: "DEV PS2 SET <clkPin> <dataPin>",
  sommario: "Configura i pin per la tastiera PS/2.",
  descrizione: `
    Imposta i pin CLK/DATA per l’uso della tastiera in dev mode.
  `,
  esempi: [
    { code: "DEV PS2 SET 33 32", note: "CLK=33, DATA=32." }
  ],
  note: "Dopo SET, usare DEV PS2 ON per abilitare l’input."
},
{
  id: "dev-serial",
  nome: "DEV SERIAL ON / OFF",
  categoria: "Developer Console",
  sintassi: `
DEV SERIAL ON
DEV SERIAL OFF
  `,
  sommario: "Abilita/disabilita il mirroring dell’output DEV su USB Serial.",
  descrizione: `
    ON: replica l’output della console DEV anche su Serial.
    OFF: non replica su Serial (più veloce su ILI/OLED in stampe lunghe).
    Non cambia il baud; controlla solo il mirroring. Non persistente al riavvio.
  `,
  esempi: [
    { code: "10 DEV SERIAL ON\n20 PRINT \"Ciao su display e USB!\"\nRUN", note: "Log su display e su Serial." },
    { code: "10 DEV SERIAL OFF\n20 LIST\nRUN", note: "LIST più reattivo senza eco USB." }
  ],
  note: "Se il Serial Monitor non è aperto, l’output può accodarsi nel buffer."
},
{
  id: "dev-status",
  nome: "DEV STATUS",
  categoria: "Developer Console",
  sintassi: "DEV STATUS",
  sommario: "Mostra lo stato attuale della modalità developer.",
  descrizione: `
    Indica stato (ON/AUTO), display selezionato, font, mappatura, cursore, PS/2, e configurazioni salvate per OLED/ILI/LCD.
  `,
  esempi: [
    { code: "DEV STATUS", note: "Dump configurazione correnti." }
  ],
  note: "Indirizzi I²C mostrati in hex senza 0x."
},
{
  id: "dhtcalibreset",
  nome: "DHTCALIBRESET",
  categoria: "Sensori DHT",
  sintassi: `
DHTCALIBRESET pin
DHTCALIBRESET ALL
  `,
  sommario: "Resetta le calibrazioni DHT/DHTT/DHTH (offset/slope) per un pin o per tutti.",
  descrizione: `
    Ripristina i parametri di calibrazione a offset=0 e slope=1 per il pin indicato o per tutti (ALL).
    Utile per annullare correzioni impostate con <code>DHTCALIBSET</code>.
  `,
  esempi: [
    {
      code: `
10 DHTCALIBSET DHT 2 0.5 -2
20 DHTCALIBRESET 2
30 SDHCALIBSHOW
RUN
      `,
      note: "Reset solo per il pin 2."
    },
    {
      code: `
10 DHTCALIBSET DHT 2 1.0
20 DHTCALIBSET DHT 4 -0.5
30 DHTCALIBRESET ALL
40 SDHCALIBSHOW
RUN
      `,
      note: "Reset globale."
    },
    {
      code: `
10 DHTCALIBSET DHTT 2 1.0
20 DHTREAD 2 T H
30 PRINT T
40 DHTCALIBRESET 2
50 DHTREAD 2 T H
60 PRINT T
RUN
      `,
      note: "Confronto letture prima/dopo reset."
    }
  ],
  note: "pin = quello usato in DHTINIT. Dopo reset, letture tornano ai valori grezzi del sensore."
}
];
