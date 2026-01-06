// manual.*.js — Manuale
export default [
  {
    "id": "introduzione-a-basic32-interprete-basic-per-esp32",
    "tipo": "introduzione",
    "titolo": "Introduzione a Basic32 – Interprete BASIC per ESP32",
    "contenuto": `
<p>Basic32 è un potente ma leggero interprete BASIC sviluppato per la scheda ESP32, progettato per rendere la programmazione dell'ESP32 accessibile anche senza conoscenze di C/C++ o ambienti di sviluppo complessi. Con Basic32 puoi scrivere, salvare ed eseguire codice BASIC in tempo reale, utilizzando un qualsiasi terminale seriale. Questo approccio elimina completamente la necessità di ricompilare il firmware ad ogni modifica del programma. Caratteristiche principali</p>

<ul>
  <li>Scrittura diretta del codice BASIC da terminale seriale (es. Basic32Terminal, PuTTY, Arduino Serial Monitor, etc.)</li>
  <li>Salvataggio e caricamento dei listati su memoria interna (SPIFFS) o su scheda SD (se presente)</li>
  <li>Memorizzazione del programma in RAM con supporto a:</li>
</ul>

<p>o	variabili numeriche, stringhe, array o	funzioni definite dall’utente o	flusso di controllo (IF, GOTO, GOSUB, FOR/NEXT)</p>

<ul>
  <li>Controllo I/O GPIO: lettura/scrittura digitale e analogica, configurazione pin</li>
  <li>Funzioni di tempo e generazione casuale</li>
  <li>Comandi integrati: LIST, RUN, NEW, HELP, SAVE, LOAD</li>
  <li>Interprete interattivo: ogni riga può essere digitata e valutata in tempo reale</li>
</ul>

<p>Gestione di file BASIC tramite comandi su SD o SPIFFS Basic32 è pensato per:</p>

<ul>
  <li>appassionati di retro-programmazione</li>
  <li>maker che vogliono controllare ESP32 in modo semplice</li>
  <li>chi cerca un ambiente educativo e interattivo</li>
  <li>chi vuole fare prototipazione rapida senza compilazioni continue</li>
</ul>

<p>Requisiti hardware</p>

<ul>
  <li>Scheda ESP32 (modello DEV, S3, C3 con supporto SPIFFS e interfaccia SD opzionale)</li>
  <li>Connessione seriale al PC</li>
  <li>(Opzionale) Scheda SD collegata ai pin definiti nel codice:</li>
</ul>

<p>o	MOSI → GPIO 23 o	MISO → GPIO 19 o	SCK → GPIO 18 o	CS → GPIO 15 Utilizzo di più dispositivi SPI su ESP32 con Basic32 L’ESP32 dispone di bus SPI hardware che possono essere condivisi tra più periferiche (display TFT, lettore RFID, touch screen, scheda SD, ecc.). Tutti i dispositivi SPI utilizzano in comune i pin MOSI, MISO e SCK, ma ciascun dispositivo deve avere un Chip Select (CS) dedicato. Per evitare conflitti sul bus SPI: 1.	Assegna un pin CS dedicato a ogni dispositivo (es. TFT<em>CS=17, SD</em>CS=13, TOUCH<em>CS=4, RFID</em>CS=25). 2.	Mantieni i CS alti (HIGH) quando il dispositivo non è in uso, così non interferisce con gli altri. 3.	Imposta i CS come OUTPUT e portali HIGH prima di inizializzare i moduli. 4.	Inizializza i dispositivi con i relativi comandi (INITSD, ILI INIT, RFID INIT, ecc.). Esempio: Display ILI9341 con SD e Touch integrati 10 PINMODE 17 OUTPUT NOPULL   ' TFT<em>CS come output 20 DWRITE 17 1                ' tiene inattivo il display 30 PINMODE 4 OUTPUT NOPULL    ' TOUCH</em>CS come output 40 DWRITE 4 1                 ' tiene inattivo il touch 50 PINMODE 13 OUTPUT NOPULL    ' SD_CS come output 60 DWRITE 13 1                 ' tiene inattiva sd 70 INITSD 13 23 19 18         ' inizializza SD (CS=13, MOSI=23, MISO=19, SCK=18) 80 ILI INIT 17 16 5 3         ' inizializza TFT (CS=17, DC=16, RST=5, rotazione=3) 90 ILI LED 32 1               ' accende retroilluminazione su GPIO32 100 ILI TEXT 10 50 2 SDFREE 0 255 255  ' stampa spazio libero su SD in giallo Nota: Se aggiungi altre periferiche SPI (es. RFID RC522), assegna loro un CS dedicato, imposta PINMODE &lt;CS&gt; OUTPUT e DWRITE &lt;CS&gt; 1 prima di eseguire il rispettivo INIT. Con questa sequenza, ogni dispositivo è pronto a lavorare senza disturbare gli altri sul bus SPI. Cosa puoi fare con Basic32?</p>

<ul>
  <li>Scrivere e testare algoritmi BASIC in tempo reale</li>
  <li>Costruire applicazioni interattive su ESP32 senza compilare</li>
  <li>Salvare programmi per riutilizzarli o modificarli in futuro</li>
  <li>Controllare sensori e attuatori con semplici comandi BASIC</li>
</ul><p><strong>Basic32</strong> è un interprete BASIC leggero e interattivo progettato per la scheda <strong>ESP32</strong>.</p>

<p>Consente di scrivere, modificare ed eseguire programmi BASIC in tempo reale senza dover ricompilare il firmware, utilizzando un semplice terminale seriale.</p>

<h3>Caratteristiche principali</h3>
<ul>
  <li>Interprete BASIC interattivo</li>
  <li>Nessuna ricompilazione del firmware</li>
  <li>Salvataggio su SPIFFS o SD</li>
  <li>Supporto GPIO, funzioni matematiche e logiche</li>
</ul>

<h3>A chi è rivolto</h3>
<ul>
  <li>Maker e hobbisti</li>
  <li>Appassionati di retro-programmazione</li>
  <li>Didattica e sperimentazione</li>
</ul>
    `,
  },
  {
    "id": "installazione-e-primo-avvio",
    "tipo": "introduzione",
    "titolo": "Installazione e Primo Avvio",
    "contenuto": `
<p>Installazione e Primo Avvio Questa sezione ti guida passo passo nell’installazione di Basic32 su una scheda ESP32, utilizzando firmware già compilati. Non è necessario usare l’Arduino IDE: il firmware può essere flashato direttamente dal browser oppure tramite script di installazione forniti dal progetto. <strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong> 1. Requisiti</p>

<ul>
  <li>Scheda ESP32 compatibile:</li>
</ul>

<p>o	ESP32 DEV o	ESP32 S3 o	ESP32 C3</p>

<ul>
  <li>Cavo USB per collegare l’ESP32 al PC</li>
  <li>PC con browser compatibile WebSerial (Chrome, Edge o derivati)</li>
</ul>

<p>oppure</p>

<ul>
  <li>Ambiente con Python installato (per installazione tramite script)</li>
</ul>

<p><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong> 2. Metodi di Installazione Metodo 1 – Installazione diretta dal sito (consigliato) Il modo più semplice e veloce per installare Basic32 è tramite il sito ufficiale, che permette di flashare il firmware direttamente sull’ESP32 dal browser. 1.	Collega la scheda ESP32 al PC tramite USB 2.	Apri il sito: 3.	https://ferrazzi.github.io/Basic32/ 4.	Clicca su Connect 5.	Autorizza l’accesso alla porta seriale quando richiesto 6.	Attendi il completamento del flash Al termine, la scheda è pronta per l’uso con Basic32. <strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong> Metodo 2 – Installazione tramite firmware e script (avanzato) In alternativa, è possibile installare Basic32 scaricando i file del firmware e utilizzando gli script ufficiali forniti nel repository GitHub del progetto. 1.	Vai alla sezione firmware del progetto: 2.	https://github.com/Ferrazzi/Basic32/tree/main/firmware 3.	Scarica la cartella relativa al tuo modello di ESP32 4.	Collega l’ESP32 al PC 5.	Esegui lo script di installazione fornito (Windows, Linux o macOS) 6.	Attendi il completamento del flash Questo metodo è indicato per utenti più esperti o per installazioni offline.</p>

<p><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong> 3. Primo Avvio 1.	Una volta flashato, riavvia l’ESP32. 2.	Apri un terminale seriale a 115200 baud. 3.	Dovresti vedere il prompt: BASIC32 v1.0 READY Ora puoi digitare comandi BASIC direttamente: 10 PRINT "HELLO BASIC32" 20 GOTO 10 RUN</p>

<p><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong> 4. Utilizzo SPIFFS ...puoi salvare e caricare listati BASIC con i comandi: SAVE "programma.bas" LOAD "programma.bas"</p>

<p><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong> 5. Utilizzo scheda SD (opzionale) Se il tuo hardware ha una scheda SD collegata ai seguenti pin: Segnale	GPIO ESP32 MISO	19 MOSI	23 SCK	18 CS	15</p>
    `,
  },
  {
    "id": "gestione-file-e-memoria",
    "tipo": "introduzione",
    "titolo": "Gestione File e Memoria",
    "contenuto": `
<p>Basic32 supporta sia la memoria interna SPIFFS dell’ESP32, sia una scheda microSD opzionale. Entrambi i supporti possono essere utilizzati per salvare, caricare e organizzare i file BASIC (.bas) senza dover ricompilare il firmware. <strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong> 1. Memoria SPIFFS (interna) SPIFFS è il file system interno dell’ESP32, montato automaticamente all’avvio. È utile quando non si ha a disposizione una scheda SD. Note:</p>

<ul>
  <li>I nomi dei file sono case-insensitive.</li>
  <li>L’estensione .bas è convenzionale, ma non obbligatoria.</li>
  <li>La dimensione disponibile dipende dalla partizione SPIFFS nel firmware (tipicamente 1MB–2MB).</li>
</ul>

<p><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong><strong><em></strong><strong></em></strong> 2. Scheda SD (esterna, opzionale) Se hai una scheda microSD collegata all’ESP32 (con pin configurati nel file Basic32.ino), puoi utilizzarla come memoria aggiuntiva o principale.</p>

<ul>
  <li>Il sistema rileva automaticamente la presenza della scheda SD.</li>
  <li>La SD deve essere formattata in FAT32</li>
</ul>

<p>La SD deve essere formattata in FAT32.</p>
    `,
  },
  {
    "id": "abs",
    "nome": "ABS(x)",
    "categoria": "Funzioni matematiche",
    "sintassi": "ABS(x)",
    "sommario": "Restituisce il valore assoluto di un numero",
    "descrizione": `
<p>La funzione ABS(x) restituisce il valore assoluto di x, cioè il numero senza segno. È utilizzabile in espressioni aritmetiche, assegnazioni e condizioni logiche. Accetta sia numeri interi che decimali. Se il numero è già positivo o zero, non viene modificato.</p>
    `,
    "esempi": [
      {
        "code": `
10 A = -42
20 B = ABS(A)
30 PRINT "VALORE ASSOLUTO: "; B

Output atteso:
VALORE ASSOLUTO: 42
        `,
        "note": "Mostra l’uso di ABS con un numero intero:",
      },
      {
        "code": `
10 PRINT "ABS(-3.14) = "; ABS(-3.14)

Output atteso:
ABS(-3.14) = 3.14
        `,
        "note": "Funziona anche con numeri float (virgola mobile):",
      },
      {
        "code": `
10 A = -7
20 IF ABS(A) = 7 THEN PRINT "È UGUALE A 7"

Output atteso: 
È UGUALE A 7
        `,
        "note": "ABS può essere usato direttamente in una condizione IF:",
      },
    ],
    "note": "ABS è una funzione pura: non modifica variabili, restituisce solo un valore numerico.",
  }
];