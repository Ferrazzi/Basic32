Basic32 – Automatic Programmer for ESP32 / ESP32-Cx / Sx
REQUIREMENTS

────────────────────────────
• Python 3 installed on your system
• Internet connection (only required the first time if packages are missing)
• ESP32 device (any model supported by esptool)

SUPPORTED CHIPS

────────────────────────────
• ESP32 / ESP32-DEVKIT
• ESP32-C3
• ESP32-S3

REQUIRED FILES

────────────────────────────
The following files must be in the same folder:

• flash.bat ← launcher for Windows
• flash.sh ← launcher for Linux / macOS
• flash_esp.py ← main script
• Basic32.ino.bootloader.bin ← bootloader
• Basic32.ino.partitions.bin ← partitions
• Basic32.ino.bin ← application firmware

PROGRAM START

────────────────────────────

➤ WINDOWS

Double-click on flash.bat
or open a terminal in the folder and type:

python flash_esp.py

➤ LINUX / MACOS

Open a terminal in the folder

Make the script executable (only the first time):

chmod +x flash.sh


Start:

./flash.sh

HOW IT WORKS

────────────────────────────

The script checks and installs the required Python packages (pyserial, esptool)

It lists the available serial ports and you select the one where your ESP is connected

It asks you to choose the chip (ESP32, ESP32-C3 or ESP32-S3)

You choose a flashing preset (Safe, Fast, or Custom)

It asks whether you want to perform an erase-flash before writing

It flashes the three .bin files with the correct offsets for the selected chip

AUTOMATIC PACKAGE INSTALLATION

────────────────────────────
If the required Python packages (pyserial, esptool) are missing, the script will install them automatically.

If the automatic installation fails, you can install them manually:

pip install pyserial esptool

COMMON ISSUES

────────────────────────────
• Device not detected:
– Make sure it is properly connected
– On some boards hold the BOOT button while connecting the USB cable

• Flashing does not start or fails:
– Select the chip manually
– Make sure the .bin files are present and correct
– On Linux, ensure your user is in the dialout group:
bash sudo usermod -a -G dialout $USER
(then log out and log back in)

• Bootloop after flashing:
– Retry flashing with the Safe preset (dio/40m)
– If that does not help, run erase-flash before writing again