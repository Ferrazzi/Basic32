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
    "note": "DELAY blocca totalmente l’esecuzione (incluso INPUT, GET, ecc.)\nL'unità di misura è il millisecondo (1000 = 1 secondo)"
  }
];
