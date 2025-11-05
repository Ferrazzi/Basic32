// Export the commands array in English as default
export default [
  {
  "id": "intro",
  "tipo": "introduzione",
  "titolo": "Introduction to Basic32 – BASIC Interpreter for ESP32",
  "contenuto": `
    <h2>Introduction to Basic32 – BASIC Interpreter for ESP32</h2>
    <p><strong>Basic32</strong> is a powerful yet lightweight BASIC interpreter developed for the ESP32 board, designed to make ESP32 programming accessible even without knowledge of C/C++ or complex development environments.</p>
    <p>With Basic32 you can write, save, and execute BASIC code in real time using any serial terminal. This approach completely eliminates the need to recompile the firmware after each program change.</p>

    <h3>Main Features</h3>
    <ul>
      <li>Direct writing of BASIC code from a serial terminal (e.g. PuTTY, Arduino Serial Monitor, etc.)</li>
      <li>Saving and loading listings to internal memory (SPIFFS) or SD card (if present)</li>
      <li>Program stored in RAM with support for:
        <ul>
          <li>numeric variables, strings, arrays</li>
          <li>user-defined functions</li>
          <li>control flow (IF, GOTO, GOSUB, FOR/NEXT)</li>
        </ul>
      </li>
      <li>GPIO I/O control: digital and analog read/write, pin configuration</li>
      <li>Time and random generation functions</li>
      <li>Built-in commands: <code>LIST</code>, <code>RUN</code>, <code>NEW</code>, <code>HELP</code>, <code>SAVE</code>, <code>LOAD</code></li>
      <li>Interactive interpreter: each line can be typed and evaluated in real time</li>
    </ul>

    <h3>Managing BASIC files via SD or SPIFFS commands</h3>
    <p><strong>Basic32</strong> is designed for:</p>
    <ul>
      <li>retro-programming enthusiasts</li>
      <li>makers who want to control ESP32 easily</li>
      <li>those looking for an educational and interactive environment</li>
      <li>those who want quick prototyping without continuous compilations</li>
    </ul>

    <h3>Hardware Requirements</h3>
    <ul>
      <li>ESP32 board (any model with SPIFFS support and optional SD interface)</li>
      <li>Serial connection to the PC</li>
      <li>(Optional) SD card connected to the pins defined in the code:
        <ul>
          <li>MOSI → GPIO 23</li>
          <li>MISO → GPIO 19</li>
          <li>SCK → GPIO 18</li>
          <li>CS → GPIO 15</li>
        </ul>
      </li>
    </ul>

    <h3>Using multiple SPI devices on ESP32 with Basic32</h3>
    <p>The ESP32 has hardware SPI buses that can be shared among multiple peripherals (display, RFID, touch, SD, etc.). Each device must have a dedicated Chip Select (CS).</p>

    <h4>To avoid conflicts on the SPI bus:</h4>
    <ol>
      <li>Assign a dedicated CS pin to each device (e.g. TFT_CS=17, SD_CS=13, TOUCH_CS=4, RFID_CS=25).</li>
      <li>Keep CS pins HIGH when the device is not in use to avoid interference.</li>
      <li>Set CS pins as OUTPUT and drive them HIGH before initializing modules.</li>
      <li>Initialize devices with their respective commands (<code>INITSD</code>, <code>ILI INIT</code>, <code>RFID INIT</code>, etc.).</li>
    </ol>

    <h3>Example: ILI9341 Display with SD and Touch</h3>
    <pre><code>
10 PINMODE 17 OUTPUT NOPULL   ' TFT_CS as output
20 DWRITE 17 1                ' keeps display inactive
30 PINMODE 4 OUTPUT NOPULL    ' TOUCH_CS as output
40 DWRITE 4 1                 ' keeps touch inactive
50 PINMODE 13 OUTPUT NOPULL   ' SD_CS as output
60 DWRITE 13 1                ' keeps SD inactive
70 INITSD 13 23 19 18         ' initialize SD (CS=13, MOSI=23, MISO=19, SCK=18)
80 ILI INIT 17 16 5 3         ' initialize TFT (CS=17, DC=16, RST=5, rotation=3)
90 ILI LED 32 1               ' turns on backlight on GPIO32
100 ILI TEXT 10 50 2 SDFREE 0 255 255  ' prints free SD space in yellow
    </code></pre>

    <p><strong>Note:</strong> If you add other SPI peripherals (e.g. RFID RC522), assign them a dedicated CS, set <code>PINMODE &lt;CS&gt; OUTPUT</code> and <code>DWRITE &lt;CS&gt; 1</code> before running their respective <code>INIT</code>. With this sequence, each device will work independently without interfering with others on the SPI bus.</p>

    <h3>What can you do with Basic32?</h3>
    <ul>
      <li>Write and test BASIC algorithms in real time</li>
      <li>Build interactive applications on ESP32 without compiling</li>
      <li>Save and reuse or modify programs later</li>
      <li>Control sensors and actuators with simple BASIC commands</li>
    </ul>

    <h3>Installation and First Start</h3>
    <p>This section guides you step by step through the installation of Basic32 on an ESP32 board using a precompiled firmware. There is no need to use Arduino IDE: simply download the <code>.bin</code> file and flash it directly into the device’s memory.</p>

    <h4>1. Requirements</h4>
    <ul>
      <li>ESP32 board (any model with SPIFFS and optional SD support)</li>
      <li>USB cable to connect the ESP32 to the PC</li>
      <li>Firmware flashing tools:
        <ul>
          <li>Basic32 Terminal (Windows)</li>
          <li>esptool.py (Linux/macOS/Windows via Python)</li>
        </ul>
      </li>
      <li>Serial terminal (e.g. Basic32 Terminal, PuTTY, TeraTerm, Arduino Serial Monitor)</li>
    </ul>

    <h4>2. Files to download</h4>
    <ul>
      <li><code>Basic32.bin</code> → precompiled firmware (available on the project GitHub)</li>
      <li>Optional example <code>.bas</code> files</li>
    </ul>

    <h4>3. Flashing the Firmware on ESP32</h4>
    <p><strong>Method 1:</strong> using Basic32 Terminal (Windows)</p>
    <ol>
      <li>Install Basic32 Terminal (if not already done):<br>
      <a href="https://github.com/Ferrazzi/Basic32/tree/main/Basic32Terminal" target="_blank">https://github.com/Ferrazzi/Basic32/tree/main/Basic32Terminal</a></li>
      <li>Connect the ESP32 and select the icon to flash the firmware.</li>
      <li>Choose to flash from file or online, select your ESP32 model, and click <strong>Flash</strong>.</li>
    </ol>

    <p><strong>Method 2:</strong> using esptool.py (multi-platform)</p>
    <ol>
      <li>Install esptool.py (if not already done):<br>
      <code>pip install esptool</code></li>
      <li>Connect the ESP32 and identify the serial port (e.g. COM3 on Windows or /dev/ttyUSB0 on Linux).</li>
      <li>Flash the firmware with the command:<br>
      <code>esptool.py --chip esp32 --port COM3 --baud 460800 write_flash -z 0x10000 Basic32.bin</code></li>
    </ol>

    <h4>4. First Boot</h4>
    <pre><code>
10 PRINT "HELLO BASIC32"
20 GOTO 10
RUN
    </code></pre>

    <h4>5. Using SPIFFS</h4>
    <pre><code>
ESAVE "program.bas"
ELOAD "program.bas"
    </code></pre>

    <h4>6. Using SD Card (optional)</h4>
    <table>
      <tr><th>Signal</th><th>ESP32 GPIO</th></tr>
      <tr><td>MISO</td><td>19</td></tr>
      <tr><td>MOSI</td><td>23</td></tr>
      <tr><td>SCK</td><td>18</td></tr>
      <tr><td>CS</td><td>15</td></tr>
    </table>
    <pre><code>
SAVE "program.bas"
LOAD "program.bas"
    </code></pre>

    <h3>File and Memory Management</h3>
    <h4>1. SPIFFS Memory (internal)</h4>
    <ul>
      <li>Filenames are case-insensitive.</li>
      <li>The <code>.bas</code> extension is conventional but not mandatory.</li>
      <li>The available size depends on the SPIFFS partition (typically 1–2 MB).</li>
    </ul>

    <h4>2. SD Card (external, optional)</h4>
    <ul>
      <li>The system automatically detects the presence of the SD card.</li>
      <li>The SD must be formatted in FAT32.</li>
    </ul>
  `
},
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
