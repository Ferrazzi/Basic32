// AUTO-GENERATED FILE — DO NOT EDIT
export default [
  {
    "id": "introduzione-a-basic32-interprete-basic-per-esp32",
    "tipo": "introduzione",
    "titolo": "Introduzione a Basic32 interprete basic per esp32",
    "contenuto": "<p>Basic32 è un potente ma leggero interprete BASIC sviluppato per la scheda ESP32, progettato per rendere la programmazione dell'ESP32 accessibile anche senza conoscenze di C/C++ o ambienti di sviluppo complessi. Con Basic32 puoi scrivere, salvare ed eseguire codice BASIC in tempo reale, utilizzando un qualsiasi terminale seriale. Questo approccio elimina completamente la necessità di ricompilare il firmware ad ogni modifica del programma. Caratteristiche principali</p>\n\n<ul>\n  <li>Scrittura diretta del codice BASIC da terminale seriale (es. Basic32Terminal, PuTTY, Arduino Serial Monitor, etc.)</li>\n  <li>Salvataggio e caricamento dei listati su memoria interna (SPIFFS) o su scheda SD (se presente)</li>\n  <li>Memorizzazione del programma in RAM con supporto a:</li>\n</ul>\n\n<p>o\tvariabili numeriche, stringhe, array o\tfunzioni definite dall’utente o\tflusso di controllo (IF, GOTO, GOSUB, FOR/NEXT)</p>\n\n<ul>\n  <li>Controllo I/O GPIO: lettura/scrittura digitale e analogica, configurazione pin</li>\n  <li>Funzioni di tempo e generazione casuale</li>\n  <li>Comandi integrati: LIST, RUN, NEW, HELP, SAVE, LOAD</li>\n  <li>Interprete interattivo: ogni riga può essere digitata e valutata in tempo reale</li>\n</ul>\n\n<p>Gestione di file BASIC tramite comandi su SD o SPIFFS Basic32 è pensato per:</p>\n\n<ul>\n  <li>appassionati di retro-programmazione</li>\n  <li>maker che vogliono controllare ESP32 in modo semplice</li>\n  <li>chi cerca un ambiente educativo e interattivo</li>\n  <li>chi vuole fare prototipazione rapida senza compilazioni continue</li>\n</ul>\n\n<p>Requisiti hardware</p>\n\n<ul>\n  <li>Scheda ESP32 (modello DEV, S3, C3 con supporto SPIFFS e interfaccia SD opzionale)</li>\n  <li>Connessione seriale al PC</li>\n  <li>(Opzionale) Scheda SD collegata ai pin definiti nel codice:</li>\n</ul>\n\n<ul>\n   <li>MOSI → GPIO 23</li>\n   <li>MISO → GPIO 19</li>\n   <li>SCK → GPIO 18</li>\n   <li>CS → GPIO 15</li>\n</ul>\n\n<p>Utilizzo di più dispositivi SPI su ESP32 con Basic32</p>\n<p>L’ESP32 dispone di bus SPI hardware che possono essere condivisi tra più periferiche (display TFT, lettore RFID, touch screen, scheda SD, ecc.). Tutti i dispositivi SPI utilizzano in comune i pin MOSI, MISO e SCK, ma ciascun dispositivo deve avere un Chip Select (CS) dedicato.</p>\n<p>Per evitare conflitti sul bus SPI:</p>\n<p>     1. Assegna un pin CS dedicato a ogni dispositivo (es. TFT<em>CS=17, SD</em>CS=13, TOUCH<em>CS=4, RFID</em>CS=25). </p>\n<p>     2.\tMantieni i CS alti (HIGH) quando il dispositivo non è in uso, così non interferisce con gli altri.</p>\n<p>     3.\tImposta i CS come OUTPUT e portali HIGH prima di inizializzare i moduli.</p>\n<p>     4.\tInizializza i dispositivi con i relativi comandi (INITSD, ILI INIT, RFID INIT, ecc.).</p>\n<p>Esempio: Display ILI9341 con SD e Touch integrati</p>\n<code><p>10 PINMODE 17 OUTPUT NOPULL   ' TFT<em>CS come output</p>\n<p>20 DWRITE 17 1                ' tiene inattivo il display</p>\n<p>30 PINMODE 4 OUTPUT NOPULL    ' TOUCH</em>CS come output</p>\n<p>40 DWRITE 4 1                 ' tiene inattivo il touch</p>\n<p>50 PINMODE 13 OUTPUT NOPULL    ' SD_CS come output</p> \n<p>60 DWRITE 13 1                 ' tiene inattiva sd</p>\n<p>70 INITSD 13 23 19 18         ' inizializza SD (CS=13, MOSI=23, MISO=19, SCK=18)</p> \n<p>80 ILI INIT 17 16 5 3         ' inizializza TFT (CS=17, DC=16, RST=5, rotazione=3)</p>\n<p>90 ILI LED 32 1               ' accende retroilluminazione su GPIO32</p>\n<p>100 ILI TEXT 10 50 2 SDFREE 0 255 255  ' stampa spazio libero su SD in giallo</p></code>\n<p>Nota: Se aggiungi altre periferiche SPI (es. RFID RC522), assegna loro un CS dedicato, imposta PINMODE &lt;CS&gt; OUTPUT e DWRITE &lt;CS&gt; 1 prima di eseguire il rispettivo INIT. Con questa sequenza, ogni dispositivo è pronto a lavorare senza disturbare gli altri sul bus SPI. Cosa puoi fare con Basic32?</p>\n\n<ul>\n  <li>Scrivere e testare algoritmi BASIC in tempo reale</li>\n  <li>Costruire applicazioni interattive su ESP32 senza compilare</li>\n  <li>Salvare programmi per riutilizzarli o modificarli in futuro</li>\n  <li>Controllare sensori e attuatori con semplici comandi BASIC</li>\n</ul>\n\n<h3><strong>Installazione e Primo Avvio</strong></h3>\n\n<p>Questa sezione ti guida passo passo nell’installazione di Basic32 su una scheda ESP32, utilizzando firmware già compilati. Non è necessario usare l’Arduino IDE: il firmware può essere flashato direttamente dal browser oppure tramite script di installazione forniti dal progetto. </p>\n\n<p>1. Requisiti</p>\n\n<ul>\n  <li>Scheda ESP32 compatibile:</li>\n  <li>ESP32 DEV o\tESP32 S3 o\tESP32 C3</li>\n  <li>Cavo USB per collegare l’ESP32 al PC</li>\n  <li>PC con browser compatibile WebSerial (Chrome, Edge o derivati)</li>\n</ul>\n\n<p>oppure</p>\n\n<ul>\n  <li>Ambiente con Python installato (per installazione tramite script)</li>\n</ul>\n\n<p>2. Metodi di Installazione </p>\n\n<p>Metodo 1 – Installazione diretta dal sito (consigliato)</p>\n<p>Il modo più semplice e veloce per installare Basic32 è tramite il sito ufficiale, che permette di flashare il firmware direttamente sull’ESP32 dal browser.</p>\n<ul>\n   <li>1. Collega la scheda ESP32 al PC tramite USB</li>\n   <li>2. Apri il sito: <a href=\"<https://ferrazzi.github.io/Basic32/\" target=\"_blank\">https://ferrazzi.github.io/Basic32/</a></li>\n   <li>3. Clicca su Connect</li>\n   <li>4. Autorizza l’accesso alla porta seriale quando richiesto</li>\n   <li>5. Attendi il completamento del flash Al termine, la scheda è pronta per l’uso con Basic32. </li>\n</ul>\n\n<p>Metodo 2 – Installazione tramite firmware e script (avanzato)</p>\n<p>In alternativa, è possibile installare Basic32 scaricando i file del firmware e utilizzando gli script ufficiali forniti nel repository GitHub del progetto.</p>\n\n<ul>\n   <li>1. Vai alla sezione firmware del progetto:</li>\n   <li>2. <a href=\"https://github.com/Ferrazzi/Basic32/tree/main/firmware\" target=\"_blank\">https://github.com/Ferrazzi/Basic32/tree/main/firmware</a></li>\n   <li>3. Scarica la cartella relativa al tuo modello di ESP32</li>\n   <li>4. Collega l’ESP32 al PC</li>\n   <li>5. Esegui lo script di installazione fornito (Windows, Linux o macOS)</li>\n   <li>6. Attendi il completamento del flash</li>\n</ul>\n\n<p>Questo metodo è indicato per utenti più esperti o per installazioni offline.</p>\n\n<p>3. Primo Avvio</p>\n<ul>\n   <li>1. Una volta flashato, riavvia l’ESP32.</li>\n   <li>2. Apri un terminale seriale a 115200 baud.</li>\n   <li>3. Dovresti vedere il prompt: BASIC32 v1.0 READY Ora puoi digitare comandi BASIC direttamente:</li>\n\n<code><p>10 PRINT \"HELLO BASIC32\"</p>\n<p>20 GOTO 10</p>\n<p>RUN</p></code>\n\n   <li>4. Utilizzo SPIFFS ...puoi salvare e caricare listati BASIC con i comandi: SAVE \"programma.bas\" LOAD \"programma.bas\"</li>\n   <li>5. Utilizzo scheda SD (opzionale) Se il tuo hardware ha una scheda SD collegata ai seguenti pin: Segnale\tGPIO ESP32 MISO\t19 MOSI\t23 SCK\t18 CS\t15</li>\n</ul>\n<h3><strong>Gestione File e Memoria</strong></h3>\n\n<p>Basic32 supporta sia la memoria interna SPIFFS dell’ESP32, sia una scheda microSD opzionale. Entrambi i supporti possono essere utilizzati per salvare, caricare e organizzare i file BASIC (.bas) senza dover ricompilare il firmware.</p>\n<p>1. Memoria SPIFFS (interna) SPIFFS è il file system interno dell’ESP32, montato automaticamente all’avvio. È utile quando non si ha a disposizione una scheda SD.</p>\n\n<ul>\n  <li>I nomi dei file sono case-insensitive.</li>\n  <li>L’estensione .bas è convenzionale, ma non obbligatoria.</li>\n  <li>La dimensione disponibile dipende dalla partizione SPIFFS nel firmware (tipicamente 1MB–2MB).</li>\n</ul>\n\n<p>2. Scheda SD (esterna, opzionale) Se hai una scheda microSD collegata all’ESP32 (con pin configurati nel file Basic32.ino), puoi utilizzarla come memoria aggiuntiva o principale.</p>\n\n<ul>\n  <li>Il sistema rileva automaticamente la presenza della scheda SD.</li>\n  <li>La SD deve essere formattata in FAT32</li>\n</ul>\n\n<p>La SD deve essere formattata in FAT32.</p>"
  },
  {
    "id": "abs",
    "nome": "ABS(x)",
    "categoria": "Funzioni matematiche",
    "sintassi": "ABS(x)",
    "sommario": "",
    "descrizione": "La funzione ABS(x) restituisce il valore assoluto di x, cioè il numero senza segno. È utilizzabile in espressioni aritmetiche, assegnazioni e condizioni logiche. Accetta sia numeri interi che decimali. Se il numero è già positivo o zero, non viene modificato.<",
    "esempi": [
      {
        "code": "10 A = -42\n20 B = ABS(A)\n30 PRINT \"VALORE ASSOLUTO: \"; B\n\nOutput atteso:\nVALORE ASSOLUTO: 42",
        "note": "Show the use of ABS with an integer."
      },
      {
        "code": "10 PRINT \"ABS(-3.14) = \"; ABS(-3.14)\n\nOutput atteso:\nABS(-3.14) = 3.14",
        "note": "Funziona anche con numeri float (virgola mobile):"
      },
      {
        "code": "10 A = -7\n20 IF ABS(A) = 7 THEN PRINT \"È UGUALE A 7\"\n\nOutput atteso: \nÈ UGUALE A 7",
        "note": "ABS può essere usato direttamente in una condizione IF:"
      }
    ],
    "note": "ABS è una funzione pura: non modifica variabili, restituisce solo un valore numerico."
  },
  {
    "id": "acs-calib-setoffset",
    "nome": "ACS CALIB SETOFFSET",
    "categoria": "",
    "sintassi": "ACS CALIB SETOFFSET mv",
    "sommario": "",
    "descrizione": "Imposta manualmente l’offset di zero in mV (tipicamente ~Vcc/2). Utile se conosci l’offset misurato con multimetro o vuoi forzarlo.",
    "esempi": [
      {
        "code": "10 ACS INIT 34 20\n20 ACS CALIB SETOFFSET 1650\n30 ACS READ I\n40 PRINT I",
        "note": ""
      }
    ],
    "note": "•\tNon sostituisce la calibrazione automatica; puoi combinare ZERO e SETOFFSET (l’ultimo chiamato vince)."
  },
  {
    "id": "acs-calib-show",
    "nome": "ACS CALIB SHOW",
    "categoria": "",
    "sintassi": "ACS CALIB SHOW",
    "sommario": "",
    "descrizione": "Mostra su seriale la configurazione attuale: pin, modello, sensibilità mV/A, vref, zero in mV, campioni mediati.",
    "esempi": [
      {
        "code": "10 ACS INIT 34 5\n20 ACS CALIB SHOW",
        "note": ""
      }
    ],
    "note": "•\tOutput via Serial.printf(...) (come gli altri comandi di diagnostica che stampano su seriale)."
  },
  {
    "id": "acs-calib-zero",
    "nome": "ACS CALIB ZERO",
    "categoria": "",
    "sintassi": "ACS CALIB ZERO [samples]",
    "sommario": "",
    "descrizione": "Esegue la calibrazione dello zero (nessuna corrente nel sensore!). Legge samples campioni e fissa l’offset in mV.\nMostra su seriale la configurazione attuale: pin, modello, sensibilità mV/A, vref, zero in mV, campioni mediati.",
    "esempi": [
      {
        "code": "10 ACS INIT 34 5\n20 PRINT \"Togli corrente e premi INVIO\"\n30 WAIT 3000\n40 ACS CALIB ZERO 256\n50 ACS CALIB SHOW",
        "note": "Calibrazione accurata"
      }
    ],
    "note": "•\tAssicurati che non scorra corrente nel cavo durante la calibrazione.\n•\tPiù campioni → offset più stabile (consiglio 128–512)."
  },
  {
    "id": "acs-init-acs712",
    "nome": "ACS INIT (acs712)",
    "categoria": "",
    "sintassi": "ACS INIT pin model [vref_mv] [avgSamples]",
    "sommario": "",
    "descrizione": "<p>Inizializza il sensore ACS712.</p>\n\n<ul>\n  <li>pin: GPIO ADC1 consigliato (32–39).</li>\n  <li>model: 5, 20 o 30 (Ampere) → imposta automaticamente mV/A (185 / 100 / 66).</li>\n  <li>vref_mv: opzionale (fallback se non si usa analogReadMilliVolts).</li>\n  <li>avgSamples: opzionale; default 32.</li>\n</ul>Esegue la calibrazione dello zero (nessuna corrente nel sensore!). Legge samples campioni e fissa l’offset in mV.\nMostra su seriale la configurazione attuale: pin, modello, sensibilità mV/A, vref, zero in mV, campioni mediati.",
    "esempi": [
      {
        "code": "10 ACS INIT 34 5\n20 ACS CALIB SHOW",
        "note": "Modulo 5 A su GPIO34"
      }
    ],
    "note": "•\tCollega OUT del modulo ACS712 al pin ADC scelto (meglio ADC1).\n•\tAlimentazione del modulo secondo specifiche (spesso 5 V). L’uscita è centrata a Vcc/2.\n•\tPer ESP32: attenuazione 11 dB (~3.3 V full-scale) già impostata nel codice."
  },
  {
    "id": "acs-read",
    "nome": "ACS READ",
    "categoria": "",
    "sintassi": "ACS READ var",
    "sommario": "",
    "descrizione": "<p>Legge la corrente DC media (in Ampere) usando avgSamples campioni. Salva il valore in var.</p>",
    "esempi": [
      {
        "code": "10 ACS INIT 34 20\n20 ACS CALIB ZERO 256\n30 ACS READ I\n40 PRINT \"I=\";I;\" A\"\n50 WAIT 200\n60 GOTO 30",
        "note": "Lettura continua"
      }
    ],
    "note": "•\tPer DC o AC rettificata/filtrata. Per AC pura, usa ACS RMS."
  },
  {
    "id": "acs-rms",
    "nome": "ACS RMS",
    "categoria": "",
    "sintassi": "ACS RMS window_ms var",
    "sommario": "",
    "descrizione": "<p>Misura la corrente AC RMS (Ampere) su una finestra temporale di window_ms. Rimuove l’offset (zero) ad ogni campione e calcola sqrt(media(x^2)).</p>",
    "esempi": [
      {
        "code": "10 ACS INIT 34 20\n20 ACS CALIB ZERO 256\n30 ACS RMS 500 IRMS\n40 PRINT \"Irms=\";IRMS;\" A\"\n50 WAIT 500\n60 GOTO 30",
        "note": "50 Hz su 500 ms"
      }
    ],
    "note": "•\tPer 50 Hz, finestre di 200–500 ms sono ok. Più lunga = più stabile.\n•\tAssicurati di aver calibrato lo zero senza carico."
  },
  {
    "id": "acs-samples",
    "nome": "ACS SAMPLES",
    "categoria": "",
    "sintassi": "ACS SAMPLES n",
    "sommario": "",
    "descrizione": "<p>Imposta il numero di campioni per le letture DC mediate (ACS READ).</p>",
    "esempi": [
      {
        "code": "10 ACS INIT 34 5\n20 ACS SAMPLES 64\n30 ACS READ I\n40 PRINT I",
        "note": ""
      }
    ],
    "note": "• Non influisce su ACS RMS, che usa la sua finestra temporale."
  },
  {
    "id": "acs-sens",
    "nome": "ACS SENS",
    "categoria": "",
    "sintassi": "ACS SENS mv_per_A",
    "sommario": "",
    "descrizione": "<p>Imposta manualmente la sensibilità (mV/A). Utile se il tuo modulo non è il classico ACS712 o vuoi tarare la pendenza.</p>",
    "esempi": [
      {
        "code": "10 ACS INIT 34 5\n20 ACS SENS 100\n30 ACS READ I\n40 PRINT I",
        "note": "Forza 100 mV/A"
      }
    ],
    "note": "• I valori tipici ACS712: 185 (5 A), 100 (20 A), 66 (30 A)."
  },
  {
    "id": "acs-vref",
    "nome": "ACS VREF",
    "categoria": "",
    "sintassi": "ACS VREF mv",
    "sommario": "",
    "descrizione": "<p>Imposta la tensione di riferimento ADC in mV (usata solo come fallback se non è disponibile analogReadMilliVolts).</p>",
    "esempi": [
      {
        "code": "10 ACS INIT 34 20 3300\n20 ACS VREF 3300",
        "note": ""
      }
    ],
    "note": "• Su ESP32 con analogReadMilliVolts non serve. Lascia 3300 mV."
  },
  {
    "id": "acs-watch",
    "nome": "ACS WATCH",
    "categoria": "",
    "sintassi": "ACS WATCH limit GOTO line\nACS WATCH limit ABOVE GOTO line\nACS WATCH limit BELOW GOTO line\nACS WATCH limit GOTO line RMS window_ms\nACS WATCH limit ABOVE|BELOW GOTO line RMS window_ms",
    "sommario": "",
    "descrizione": "<p>Esegue una lettura di corrente e salta alla riga line se la condizione è vera. Default: ABOVE (salta se corrente ≥ limit). Con BELOW: salta se corrente ≤ limit.</p>\n<pre><code>Con RMS window_ms misura AC RMS sulla finestra specificata; senza RMS usa la media DC.</code></pre>",
    "esempi": [
      {
        "code": "10 ACS INIT 34 20\n20 ACS CALIB ZERO 256\n30 PRINT \"Loop motore...\"\n40 ' ... comandi per il motore qui ...\n50 ACS WATCH 2.5 GOTO 200\n60 WAIT 50\n70 GOTO 40\n200 PRINT \"ALLARME: sovracorrente!\"\n210 ' Spegni/ferma qui il carico",
        "note": "Protezione sovracorrente (DC)"
      },
      {
        "code": "10 ACS INIT 34 5\n20 ACS CALIB ZERO 256\n30 PRINT \"Monitor corrente minima\"\n40 ACS WATCH 0.20 BELOW GOTO 100\n50 WAIT 200\n60 GOTO 40\n100 PRINT \"Corrente bassa! Verifica carico/cavo.\"",
        "note": "Soglia minima (caduta corrente)"
      },
      {
        "code": "10 ACS INIT 34 30\n20 ACS CALIB ZERO 256\n30 PRINT \"Controllo AC RMS\"\n40 ACS WATCH 0.80 GOTO 100 RMS 400\n50 WAIT 100\n60 GOTO 40\n100 PRINT \"Soglia Irms raggiunta!\"",
        "note": "AC a 50 Hz con RMS (finestra 400 ms)"
      },
      {
        "code": "10 ACS INIT 34 5\n20 ACS CALIB ZERO 256\n30 PRINT \"Servo in movimento\"\n40 ' SERVOWRITE 1 90   ' esempio\n50 ACS WATCH 1.2 GOTO 300\n60 WAIT 50\n70 GOTO 40\n300 PRINT \"STOP: corrente troppo alta\"\n310 ' SERVOWRITE 1 0",
        "note": "Stop servo al supero soglia"
      }
    ],
    "note": "• Usa in loop; il comando non mantiene stato interno: valuta e, se vero, salta.\n• Con RMS, la chiamata è bloccante per ~window_ms. Scegli una finestra adeguata (per 50 Hz tipicamente 200–500 ms) o resta su DC se vuoi risposte più rapide.\n• Assicurati di aver fatto ACS CALIB ZERO senza carico per uno zero stabile.\n• Puoi combinare più ACS WATCH nel loop con soglie diverse (es. warning e shutdown)."
  },
  {
    "id": "adc-cal-gain",
    "nome": "ADC CAL GAIN",
    "categoria": "",
    "sintassi": "ADC CAL GAIN <fattore>",
    "sommario": "",
    "descrizione": "<p>Imposta il guadagno moltiplicativo del convertitore ADC. Serve per correggere differenze di scala tra la tensione reale e quella misurata. Il valore predefinito è 1.0.</p>",
    "esempi": [
      {
        "code": "10 ADC CAL GAIN 1.015",
        "note": "Aumentare la scala dell’1.5 %"
      },
      {
        "code": "10 ADC CAL GAIN 0.98",
        "note": "Ridurre la scala del 2 %"
      }
    ],
    "note": "• GAIN deve essere > 0, altrimenti errore:\n• ?ADC CAL ERROR\n• GAIN must be > 0\n• Tipicamente varia tra 0.95 e 1.10.\n• Si applica automaticamente a VREAD e RREAD."
  },
  {
    "id": "adc-cal-measure",
    "nome": "ADC CAL MEASURE",
    "categoria": "",
    "sintassi": "ADC CAL MEASURE <pin> <volt_noto> [campioni]",
    "sommario": "",
    "descrizione": "<p>Esegue una calibrazione automatica del GAIN misurando una tensione nota presente sul pin ADC. Il firmware legge la tensione reale al pin (non calibrata), la confronta con il valore noto e aggiorna il GAIN in modo che le future letture coincidano.</p>",
    "esempi": [
      {
        "code": "ADC CAL RESET\nADC CAL REF 3.30\nADC CAL MEASURE 34 3.300 32",
        "note": "Calibrazione a 3.300 V su GPIO34"
      },
      {
        "code": "ADC CAL MEASURE 34 2.500 16",
        "note": "Calibrazione a 2.500 V con 16 campioni"
      },
      {
        "code": "ADC CAL STATUS",
        "note": "Verifica\nOutput: ADC REF=3.300000  GAIN=1.160772 OFFSET=0.000000"
      }
    ],
    "note": "• volt_noto deve corrispondere a una tensione reale e stabile sul pin.\n• [campioni] è facoltativo (default 16).\n• Valori raccomandati: tra 1.0 V e 3.0 V.\n• Se la tensione è 0 o assente:\n?ADC CAL ERROR\nMeasured ~0V (check wiring/ref)\n• MEASURE aggiorna solo GAIN (non REF o OFFSET)."
  },
  {
    "id": "adc-cal-offset",
    "nome": "ADC CAL OFFSET",
    "categoria": "",
    "sintassi": "ADC CAL OFFSET <volt>",
    "sommario": "",
    "descrizione": "<p>Applica un offset additivo (in volt) a tutte le letture ADC. Serve per correggere errori di zero o differenze costanti tra 0 V reale e lettura ADC.</p>",
    "esempi": [
      {
        "code": "10 ADC CAL OFFSET -0.010",
        "note": "Sottrarre 10 mV"
      },
      {
        "code": "10 ADC CAL OFFSET 0.005",
        "note": "Aggiungere 5 mV"
      }
    ],
    "note": "• OFFSET si somma dopo il guadagno (V = (Raw × REF / Counts) × GAIN + OFFSET).\n• Valori tipici: da −0.020 V a +0.020 V.\n• Utile per correggere offset costanti a 0 V.\n• Nessun errore se impostato a 0."
  },
  {
    "id": "adc-cal-ref",
    "nome": "ADC CAL REF",
    "categoria": "",
    "sintassi": "ADC CAL REF <volt>",
    "sommario": "",
    "descrizione": "<p>Imposta la tensione di riferimento ADC, cioè il valore massimo corrispondente alla piena scala della conversione. Serve per adattare il calcolo dei volt all’alimentazione reale del microcontrollore.</p>",
    "esempi": [
      {
        "code": "10 ADC CAL REF 3.30",
        "note": "Impostare 3.30 V"
      },
      {
        "code": "10 ADC CAL REF 3.28",
        "note": "Riferimento personalizzato"
      }
    ],
    "note": "• REF deve essere > 0, altrimenti errore:\n?ADC CAL ERROR\nREF must be > 0\n• Impostalo sul valore reale della tensione di alimentazione (es. 3.28 V).\n• Si combina con GAIN e OFFSET per calcolare la tensione finale."
  },
  {
    "id": "adc-cal-reset",
    "nome": "ADC CAL RESET",
    "categoria": "",
    "sintassi": "ADC CAL RESET",
    "sommario": "",
    "descrizione": "<p>Ripristina i valori di calibrazione ai default di fabbrica:</p>\n<pre><code>REF = 3.30 V\nGAIN = 1.0\nOFFSET = 0.0</code></pre>\n<p>Utile per annullare qualsiasi calibrazione precedente e tornare ai parametri standard.</p>",
    "esempi": [],
    "note": "• Nessun errore se eseguito più volte.\n• Eseguire prima di una nuova calibrazione (ADC CAL MEASURE).\n• Garantisce letture consistenti e ripetibili."
  },
  {
    "id": "adc-cal-status",
    "nome": "ADC CAL STATUS",
    "categoria": "",
    "sintassi": "ADC CAL STATUS",
    "sommario": "",
    "descrizione": "<p>Mostra i parametri di calibrazione attualmente attivi: Riferimento (REF) Guadagno (GAIN) Offset (OFFSET) Permette di verificare i valori applicati a VREAD e RREAD.</p>",
    "esempi": [
      {
        "code": "10 ADC CAL STATUS",
        "note": "Stampa i parametri correnti sul monitor seriale."
      }
    ],
    "note": "• Non modifica alcun valore.\n• Usalo dopo ogni calibrazione o variazione per confermare i parametri.\n• È il comando di verifica principale del sistema ADC."
  },
  {
    "id": "alexabright",
    "nome": "ALEXABRIGHT",
    "categoria": "",
    "sintassi": "ALEXABRIGHT nome",
    "sommario": "",
    "descrizione": "Il comando ALEXABRIGHT restituisce il valore di luminosità (dimmer) inviato da Alexa per un dispositivo associato.\nIl valore restituito è compreso tra 0 e 255, dove:\n0 → dispositivo spento (OFF)\n255 → luminosità massima (100%)\nvalori intermedi → luminosità proporzionale\nIl comando:\nNON consuma l’evento\npuò essere utilizzato in PRINT, IF, LET\nè ideale per LED PWM, luci dimmerabili e controlli analogici",
    "esempi": [
      {
        "code": "10 WIFI \"ssid\" \"password\"\n20 IF WIFICONNECTED = 0 THEN GOTO 20\n30 ALEXACALL \"Luce\"\n40 PRINT \"Luminosità:\"; ALEXABRIGHT \"Luce\"\n\nOutput atteso:\nStampa un valore da 0 a 255 in base al comando Alexa.",
        "note": "Visualizzare il valore di luminosità Alexa"
      },
      {
        "code": "10 WIFI \"ssid\" \"password\"\n20 IF WIFICONNECTED = 0 THEN GOTO 20\n30 PINMODE 25 OUTPUT NOPULL\n40 ALEXACALL \"Luce\"\n60 LET B = ALEXABRIGHT \"Luce\"\n70 AWRITE 25 B\n80 GOTO 60\n\nOutput atteso:\nLa luminosità del LED sul pin 25 segue il livello impostato da Alexa.",
        "note": "Controllo LED PWM con Alexa"
      },
      {
        "code": "10 WIFI \"ssid\" \"password\"\n20 IF WIFICONNECTED = 0 THEN GOTO 20\n30 ALEXACALL \"Luce\"\n40 LET B = ALEXABRIGHT \"Luce\"\n50 LET P = INT(B * 100 / 255)\n60 PRINT \"Luminosità:\"; P; \"%\"\n70 GOTO 40",
        "note": "Visualizzare la luminosità in percentuale"
      }
    ],
    "note": "• Il valore è sempre compreso tra 0 e 255\n• OFF equivale a 0\n• Il comando legge il valore, non lo modifica\n• Può essere combinato con ALEXASTATE"
  },
  {
    "id": "alexacall",
    "nome": "ALEXACALL",
    "categoria": "",
    "sintassi": "ALEXACALL nome GOTO linea",
    "sommario": "",
    "descrizione": "Il comando ALEXACALL registra un dispositivo Alexa e consente di intercettare i comandi vocali come eventi.\nFunzioni principali:\ncrea un dispositivo Alexa\nintercetta comandi ON/OFF\npuò forzare un salto immediato (GOTO) nel programma\nIl comando è one-shot:\nrestituisce 1 una sola volta quando arriva un evento\ndopo la lettura l’evento viene consumato\nIdeale per:\npulsanti\ncancelli\nserrature\nattuatori momentanei",
    "esempi": [
      {
        "code": "10 WIFI \"ssid\" \"password\"\n20 IF WIFICONNECTED = 0 THEN GOTO 20\n30 ALEXACALL \"Apri Cancello\" GOTO 100\n40 PRINT \"In attesa comando...\"\n50 DELAY 1000\n60 GOTO 40\n100 PRINT \"COMANDO RICEVUTO\"\n110 GOTO 40",
        "note": "Pulsante Alexa con GOTO"
      },
      {
        "code": "10 WIFI \"ssid\" \"password\"\n20 IF WIFICONNECTED = 0 THEN GOTO 20\n30 ALEXACALL \"Pulsante\"\n40 IF ALEXACALL \"Pulsante\" THEN PRINT \"PREMUTO!\"\n50 DELAY 500\n60 GOTO 40",
        "note": "Evento Alexa con IF"
      },
      {
        "code": "10 WIFI \"ssid\" \"password\"\n20 IF WIFICONNECTED = 0 THEN GOTO 20\n30 PINMODE 2 OUTPUT NOPULL\n40 ALEXACALL \"Impulso\" GOTO 100\n60 DELAY 1000\n70 GOTO 60\n100 DWRITE 2 1\n110 DELAY 300\n120 DWRITE 2 0\n130 GOTO 60",
        "note": "Attuatore momentaneo"
      }
    ],
    "note": "• L’evento viene consumato dopo la lettura\n• Ideale come pulsante\n• Per ON/OFF continuo usare ALEXASTATE\n• Richiede Wi-Fi attivo"
  },
  {
    "id": "alexastate",
    "nome": "ALEXASTATE",
    "categoria": "",
    "sintassi": "ALEXASTATE nome",
    "sommario": "",
    "descrizione": "Il comando ALEXASTATE restituisce lo stato attuale ON/OFF di un dispositivo Alexa.\nValori restituiti:\n1 → dispositivo acceso\n0 → dispositivo spento\nIl comando:\nNON consuma l’evento\npuò essere letto più volte\nè ideale per pilotare LED, relè e carichi reali",
    "esempi": [
      {
        "code": "10 WIFI \"ssid\" \"password\"\n20 IF WIFICONNECTED = 0 THEN GOTO 20\n30 ALEXACALL \"Luce\"\n40 PRINT ALEXASTATE \"Luce\"",
        "note": "Stampare lo stato Alexa"
      },
      {
        "code": "10 WIFI \"ssid\" \"password\"\n20 IF WIFICONNECTED = 0 THEN GOTO 20\n30 ALEXACALL \"Luce\" GOTO 60\n40 DELAY 200\n50 GOTO 40\n60 IF ALEXASTATE \"Luce\" = 1 THEN PRINT \"ON\"\n70 IF ALEXASTATE \"Luce\" = 0 THEN PRINT \"OFF\"\n80 GOTO 40",
        "note": "Accendere e spegnere un LED"
      },
      {
        "code": "10 WIFI \"ssid\" \"password\"\n20 IF WIFICONNECTED = 0 THEN GOTO 20\n30 ALEXACALL \"Luce\"\n40 IF ALEXACALL \"Luce\" THEN PRINT \"EVENTO\"\n50 PRINT \"STATO:\"; ALEXASTATE \"Luce\"\n60 DELAY 500\n70 GOTO 40",
        "note": "Stato + evento combinati"
      }
    ],
    "note": "• OFF equivale a 0\n• Lo stato rimane valido finché Alexa non lo modifica\n• Può essere usato in IF, LET, PRINT\n• Ideale per relè e luci reali"
  },
  {
    "id": "aread-p",
    "nome": "AREAD(p)",
    "categoria": "",
    "sintassi": "AREAD(p)",
    "sommario": "",
    "descrizione": "La funzione AREAD(p) legge il valore analogico dal pin p dell'ESP32.\nRestituisce un valore compreso tra 0 e 4095, dove:\n0 corrisponde a 0V\n4095 corrisponde a circa 3.3V\nÈ usato per leggere sensori analogici (es. potenziometri, sensori di luce, temperatura, ecc.) collegati a uno dei pin analogici dell’ESP32.\nPin comuni per la lettura analogica includono: GPIO 36, 39, 34, 35, 32, 33.\nI pin digitali normali non supportano lettura analogica. Assicurati di usare i pin ADC corretti.",
    "esempi": [
      {
        "code": "10 PRINT \"LETTURA ANALOGICA:\"\n20 V = AREAD(36)\n30 PRINT \"VALORE: \"; V\n40 WAIT 1000\n50 GOTO 20\n\nOutput atteso:\n(valori variabili da 0 a 4095, dipende dalla posizione del potenziometro)\nLETTURA ANALOGICA:\nVALORE: 512",
        "note": "Legge un valore dal pin GPIO36 ogni secondo:"
      },
      {
        "code": "10 LUX = AREAD(36)\n20 IF LUX < 1000 THEN PRINT \"LUCE OK\" ELSE PRINT \"LUCE BASSA\"\n30 WAIT 1000\n40 GOTO 10\n\nOutput atteso:\nLUCE OK\nLUCE BASSA",
        "note": "Verifica soglia di luminosità"
      }
    ],
    "note": ""
  },
  {
    "id": "and-or-not",
    "nome": "AND, OR, NOT",
    "categoria": "",
    "sintassi": "A AND B\nA OR B\nNOT A",
    "sommario": "",
    "descrizione": "Gli operatori logici AND, OR e NOT sono usati per eseguire confronti logici o bit a bit all’interno di espressioni condizionali o aritmetiche.\nAND restituisce 1 solo se entrambi gli operandi sono diversi da zero\nOR restituisce 1 se almeno uno dei due è diverso da zero\nNOT inverte il valore logico: NOT 0 è -1, NOT 1 è 0\nIn BASIC32, questi operatori possono essere usati:\nNei confronti logici (IF ... THEN)\nIn assegnazioni (LET)\nIn operazioni binarie (es. maschere di bit)",
    "esempi": [
      {
        "code": "10 A = 1\n20 B = 2\n30 IF A = 1 AND B = 2 THEN PRINT \"ENTRAMBI VERI\"\n\nOutput atteso:\nENTRAMBI VERI",
        "note": "Uso con IF e AND"
      },
      {
        "code": "10 A = 0\n20 B = 5\n30 IF A <> 0 OR B <> 0 THEN PRINT \"ALMENO UNO È DIVERSO DA ZERO\"\n\nOutput atteso:\nALMENO UNO È DIVERSO DA ZERO",
        "note": "Uso con OR"
      },
      {
        "code": "10 A = 0\n20 IF NOT A THEN PRINT \"A È ZERO\"\n\nOutput atteso:\nA È ZERO",
        "note": "Uso di NOT"
      },
      {
        "code": "10 X = 7         ' binario: 0111\n20 MASK = 4      ' binario: 0100\n30 RESULT = X AND MASK\n40 PRINT \"RISULTATO: \"; RESULT\n\nOutput atteso:\nRISULTATO: 4",
        "note": "Maschera di bit con AND"
      },
      {
        "code": "10 A = 5\n20 B = (A > 0) AND (A < 10)\n30 PRINT B\n\nOutput atteso:\n1",
        "note": "Uso in assegnazione logica"
      }
    ],
    "note": "• AND, OR, NOT restituiscono valori numerici (0 o 1/-1)\n• Valori diversi da zero sono trattati come VERO (TRUE)\n• Valori uguali a zero sono FALSO (FALSE)"
  },
  {
    "id": "asc-a",
    "nome": "ASC(A$)",
    "categoria": "",
    "sintassi": "ASC(stringa$)",
    "sommario": "",
    "descrizione": "La funzione ASC restituisce il codice ASCII del primo carattere della stringa A$.\nÈ utile per:\nIdentificare il valore numerico di un carattere\nCreare confronti tra lettere\nGestire input tastiera carattere per carattere (es. con GET)\nSe la stringa è vuota (\"\"), il risultato è 0 oppure può generare un errore (a seconda dell'implementazione).",
    "esempi": [
      {
        "code": "10 A$ = \"A\"\n20 PRINT ASC(A$)\n\nOutput atteso:\n65",
        "note": "Codice ASCII di una lettera"
      },
      {
        "code": "10 C$ = \"Z\"\n20 IF ASC(C$) = 90 THEN PRINT \"È Z\"\n\nOutput atteso:\nÈ Z",
        "note": "Confronto con una lettera specifica"
      },
      {
        "code": "10 T$ = \"C\"\n20 COD = ASC(T$)\n30 PRINT CHR$(COD)\n\nOutput atteso:\nC",
        "note": "Da carattere a codice e ritorno"
      },
      {
        "code": "10 S$ = \"ABC\"\n20 FOR I = 1 TO LEN(S$)\n30 PRINT MID$(S$, I, 1); \" = \"; ASC(MID$(S$, I, 1))\n40 NEXT I\n\nOutput atteso:\nA = 65\nB = 66\nC = 67",
        "note": "Lettura multipla da stringa"
      }
    ],
    "note": "• Solo il primo carattere della stringa è considerato\n• Se la stringa è vuota (\"\"), può restituire 0 o generare errore\n• Usare insieme a CHR$, LEFT$, GET, MID$ per manipolazioni complesse"
  },
  {
    "id": "autorun",
    "nome": "AUTORUN",
    "categoria": "",
    "sintassi": "AUTORUN \"file.bas\"\nAUTORUN \"file.bas\" PIN <numero>\nAUTORUN OFF",
    "sommario": "",
    "descrizione": "Il comando AUTORUN imposta l’esecuzione automatica di un programma BASIC all’avvio del sistema. Il nome del file da eseguire deve essere racchiuso tra virgolette e deve avere estensione .bas.\nÈ possibile specificare un PIN di sicurezza (PIN <numero>), ovvero un GPIO che può essere letto all’avvio per decidere se eseguire o meno l’autorun (implementazione opzionale lato firmware).\nSe viene usato AUTORUN OFF, l'autorun viene disattivato e il file di configurazione viene rimosso.\nSe non viene specificato alcun PIN, viene automaticamente usato PIN 0.",
    "esempi": [
      {
        "code": "AUTORUN \"startup.bas\"\n\nAvvierà automaticamente startup.bas all'accensione, con PIN 0 come predefinito.",
        "note": "Abilitare autorun su un file"
      },
      {
        "code": "AUTORUN \"demo.bas\" PIN 5\n\nSalva la configurazione per eseguire demo.bas all'avvio, con controllo su GPIO5.",
        "note": "Abilitare autorun con un PIN specifico"
      },
      {
        "code": "AUTORUN OFF\n\nDisattiva completamente l’avvio automatico",
        "note": " Disattivare l’autorun"
      }
    ],
    "note": "• Il file specificato deve esistere su SPIFFS ed avere estensione .bas\n• Se il file non viene trovato, viene restituito un errore\n• Il GPIO di sicurezza è opzionale e può essere usato per bloccare l’esecuzione automatica a seconda del valore logico del GPIO\n• Il file di configurazione /autorun.cfg viene sovrascritto ogni volta che si imposta un nuovo autorun\n• L'esecuzione del programma avviene immediatamente dopo la configurazione"
  },
  {
    "id": "awrite-p-v",
    "nome": "AWRITE(p, v)",
    "categoria": "",
    "sintassi": "AWRITE(pin valore)",
    "sommario": "",
    "descrizione": "Il comando AWRITE imposta un segnale PWM (modulazione di larghezza d’impulso) su un pin dell’ESP32, simulando un valore analogico.\nÈ utilizzato per:\nRegolare la luminosità di un LED\nControllare la velocità di un motore\nGestire dispositivi analogici via PWM\nIl valore deve essere compreso tra 0 e 255, dove:\n0 → segnale completamente spento (0% duty cycle)\n255 → segnale al massimo (100% duty cycle)\nvalori intermedi → proporzionali (es. 128 = 50%)\nIl pin deve essere prima configurato come OUTPUT usando PINMODE.",
    "esempi": [
      {
        "code": "10 PINMODE 13 OUTPUT NOPULL\n20 AWRITE 13 128\n\nOutput atteso:\nIl LED collegato al GPIO13 si accende a metà intensità.",
        "note": "Luminosità LED al 50%"
      },
      {
        "code": "10 PINMODE 2 OUTPUT NOPULL\n20 FOR A = 0 TO 255 STEP 5\n30 AWRITE 2 A\n40 DELAY 50\n50 NEXT A\n60 FOR I = 255 TO 0 STEP -5\n70 AWRITE 2 I\n80 DELAY 50\n90 NEXT I\n\nOutput atteso:\nIl LED collegato al GPIO12 aumenta e poi diminuisce gradualmente la luminosità.",
        "note": "Fading continuo (effetto dissolvenza)"
      },
      {
        "code": "10 PINMODE 14 OUTPUT NOPULL\n20 INPUT L\n30 AWRITE 14 L\n\nOutput atteso:\nIl valore della variabile L (es. da un sensore) regola la luminosità del LED sul pin 14",
        "note": "Controllo analogico basato su variabile"
      }
    ],
    "note": "• AWRITE richiede ESP32 con Arduino core 3.x o superiore, dove analogWrite() è disponibile.\n• Se il pin non supporta PWM, il comando potrebbe non avere effetto visibile.\n• I valori oltre 255 vengono automaticamente limitati a 255."
  },
  {
    "id": "breakpin",
    "nome": "BREAKPIN",
    "categoria": "",
    "sintassi": "BREAKPIN pin\nBREAKPIN pin PULLUP|PULLDOWN|NOPULL\nBREAKPIN OFF\nBREAKPIN ?",
    "sommario": "",
    "descrizione": "Imposta un “pin di sicurezza” che, se premuto, interrompe immediatamente il programma BASIC in esecuzione.\n• pin (obbligatorio): GPIO da usare come pulsante di stop.\n• Modalità di ingresso:\n– PULLUP (default): il pin usa la pull-up interna; il pulsante va a GND; premuto = LOW.\n– PULLDOWN: usa la pull-down interna; il pulsante va a VCC; premuto = HIGH.\n– NOPULL: nessuna resistenza interna (usa hardware esterno); premuto = HIGH.\n• OFF: disabilita la funzione.\nLa configurazione viene salvata in EEPROM e ricaricata all’avvio.",
    "esempi": [
      {
        "code": "BREAKPIN 0",
        "note": "Stop con pull-up (pulsante verso GND)"
      },
      {
        "code": "BREAKPIN 12 PULLDOWN",
        "note": "Stop con pull-down (pulsante verso VCC)"
      },
      {
        "code": "BREAKPIN 25 NOPULL",
        "note": "Senza pull interni (hardware esterno)"
      },
      {
        "code": "BREAKPIN OFF",
        "note": "Disabilitare il BREAKPIN"
      }
    ],
    "note": "• • L’effetto è immediato: alla pressione il programma si arresta senza attendere la fine della riga corrente (il controllo avviene all’inizio di ogni riga eseguita).\n• Evita pin critici di boot (es. 0, 2, 15) se il tuo hardware non li gestisce correttamente all’avvio.\n• Con PULLUP il pulsante deve chiudere a massa; con PULLDOWN a VCC.\n• Se il pin non è configurato (o è OFF), nessun arresto avviene.\n• La funzione è indipendente dal SAFE MODE di autorun: SAFE MODE blocca l’avvio automatico, BREAKPIN ferma l’esecuzione mentre il programma gira."
  },
  {
    "id": "bt-at",
    "nome": "BT AT",
    "categoria": "",
    "sintassi": "BT AT \"cmd\" RESP var$ [timeout]",
    "sommario": "",
    "descrizione": "Invia un comando AT (aggiunge automaticamente CRLF) e legge una riga di risposta entro timeout millisecondi.\nSe timeout è omesso, usa il valore impostato con BT TIMEOUT.\nLa risposta viene scritta in var$.",
    "esempi": [
      {
        "code": "10 BT ATMODE ON\n20 BT AT \"AT\" RESP R$ 1000\n30 PRINT R$\n\nOutput atteso:\nOK",
        "note": "Test AT"
      },
      {
        "code": "10 BT ATMODE ON\n20 BT AT \"AT+NAME?\" RESP N$ 1000\n30 PRINT N$\n\nOutput atteso:\n+NAME:BASIC32",
        "note": "Leggere il nome del modulo"
      },
      {
        "code": "10 BT INIT 15 12 9600 33\n20 BT ATMODE OFF\n30 BT AT \"AT\" RESP R$ 500\n40 PRINT \"DATA9600=[\";R$;\"]\"\n50 BT END\n60 BT INIT 15 12 38400 33\n70 BT ATMODE OFF\n80 BT AT \"AT\" RESP R$ 500\n90 PRINT \"DATA38400=[\";R$;\"]\"\n\nOutput atteso:\nDATA9600=[]\nDATA38400=[OK]",
        "note": "Diagnostica baud AT"
      }
    ],
    "note": "• Richiede AT mode attivo (BT ATMODE ON) o KEY alto all’avvio (HC-05).\n• Su molti HC-05 il vero AT è a 38400."
  },
  {
    "id": "bt-atmode-off",
    "nome": "BT ATMODE OFF",
    "categoria": "",
    "sintassi": "BT ATMODE OFF",
    "sommario": "",
    "descrizione": "Esce dall’AT mode: porta KEY basso (se configurato) e riapre la UART alla baud dati salvata.",
    "esempi": [
      {
        "code": "10 BT ATMODE OFF\n20 PRINT \"DATA MODE\"\n\nOutput atteso:\nDATA MODE",
        "note": ""
      }
    ],
    "note": "• Dopo avere cambiato baud in AT, riallinea poi la porta dati con BT INIT"
  },
  {
    "id": "bt-atmode-on",
    "nome": "BT ATMODE ON",
    "categoria": "",
    "sintassi": "BT ATMODE ON [keyPin]",
    "sommario": "",
    "descrizione": "Entra in AT mode: porta KEY alto (usa keyPin se passato, altrimenti quello di BT INIT) e riapre la UART all’AT baud (tipicamente 38400 su HC-05).",
    "esempi": [
      {
        "code": "10 BT INIT 15 12 9600 33\n20 BT ATMODE ON\n30 BT AT \"AT\" RESP R$ 1000\n40 PRINT R$\n\nOutput atteso:\nOK",
        "note": ""
      }
    ],
    "note": "• Su molti HC-05 il vero AT richiede KEY alto all’accensione\n• Alcuni HC-06 restano in AT a 9600"
  },
  {
    "id": "bt-available",
    "nome": "BT AVAILABLE",
    "categoria": "",
    "sintassi": "BT AVAILABLE var",
    "sommario": "",
    "descrizione": "Scrive in var quanti byte sono disponibili nel buffer RX della UART BT.",
    "esempi": [
      {
        "code": "10 BT INIT 15 12 9600 33\n20 BT AVAILABLE N\n30 PRINT N\n\nOutput atteso:\n0",
        "note": ""
      }
    ],
    "note": "• Restituisce un intero ≥ 0, usabile in PRINT/LET/IF"
  },
  {
    "id": "bt-end",
    "nome": "BT END",
    "categoria": "",
    "sintassi": "BT END",
    "sommario": "",
    "descrizione": "Chiude la UART2 e disattiva la comunicazione BT.",
    "esempi": [
      {
        "code": "10 BT END\n20 PRINT \"CHIUSO\"\n\nOutput atteso:\nCHIUSO",
        "note": ""
      }
    ],
    "note": "• Usalo prima di cambiare pin/baud con un nuovo BT INIT"
  },
  {
    "id": "bt-flush",
    "nome": "BT FLUSH",
    "categoria": "",
    "sintassi": "BT FLUSH",
    "sommario": "",
    "descrizione": "Svuota il buffer RX della UART Bluetooth.",
    "esempi": [
      {
        "code": "10 BT INIT 15 12 9600 33\n20 BT FLUSH\n30 BT READ S$\n40 PRINT LEN(S$)\n\nOutput atteso:\n0",
        "note": ""
      }
    ],
    "note": "• Utile per ripartire “puliti” prima di un nuovo parsing"
  },
  {
    "id": "bt-init-hc-05-hc-06",
    "nome": "BT INIT (HC-05/HC-06)",
    "categoria": "",
    "sintassi": "BT INIT rx tx baud [keyPin]",
    "sommario": "",
    "descrizione": "Inizializza la UART2 verso il modulo Bluetooth in data mode alla velocità baud.\nOpzionalmente memorizza keyPin per usare BT ATMODE ON/OFF.",
    "esempi": [
      {
        "code": "10 PINMODE 32 OUTPUT NOPULL\n20 DWRITE 32 0\n30 BT INIT 15 12 9600 33\n40 PRINT \"PRONTO: INVIA ON/OFF\"\n\nOutput atteso:\nPRONTO: INVIA ON/OFF",
        "note": "Init + LED pronto"
      },
      {
        "code": "10 BT INIT 15 12 9600\n20 PRINT \"BT OK\"\n\nOutput atteso:\nBT OK",
        "note": "Init senza KEY"
      }
    ],
    "note": "• Sintassi: BT INIT rx tx ... → con i tuoi pin è BT INIT 15 12 ...\n• Usalo prima di BT SEND/READ/..."
  },
  {
    "id": "bt-print",
    "nome": "BT PRINT",
    "categoria": "",
    "sintassi": "BT PRINT valore",
    "sommario": "",
    "descrizione": "Converte valore in testo e lo invia su BT (nessun newline automatico).",
    "esempi": [
      {
        "code": "10 BT INIT 15 12 9600 33\n20 LET ST=1\n30 BT SEND \"LED=\"\n40 BT PRINT ST\n50 BT SEND \"\\r\\n\"\n\nOutput atteso:\n(sul BT arriva “42”)",
        "note": ""
      }
    ],
    "note": "• Per andare a capo aggiungi BT SEND \"\\r\\n\""
  },
  {
    "id": "bt-read",
    "nome": "BT READ",
    "categoria": "",
    "sintassi": "BT READ var$ [n]",
    "sommario": "",
    "descrizione": "Legge fino a n byte dal buffer RX.\nSe n è omesso, legge tutto ciò che è disponibile.",
    "esempi": [
      {
        "code": "10 PINMODE 32 OUTPUT NOPULL\n20 DWRITE 32 0\n30 BT INIT 15 12 9600 33\n40 BT AVAILABLE N\n50 IF N=0 THEN GOTO 40\n60 BT READ C$ 1\n70 IF C$=\"1\" THEN DWRITE 32 1\n80 IF C$=\"0\" THEN DWRITE 32 0\n90 GOTO 40",
        "note": "Comando singolo per LED"
      },
      {
        "code": "10 BT INIT 15 12 9600 33\n20 BT AVAILABLE N\n30 IF N=0 THEN GOTO 20\n40 BT READ S$\n50 PRINT \"RX=[\";S$;\"]\"",
        "note": "Debug"
      }
    ],
    "note": "• Non attende newline."
  },
  {
    "id": "bt-readln",
    "nome": "BT READLN",
    "categoria": "",
    "sintassi": "BT READLN var$",
    "sommario": "",
    "descrizione": "Legge fino a LF (\\n), ignorando \\r.\nSe \\n non è ancora arrivato, restituisce ciò che è presente in quel momento.",
    "esempi": [
      {
        "code": "10 PINMODE 32 OUTPUT NOPULL\n20 DWRITE 32 0\n30 BT INIT 15 12 9600 33\n40 PRINT \"BT LED READY (ON/OFF)\"\n50 LET CMD$=\"\"\n60 BT AVAILABLE N\n70 IF N=0 THEN GOTO 60\n80 BT READ T$\n90 IF LEN(T$)=0 THEN GOTO 60\n100 IF T$=CHR$(13) THEN GOTO 200\n110 IF T$=CHR$(10) THEN GOTO 200\n120 LET CMD$=CMD$+T$\n130 IF LEN(CMD$)>10 THEN LET CMD$=\"\"\n140 GOTO 60\n200 IF CMD$=\"ON\" THEN GOTO 300\n210 IF CMD$=\"OFF\" THEN GOTO 400\n220 BT SEND \"CMD ERR\\r\\n\"\n230 GOTO 500\n300 DWRITE 32 1\n310 BT SEND \"LED ON\\r\\n\"\n320 GOTO 500\n400 DWRITE 32 0\n410 BT SEND \"LED OFF\\r\\n\"\n420 GOTO 500\n500 LET CMD$=\"\"\n510 GOTO 60",
        "note": "ON / OFF LED (pattern consigliato)"
      }
    ],
    "note": "• Nel tuo BASIC è più affidabile accumulare i caratteri e fermarsi su CR/LF."
  },
  {
    "id": "bt-send",
    "nome": "BT SEND",
    "categoria": "",
    "sintassi": "BT SEND \"testo\"\nBT SEND var$",
    "sommario": "",
    "descrizione": "Invia la stringa (letterale o var$) così com’è sulla UART Bluetooth.",
    "esempi": [
      {
        "code": "10 BT INIT 15 12 9600 33\n20 BT SEND \"LED ON\\r\\n\"\n\nOutput atteso:\n(nessun output console; la stringa va su Bluetooth)\nNota:",
        "note": ""
      }
    ],
    "note": "• Se il peer richiede CRLF, includi \\r\\n nel testo"
  },
  {
    "id": "bt-setbaud",
    "nome": "BT SETBAUD",
    "categoria": "",
    "sintassi": "BT SETBAUD rate",
    "sommario": "",
    "descrizione": "Imposta la baud dati del modulo (es. 9600). Tenta la sintassi HC-05 (AT+UART=rate,0,0). Aggiorna la baud usata in modo dati.",
    "esempi": [
      {
        "code": "10 BT INIT 15 12 9600 33\n20 BT ATMODE ON\n30 BT SETBAUD 19200\n40 BT ATMODE OFF\n50 BT END\n60 BT INIT 15 12 19200 33\n70 PRINT \"BAUD OK\"\n\nOutput atteso:\nBAUD OK",
        "note": ""
      }
    ],
    "note": "• Su alcuni HC-05 serve AT+RESET per applicare la nuova UART"
  },
  {
    "id": "bt-setname",
    "nome": "BT SETNAME",
    "categoria": "",
    "sintassi": "BT SETNAME \"Nome\"",
    "sommario": "",
    "descrizione": "Helper: prova HC-05 (AT+NAME=Nome) e HC-06 (AT+NOMENome). Non legge la risposta.\nCambia il nome del modulo bluetooth.",
    "esempi": [
      {
        "code": "10 BT SETNAME \"BASIC32\"\n20 BT AT \"AT+NAME?\" RESP N$ 1000\n30 PRINT N$\n\nOutput atteso:\n+NAME:BASIC32",
        "note": ""
      }
    ],
    "note": "• Verifica con BT AT … RESP … se vuoi l’eco/OK"
  },
  {
    "id": "bt-setpin",
    "nome": "BT SETPIN",
    "categoria": "",
    "sintassi": "BT SETPIN \"1234\"",
    "sommario": "",
    "descrizione": "Helper: prova HC-05 (AT+PSWD=1234) e HC-06 (AT+PIN1234). Non legge la risposta.\nCambia la password del modulo bluetooth.",
    "esempi": [
      {
        "code": "10 BT SETPIN \"1234\"\n20 BT AT \"AT+PSWD?\" RESP P$ 1000\n30 PRINT P$\n\nOutput atteso:\n+PSWD:1234",
        "note": ""
      }
    ],
    "note": "• La sintassi di lettura del PIN può variare con il firmware"
  },
  {
    "id": "bt-timeout",
    "nome": "BT TIMEOUT",
    "categoria": "",
    "sintassi": "BT TIMEOUT ms",
    "sommario": "",
    "descrizione": "Imposta il timeout di default (ms) per letture AT (BT AT … RESP …, BT VERSION).",
    "esempi": [
      {
        "code": "10 BT TIMEOUT 1500\n20 PRINT \"TIMEOUT OK\"\n\nOutput atteso:\nTIMEOUT OK",
        "note": ""
      }
    ],
    "note": "• Influisce solo sulle letture AT con risposta a riga"
  },
  {
    "id": "bt-version",
    "nome": "BT VERSION",
    "categoria": "",
    "sintassi": "BT VERSION var$",
    "sommario": "",
    "descrizione": "Tenta AT+VERSION? (HC-05) e, se vuoto, AT+VERSION (HC-06). Scrive la risposta in var$.",
    "esempi": [
      {
        "code": "10 BT ATMODE ON\n20 BT VERSION V$\n21 IF LEN(V$)=0 THEN PRINT \"NESSUNA RISPOSTA\"\n30 PRINT V$\n\nOutput atteso:\n+VERSION:2.0-20100601",
        "note": ""
      }
    ],
    "note": "• Richiede AT mode attivo"
  },
  {
    "id": "callfunc",
    "nome": "CALLFUNC",
    "categoria": "",
    "sintassi": "CALLFUNC <nome>",
    "sommario": "",
    "descrizione": "Esegue una funzione definita con FUNC, una sola volta.\nL'esecuzione è bloccante, cioè il programma attende che la funzione finisca prima di proseguire.",
    "esempi": [
      {
        "code": "5 PINMODE 2 OUTPUT NOPULL\n10 FUNC LAMP\n20 DWRITE 2 1\n30 DELAY 500\n40 DWRITE 2 0\n50 DELAY 500\n60 ENDFUNC\n70 CALLFUNC LAMP\n\nOutput atteso:\nIl LED si accende e si spegne una volta con 500 ms di attesa.",
        "note": "Chiamare una funzione LED"
      },
      {
        "code": "5 PINMODE 2 OUTPUT NOPULL\n10 FUNC LAMP\n20 DWRITE 2 1\n30 DELAY 500\n40 DWRITE 2 0\n50 DELAY 500\n60 ENDFUNC\n70 CALLFUNC LAMP\n80 CALLFUNC LAMP\n90 DELAY 1000\n100 GOTO 80\n\nOutput atteso:\nIl LED lampeggia ogni secondo, grazie all'uso ripetuto della funzione.",
        "note": "Uso ripetuto della funzione"
      }
    ],
    "note": "• La funzione deve essere già definita con FUNC\n• Il nome deve corrispondere esattamente\n• Può essere richiamata più volte nel programma\n• È bloccante: il programma attende che termini\n• Non funziona con funzioni LOOP (in quel caso usare STARTFUNC)"
  },
  {
    "id": "cardkb",
    "nome": "CARDKB",
    "categoria": "",
    "sintassi": "CARDKB",
    "sommario": "",
    "descrizione": "CARDKB restituisce il codice ASCII dell’ultimo tasto premuto sulla tastiera CardKB collegata via I²C.\nSe nessun tasto è stato premuto → restituisce 0.\nSe un tasto è disponibile, la funzione restituisce il codice ASCII (0–255).\nLa lettura è non bloccante (non ferma il programma).\nQuesta funzione è pensata per:\ncontrolli di gioco\nmenu interattivi\ninput senza usare il comando INPUT\nlettura rapida e continua da tastiere compatte I2C\nLa tastiera deve essere correttamente collegata al bus I2C tramite il comando:\nWIRE <sda> <scl>",
    "esempi": [
      {
        "code": "10 PRINT \"Premi un tasto sulla CardKB\"\n20 K = CARDKB\n30 IF K > 0 THEN PRINT \"Codice:\", K, \"Char:\", CHR$(K)\n40 GOTO 20\n\noutput:\nlegge continuaente la tastiera",
        "note": "Valore restituito"
      },
      {
        "code": "10 PRINT \"Premi tasti, ESC per uscire\"\n20 K = CARDKB\n30 IF K = 27 THEN END\n40 IF K > 0 THEN PRINT \"Hai premuto:\", CHR$(K)\n50 GOTO 20",
        "note": "uscita con ESC"
      }
    ],
    "note": "• CARDKB legge solo un byte per chiamata. Se tieni premuto un tasto, la tastiera invia ripetizioni (autorepeat).\n• È compatibile sia con CardKB, PS/2, sia con tastiere emulate I2C (funziona su tutte perché passa da devPs2HandleChar).\n• ESC (ASCII 27) attiva anche lo STOP del programma se la modalità ESC-STOP è abilitata."
  },
  {
    "id": "chain",
    "nome": "CHAIN",
    "categoria": "",
    "sintassi": "CHAIN \"file\"\nCHAIN SD \"file\"\nCHAIN SPIFFS \"file\"\nCHAIN <expr$>\nCHAIN SD <expr$>\nCHAIN SPIFFS <expr$>",
    "sommario": "",
    "descrizione": "Il comando CHAIN permette di caricare e avviare un altro listato BASIC da dentro un listato in esecuzione, in stile “multiload” (simile al comportamento dei vecchi home computer).\nQuando viene eseguito:\nil programma corrente termina\nil nuovo file viene caricato al posto del programma corrente\nse CHAIN è chiamato da un listato, il nuovo programma viene eseguito subito (RUN automatico)\nle variabili NON vengono cancellate (restano disponibili nel nuovo listato)\nIl file può essere caricato sia da SPIFFS che da SD, e il nome può essere:\nuna stringa letterale (\"P2\")\nuna variabile stringa (F$)\nun’espressione stringa (\"PART\"+X$)",
    "esempi": [
      {
        "code": "P1.bas\n10 A=5\n20 PRINT \"SONO P1 - A=\";A\n30 CHAIN \"P2.bas\"\n\nP2.bas\n10 PRINT \"SONO P2 - A=\";A\n20 END\n\nOutput atteso:\nSONO P1 - A=5\nSONO P2 - A=5",
        "note": "Passaggio a un altro listato (stesso device di default)"
      },
      {
        "code": "10 PRINT \"CARICO DA SD...\"\n20 CHAIN SD \"GIOCO2\"\n\nOutput atteso:\nViene caricato GIOCO2.bas dalla SD e parte subito.",
        "note": "Caricare da SD"
      },
      {
        "code": "10 P$=\"PARTE\"\n20 N$=\"2\"\n30 P2$=”.bas”\n40 CHAIN P$+N$+P2$\n\nCarica e avvia:\nPARTE2.bas",
        "note": "Nome file in variabile / espressione"
      }
    ],
    "note": "• CHAIN sostituisce il programma in memoria con quello nuovo (non fa “merge”).\n• È pensato per dividere programmi lunghi in più file e passare da uno all’altro.\n• Se il file non esiste o non è accessibile, viene generato un errore runtime.\n• Se non specifichi SD o SPIFFS, viene usato il device di default del sistema.\n• Le variabili restano in memoria: utile per passare parametri tra un listato e l’altro (es. LIV=3, SCORE=1200, ecc.).\n• Il file caricato dovrebbe contenere righe BASIC numerate (listato standard)."
  },
  {
    "id": "chr-x",
    "nome": "CHR$(x)",
    "categoria": "",
    "sintassi": "CHR$(codice)",
    "sommario": "",
    "descrizione": "La funzione CHR$ restituisce il carattere ASCII corrispondente al valore numerico x (compreso tra 0 e 255).\nÈ spesso usata per costruire stringhe dinamiche o stampare caratteri speciali (es. INVIO, TAB, lettere accentate, ecc.).",
    "esempi": [
      {
        "code": "10 PRINT CHR$(65)\n\nOutput atteso:\nA",
        "note": "Da numero a carattere"
      },
      {
        "code": "10 FOR I = 65 TO 90\n20 PRINT CHR$(I);\n30 NEXT I\n\nOutput atteso:\nABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "note": "Stampare lettere dalla A alla Z"
      },
      {
        "code": "10 PRINT \"RIGA1\" + CHR$(10) + \"RIGA2\"\n\nOutput atteso:\nRIGA1\nRIGA2",
        "note": "Usare CHR$(10) per andare a capo"
      },
      {
        "code": "10 PRINT \"NOME\" + CHR$(9) + \"VALORE\"\n\nOutput atteso:\nNOME    VALORE",
        "note": "Inserire un TAB tra due parole"
      },
      {
        "code": "10 T$ = CHR$(72) + CHR$(73)\n20 PRINT T$\n\nOutput atteso:\nHI",
        "note": "Costruire stringhe da codice"
      }
    ],
    "note": "• CHR$(10) = newline (LF), CHR$(13) = carriage return (CR)\n• CHR$(32) = spazio, CHR$(9) = tabulazione\n• Funziona bene insieme a ASC, LEFT$, RIGHT$, MID$"
  },
  {
    "id": "cls",
    "nome": "CLS",
    "categoria": "",
    "sintassi": "CLS",
    "sommario": "",
    "descrizione": "Il comando CLS pulisce lo schermo del terminale seriale inviando un certo numero di righe vuote.\nÈ un metodo semplice per “simulare” la pulizia dello schermo, come avveniva nei vecchi ambienti BASIC.\nNon cancella variabili o codice. È solo un comando visivo per l’utente.",
    "esempi": [
      {
        "code": "10 CLS\n20 PRINT \"BENVENUTO NEL SISTEMA\"\n\nOutput atteso:\n(Schermo vuoto)",
        "note": "Pulizia dello schermo con messaggio successivo"
      },
      {
        "code": "10 PRINT \"PRIMA DEL CLS\"\n20 WAIT 2000\n30 CLS\n40 PRINT \"DOPO IL CLS\"\n\nOutput atteso:\nVisualizza prima un messaggio, poi lo “nasconde” e mostra il secondo.",
        "note": "CLS tra due stampe"
      }
    ],
    "note": ""
  },
  {
    "id": "clsansi",
    "nome": "CLSANSI",
    "categoria": "",
    "sintassi": "CLSANSI",
    "sommario": "",
    "descrizione": "Il comando CLSANSI pulisce lo schermo del terminale usando il codice di controllo ANSI ESC[2J, che è interpretato da terminali moderni compatibili ANSI (come PuTTY, TeraTerm, minicom, ecc.).\nÈ più rapido ed elegante rispetto a CLS, ma funziona solo se il terminale supporta ANSI escape codes.",
    "esempi": [
      {
        "code": "10 CLSANSI\n20 PRINT \"PRONTO PER L'INPUT\"\n\nOutput atteso:\n(Il terminale viene pulito all’istante)",
        "note": "Pulizia con sequenza ANSI"
      },
      {
        "code": "10 PRINT \"USO CLS:\"\n20 CLS\n30 PRINT \"FATTO\"\n40 WAIT 2000\n50 PRINT \"USO CLSANSI:\"\n60 CLSANSI\n70 PRINT \"FINITO\"\n\nOutput atteso:\nDipende dal terminale; CLSANSI è più \"professionale\", mentre CLS è più compatibile.",
        "note": "Confronto tra CLS e CLSANSI"
      }
    ],
    "note": ""
  },
  {
    "id": "copy",
    "nome": "COPY",
    "categoria": "",
    "sintassi": "COPY \"nomefile\"\nCOPY variabile$\nCOPY \"*\"\nCOPY SD \"nomefile\"\nCOPY SD variabile$\nCOPY SD \"*\"\nCOPY SPIFFS \"nomefile\"\nCOPY SPIFFS variabile$\nCOPY SPIFFS \"*\"",
    "sommario": "",
    "descrizione": "Il comando COPY copia i file tra la memoria interna SPIFFS e la scheda SD.\nSenza specificare la memoria, copia dalla SD verso la SPIFFS (SD → SPIFFS).\nCon SD, copia dalla SPIFFS verso la SD (SPIFFS → SD).\nCon SPIFFS, forza la copia da SD a SPIFFS (esplicito).\nAccetta:\nnomi di file tra virgolette (\"setup.bas\")\nvariabili stringa o espressioni (FILE$, LEFT$(N$,3)+\".bas\")\nl’asterisco \"*\" per copiare tutti i file dalla sorgente alla destinazione.\nSe il file esiste già nella destinazione, viene sovrascritto.",
    "esempi": [
      {
        "code": "COPY SD \"config.bas\"\n\nOutput atteso:\nCopied SPIFFS -> SD: /config.bas",
        "note": "Copiare da SPIFFS a SD (default SD)"
      },
      {
        "code": "COPY \"main.bas\"\n\nOutput atteso:\nCopied SD -> SPIFFS: /main.bas",
        "note": "Copiare da SD a SPIFFS"
      },
      {
        "code": "COPY \"*\"\n\nOutput atteso:\nCopied SD -> SPIFFS: /file1.bas\nCopied SD -> SPIFFS: /file2.bas\n...",
        "note": "Copiare tutti i file"
      },
      {
        "code": "10 NAME$ = \"init.bas\"\n20 COPY SD NAME$\n30 PRINT \"File copiato su SD\"",
        "note": "Usare una variabile stringa"
      }
    ],
    "note": "• Se la SD non è montata o il file non è presente, viene mostrato un messaggio di “Skip”.\n• L’operazione non è ricorsiva: copia solo i file nella directory principale.\n• È possibile copiare un singolo file o tutti i file con \"*\".\n• I percorsi vengono normalizzati automaticamente (viene aggiunto / se mancante)."
  },
  {
    "id": "cos-x",
    "nome": "COS(x)",
    "categoria": "",
    "sintassi": "COS(x)",
    "sommario": "",
    "descrizione": "La funzione COS(x) restituisce il coseno dell’angolo x, dove x è espresso in gradi (non in radianti).\nIl valore restituito è un numero compreso tra -1 e 1, come previsto dalla funzione coseno.\nPuò essere usata in calcoli matematici, grafici o condizioni.\nSe desideri usare radianti, devi convertire manualmente:\nCOS(x * 180 / PI)",
    "esempi": [
      {
        "code": "10 PRINT \"COS(60) = \"; COS(60)\n\nOutput atteso:\nCOS(60) = 0.5",
        "note": "Coseno di 60 gradi"
      },
      {
        "code": "10 FOR A = 0 TO 360 STEP 30\n20 PRINT \"COS(\"; A; \") = \"; COS(A)\n30 NEXT A\n\nOutput atteso:\nCOS(0) = 1\nCOS(30) = 0.866\n...",
        "note": "Calcolo del coseno in ciclo"
      },
      {
        "code": "10 A = 135\n20 IF COS(A) < 0 THEN PRINT \"COSENO NEGATIVO\"\n\nOutput atteso:   COSENO NEGATIVO",
        "note": "Uso in un’espressione con condizione"
      }
    ],
    "note": ""
  },
  {
    "id": "data",
    "nome": "DATA",
    "categoria": "",
    "sintassi": "DATA valore1, valore2, valore3, ...",
    "sommario": "",
    "descrizione": "Il comando DATA serve per dichiarare una sequenza di valori costanti (numerici o stringhe) che possono essere letti in seguito con il comando READ.\nI DATA non vengono eseguiti direttamente durante il programma, ma fungono da archivio interno. La lettura avviene in ordine sequenziale e può essere riavviata con il comando RESTORE.",
    "esempi": [
      {
        "code": "10 DATA 100, 200, 300\n20 READ A, B, C\n30 PRINT A, B, C\n\nOutput atteso:\n100 200 300",
        "note": "Lettura di numeri da DATA"
      },
      {
        "code": "10 DATA \"UNO\", \"DUE\", \"TRE\"\n20 READ A$, B$, C$\n30 PRINT A$, B$, C$\n\nOutput atteso:\nUNO DUE TRE",
        "note": "Lettura di stringhe da DATA"
      },
      {
        "code": "10 DATA 1, 2, 3, 4, 5\n20 FOR I = 1 TO 5\n30 READ X\n40 PRINT \"VALORE \"; I; \": \"; X\n50 NEXT I\n\nOutput atteso:\nVALORE 1: 1\nVALORE 2: 2\nVALORE 3: 3\nVALORE 4: 4\nVALORE 5: 5",
        "note": "Lettura progressiva in loop"
      },
      {
        "code": "10 DATA 10, 20\n20 READ A, B\n30 PRINT A, B\n40 RESTORE\n50 READ C\n60 PRINT C\n\nOutput atteso:\n10 20\n10",
        "note": "Uso combinato con RESTORE"
      }
    ],
    "note": ""
  },
  {
    "id": "dated",
    "nome": "DATED",
    "categoria": "",
    "sintassi": "DATED",
    "sommario": "",
    "descrizione": "Il comando DATED restituisce il giorno corrente (valore numerico da 1 a 31), secondo l’orologio interno del sistema.\nÈ utile per operazioni condizionali o controlli sulla data.",
    "esempi": [
      {
        "code": "10 PRINT DATED\n\nOutput atteso:\n15",
        "note": "Stampare il giorno corrente"
      }
    ],
    "note": "• Restituisce un numero intero\n• Il valore dipende dalla data impostata o sincronizzata\n• Non richiede parametri"
  },
  {
    "id": "datem",
    "nome": "DATEM",
    "categoria": "",
    "sintassi": "DATEM",
    "sommario": "",
    "descrizione": "Il comando DATEM restituisce il mese corrente (valore numerico da 1 a 12), secondo l’orologio interno.\nUtile per operazioni che dipendono dal periodo dell’anno.",
    "esempi": [
      {
        "code": "10 PRINT DATEM\n\nOutput atteso:\n6",
        "note": "Stampare il mese corrente"
      }
    ],
    "note": "• Restituisce un numero intero\n• Il valore dipende dalla data impostata o sincronizzata\n• Non richiede parametri"
  },
  {
    "id": "datey",
    "nome": "DATEY",
    "categoria": "",
    "sintassi": "DATEY",
    "sommario": "",
    "descrizione": "Il comando DATEY restituisce l’anno corrente (es. 2025), secondo l’orologio interno.\nConsente di ottenere l’anno per controlli, logiche temporali o etichette automatiche.",
    "esempi": [
      {
        "code": "10 PRINT DATEY\n\nOutput atteso:\n2025",
        "note": "Stampare l’anno corrente"
      }
    ],
    "note": "• Restituisce un numero intero a quattro cifre\n• Il valore dipende dalla data impostata o sincronizzata\n• Non richiede parametri"
  },
  {
    "id": "debugmem",
    "nome": "DEBUGMEM",
    "categoria": "",
    "sintassi": "DEBUGMEM",
    "sommario": "",
    "descrizione": "Il comando DEBUGMEM stampa sul monitor seriale informazioni dettagliate sullo stato della memoria e delle risorse attive nel sistema.\nÈ utile per fare debug, analizzare consumi di memoria, verificare perdite, stack residuo, variabili attive e sprite ancora in uso.\nDati visualizzati:\nQuantità di heap disponibile (RAM libera)\nStack residuo del task corrente (se su ESP32)\nNumero di variabili numeriche e loro valore\nNumero di variabili stringa e loro contenuto\nNumero di array definiti\nSprite attivi con:\nID\nposizione (X, Y)\nnome dati associati (es. HEART)",
    "esempi": [
      {
        "code": "10 DEBUGMEM\n\nOutput atteso nel monitor seriale:\n==== DEBUG MEMORIA ====\nHeap disponibile: 128400 byte\nStack residuo task attuale: 3792 byte\nVariabili numeriche: 0\nVariabili stringa: 0\nArray definiti: 0\nSprite attivi: 0\n========================",
        "note": "Debug all’avvio"
      },
      {
        "code": "10 GOSUB 1000\n20 DEBUGMEM\n\nOutput:\nMostra lo stato di sprite, variabili e RAM dopo la funzione grafica, utile per capire cosa resta in memoria.",
        "note": "Debug dopo esecuzione animazioni"
      }
    ],
    "note": "• DEBUGMEM non modifica nulla, è solo diagnostico.\n• Se usato in un ciclo, può aiutare a individuare perdite di memoria nel tempo.\n• Utile durante lo sviluppo per evitare crash da overflow o heap pieno."
  },
  {
    "id": "def-fn",
    "nome": "DEF FN",
    "categoria": "",
    "sintassi": "DEF FNnome(arg1, arg2, ...) = espressione",
    "sommario": "",
    "descrizione": "DEF FN consente di definire una funzione personalizzata all'interno del programma.\nLa funzione prende uno o più argomenti e restituisce il valore di una espressione.\nÈ utile per riutilizzare operazioni matematiche o formule complesse senza doverle scrivere più volte.\nLe funzioni devono avere un nome che inizia con FN (es: FNADD, FNSQUARE).\nNon possono contenere comandi interattivi o comandi di controllo (es. PRINT, GOTO, IF, ecc.): solo espressioni.",
    "esempi": [
      {
        "code": "10 DEF FNADD(X, Y) = X + Y\n20 PRINT \"5 + 3 = \"; FNADD(5, 3)\n\nOutput atteso:\n5 + 3 = 8",
        "note": "Funzione somma a due argomenti"
      },
      {
        "code": "10 DEF FNSQ(X) = X * X\n20 PRINT \"7^2 = \"; FNSQ(7)\n\nOutput atteso:\n7^2 = 49",
        "note": "Calcolo del quadrato"
      },
      {
        "code": "10 DEF FNAREA(R) = 3.14 * R * R\n20 INPUT R\n30 PRINT \"AREA = \"; FNAREA(R)\n\nOutput atteso (se inserisci 2):\nAREA = 12.56",
        "note": "Uso con variabili e formule"
      },
      {
        "code": "10 DEF FNTRIPLA(X) = X * 3\n20 FOR I = 1 TO 5\n30 PRINT \"TRIPLO DI \"; I; \" = \"; FNTRIPLA(I)\n40 NEXT I\n\nOutput atteso:\nTRIPLO DI 1 = 3\nTRIPLO DI 2 = 6\nTRIPLO DI 3 = 9\nTRIPLO DI 4 = 12\nTRIPLO DI 5 = 15",
        "note": "Richiamo multiplo"
      }
    ],
    "note": ""
  },
  {
    "id": "del",
    "nome": "DEL",
    "categoria": "",
    "sintassi": "DEL \"<nomefile>\"\nDEL variabile$\nDEL SD \"<nomefile>\"\nDEL SD variabile$\nDEL SPIFFS \"<nomefile>\"\nDEL SPIFFS variabile$",
    "sommario": "",
    "descrizione": "Il comando DEL elimina un file dalla memoria del sistema.\nSe eseguito senza specificare la memoria, il file viene cancellato dalla memoria interna SPIFFS.\nSpecificando SD, il file viene eliminato dalla scheda SD.\nÈ possibile indicare esplicitamente SPIFFS per maggiore chiarezza, ma non è obbligatorio.\nIl nome del file può essere indicato direttamente tra virgolette oppure tramite una variabile stringa (es. FN$).\nQuesto comando è utile per gestire i file presenti nelle diverse memorie dell’ESP32, senza ambiguità.",
    "esempi": [
      {
        "code": "DEL \"main.bas\"",
        "note": "Eliminare un file da SPIFFS"
      },
      {
        "code": "DEL SD \"demo.bas\"",
        "note": "Eliminare un file da SD"
      },
      {
        "code": "10 LET FN$ = \"prog1.bas\"\n20 DEL FN$",
        "note": "Usare una variabile per specificare il file da cancellare"
      },
      {
        "code": "10 LET FN$ = \"test.bas\"\n20 DEL SD FN$",
        "note": "Eliminare tramite variabile da SD"
      }
    ],
    "note": "• DEL accetta un solo argomento opzionale iniziale: SD o SPIFFS.\n• È possibile usare variabili stringa per specificare il nome del file.\n• Se la scheda SD non è collegata o montata, DEL SD restituirà un errore di eliminazione fallita.\n• Se il file non esiste, viene segnalato un errore."
  },
  {
    "id": "deln",
    "nome": "DELN",
    "categoria": "",
    "sintassi": "DELN n\nDELN n1,n2,n3\nDELN a-b",
    "sommario": "",
    "descrizione": "Il comando DELN elimina una o più righe del programma in memoria.\nPuò rimuovere una singola riga, più righe separate da virgole, o un intervallo continuo.\nSe viene digitato solo il numero di riga (senza la parola chiave DELN), la riga viene eliminata comunque.\nSe una riga specificata non esiste, viene ignorata senza generare errori.\nQuesta funzione è utile per modificare rapidamente il listato senza doverlo riscrivere da capo.",
    "esempi": [
      {
        "code": "10 PRINT \"Ciao\"\n20 PRINT \"Riga da cancellare\"\n30 PRINT \"Fine\"\n\nComando:\nDELN 20\nLIST\n\nOutput atteso:\n10 PRINT \"Ciao\"\n30 PRINT \"Fine\"",
        "note": "Rimuovere una riga specifica"
      },
      {
        "code": "10 PRINT \"Riga1\"\n20 PRINT \"Riga2\"\n30 PRINT \"Riga3\"\n40 PRINT \"Riga4\"\n\nComando:\nDELN 10,30\nLIST\n\nOutput atteso:\n20 PRINT \"Riga2\"\n40 PRINT \"Riga4\"",
        "note": "Eliminare più righe in una volta"
      },
      {
        "code": "100 PRINT \"A\"\n110 PRINT \"B\"\n120 PRINT \"C\"\n130 PRINT \"D\"\n\nComando:\nDELN 100-120\nLIST\n\nOutput atteso:\n130 PRINT \"D\"",
        "note": "Eliminare un intervallo di righe"
      },
      {
        "code": "DELN 500\n\nSe la riga 500 non è presente, il programma resta invariato e non si genera nessun errore.",
        "note": "DELN su riga inesistente"
      }
    ],
    "note": "• DELN agisce solo sul listato in memoria.\n• Per rendere permanenti le modifiche, usa SAVE \"nomefile.bas\".\n• Funziona sia con singole righe, che con liste di righe (10,20,30) e intervalli (100-200).\n• Usalo insieme a EDIT, LIST, NEW, SAVE, LOAD per la gestione completa dei programmi BASIC."
  },
  {
    "id": "delvar",
    "nome": "DELVAR",
    "categoria": "",
    "sintassi": "DELVAR \"file\"\nDELVAR \"file\" \"chiave\"\nDELVAR SPIFFS \"file\"\nDELVAR SPIFFS \"file\" \"chiave\"\nDELVAR SD \"file\"\nDELVAR SD \"file\" \"chiave\"",
    "sommario": "",
    "descrizione": "DELVAR elimina dati da un file JSON.\nSe specifichi solo \"file\" → elimina tutto il file\nSe specifichi \"file\" \"chiave\" → elimina solo la chiave indicata, lasciando intatte le altre",
    "esempi": [
      {
        "code": "10 DELVAR SPIFFS \"prefs.json\" \"USER\"\n20 LISTVARS SPIFFS \"prefs.json\"",
        "note": "Eliminare una chiave da SPIFFS"
      },
      {
        "code": "10 DELVAR SD \"dati.json\"",
        "note": "Cancellare completamente un file su SD"
      }
    ],
    "note": "Se il file non esiste, la cancellazione del file non produce errore.\nSe la chiave non esiste, il file resta invariato.\nLa cancellazione del file è irreversibile."
  },
  {
    "id": "delay-n",
    "nome": "DELAY n",
    "categoria": "",
    "sintassi": "DELAY n",
    "sommario": "",
    "descrizione": "Il comando DELAY sospende l'esecuzione del programma per n millisecondi.\nDurante il ritardo, il microcontrollore non esegue altro codice: è una pausa bloccante.\nÈ utile per:\nAttendere tra due operazioni\nCreare animazioni o lampeggi\nSimulare tempi di caricamento",
    "esempi": [
      {
        "code": "10 PRINT \"CIAO\"\n20 DELAY 1000\n30 PRINT \"MONDO\"\n\nOutput atteso (con 1 secondo di pausa tra le due righe):\nCIAO\n(monitora pausa)\nMONDO",
        "note": "Pausa tra due messaggi"
      },
      {
        "code": "10 CLS\n20 PRINT \"☼\"\n30 DELAY 500\n40 CLS\n50 DELAY 500\n60 GOTO 10\n\nOutput atteso:\nUn lampeggio infinito del simbolo \"☼\" ogni mezzo secondo.",
        "note": "Lampeggio simulato"
      },
      {
        "code": "10 INPUT \"INSERISCI IL TUO NOME: \"; N$\n20 PRINT \"ATTENDI...\"\n30 DELAY 2000\n40 PRINT \"BENVENUTO \"; N$\n\nOutput atteso:\nDopo l’input, una pausa di 2 secondi prima del messaggio di benvenuto.",
        "note": "Ritardo dopo lettura"
      },
      {
        "code": "10 FOR I = 5 TO 1 STEP -1\n20 PRINT I\n30 DELAY 1000\n40 NEXT I\n50 PRINT \"VIA!\"\n\nOutput atteso:\nUn countdown da 5 a 1 con 1 secondo tra ciascun numero.",
        "note": "Conto alla rovescia"
      }
    ],
    "note": "• DELAY blocca totalmente l’esecuzione (incluso INPUT, GET, ecc.)\n• L'unità di misura è il millisecondo (1000 = 1 secondo)"
  },
  {
    "id": "dev-auto-on-off",
    "nome": "DEV AUTO ON/OFF",
    "categoria": "",
    "sintassi": "DEV AUTO ON\nDEV AUTO OFF",
    "sommario": "",
    "descrizione": "Imposta se la modalità developer deve avviarsi automaticamente al boot dell’ESP32.\nQuando è attiva, al riavvio il display configurato e l’eventuale tastiera PS/2 vengono inizializzati senza dover reinserire i comandi manualmente.",
    "esempi": [
      {
        "code": "10 DEV AUTO ON\n20 DEV ILI SET 17 16 5 32 18 23 19 3\n30 DEV DISPLAY ILI\n40 DEV ON",
        "note": "Alla successiva accensione l’ESP32 partirà direttamente in modalità developer con display pronto."
      }
    ],
    "note": ""
  },
  {
    "id": "dev-clear",
    "nome": "DEV CLEAR",
    "categoria": "",
    "sintassi": "DEV CLEAR",
    "sommario": "",
    "descrizione": "Cancella lo schermo del display attualmente selezionato in modalità developer.\nNon disattiva il dev mode, ma pulisce solo il contenuto.",
    "esempi": [
      {
        "code": "DEV CLEAR",
        "note": "Cancella la console sul display (utile per avere una schermata pulita)."
      }
    ],
    "note": ""
  },
  {
    "id": "dev-display",
    "nome": "DEV DISPLAY",
    "categoria": "",
    "sintassi": "DEV DISPLAY ILI",
    "sommario": "",
    "descrizione": "Seleziona quale display usare come uscita della console DEV (per tutti i comandi di stampa: PRINT, LIST, EDIR, messaggi, ecc.).\nLa selezione viene salvata in configurazione e rimane attiva ai successivi avvii.\nNota: il display scelto deve essere già configurato (pin/indirizzi, modalità, ecc.). In caso contrario viene segnalato errore e la selezione non cambia.",
    "esempi": [
      {
        "code": "10 DEV DISPLAY ILI\n20 DEV CLEAR\n30 PRINT \"Schermo ILI attivo\"",
        "note": "Seleziona ILI9341"
      }
    ],
    "note": "• Puoi passare da un display all’altro con lo stesso comando: DEV DISPLAY ILI.\n• Se il dispositivo non è configurato o non inizializza, il comando segnala errore e resta il display precedente.\n• Prestazioni: per stampe molto lunghe attiva DEV SERIAL OFF per massima reattività.\n• Colonne/Righe: possono variare a seconda del display e della sua risoluzione/impostazioni; usa i tuoi comandi dedicati (COLONNE/RIGHE, MAPCOLS/MAPROWS) se presenti per adattare il layout."
  },
  {
    "id": "dev-font",
    "nome": "DEV FONT",
    "categoria": "",
    "sintassi": "DEV FONT <size>",
    "sommario": "",
    "descrizione": "Imposta il fattore di scala del font nella console DEV.",
    "esempi": [
      {
        "code": "DEV FONT 1\nDEV FONT 2",
        "note": ""
      }
    ],
    "note": "• Valore minimo 1.\n• Il cambio di font effettua un clear del display."
  },
  {
    "id": "dev-ili-set",
    "nome": "DEV ILI SET",
    "categoria": "",
    "sintassi": "DEV ILI SET <CS> <DC> <RST> <LED> [SCK MOSI MISO] [ROT]",
    "sommario": "",
    "descrizione": "Configura un display ILI9341 specificando i pin di collegamento.\nL’argomento LED indica il pin di controllo retroilluminazione.\nParametri opzionali: SCK MOSI MISO per bus SPI custom, ROT per rotazione.",
    "esempi": [
      {
        "code": "DEV ILI SET 17 16 5 32 18 23 19 3\nDEV DISPLAY ILI\nDEV ON",
        "note": "Inizializza un ILI9341 con CS=17, DC=16, RST=5, retroilluminazione sul GPIO32."
      }
    ],
    "note": ""
  },
  {
    "id": "dev-mapcols",
    "nome": "DEV MAPCOLS",
    "categoria": "",
    "sintassi": "DEV MAPCOLS <n>",
    "sommario": "",
    "descrizione": "Imposta il numero di colonne logiche della console developer.\nServe per mappare correttamente la stampa del testo su display grafici.",
    "esempi": [
      {
        "code": "DEV MAPCOLS 40",
        "note": "La console developer userà 40 colonne virtuali."
      }
    ],
    "note": ""
  },
  {
    "id": "dev-maprows",
    "nome": "DEV MAPROWS",
    "categoria": "",
    "sintassi": "DEV MAPROWS <n>",
    "sommario": "",
    "descrizione": "Imposta il numero di righe logiche della console developer.",
    "esempi": [
      {
        "code": "DEV MAPROWS 20",
        "note": "La console avrà 20 righe virtuali."
      }
    ],
    "note": ""
  },
  {
    "id": "dev-on-off",
    "nome": "DEV ON / OFF",
    "categoria": "",
    "sintassi": "DEV ON\nDEV OFF",
    "sommario": "",
    "descrizione": "Gestisce lo stato della modalità developer.\nDEV ON → attiva la console developer e duplica tutti i Serial.print anche sul display selezionato.\nDEV OFF → disattiva la console developer, lasciando attiva solo la seriale.",
    "esempi": [
      {
        "code": "DEV DISPLAY ILI\nDEV ON",
        "note": "Attiva la console su ILI e tutti i messaggi saranno visibili anche lì.\nRiavvia automaticamente ESP per inizializzare la configurazione."
      },
      {
        "code": "DEV OFF",
        "note": "Disattiva la console su display, continuando a lavorare solo da seriale."
      }
    ],
    "note": ""
  },
  {
    "id": "dev-ps2-layout",
    "nome": "DEV PS2 LAYOUT",
    "categoria": "",
    "sintassi": "DEV PS2 LAYOUT <US | IT | DE | FR | ES>",
    "sommario": "",
    "descrizione": "Imposta il layout della tastiera PS/2, permettendo la corretta mappatura dei tasti in base al paese.\nLayout supportati:\nUS → Americano (default)\nIT → Italiano\nDE → Tedesco\nFR → Francese\nES → Spagnolo",
    "esempi": [
      {
        "code": "DEV PS2 LAYOUT IT\nOppure:\nDEV PS2 LAYOUT US",
        "note": ""
      }
    ],
    "note": "• Il layout viene salvato in prefs.cfg e ripristinato automaticamente al riavvio.\n• Può essere modificato anche con la tastiera PS/2 già in funzione.\n• È necessario aver configurato i pin (con DEV PS2 SET) per usare la tastiera."
  },
  {
    "id": "dev-ps2-off",
    "nome": "DEV PS2 OFF",
    "categoria": "",
    "sintassi": "DEV PS2 OFF",
    "sommario": "",
    "descrizione": "Disattiva la tastiera PS/2 in modalità developer.\nQuando è OFF, i tasti premuti non vengono letti né inviati alla console DEV.",
    "esempi": [
      {
        "code": "DEV PS2 OFF",
        "note": ""
      }
    ],
    "note": "• Interrompe immediatamente la lettura della tastiera PS/2.\n• La configurazione dei pin rimane memorizzata, ma la tastiera resta inattiva finché non viene riabilitata con DEV PS2 ON."
  },
  {
    "id": "dev-ps2-on",
    "nome": "DEV PS2 ON",
    "categoria": "",
    "sintassi": "DEV PS2 ON",
    "sommario": "",
    "descrizione": "Attiva la tastiera PS/2 per l’uso nella console DEV.\nPermette di digitare comandi BASIC direttamente dal display ILI in tempo reale.",
    "esempi": [
      {
        "code": "DEV PS2 ON",
        "note": ""
      }
    ],
    "note": "• Richiede una precedente configurazione dei pin tramite DEV PS2 SET.\n• Se i pin non sono stati configurati, il comando genera errore."
  },
  {
    "id": "dev-ps2-set",
    "nome": "DEV PS2 SET",
    "categoria": "",
    "sintassi": "DEV PS2 SET <dataPin> <clkPin>",
    "sommario": "",
    "descrizione": "Configura i pin utilizzati dalla tastiera PS/2.\nDopo aver impostato i pin, la tastiera può essere usata per digitare direttamente comandi BASIC sulla console DEV (display ILI).\nAttenzione:\nLa sintassi reale del firmware è DATA → CLK (in questo ordine).",
    "esempi": [
      {
        "code": "DEV PS2 SET 26 27\nEffetto\nDATA = 26\nCLK  = 27",
        "note": "La tastiera PS/2 viene collegata su DATA=26 e CLK=27 ed è pronta per essere abilitata con DEV PS2 ON."
      }
    ],
    "note": "• La configurazione dei pin viene salvata in prefs.cfg e ricaricata automaticamente all'avvio.\n• Permette alla tastiera di funzionare in tempo reale sulla console DEV."
  },
  {
    "id": "dev-serial-on-off",
    "nome": "DEV SERIAL ON / OFF",
    "categoria": "",
    "sintassi": "DEV SERIAL ON\nDEV SERIAL OFF",
    "sommario": "",
    "descrizione": "Abilita o disabilita il mirroring dell’output della console DEV sulla porta Serial (USB).\nCon DEV SERIAL ON, tutto ciò che normalmente stampa sul display (es. PRINT, LIST, messaggi di stato) viene replicato anche sul Serial Monitor.\nCon DEV SERIAL OFF, l’output non viene replicato su Serial: utile per massima velocità su ILI/OLED durante stampe lunghe (es. LIST, directory).\nNon modifica il baud rate né le impostazioni della seriale; controlla solo se inviare o meno le stampe su Serial.\nL’impostazione non è persistente: dopo il riavvio torna al valore predefinito (di solito OFF). Se vuoi mantenerla, metti il comando nel tuo script di avvio.",
    "esempi": [
      {
        "code": "10 DEV SERIAL ON\n20 PRINT \"Ciao sia su schermo che su USB!\"",
        "note": "Attiva log USB"
      },
      {
        "code": "10 DEV SERIAL OFF\n20 LIST",
        "note": "LIST veloce (senza eco su USB)"
      },
      {
        "code": "10 DEV SERIAL OFF\n20 PRINT \"Stampa veloce sul display\"\n30 DEV SERIAL ON\n40 PRINT \"Questa riga va anche su USB\"\n50 DEV SERIAL OFF\n60 PRINT \"Di nuovo solo display\"",
        "note": "Log USB solo durante una sezione"
      },
      {
        "code": "10 D=1\n20 IF D THEN DEV SERIAL ON\n30 PRINT \"Messaggi di debug\"\n40 IF D THEN DEV SERIAL OFF\n50 PRINT \"Uscita silenziosa su USB\"",
        "note": "Debug condizionale"
      }
    ],
    "note": "• Performance: DEV SERIAL OFF è consigliato durante stampe lunghe (es. LIST, elenco file) per evitare rallentamenti dovuti al buffer USB/Serial.\n• Ambito: vale per tutti i display supportati e non influisce sull’input da tastiera/PS2 o su altre periferiche.\n• Persistenza: l’impostazione non viene salvata in config.\n• Compatibilità: non cambia Serial.begin(...); usa il baud già impostato nel firmware. Se il Serial Monitor non è aperto, DEV SERIAL ON non causa errori, ma l’output può comunque accumularsi nel buffer USB."
  },
  {
    "id": "dev-status",
    "nome": "DEV STATUS",
    "categoria": "",
    "sintassi": "DEV STATUS",
    "sommario": "",
    "descrizione": "Mostra lo stato corrente della modalità developer (attivo/auto, display selezionato, font, mappa, cursore, PS/2).",
    "esempi": [
      {
        "code": "DEV STATUS",
        "note": ""
      }
    ],
    "note": "• Mostra anche le configurazioni salvate per ILI."
  },
  {
    "id": "dhtcalibreset",
    "nome": "DHTCALIBRESET",
    "categoria": "",
    "sintassi": "DHTCALIBRESET pin → resetta tutte le calibrazioni associate a quel pin (DHT, DHTT, DHTH).\nDHTCALIBRESET ALL → resetta tutte le calibrazioni di tutti i pin.",
    "sommario": "",
    "descrizione": "Cancella le impostazioni di calibrazione e ripristina i valori di default:\noffset = 0\nslope = 1\nPuò essere usato quando vuoi azzerare correzioni precedentemente impostate con DHTCALIBSET.",
    "esempi": [
      {
        "code": "10 DHTCALIBSET DHT 2 0.5 -2\n20 DHTCALIBRESET 2\n30 SDHCALIBSHOW\n\nOutput atteso:\n(nessuna calibrazione attiva per pin 2)",
        "note": "Reset calibrazione su pin 2"
      },
      {
        "code": "10 DHTCALIBSET DHT 2 1.0\n20 DHTCALIBSET DHT 4 -0.5\n30 DHTCALIBRESET ALL\n40 SDHCALIBSHOW\n\nOutput atteso:\n(nessuna calibrazione attiva)",
        "note": "Reset totale di tutte le calibrazioni"
      },
      {
        "code": "10 DHTCALIBSET DHTT 2 1.0\n20 DHTREAD 2 T H\n30 PRINT T\n40 DHTCALIBRESET 2\n50 DHTREAD 2 T H\n60 PRINT T\n\nOutput atteso (esempio):\nT=(temperatura+1.0)    // prima della reset\nT=(temperatura_grezza) // dopo reset",
        "note": "Dopo reset lettura senza correzione"
      }
    ],
    "note": "• pin = numero del pin usato nel DHTINIT.\n• Con ALL elimina tutte le calibrazioni registrate.\n• Dopo reset, le letture ritornano ai valori “grezzi” del sensore."
  },
  {
    "id": "dhtcalibset",
    "nome": "DHTCALIBSET",
    "categoria": "",
    "sintassi": "Forma semplice\nDHTCALIBSET DHT pin offset [slope] → applica a Temperatura e Umidità\nDHTCALIBSET DHTT pin offset [slope] → applica solo alla Temperatura\nDHTCALIBSET DHTH pin offset [slope] → applica solo all’Umidità\nForma estesa\nDHTCALIBSET DHT pin t_offset h_offset [t_slope] [h_slope]",
    "sommario": "",
    "descrizione": "Imposta la calibrazione delle letture DHT sul pin.\nLe correzioni seguono la formula:\nvalore_calibrato = valore_grezzo * slope + offset\noffset: correzione additiva (°C per T, %RH per H)\nslope: fattore moltiplicativo (predefinito 1.0, deve essere > 0 e ragionevole)\nPriorità in lettura (DHTREAD): DHTT/DHTH (specifiche) sovrascrivono DHT (generale).",
    "esempi": [
      {
        "code": "10 DHTCALIBSET DHT 17 0.5 -2\n20 DHTINIT 17 11\n30 DHTREAD 17 T H\n40 PRINT T; \"C  \"; H; \"%\"\n\nOutput atteso (esempio):\n(Temperatura_grezza + 0.5)   (Umidità_grezza - 2)",
        "note": "Offset distinti per T e H (forma estesa, 1 riga)"
      },
      {
        "code": "10 DHTCALIBSET DHT 17 0.3\n20 DHTINIT 17 22\n30 DHTREAD 17 T H\n40 PRINT \"T=\";T;\"  H=\";H\n\nOutput atteso:\nT=(T_grezza + 0.3)  H=(H_grezza + 0.3)",
        "note": "Stessa calibrazione su T e H (forma semplice)"
      },
      {
        "code": "10 DHTCALIBSET DHTT 17 0.0 1.02\n20 DHTINIT 17 22\n30 DHTREAD 17 T H\n40 PRINT \"T=\";T\n\nOutput atteso:\nT=(T_grezza * 1.02)",
        "note": "Solo Temperatura con slope"
      },
      {
        "code": "10 DHTCALIBSET DHTH 17 -1.5\n20 DHTINIT 17 22\n30 DHTREAD 17 T H\n40 PRINT H\n\nOutput atteso:\nH=(H_grezza - 1.5)",
        "note": "Solo Umidità, offset -1.5 (slope implicito = 1)"
      },
      {
        "code": "10 DHTCALIBSET DHT 17 0.5 -2\n\nOutput atteso:\nDHTCALIBSET: Invalid slope (must be > 0 and reasonable)",
        "note": "Validazione slope (errore se negativo o non ragionevole)"
      }
    ],
    "note": "• Slope è opzionale; default 1.0. Deve essere > 0 (es. valori tipici 0.9…1.1).\n• La forma estesa (DHT pin t_off h_off [t_slope] [h_slope]) è la più chiara quando vuoi correzioni diverse su T e H in un’unica riga.\n• Le calibrazioni restano attive finché non le cambi o esegui un reset (es. DHTCALIBRESET pin o DHTCALIBRESET ALL).\n• Compatibile con PRINT, LET, IF perché agisce “a monte” delle variabili lette con DHTREAD.\n• In DHTREAD le calibrazioni specifiche (DHTT:pin, DHTH:pin) hanno priorità sulla calibrazione generale (DHT:pin)."
  },
  {
    "id": "dhtcalibshow",
    "nome": "DHTCALIBSHOW",
    "categoria": "",
    "sintassi": "DHTCALIBSHOW",
    "sommario": "",
    "descrizione": "Mostra a schermo le calibrazioni DHT correnti (chiavi e parametri offset/slope) per tutti i pin configurati.",
    "esempi": [
      {
        "code": "10 DHTCALIBSHOW\n\nDHT:2  => offset=0.500 slope=1.000\nDHTT:2 => offset=0.000 slope=1.020\nDHTH:2 => offset=-1.500 slope=1.000",
        "note": "Elenco calibrazioni attive"
      },
      {
        "code": "10 DHTCALIBSET DHT 2 0 1\n20 DHTCALIBSHOW\n\nOutput atteso:\nDHT:2 => offset=0.000 slope=1.000",
        "note": "Dopo reset calibrazione"
      },
      {
        "code": "10 DHTCALIBSHOW\n20 PRINT \"FINE\"\n\nOutput atteso:\nDHT:... => offset=... slope=...",
        "note": "Stampa condizionale (se serve)"
      }
    ],
    "note": "• È di sola lettura: non modifica le impostazioni.\n• Utile per debug prima di acquisire misure."
  },
  {
    "id": "dhtinit-dht11-dht22",
    "nome": "DHTINIT (DHT11-DHT22)",
    "categoria": "",
    "sintassi": "DHTINIT pin tipo",
    "sommario": "",
    "descrizione": "Inizializza un sensore DHT collegato al pin indicato.\ntipo = 11 (DHT11) oppure 22 (DHT22/AM2302).\nDeve essere eseguito prima di DHTREAD.",
    "esempi": [
      {
        "code": "10 DHTINIT 2 22\n20 PRINT \"OK\"\n\nOutput atteso:\nOK",
        "note": "Inizializzare un DHT22 su pin 2"
      },
      {
        "code": "10 LET P = 7\n20 LET T = 11\n30 DHTINIT P T\n40 PRINT \"DHT PRONTO\"\n\nOutput atteso:\nDHT PRONTO",
        "note": "Variabili per pin e tipo"
      },
      {
        "code": "10 DHTINIT 2 22\n20 DHTINIT 4 22\n30 PRINT \"SPOSTATO SU PIN 4\"\n\nOutput atteso:\nSPOSTATO SU PIN 4",
        "note": "Re-inizializzazione su altro pin"
      }
    ],
    "note": "• Va chiamato almeno una volta prima di leggere.\n• Se cambi pin o modello, ripeti DHTINIT.\n• Restituisce 1/OK (se la tua piattaforma lo prevede) oppure nessun valore."
  },
  {
    "id": "dhtread",
    "nome": "DHTREAD",
    "categoria": "",
    "sintassi": "DHTREAD pin varTemp varHum",
    "sommario": "",
    "descrizione": "Legge temperatura (°C) e umidità (%) dal DHT inizializzato su pin e salva i valori in varTemp e varHum.\nSe una variabile termina con $, il valore viene salvato come stringa; altrimenti come numero.\nApplica automaticamente eventuali calibrazioni impostate con DHTCALIBSET.",
    "esempi": [
      {
        "code": "10 DHTINIT 2 22\n20 DHTREAD 2 T H\n30 PRINT \"T=\";T;\"C  H=\";H;\"%\"\n\nOutput atteso (esempio):\nT=24.0C  H=48.0%",
        "note": "Lettura base"
      },
      {
        "code": "10 DHTINIT 2 22\n20 DHTREAD 2 T$ H$\n30 PRINT \"T=\";T$;\"  H=\";H$;\"%\"\n\nOutput atteso (esempio):\nT=24.0  H=48.0%",
        "note": "Uso con stringhe"
      },
      {
        "code": "10 DHTINIT 2 22\n20 DHTREAD 2 T H\n30 IF H > 70 THEN PRINT \"UMIDITA' ALTA\"\n\nOutput atteso:\nUMIDITA' ALTA",
        "note": "Condizione su umidità"
      }
    ],
    "note": "• Richiede DHTINIT eseguito per quel pin.\n• In caso di errore lettura alcune implementazioni producono NaN/valore sentinella: gestiscilo con IF."
  },
  {
    "id": "dim",
    "nome": "DIM",
    "categoria": "",
    "sintassi": "DIM nome_array(n)\nDIM nome_array$(n)\nDIM FILE   buf$ pos() len() size() contatore\nDIM FILESD buf$ pos() len() size() contatore",
    "sommario": "",
    "descrizione": "DIM dichiara un array monodimensionale (vettore), indicizzato da 0 a n (incluso).\nArray numerici: senza $\nEsempio: DIM A(5) → crea A(0)…A(5) (6 elementi), inizializzati a 0.\nArray di testo: con $\nEsempio: DIM NOME$(5) → crea NOME$(0)…NOME$(5) (6 elementi), inizializzati a \"\".\nL’assegnazione dei valori deve essere effettuata con LET:\nLET A(0) = 10\nLET NOME$(1) = \"LUCA\"\nRegole generali\nIndici validi: 0..n (incluso).\nGli indici possono essere costanti o variabili numeriche.\nAccesso fuori limite → errore: INDEX OUT OF RANGE.\nNon puoi cambiare la dimensione di un array già dichiarato: usa prima CLEAR ARRAY.\nGli array numerici e di testo sono indipendenti: puoi avere A() e A$() contemporaneamente.\n\nEstensioni di DIM — Elenco file\nFILE → carica l’elenco dei file dalla memoria SPIFFS.\nFILESD → carica l’elenco dei file dalla scheda SD (errore se SD non inizializzata).\nbuf$ : variabile stringa che conterrà tutti i nomi concatenati (senza separatori).\npos() : array numerico con la posizione 1-based di inizio di ciascun nome dentro buf$.\nlen() : array numerico con la lunghezza di ciascun nome.\nsize() : array numerico con la dimensione in byte di ciascun file.\ncontatore : nome variabile numerica a tua scelta (es. NF, NFILES, TOT) in cui viene scritto il numero di file caricati.\nImportante: pos(), len(), size() devono essere già dichiarati con DIM prima di usare DIM FILE….\nSe le loro capienze differiscono, viene usata la capacità minima tra i tre.\nGli elementi riempiti sono agli indici 1..contatore (1-based per comodità d’uso), mentre i tuoi array restano comunque allocati 0..n.\nErrori possibili\nUNDEFINED ARRAY → pos(), len() o size() non sono stati dichiarati.\nSD NOT INITIALIZED → DIM FILESD … usato ma la SD non è montata/pronta.\nINDEX OUT OF RANGE → regola generale sugli accessi agli array.",
    "esempi": [
      {
        "code": "10 DIM A(3)\n20 LET A(0) = 5\n30 LET A(1) = 10\n40 LET A(2) = 15\n50 FOR I = 0 TO 2\n60 PRINT \"A(\"; I; \") = \"; A(I)\n70 NEXT I\n\nOutput atteso:\nA(0) = 5\nA(1) = 10\nA(2) = 15",
        "note": "Array numerico"
      },
      {
        "code": "10 DIM NOME$(2)\n20 LET NOME$(0) = \"LUCA\"\n30 LET NOME$(1) = \"ANNA\"\n40 FOR I = 0 TO 1\n50 PRINT \"NOME(\"; I; \") = \"; NOME$(I)\n60 NEXT I\n\nOutput atteso:\nNOME(0) = LUCA\nNOME(1) = ANNA",
        "note": "Array di testo"
      },
      {
        "code": "10 DIM N(5)\n20 FOR I = 0 TO 5\n30   LET N(I) = I * I\n40 NEXT I\n50 PRINT \"N(3) = \"; N(3)\n\nOutput atteso:\nN(3) = 9",
        "note": "Calcolo in ciclo"
      },
      {
        "code": "10 DIM MSG$(2)\n20 LET MSG$(0) = \"CIAO\"\n30 LET MSG$(1) = MSG$(0) + \" MONDO\"\n40 PRINT MSG$(1)\n\nOutput atteso:\nCIAO MONDO",
        "note": "Concatenazione stringhe"
      },
      {
        "code": "10 DIM POS(512)\n20 DIM LENN(512)\n30 DIM SIZE(512)\n40 BUF$=\"\"\n50 DIM FILE BUF$ POS() LENN() SIZE() NF\n60 IF NF=0 THEN PRINT \"Nessun file in SPIFFS\"\n70 FOR I=1 TO NF\n80   N$ = MID$(BUF$, POS(I), LENN(I))\n90   PRINT N$; \"  \"; SIZE(I); \" B\"\n100 NEXT I",
        "note": "Elenco completo da SPIFFS"
      },
      {
        "code": "10 DIM POS(512)\n20 DIM LEN(512)\n30 DIM SIZE(512)\n40 BUF$=\"\"\n50 DIM FILESD BUF$ POS() LEN() SIZE() NFILES\n60 IF NFILES=0 THEN PRINT \"Nessun file su SD\"\n70 K = 2\n80 N$ = MID$(BUF$, POS(K), LEN(K))\n90 PRINT \"File #\"; K; \": \"; N$; \"  \"; SIZE(K); \" B\"",
        "note": "SD (già montata) e stampa di un solo file"
      },
      {
        "code": "10 DIM POS(512): DIM LEN(512): DIM SIZE(512)\n20 BUF$=\"\"\n30 DIM FILE BUF$ POS() LEN() SIZE() NF\n40 IF NF=0 THEN PRINT \"SPIFFS vuoto\"\n50 INPUT \"Nome da cercare\"; T$\n60 FOUND = 0\n70 FOR I=1 TO NF\n80   N$ = MID$(BUF$, POS(I), LEN(I))\n90   IF N$ = T$ THEN FOUND = I : GOTO 120\n100 NEXT I\n110 PRINT \"File non trovato\": END\n120 PRINT \"Trovato: \"; N$; \"  \"; SIZE(FOUND); \" B\"",
        "note": "Ricerca di un nome file"
      }
    ],
    "note": "• Il contatore (ultimo parametro in DIM FILE…) è una variabile numerica arbitraria: la decidi tu (es. NF, NFILES, TOT). Non è riservata.\n• Il DIM classico non crea/aggiorna contatori: se vuoi usarne uno, lo gestisci tu (LET K=…) oppure usi quello passato a DIM FILE….\n• Le posizioni in pos() sono 1-based per semplificare l’uso con MID$.\n• I nomi file in buf$ sono concatenati senza separatori: per leggerli usa sempre MID$(buf$, pos(i), len(i))."
  },
  {
    "id": "dlevel-p",
    "nome": "DLEVEL(p)",
    "categoria": "",
    "sintassi": "DLEVEL(p)",
    "sommario": "",
    "descrizione": "Restituisce sempre il livello digitale “raw” del pin, ignorando qualsiasi debounce software.\nUsala quando vuoi conoscere lo stato istantaneo del GPIO (utile per rilevare “tenuto premuto”, durata della pressione, ecc.).\nRestituisce:\n1 se il pin è ALTO (HIGH, ~3.3V)\n0 se il pin è BASSO (LOW, ~0V)\nConfigura prima il pin con PINMODE (INPUT + eventuale PULLUP/PULLDOWN/NOPULL).",
    "esempi": [
      {
        "code": "10 PINMODE 12 INPUT NOPULL\n20 V = DLEVEL(12)\n30 PRINT \"PIN 12 = \"; V\n\nOutput atteso: \n0 oppure 1 in base al segnale.",
        "note": "Lettura diretta"
      },
      {
        "code": "10 PINMODE 12 INPUT PULLUP\n20 IF DLEVEL(12) = 0 THEN PRINT \"PREMUTO\" ELSE PRINT \"RILASCIATO\"\n30 DELAY 500\n40 GOTO 20\n\nOutput atteso:\nstampa continuamente lo stato reale (0=premuto, 1=rilasciato).",
        "note": "Pulsante con PULLUP (stato tenuto)"
      },
      {
        "code": "10 PINMODE 12 INPUT PULLUP DEBOUNCE 60\n20 IF DLEVEL(12) = 0 THEN PRINT \"HOLD\" ELSE PRINT \"UP\"\n30 DELAY 500\n40 GOTO 20\n\nOutput atteso: \nDLEVEL mostra lo stato in tempo reale; il debounce non ha effetto su DLEVEL.",
        "note": "Con DEBOUNCE attivo (dimostrazione che lo ignora)"
      }
    ],
    "note": "• Con PULLUP: premuto = 0, rilasciato = 1. Con PULLDOWN è l’inverso.\n• Differenza da DREAD:\n• DREAD(pin) può diventare one-shot se abiliti DEBOUNCE in PINMODE.\n• DLEVEL(pin) è sempre raw, indipendente da DEBOUNCE.\n• Per contare click singoli usa DREAD con DEBOUNCE; per rilevare “hold” o tempi di pressione usa DLEVEL."
  },
  {
    "id": "do",
    "nome": "DO",
    "categoria": "",
    "sintassi": "DO <numero_di_linea>",
    "sommario": "",
    "descrizione": "Il comando DO permette di eseguire ripetutamente una singola riga di programma ad ogni ciclo principale, senza bloccare l’esecuzione generale del sistema.\nÈ utile per controlli ciclici su variabili, ingressi digitali, o per ripetere semplici azioni.",
    "esempi": [
      {
        "code": "50 DO 100\n100 PRINT \"CICLO ATTIVO\"\n\nOutput atteso:\nCICLO ATTIVO\nCICLO ATTIVO\nCICLO ATTIVO\n...(continuamente)",
        "note": "Stampare un messaggio ciclicamente"
      },
      {
        "code": "10 PINMODE 12 INPUT PULLUP\n20 DO 100\n100 IF DREAD(12) = 0 THEN PRINT \"PREMUTO\"\n\nOutput atteso:\nStampa “PREMUTO” ogni volta che il pulsante sul pin 5 viene premuto.",
        "note": "Leggere lo stato di un pulsante"
      }
    ],
    "note": "• È possibile utilizzare più comandi DO per righe differenti\n• Non blocca l’esecuzione di altri comandi o servizi come MQTT\n• Utile per controlli semplici e ripetitivi\n• Valido solo su una singola riga per ogni comando DO"
  },
  {
    "id": "do-block",
    "nome": "DO BLOCK",
    "categoria": "",
    "sintassi": "DO BLOCK <inizio> TO <fine>",
    "sommario": "",
    "descrizione": "Il comando DO BLOCK esegue ciclicamente un blocco di righe del programma, dalla riga iniziale alla riga finale inclusa.\nTutte le righe comprese nel blocco vengono eseguite una volta per ciclo, in ordine.\nÈ utile per raggruppare più istruzioni da eseguire ciclicamente, come controlli, automazioni, reazioni a variabili o messaggi.",
    "esempi": [
      {
        "code": "5 PINMODE 2 OUTPUT NOPULL\n10 DO BLOCK 100 TO 110\n100 IF TIMEH > 20 THEN DWRITE 2 1\n110 IF TIMEH < 21 THEN DWRITE 2 0\n\nOutput atteso:\nIl LED si accende dopo le 20:00 e si spegne prima delle 21:00, in modo automatico.",
        "note": "Controllare l’accensione di un LED"
      },
      {
        "code": "10 DO BLOCK 100 TO 120\n100 IF MSG$ = \"ACCENDI\" THEN PRINT \"LUCE ON\"\n110 IF MSG$ = \"SPEGNI\" THEN PRINT \"LUCE OFF\"\n120 LET MSG$ = \"\"\n\nOutput atteso:\nStampa “LUCE ON” o “LUCE OFF” in base al valore della variabile MSG$.",
        "note": "Reazione a una variabile testuale"
      },
      {
        "code": "5  PINMODE 2 OUTPUT NOPULL\n10 LET S = 0\n20 DO BLOCK 100 TO 140\n100 IF S = 0 THEN DWRITE 2 1\n110 IF S = 1 THEN DWRITE 2 0\n120 LET S = S + 1\n130 IF S > 1 THEN LET S = 0\n140 DELAY 500\n\nOutput atteso:\nil Led sul pin 2 si accende/spegne ogni mezzo secondo.",
        "note": "Blink LED ogni 500 ms"
      }
    ],
    "note": "• Le righe vengono eseguite tutte ad ogni ciclo\n• Può contenere IF, LET, DWRITE, WAIT, ecc.\n• Non interferisce con MQTT o altre operazioni del sistema\n• Si possono usare più blocchi DO BLOCK nel programma"
  },
  {
    "id": "dread-p",
    "nome": "DREAD(p)",
    "categoria": "",
    "sintassi": "DREAD(pin)",
    "sommario": "",
    "descrizione": "Legge lo stato digitale del pin.\nSenza DEBOUNCE (PINMODE senza la parola DEBOUNCE): ritorna il livello raw del pin (lettura immediata, può ripetere finché tieni premuto).\nCon DEBOUNCE (PINMODE con DEBOUNCE [ms]): ritorna un impulso one-shot alla pressione:\nemette 0 (con PULLUP) una sola volta quando premi, poi torna a 1 finché non rilasci e ripremi.\ncon PULLDOWN è l’inverso (premuto=1).\nRestituisce:\n1 se il pin è ALTO (HIGH, ~3.3V)\n0 se il pin è BASSO (LOW, ~0V)\nUsa prima PINMODE per configurare il pin in INPUT (con PULLUP, PULLDOWN o NOPULL).\nSe vuoi sempre il livello raw (ignorando il debounce), usa DLEVEL(pin).",
    "esempi": [
      {
        "code": "10 PINMODE 12 INPUT PULLUP\n20 V = DREAD(12)\n30 PRINT \"STATO DEL PIN 12: \"; V\n\nOutput atteso: \n0 oppure 1 in base al segnale presente sul pin.",
        "note": "Lettura diretta (senza debounce)"
      },
      {
        "code": "10 PINMODE 12 INPUT PULLUP DEBOUNCE 60\n20 IF DREAD(12) = 0 THEN PRINT \"PULSANTE PREMUTO\"\n30 GOTO 20\n\nComportamento: stampa una sola volta per ogni pressione completa (press→release), evitando ripetizioni mentre tieni premuto.",
        "note": "Pulsante con PULLUP e DEBOUNCE (one-shot)"
      },
      {
        "code": "10 PINMODE 12 INPUT PULLUP DEBOUNCE 60\n20 IF DLEVEL(12) = 0 THEN PRINT \"PULSANTE PREMUTO\" ELSE PRINT \"RILASCIATO\"\n30 DELAY 500\n40 GOTO 20\n\nOutput atteso: \nmostra lo stato istantaneo del pin (0=premuto, 1=rilasciato con PULLUP), a prescindere dal debounce.",
        "note": "Lettura continua “raw” con DLEVEL (ignora debounce)"
      }
    ],
    "note": "• Con PULLUP: circuito “attivo-basso” → premuto=0, rilasciato=1.\n• Con PULLDOWN è l’inverso (premuto=1).\n• DEBOUNCE [ms] nel PINMODE filtra i rimbalzi e trasforma DREAD(pin) in un rilevatore di pressione singola.\n• Per contatori/menu: usa DREAD(pin) con DEBOUNCE; per “hold” o durate di pressione, usa DLEVEL(pin)."
  },
  {
    "id": "dwrite-p-v",
    "nome": "DWRITE(p v)",
    "categoria": "",
    "sintassi": "DWRITE(pin valore)",
    "sommario": "",
    "descrizione": "Il comando DWRITE imposta un pin digitale dell’ESP32 allo stato:\nHIGH (1) → tensione 3.3V\nLOW (0) → tensione 0V\nÈ usato per accendere o spegnere LED, attivare relé, segnali di controllo, ecc.\nIl pin deve essere configurato prima come OUTPUT usando PINMODE.",
    "esempi": [
      {
        "code": "10 PINMODE 2 OUTPUT NOPULL\n20 DWRITE 2 1\n30 WAIT 1000\n40 DWRITE 2 0\n\nOutput atteso:\nIl LED si accende per 1 secondo, poi si spegne.",
        "note": "Accendere e spegnere un LED collegato al pin 2"
      },
      {
        "code": "10 PINMODE 2 OUTPUT NOPULL\n20 DO BLOCK 20 TO 60\n30 DWRITE 2 1\n40 WAIT 500\n50 DWRITE 2 0\n60 WAIT 500\n\nOutput atteso:\nLED collegato al GPIO2 lampeggia a intervalli regolari.",
        "note": "Lampeggio continuo"
      },
      {
        "code": "10 PINMODE 13 OUTPUT NOPULL\n20 INPUT A\n30 IF A > 100 THEN DWRITE 13 1 ELSE DWRITE 13 0\n\nOutput atteso:\nIl pin 13 sarà attivo (HIGH) se A è maggiore di 100.",
        "note": "Controllo condizionale"
      }
    ],
    "note": "• I valori 1 e HIGH sono equivalenti (idem per 0 e LOW)\n• È possibile controllare anche pin di output virtuali o logici in alcuni casi."
  },
  {
    "id": "dir",
    "nome": "DIR",
    "categoria": "",
    "sintassi": "DIR\nDIR SD\nDIR SPIFFS",
    "sommario": "",
    "descrizione": "Il comando DIR mostra l’elenco dei file presenti nella memoria del sistema.\nSe eseguito senza parametri, visualizza il contenuto della memoria interna SPIFFS.\nSe viene specificato l’argomento SD, mostra invece i file presenti sulla scheda SD.\nIn alternativa, è possibile indicare esplicitamente SPIFFS per elencare la memoria interna (equivalente a DIR senza argomenti).\nQuesto comando è utile per visualizzare rapidamente i file disponibili, sia su SPIFFS che su SD, da caricare, cancellare o rinominare.",
    "esempi": [
      {
        "code": "DIR\n\nOutput atteso:\nDirectory of SPIFFS:\nmain.bas\nprog1.bas",
        "note": "Elencare file nella memoria interna SPIFFS"
      },
      {
        "code": "DIR SD\n\nOutput atteso:\nDirectory of SD:\nprogram1.bas\ndemo.bas",
        "note": "Elencare file sulla scheda SD"
      }
    ],
    "note": "• DIR accetta un solo argomento opzionale: SD o SPIFFS.\n• Se nessuna scheda SD è collegata o montata, il comando DIR SD mostrerà un messaggio di errore (“Unable to open SD root.”)."
  },
  {
    "id": "else",
    "nome": "ELSE",
    "categoria": "",
    "sintassi": "IF condizione THEN istruzione1 ELSE istruzione2",
    "sommario": "",
    "descrizione": "Il costrutto ELSE è parte della struttura condizionale IF...THEN...ELSE.\nPermette di eseguire un'istruzione alternativa se la condizione non è vera.\nPuò essere usato con singole istruzioni sulla stessa riga oppure con GOTO, PRINT, LET, INPUT, ecc.\nBASIC32 non supporta blocchi multi-linea (IF...ENDIF), quindi l'intera logica va espressa su una singola riga.",
    "esempi": [
      {
        "code": "10 INPUT A\n20 IF A > 0 THEN PRINT \"POSITIVO\" ELSE PRINT \"NEGATIVO O ZERO\"\n\nOutput atteso (se inserisci 5):\nPOSITIVO",
        "note": "Verifica di un numero"
      },
      {
        "code": "10 PINMODE 2 OUTPUT NOPULL\n20 INPUT V\n30 IF V = 1 THEN DWRITE 2 1 ELSE DWRITE 2 0\n\nOutput atteso:\nIl pin GPIO2 sarà acceso se V = 1, altrimenti spento.",
        "note": "Scelta tra due azioni"
      },
      {
        "code": "10 INPUT T\n20 IF T < 20 THEN LET STATO$ = \"FREDDO\" ELSE LET STATO$ = \"CALDO\"\n30 PRINT \"STATO: \"; STATO$\n\nOutput atteso (es. input 15):\nSTATO: FREDDO",
        "note": "Uso con LET per assegnazioni diverse"
      },
      {
        "code": "10 INPUT A\n20 IF A < 100 THEN GOTO 100 ELSE GOTO 200\n100 PRINT \"NUMERO PICCOLO\": END\n200 PRINT \"NUMERO GRANDE\"\n\nOutput atteso (es. input 50):\nNUMERO PICCOLO",
        "note": "Con GOTO per saltare a righe diverse"
      }
    ],
    "note": ""
  },
  {
    "id": "exp-x",
    "nome": "EXP(x)",
    "categoria": "",
    "sintassi": "EXP(x)",
    "sommario": "",
    "descrizione": "La funzione EXP(x) restituisce il valore di e elevato alla x, dove e ≈ 2.71828 è la base dei logaritmi naturali.\nÈ utile per calcoli matematici avanzati, esponenziali, crescita logistica, e operazioni scientifiche.\nIl parametro x può essere positivo, negativo o zero.",
    "esempi": [
      {
        "code": "10 PRINT \"EXP(1) = \"; EXP(1)\n\nOutput atteso:\nEXP(1) = 2.71828",
        "note": "Calcolare e^1"
      },
      {
        "code": "10 X = EXP(2)\n20 PRINT \"EXP(2) = \"; X\n\nOutput atteso:\nEXP(2) = 7.389",
        "note": "e elevato alla seconda"
      },
      {
        "code": "10 PRINT \"EXP(-1) = \"; EXP(-1)\n\nOutput atteso:\nEXP(-1) = 0.3679",
        "note": "Usare EXP con numeri negativi"
      },
      {
        "code": "10 A = 5\n20 PRINT \"VALORE ORIGINALE: \"; A\n30 PRINT \"EXP(LOG(A)) = \"; EXP(LOG(A))\n\nOutput atteso:\nVALORE ORIGINALE: 5\nEXP(LOG(A)) = 5",
        "note": "Comparazione con potenze"
      }
    ],
    "note": ""
  },
  {
    "id": "fclose",
    "nome": "FCLOSE",
    "categoria": "",
    "sintassi": "FCLOSE",
    "sommario": "",
    "descrizione": "Chiude il file attualmente aperto, liberando le risorse.\nDevi chiudere SEMPRE un file dopo l’uso.\nSe nessun file è aperto, non produce errore (no-op).",
    "esempi": [
      {
        "code": "10 OPEN \"test.txt\" W\n20 FPRINT \"CIAO\"\n30 FCLOSE",
        "note": "Chiudere il file"
      },
      {
        "code": "10 OPEN \"a.txt\" W\n20 FPRINT \"uno\"\n30 OPEN \"b.txt\" W    ' a.txt viene chiuso automaticamente\n40 FPRINT \"due\"\n50 FCLOSE",
        "note": "Apertura multipla"
      }
    ],
    "note": "• Viene automaticamente invocato da OPEN se già esiste un file aperto.\n• Sempre sicuro da chiamare."
  },
  {
    "id": "fnname",
    "nome": "FNname(...)",
    "categoria": "",
    "sintassi": "FNnome(arg1, arg2, ...)",
    "sommario": "",
    "descrizione": "FNname(...) viene usato per richiamare una funzione personalizzata precedentemente definita con DEF FN.\nIl nome della funzione deve iniziare con \"FN\" e gli argomenti devono corrispondere per numero e ordine a quelli usati nella definizione.\nLa funzione restituisce un valore calcolato in base all’espressione specificata.\nPuò essere usato:\nin una PRINT\nin un’assegnazione (LET)\nin condizioni logiche (IF)",
    "esempi": [
      {
        "code": "10 DEF FNADD(X,Y) = X + Y\n20 PRINT \"SOMMA = \"; FNADD(5,3)\n\nOutput atteso:\nSOMMA = 8",
        "note": "Funzione somma"
      },
      {
        "code": "10 DEF FNDOPPIO(X) = X * 2\n20 A = FNDOPPIO(4) + 1\n30 PRINT \"RISULTATO: \"; A\n\nOutput atteso:\nRISULTATO: 9",
        "note": "Uso in un’espressione più complessa"
      },
      {
        "code": "10 DEF FNSQ(X) = X * X\n20 FOR I = 1 TO 5\n30 PRINT I; \"^2 = \"; FNSQ(I)\n40 NEXT I\n\nOutput atteso:\n1^2 = 1\n2^2 = 4\n3^2 = 9\n4^2 = 16\n5^2 = 25",
        "note": "Richiamo in un ciclo"
      },
      {
        "code": "10 DEF FNTRIPLO(X) = X * 3\n20 INPUT A\n30 IF FNTRIPLO(A) > 20 THEN PRINT \"GRANDE\" ELSE PRINT \"PICCOLO\"\n\nOutput atteso (con input 8):\nGRANDE",
        "note": "Uso in condizione IF"
      }
    ],
    "note": ""
  },
  {
    "id": "for-next",
    "nome": "FOR/NEXT",
    "categoria": "",
    "sintassi": "FOR variabile = inizio TO fine [STEP incremento]",
    "sommario": "",
    "descrizione": "Il comando FOR crea un ciclo a contatore che esegue una o più istruzioni finché la variabile indicata non supera il valore finale (in positivo o negativo, a seconda del STEP).\nOgni FOR deve essere seguito da un NEXT, che incrementa (o decrementa) la variabile e decide se ripetere il ciclo o uscire.\nÈ utile per:\nRipetere blocchi di codice un numero definito di volte\nScorrere coordinate, contatori, indici o sequenze regolari\nCostruire animazioni o loop temporizzati",
    "esempi": [
      {
        "code": "10 FOR I = 1 TO 5\n20 PRINT \"VALORE: \"; I\n30 NEXT I\n\nOutput atteso:\nVALORE: 1\nVALORE: 2\nVALORE: 3\nVALORE: 4\nVALORE: 5",
        "note": "Ciclo base da 1 a 5"
      },
      {
        "code": "10 FOR N = 10 TO 1 STEP -2\n20 PRINT \"N: \"; N\n30 NEXT N\n\nOutput atteso:\nN: 10\nN: 8\nN: 6\nN: 4\nN: 2",
        "note": "Ciclo con STEP negativo (decrescente)"
      },
      {
        "code": "10 FOR R = 1 TO 2\n20   FOR C = 1 TO 3\n30     PRINT \"RIGA: \"; R; \" COLONNA: \"; C\n40   NEXT C\n50 NEXT R\n\nOutput atteso:\nRIGA: 1 COLONNA: 1\nRIGA: 1 COLONNA: 2\nRIGA: 1 COLONNA: 3\nRIGA: 2 COLONNA: 1\nRIGA: 2 COLONNA: 2\nRIGA: 2 COLONNA: 3",
        "note": "Cicli annidati (griglia 2x3)"
      }
    ],
    "note": "• La variabile viene creata o aggiornata automaticamente all’interno del ciclo\n• Il valore di STEP può essere positivo o negativo (default: 1)\n• I cicli possono essere annidati se usano variabili diverse\n• I nomi delle variabili in NEXT devono corrispondere esattamente a quelli nel FOR\n• NEXT – chiude un ciclo FOR\n• RESETFOR – forza la pulizia del ciclo for e svuota tutti i cicli attivi in caso di GOTO o errori"
  },
  {
    "id": "format",
    "nome": "FORMAT",
    "categoria": "",
    "sintassi": "FORMAT SD\nFORMAT SPIFFS",
    "sommario": "",
    "descrizione": "FORMAT cancella tutti i file presenti nella directory radice del file system selezionato.\nPer sicurezza, se viene eseguito senza argomenti, non fa nulla e mostra un messaggio di conferma.\nFORMAT SD → cancella tutti i file sulla scheda SD\nFORMAT SPIFFS → cancella tutti i file nella memoria interna SPIFFS\nAttenzione: i file vengono eliminati definitivamente senza possibilità di recupero.",
    "esempi": [
      {
        "code": "FORMAT\n\nOutput:\nSpecify FORMAT SD or FORMAT SPIFFS to confirm formatting.\nWarning: all files on the selected memory will be deleted!",
        "note": "Protezione da errore"
      },
      {
        "code": "FORMAT SD\n\nOutput:\nFORMAT SD: deleted 12 file(s)",
        "note": "Formattare la scheda SD"
      },
      {
        "code": "FORMAT SPIFFS\n\nOutput:\nFORMAT SPIFFS: deleted 5 file(s)",
        "note": "Formattare la memoria interna SPIFFS"
      }
    ],
    "note": "• Se la SD non è inserita o non accessibile, FORMAT SD mostrerà IO ERROR: SD root not accessible."
  },
  {
    "id": "fprint",
    "nome": "FPRINT",
    "categoria": "",
    "sintassi": "FPRINT <espressione_stringa>",
    "sommario": "",
    "descrizione": "Scrive una riga nel file aperto tramite OPEN.\nAggiunge automaticamente un carattere newline a fine riga.\nRiceve una qualunque espressione che restituisce una stringa:\n\"CIAO\"\nSTR$(A)\n\"TEMP=\" + STR$(T)\nPuò essere usato solo se il file è aperto in modalità W o A.",
    "esempi": [
      {
        "code": "10 OPEN \"test.txt\" W\n20 FPRINT \"CIAO MONDO\"\n30 FCLOSE",
        "note": "Riga semplice"
      },
      {
        "code": "10 TEMP = 24.6\n20 OPEN \"sensore.txt\" A\n30 FPRINT \"TEMP=\" + STR$(TEMP)\n40 FCLOSE",
        "note": "Riga con numeri"
      }
    ],
    "note": "• In caso di file non aperto o in modalità non valida → errore.\n• FPRINT non stampa sul terminale → scrive SOLO nel file."
  },
  {
    "id": "fread",
    "nome": "FREAD$",
    "categoria": "",
    "sintassi": "FREAD$",
    "sommario": "",
    "descrizione": "Legge una riga dal file aperto con OPEN.\nRitorna una stringa (senza newline finale).\nRitorna \"\" se si raggiunge l’EOF (fine file).\nPuò essere usato:\nin un assegnamento\ndirettamente in PRINT\nin condizioni IF",
    "esempi": [
      {
        "code": "10 OPEN \"log.txt\" R\n20 RIGA$ = FREAD$\n30 IF RIGA$ = \"\" THEN FCLOSE : END\n40 PRINT RIGA$\n50 GOTO 20",
        "note": "Leggere tutte le righe"
      },
      {
        "code": "10 OPEN SD \"config.txt\" R\n20 PRINT \"Prima riga=\", FREAD$\n30 FCLOSE",
        "note": "Lettura singola"
      }
    ],
    "note": "• Funziona solo in modalità R e A.\n• Ogni chiamata legge la riga successiva.\n• Non includere il newline (\\n), che viene automaticamente rimosso."
  },
  {
    "id": "freemem",
    "nome": "FREEMEM",
    "categoria": "",
    "sintassi": "PRINT FREEMEM",
    "sommario": "",
    "descrizione": "Il comando FREEMEM restituisce la quantità di memoria libera disponibile in byte per l’esecuzione del programma BASIC.\nÈ utile per monitorare l’utilizzo della RAM e prevenire problemi legati a esaurimento di memoria.",
    "esempi": [
      {
        "code": "10 PRINT FREEMEM\n\nOutput atteso:\n22480",
        "note": "Visualizzare la memoria libera"
      },
      {
        "code": "10 A = FREEMEM\n20 PRINT A\n\nOutput atteso:\n22480",
        "note": "Salvare la memoria libera in variabile"
      }
    ],
    "note": "• Il valore restituito è in byte\n• Non richiede parametri\n• Utile per debugging e diagnostica\n• Valido solo come espressione in PRINT"
  },
  {
    "id": "fsdefault",
    "nome": "FSDEFAULT",
    "categoria": "",
    "sintassi": "FSDEFAULT SD\nFSDEFAULT SPIFFS",
    "sommario": "",
    "descrizione": "Imposta il filesystem predefinito utilizzato dai comandi che accedono ai file.\nDopo aver impostato il valore, tutti i comandi che non specificano esplicitamente SD o SPIFFS useranno automaticamente il filesystem scelto.\nIl valore viene memorizzato nelle preferenze (/prefs.cfg) ed è mantenuto anche dopo il riavvio dell’ESP32.\nEffetti del filesystem predefinito sui comandi BASIC:\nPuoi sempre forzare manualmente un filesystem scrivendo SD o SPIFFS dopo il comando (es: DIR SD, SAVE SPIFFS \"FILE\").",
    "esempi": [
      {
        "code": "10 FSDEFAULT SD\n20 SAVE \"TEST\"\n\nEffetto:\nIl file TEST.BAS viene salvato su SD anche senza scrivere SAVE SD.",
        "note": "Impostare SD come archivio predefinito"
      },
      {
        "code": "10 FSDEFAULT SPIFFS\n20 DIR\n\nEffetto:\nDIR mostra il contenuto dello SPIFFS perché ora è il filesystem di default.",
        "note": "Tornare a SPIFFS come archivio predefinito"
      },
      {
        "code": "10 FSDEFAULT SD\n20 SAVE SPIFFS \"CONFIG\"\n\nEffetto:\nAnche se il default è SD, il file CONFIG.BAS viene salvato nello SPIFFS perché specificato esplicitamente.",
        "note": "Default SD, ma un comando forzato su SPIFFS"
      }
    ],
    "note": "• Il valore predefinito originale è SPIFFS.\n• Se il default è SD, ma la SD non è montata, il comando produce un messaggio di avviso.\n• Il comando FSDEFAULT non richiede parametri numerici: accetta solo SD o SPIFFS.\n• Le preferenze vengono salvate automaticamente dopo il comando."
  },
  {
    "id": "func-endfunc",
    "nome": "FUNC / ENDFUNC",
    "categoria": "",
    "sintassi": "FUNC <nome>\nFUNC <nome> LOOP\n...\nENDFUNC",
    "sommario": "",
    "descrizione": "Il comando FUNC definisce una funzione utente. Le funzioni permettono di creare blocchi riutilizzabili di codice.\nQuando è presente la parola chiave LOOP, la funzione viene eseguita ciclicamente in background (non bloccante) tramite STARTFUNC.\nTutte le funzioni devono essere chiuse da ENDFUNC.",
    "esempi": [
      {
        "code": "5 FUNC SALUTO\n10 PRINT \"Ciao dal Basic!\"\n20 ENDFUNC\n30 CALLFUNC SALUTO\n\nOutput atteso:\nCiao dal Basic!",
        "note": "Funzione semplice (non in loop)"
      },
      {
        "code": "5 PINMODE 2 OUTPUT NOPULL\n10 FUNC BLINK LOOP\n20 DWRITE 2 1\n30 DELAY 300\n40 DWRITE 2 0\n50 DELAY 300\n60 ENDFUNC\n70 STARTFUNC BLINK\n\nOutput atteso:\nIl LED lampeggia ogni 300 ms in background.",
        "note": "Funzione ciclica (loop) per lampeggio LED"
      }
    ],
    "note": "• Ogni funzione deve iniziare con FUNC nome e finire con ENDFUNC\n• Il nome deve essere una parola unica (senza spazi o simboli)\n• Il codice all'interno non viene eseguito da solo: va richiamato con CALLFUNC o STARTFUNC\n• Se definita con LOOP, la funzione gira in modo continuo e parallelo\n• Le funzioni cicliche vanno interrotte con STOPFUNC\n• Può contenere qualsiasi comando BASIC (eccetto FUNC, ENDFUNC annidati)"
  },
  {
    "id": "to-step-next",
    "nome": "TO STEP NEXT",
    "categoria": "",
    "sintassi": "FOR variabile = inizio TO fine [STEP incremento]\n  ...\nNEXT [variabile]",
    "sommario": "",
    "descrizione": "La struttura FOR...NEXT viene utilizzata per creare cicli con contatore, in cui una variabile numerica viene incrementata o decrementata automaticamente fino a raggiungere un valore finale.\nvariabile: nome del contatore (es. I)\ninizio: valore iniziale\nfine: valore finale\nSTEP: incremento (positivo o negativo, opzionale — predefinito = 1)\nIl corpo del ciclo può contenere qualsiasi istruzione, inclusi IF, PRINT, LET, GOTO, ecc.",
    "esempi": [
      {
        "code": "10 FOR N = 0 TO 10 STEP 2\n20 PRINT \"N = \"; N\n30 NEXT N\n\nOutput atteso:\nN = 0\nN = 2\nN = 4\nN = 6\nN = 8\nN = 10",
        "note": "Ciclo con incremento personalizzato (STEP 2)"
      },
      {
        "code": "10 FOR X = 10 TO 1 STEP -3\n20 PRINT X\n30 NEXT X\n\nOutput atteso:\n10\n7\n4\n1",
        "note": "Ciclo decrescente (STEP negativo)"
      },
      {
        "code": "10 SUM = 0\n20 FOR I = 1 TO 10\n30 SUM = SUM + I\n40 NEXT I\n50 PRINT \"SOMMA = \"; SUM\n\nOutput atteso:\nSOMMA = 55",
        "note": "Calcolare la somma dei numeri da 1 a 10"
      }
    ],
    "note": ""
  },
  {
    "id": "get",
    "nome": "GET",
    "categoria": "",
    "sintassi": "GET",
    "sommario": "",
    "descrizione": "Il comando GET legge un singolo carattere dalla tastiera (terminale seriale) senza attendere il tasto INVIO.\nRestituisce il codice ASCII del carattere premuto. Se non viene premuto nulla, può restituire -1 o restare in attesa (a seconda del firmware).\nÈ utile per:\nleggere tasti in tempo reale\ncostruire interfacce interattive\nleggere sequenze di comandi o input manuali",
    "esempi": [
      {
        "code": "10 PRINT \"PREMI UN TASTO:\"\n20 A = GET\n30 PRINT \"CODICE ASCII: \"; A\n\nOutput atteso (se premi ad esempio la lettera A):\nPREMI UN TASTO:\nCODICE ASCII: 65",
        "note": "Premere un tasto e visualizzarne il codice ASCII"
      },
      {
        "code": "10 C = GET\n20 IF C <> -1 THEN PRINT \"TASTO: \"; C\n30 IF C = 81 THEN PRINT \"fine\" : END\n40 GOTO 10\n\nOutput atteso:\nTASTO: 72\nTASTO: 69\nTASTO: 76\nTASTO: 76\nTASTO: 79\nTASTO: 81",
        "note": "Leggere più tasti in un ciclo"
      },
      {
        "code": "10 PINMODE 2 OUTPUT NOPULL\n20 PRINT \"PREMI 1 PER ON, 0 PER OFF\"\n30 DO BLOCK 40 TO 60\n40 C = GET\n50 IF C = 49 THEN DWRITE 2 1\n60 IF C = 48 THEN DWRITE 2 0\n\nOutput atteso:\nSe premi 1, il LED si accende\nSe premi 0, il LED si spegne",
        "note": "Eseguire azioni in base al tasto premuto"
      }
    ],
    "note": "• GET può restituire -1 se non ci sono caratteri in coda\n• I codici ASCII di tasti comuni:\n• 0 → 48, 1 → 49, A → 65, a → 97"
  },
  {
    "id": "gosub-n",
    "nome": "GOSUB n",
    "categoria": "",
    "sintassi": "GOSUB numero_riga",
    "sommario": "",
    "descrizione": "Il comando GOSUB consente di saltare a una subroutine (blocco di codice) definita a un'altra riga del programma, ed eseguirla.\nAl termine della subroutine, si usa RETURN per tornare alla riga successiva a quella da cui è stato chiamato GOSUB.\nÈ utile per:\nriutilizzare codice\nstrutturare il programma in blocchi logici\ncreare funzioni operative senza DEF FN\nPuoi usare più GOSUB e annidarli, ma ogni GOSUB deve avere un corrispondente RETURN.",
    "esempi": [
      {
        "code": "10 GOSUB 100\n20 PRINT \"PROGRAMMA PRINCIPALE\"\n30 END\n100 PRINT \"SUBROUTINE ESEGUITA\"\n110 RETURN\n\nOutput atteso:\nSUBROUTINE ESEGUITA\nPROGRAMMA PRINCIPALE",
        "note": "Subroutine che stampa una riga"
      },
      {
        "code": "10 FOR I = 1 TO 3\n20 GOSUB 100\n30 NEXT I\n40 END\n100 PRINT \"ESECUZIONE NUMERO: \"; I\n110 RETURN\n\nOutput atteso:\nESECUZIONE NUMERO: 1\nESECUZIONE NUMERO: 2\nESECUZIONE NUMERO: 3",
        "note": "Chiamare la stessa subroutine più volte"
      },
      {
        "code": "10 INPUT A, B\n20 GOSUB 100\n30 PRINT \"RISULTATO: \"; R\n40 END\n100 R = A * B\n110 RETURN\n\nOutput atteso (es. input 3, 4):\nRISULTATO: 12",
        "note": "Subroutine per calcolo riutilizzabile"
      },
      {
        "code": "10 GOSUB 100\n20 PRINT \"QUESTA NON VERRÀ MAI ESEGUITA\"\n100 PRINT \"DIMENTICATO IL RETURN\"\nCorretto invece con:\n10 GOSUB 100\n20 PRINT \"QUESTA VERRÀ VISUALIZZATA\"\n30 END\n100 PRINT \"CON RETURN\"\n110 RETURN",
        "note": "Errore comune da evitare:\nSe dimentichi RETURN, il programma non torna indietro correttamente."
      }
    ],
    "note": ""
  }
];
