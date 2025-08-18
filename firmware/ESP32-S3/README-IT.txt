ESPFlasher - Programmatore automatico per ESP32 / ESP32-Cx / Sx

REQUISITI
────────────────────────────
• Python 3 installato sul sistema
• Connessione a Internet (solo al primo avvio, se mancano i pacchetti)
• Dispositivo ESP32 (qualsiasi modello supportato da esptool)

CHIP SUPPORTATI
────────────────────────────
• ESP32 / ESP32-DEVKIT
• ESP32-C3
• ESP32-S3

FILE RICHIESTI
────────────────────────────
Nella cartella devono esserci i seguenti file:

• flash.bat                      ← avvio per windows
• flash.py                       ← lo script principale
• Basic32.ino.bootloader.bin     ← bootloader
• Basic32.ino.partitions.bin     ← partizioni
• Basic32.ino.bin                ← firmware applicazione

AVVIO DEL PROGRAMMA
────────────────────────────

➤ WINDOWS
1. Fai doppio clic su `flash.bat` oppure apri il terminale nella cartella e digita:
       python flash.py

➤ LINUX / MACOS
1. Apri il terminale nella cartella
2. Rendi eseguibile lo script (solo la prima volta):
       chmod +x flash.sh
3. Avvia:
       ./flash.sh

FUNZIONAMENTO
────────────────────────────
1. Lo script cercherà automaticamente le porte seriali disponibili
2. Proverà a identificare il chip ESP connesso
3. Se il rilevamento fallisce, potrai selezionarlo manualmente
4. Inizierà il flashing dei 3 file binari con le impostazioni standard

INSTALLAZIONE AUTOMATICA DEI PACCHETTI
────────────────────────────
Se non hai i pacchetti Python necessari (`pyserial`, `esptool`), lo script li installerà automaticamente.

Se dovesse fallire, puoi installarli tu scrivendo:
       pip install pyserial esptool

PROBLEMI COMUNI
────────────────────────────
• Se il dispositivo non viene rilevato:
   - Assicurati che sia collegato correttamente
   - Premi il tasto BOOT durante la connessione USB

• Se non parte il flashing:
   - Seleziona il chip manualmente
   - Verifica che i file .bin siano presenti e corretti
