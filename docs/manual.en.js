// manual.*.js — Manuale
export default [
  {
    "id": "introduction-to-basic32-a-basic-interpreter-for-esp32",
    "tipo": "introduzione",
    "titolo": "introduction-to-basic32-a-basic-interpreter-for-esp32",
    "contenuto": `
<p>Basic32 is a powerful yet lightweight BASIC interpreter developed for the ESP32 board, designed to make ESP32 programming accessible even without knowledge of C/C++ or complex development environments. With Basic32 you can write, save, and run BASIC code in real time using any serial terminal. This approach completely eliminates the need to recompile the firmware every time the program is modified. Main features</p>

<ul>
  <li>Direct writing of BASIC code from a serial terminal (e.g. Basic32Terminal, PuTTY, Arduino Serial Monitor, etc.)</li>
  <li>Saving and loading listings to internal memory (SPIFFS) or to an SD card (if present)</li>
  <li>Program storage in RAM with support for:</li>
</ul>

<p>o numeric variables, strings, arrays o user-defined functions o control flow (IF, GOTO, GOSUB, FOR/NEXT)</p>

<ul>
  <li>GPIO I/O control: digital and analog read/write, pin configuration</li>
  <li>Timing functions and random number generation</li>
  <li>Built-in commands: LIST, RUN, NEW, HELP, SAVE, LOAD</li>
  <li>Interactive interpreter: each line can be typed and evaluated in real time</li>
</ul>

<p>BASIC file management via SD or SPIFFS commands. Basic32 is designed for:</p>

<ul>
  <li>retro-programming enthusiasts</li>
  <li>makers who want to control the ESP32 in a simple way</li>
  <li>those looking for an educational and interactive environment</li>
  <li>those who want rapid prototyping without continuous compilation</li>
</ul>

<p>Hardware requirements</p>

<ul>
  <li>ESP32 board (DEV, S3, C3 models with SPIFFS support and optional SD interface)</li>
  <li>Serial connection to the PC</li>
  <li>(Optional) SD card connected to the pins defined in the code:</li>
</ul>

<ul>
   <li>MOSI → GPIO 23</li>
   <li>MISO → GPIO 19</li>
   <li>SCK → GPIO 18</li>
   <li>CS → GPIO 15</li>
</ul>

<p>Using multiple SPI devices on ESP32 with Basic32</p>
<p>The ESP32 provides hardware SPI buses that can be shared among multiple peripherals (TFT display, RFID reader, touch screen, SD card, etc.). All SPI devices share the MOSI, MISO, and SCK pins, but each device must have its own dedicated Chip Select (CS).</p>
<p>To avoid conflicts on the SPI bus:</p>
<p>     1. Assign a dedicated CS pin to each device (e.g. TFT<em>CS=17, SD</em>CS=13, TOUCH<em>CS=4, RFID</em>CS=25). </p>
<p>     2. Keep CS pins high (HIGH) when the device is not in use, so it does not interfere with others.</p>
<p>     3. Set CS pins as OUTPUT and drive them HIGH before initializing the modules.</p>
<p>     4. Initialize the devices with their respective commands (INITSD, ILI INIT, RFID INIT, etc.).</p>
<p>Example: ILI9341 display with integrated SD and Touch</p>
<code>
<p>10 PINMODE 17 OUTPUT NOPULL   ' TFT<em>CS as output</p>
<p>20 DWRITE 17 1                ' keeps the display inactive</p>
<p>30 PINMODE 4 OUTPUT NOPULL    ' TOUCH</em>CS as output</p>
<p>40 DWRITE 4 1                 ' keeps the touch inactive</p>
<p>50 PINMODE 13 OUTPUT NOPULL    ' SD_CS as output</p> 
<p>60 DWRITE 13 1                 ' keeps SD inactive</p>
<p>70 INITSD 13 23 19 18         ' initialize SD (CS=13, MOSI=23, MISO=19, SCK=18)</p> 
<p>80 ILI INIT 17 16 5 3         ' initialize TFT (CS=17, DC=16, RST=5, rotation=3)</p>
<p>90 ILI LED 32 1               ' turn on backlight on GPIO32</p>
<p>100 ILI TEXT 10 50 2 SDFREE 0 255 255  ' print free space on SD in yellow</p>
</code>

<p>Note: If you add other SPI peripherals (e.g. RFID RC522), assign them a dedicated CS, set PINMODE &lt;CS&gt; OUTPUT and DWRITE &lt;CS&gt; 1 before executing the corresponding INIT. With this sequence, each device is ready to operate without interfering with others on the SPI bus. What can you do with Basic32?</p>

<ul>
  <li>Write and test BASIC algorithms in real time</li>
  <li>Build interactive applications on ESP32 without compiling</li>
  <li>Save programs for reuse or future modification</li>
  <li>Control sensors and actuators with simple BASIC commands</li>
</ul>

<h3><strong>Installation and First Startup</strong></h3>

<p>This section guides you step by step through installing Basic32 on an ESP32 board using precompiled firmware. There is no need to use the Arduino IDE: the firmware can be flashed directly from the browser or via installation scripts provided by the project.</p>

<p>1. Requirements</p>

<ul>
  <li>Compatible ESP32 board:</li>
  <li>ESP32 DEV or ESP32 S3 or ESP32 C3</li>
  <li>USB cable to connect the ESP32 to the PC</li>
  <li>PC with a WebSerial-compatible browser (Chrome, Edge, or derivatives)</li>
</ul>

<p>or</p>

<ul>
  <li>Environment with Python installed (for script-based installation)</li>
</ul>

<p>2. Installation Methods</p>

<p>Method 1 – Direct installation from the website (recommended)</p>
<p>The easiest and fastest way to install Basic32 is via the official website, which allows flashing the firmware directly onto the ESP32 from the browser.</p>
<ul>
   <li>1. Connect the ESP32 board to the PC via USB</li>
   <li>2. Open the site: <a href="https://ferrazzi.github.io/Basic32/" target="_blank">https://ferrazzi.github.io/Basic32/</a></li>
   <li>3. Click Connect</li>
   <li>4. Authorize access to the serial port when prompted</li>
   <li>5. Wait for the flashing process to complete. At the end, the board is ready to use with Basic32.</li>
</ul>

<p>Method 2 – Installation via firmware and script (advanced)</p>
<p>Alternatively, you can install Basic32 by downloading the firmware files and using the official scripts provided in the project’s GitHub repository.</p>

<ul>
   <li>1. Go to the firmware section of the project:</li>
   <li>2. <a href="https://github.com/Ferrazzi/Basic32/tree/main/firmware" target="_blank">https://github.com/Ferrazzi/Basic32/tree/main/firmware</a></li>
   <li>3. Download the folder corresponding to your ESP32 model</li>
   <li>4. Connect the ESP32 to the PC</li>
   <li>5. Run the provided installation script (Windows, Linux, or macOS)</li>
   <li>6. Wait for the flashing process to complete</li>
</ul>

<p>This method is intended for more experienced users or for offline installations.</p>

<p>3. First Startup</p>
<ul>
   <li>1. Once flashed, restart the ESP32.</li>
   <li>2. Open a serial terminal at 115200 baud.</li>
   <li>3. You should see the prompt: BASIC32 v1.0 READY. You can now type BASIC commands directly:</li>

<code>
<p>10 PRINT "HELLO BASIC32"</p>
<p>20 GOTO 10</p>
<p>RUN</p>
</code>

   <li>4. Using SPIFFS: you can save and load BASIC listings with the commands: SAVE "programma.bas" LOAD "programma.bas"</li>
   <li>5. Using SD card (optional): if your hardware has an SD card connected to the following pins: Signal / ESP32 GPIO — MISO 19, MOSI 23, SCK 18, CS 15</li>
</ul>

<h3><strong>File and Memory Management</strong></h3>

<p>Basic32 supports both the ESP32 internal SPIFFS memory and an optional microSD card. Both storage options can be used to save, load, and organize BASIC (.bas) files without recompiling the firmware.</p>
<p>1. SPIFFS Memory (internal) SPIFFS is the internal file system of the ESP32, automatically mounted at startup. It is useful when an SD card is not available.</p>

<ul>
  <li>File names are case-insensitive.</li>
  <li>The .bas extension is conventional, but not mandatory.</li>
  <li>The available size depends on the SPIFFS partition in the firmware (typically 1MB–2MB).</li>
</ul>

<p>2. SD Card (external, optional) If you have a microSD card connected to the ESP32 (with pins configured in the Basic32.ino file), you can use it as additional or primary storage.</p>

<ul>
  <li>The system automatically detects the presence of the SD card.</li>
  <li>The SD card must be formatted in FAT32.</li>
</ul>

<p>The SD card must be formatted in FAT32.</p>
    `,
  },
  {
    "id": "abs",
    "nome": "ABS(x)",
    "categoria": "Mathematical functions",
    "sintassi": "ABS(x)",
    "sommario": "",
    "descrizione": `
The ABS(x) function returns the absolute value of x, that is, the number without its sign. It can be used in arithmetic expressions, assignments, and logical conditions. It accepts both integer and decimal numbers. If the number is already positive or zero, it is not modified.
    `,
    "esempi": [
      {
        "code": `
10 A = -42
20 B = ABS(A)
30 PRINT "ABSOLUTE VALUE: "; B

Expected output:
ABSOLUTE VALUE: 42
        `,
        "note": "Shows the use of ABS with an integer:",
      },
      {
        "code": `
10 PRINT "ABS(-3.14) = "; ABS(-3.14)

Expected output:
ABS(-3.14) = 3.14
        `,
        "note": "It also works with floating-point numbers:",
      },
      {
        "code": `
10 A = -7
20 IF ABS(A) = 7 THEN PRINT "IT IS EQUAL TO 7"

Expected output:
IT IS EQUAL TO 7
        `,
        "note": "ABS can be used directly in an IF condition:",
      },
    ],
    "note": "ABS is a pure function: it does not modify variables, it only returns a numeric value.",
  },
  {
    "id": "acs-calib-setoffset",
    "nome": "ACS CALIB SETOFFSET",
    "categoria": "",
    "sintassi": "ACS CALIB SETOFFSET mv",
    "sommario": "",
    "descrizione": `
Manually sets the zero offset in mV (typically ~Vcc/2). Useful if you know the offset measured with a multimeter or want to force it.
    `,
    "esempi": [
      {
        "code": `
10 ACS INIT 34 20
20 ACS CALIB SETOFFSET 1650
30 ACS READ I
40 PRINT I
        `,
        "note": "",
      },
    ],
    "note": "•\tDoes not replace automatic calibration; you can combine ZERO and SETOFFSET (the last one called takes precedence).",
  },
  {
    "id": "acs-calib-show",
    "nome": "ACS CALIB SHOW",
    "categoria": "",
    "sintassi": "ACS CALIB SHOW",
    "sommario": "",
    "descrizione": `
Displays the current configuration on the serial output: pin, model, sensitivity in mV/A, vref, zero in mV, averaged samples.
    `,
    "esempi": [
      {
        "code": `
10 ACS INIT 34 5
20 ACS CALIB SHOW
        `,
        "note": "",
      },
    ],
    "note": "•\tOutput via Serial.printf(...) (like other diagnostic commands that print to the serial interface).",
  }
];