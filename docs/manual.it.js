// manual.*.js — Manuale
export default [
  {
    "id": "intro",
    "tipo": "introduzione",
    "titolo": "Introduzione a Basic32 – Interprete BASIC per ESP",
    "contenuto": `
<p><strong>Basic32</strong> è un interprete BASIC leggero e interattivo progettato per la scheda <strong>ESP32</strong>.</p>

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
    "id": "abs",
    "nome": "ABS(x)",
    "categoria": "Funzioni matematiche",
    "sintassi": "ABS(x)",
    "sommario": "Restituisce il valore assoluto di un numero",
    "descrizione": `
<p>La funzione <code>ABS(x)</code> restituisce il valore assoluto di <em>x</em>, ovvero il numero privo di segno.</p>

<p>È utilizzabile in espressioni aritmetiche, assegnazioni e condizioni <code>IF</code>.</p>

<p>Accetta numeri interi e decimali. Se il valore è già positivo, viene restituito senza modifiche.</p>
    `,
    "esempi": [
      {
        "code": `
10 A = -42
20 B = ABS(A)
30 PRINT "VALORE ASSOLUTO: "; B
RUN
        `,
        "note": "Calcola il valore assoluto di un intero negativo.\nOutput: VALORE ASSOLUTO: 42",
      },
      {
        "code": `
10 PRINT "ABS(-3.14) = "; ABS(-3.14)
RUN
        `,
        "note": "Funziona anche con numeri decimali.\nOutput: ABS(-3.14) = 3.14",
      },
      {
        "code": `
10 A = -7
20 IF ABS(A) = 7 THEN PRINT "È UGUALE A 7"
RUN
        `,
        "note": "Uso diretto della funzione ABS in una condizione IF.",
      },
    ],
    "note": "ABS è una funzione pura: non modifica variabili, restituisce solo un valore numerico.",
  }
];