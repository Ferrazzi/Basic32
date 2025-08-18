ESPFlasher - Automatic Flasher for ESP32 / ESP32-Cx / Sx

REQUIREMENTS
────────────────────────────
• Python 3 installed on the system  
• Internet connection (only on first run, if packages are missing)  
• ESP32 device (any model supported by esptool)

SUPPORTED CHIPS
────────────────────────────
• ESP32 / ESP32-DEVKIT  
• ESP32-C3  
• ESP32-S3

REQUIRED FILES
────────────────────────────
The following files must be in the same folder:

• flash.bat                      ← launcher for Windows  
• flash.py                       ← main flashing script  
• Basic32.ino.bootloader.bin     ← bootloader  
• Basic32.ino.partitions.bin     ← partition table  
• Basic32.ino.bin                ← application firmware

HOW TO RUN THE PROGRAM
────────────────────────────

➤ WINDOWS  
1. Double-click `flash.bat`  
   or open the terminal in the folder and type:  
       python flash.py

➤ LINUX / MACOS  
1. Open the terminal in the folder  
2. Make the script executable (only the first time):  
       chmod +x flash.sh  
3. Run:  
       ./flash.sh

HOW IT WORKS
────────────────────────────
1. The script will automatically list available serial ports  
2. It will try to detect the connected ESP chip  
3. If detection fails, you will be prompted to select it manually  
4. Flashing of the 3 binary files will begin with standard settings

AUTOMATIC PACKAGE INSTALLATION
────────────────────────────
If the required Python packages (`pyserial`, `esptool`) are not installed,  
the script will try to install them automatically.

If it fails, you can install them manually by typing:
       pip install pyserial esptool

COMMON ISSUES
────────────────────────────
• If your device is not detected:
   - Make sure it's connected properly
   - Press and hold the BOOT button while connecting USB

• If flashing does not start:
   - Select the chip manually
   - Verify that all .bin files are present and correct

