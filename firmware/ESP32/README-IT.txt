Basic32 – Programmatore automatico per ESP32 / ESP32-Cx / Sx
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

• flash.bat ← avvio per Windows
• flash.sh ← avvio per Linux / macOS
• flash_esp.py ← lo script principale
• Basic32.ino.bootloader.bin ← bootloader
• Basic32.ino.partitions.bin ← partizioni
• Basic32.ino.bin ← firmware applicazione

AVVIO DEL PROGRAMMA

────────────────────────────

➤ WINDOWS

Fai doppio clic su flash.bat
oppure apri il terminale nella cartella e digita:

python flash_esp.py

➤ LINUX / MACOS

Apri il terminale nella cartella

Rendi eseguibile lo script (solo la prima volta):

chmod +x flash.sh


Avvia:

./flash.sh

FUNZIONAMENTO

────────────────────────────

Lo script controllerà e installerà automaticamente i pacchetti necessari (pyserial, esptool)

Verranno mostrate le porte seriali disponibili: dovrai selezionare manualmente quella del tuo ESP

Ti verrà chiesto di selezionare il chip (ESP32, ESP32-C3 o ESP32-S3)

Potrai scegliere un preset di flashing (Sicuro, Veloce o personalizzato)

Verrà chiesto se vuoi eseguire un erase-flash prima della scrittura

Inizierà il flashing dei 3 file binari con gli offset corretti per il chip scelto

INSTALLAZIONE AUTOMATICA DEI PACCHETTI

────────────────────────────
Se non hai i pacchetti Python necessari (pyserial, esptool), lo script li installerà automaticamente.

Se l’installazione automatica dovesse fallire, puoi farla manualmente:

pip install pyserial esptool

PROBLEMI COMUNI

────────────────────────────
• Il dispositivo non viene rilevato:
– Controlla che sia collegato correttamente
– Su alcuni modelli premi e tieni premuto il tasto BOOT mentre colleghi l’USB

• Il flashing non parte o va in errore:
– Seleziona il chip manualmente
– Verifica che i 3 file .bin siano presenti e corretti
– Su Linux assicurati che il tuo utente sia nel gruppo dialout:
bash sudo usermod -a -G dialout $USER
(poi fai logout/login)

• Bootloop dopo il flashing:
– Ripeti l’operazione con il preset Sicuro (dio/40m)
– Se non funziona, prova la modalità erase-flash prima di riscrivere