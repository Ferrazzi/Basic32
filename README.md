![Basic32](https://github.com/Ferrazzi/Basic32/blob/main/Logo.png)

Basic32 turns your ESP32 into a full BASIC interpreter. No compiler, no IDE, no complicated setup.  
Just plug it in, open a terminal, and start coding like in the 80s — but with Wi-Fi, graphics, SD cards and all the modern toys.

---

## What it can do

- Write and run BASIC programs straight from the serial terminal  
- Save and load your code on SPIFFS or SD card  
- Talk to hardware: digital/analog pins, PWM, servos, sensors  
- Play with displays: OLED, TFT, LCD (even with touch)  
- Control WS2812 / NeoPixel LEDs  
- Connect to the internet with Wi-Fi, HTTP and MQTT  
- Share data wirelessly with ESP-NOW or nRF24  
- Use DHT, ACS712, RFID readers, and more  
- Draw shapes and text with Adafruit GFX graphics functions  
- Keep track of time with RTC and time zones  
- Debug memory, use EEPROM, manage files… and much more

For the complete list of commands, check the **manual PDF** inside the `manual` folder or open [**Open Basic32 Web Tools**](https://ferrazzi.github.io/Basic32/index.html) to consult the full programming guide.

---

## Supported hardware

| Peripheral            | Example Usage in BASIC |
|-----------------------|------------------------|
| Digital / Analog I/O  | `PIN`, `AWRITE`, `DWRITE`, `PWM` |
| Servos                | `SERVO` commands |
| WS2812 / NeoPixel     | `NEOPIXEL` control |
| OLED SSD1306          | `OLEDPRINT`, graphics |
| TFT ILI9341           | `LINE`, `CIRCLE`, `RECT`, sprites |
| LCD (parallel/I2C)    | `LCDPRINT` |
| Touchscreen XPT2046   | Touch input handling |
| DHT Sensors           | `DHT` commands |
| ACS712 Current Sensor | `ACS` readings |
| RFID MFRC522          | `RFID` commands |
| RF24 (nRF24L01)       | Wireless communication |
| ESP-NOW               | Peer-to-peer networking |
| RTC (time/date)       | Time, date, time zones |
| EEPROM                | Store small configs |

…and more will be added with future **Basic32 updates**.

---

## Basic32 Web Tools

With the official **Web Tools** you can manage your ESP32 directly from the browser, without installing any additional software:  
➜ [**Open Basic32 Web Tools**](https://ferrazzi.github.io/Basic32/index.html)

The Web Tools allow you to:
- **Flash the Basic32 firmware** to your ESP32 directly from the web  
- **Open an online serial monitor** to connect to your device and use Basic32 without extra programs
- **Open an online programming manual** to explore all Basic32 commands, examples, and syntax in one place

---

## Install the firmware

You have two options to install Basic32 on your ESP32:

1. **From your browser (easiest way)**  
   ➜ [**Install Firmware**](https://ferrazzi.github.io/Basic32/)

2. **From the included scripts (manual method)**  
   In the `firmware` folder of this repository you will find flashing scripts for different ESP32 devices.  
   Choose the script that matches your board and run it to install Basic32 manually.

Both methods will get you up and running with Basic32 in just a few minutes.

---

## Basic32Terminal

Inside the `Basic32Terminal` folder you will find the **official Basic32 terminal**.  
This is the recommended way to use Basic32, because it gives you a **retro 80s-style programming experience**, just like working on a classic home computer.

With Basic32Terminal you can:
- Connect to your ESP32 easily  
- Edit and run programs in a comfortable BASIC environment  
- Manage files and interact with the firmware in an intuitive way

---

## Basic32OLEDEditor

In the `Basic32OLEDEditor` folder you will find a small app designed to **draw images for the OLED display**.  
These drawings are automatically converted into `DATA` statements that you can paste into your BASIC programs, making it easy to display graphics on the OLED.

It is the quickest way to add **custom icons, logos, or pixel art** to your Basic32 projects.

---

## How to start

1. Open a serial terminal at **115200 baud** (or simply use **Basic32Terminal**)  
2. Wait for:  
   ```
   BASIC32 READY
   ```
3. Type your first program:
   ```basic
   10 PRINT "HELLO BASIC32"
   20 GOTO 10
   RUN
   ```

---

## Activate the firmware

After flashing, when you open the serial monitor (or Basic32Terminal), the firmware will ask for **activation** and show a **fingerprint** unique to your device.

To activate:
1. Copy the fingerprint shown in the terminal  
2. Send it to me via the [Telegram group](https://t.me/Basic32ESP)  
3. You will receive your **activation code**  
4. Enter the activation code when requested

Activation is free.

---

## Examples

A collection of ready-to-run BASIC examples is available in the `Examples` folder of this repository.  
You can also fetch them **directly from GitHub** over Wi-Fi:

1. Connect to Wi-Fi:
   ```
   WIFI "your-ssid" "your-password"
   ```
2. List available online examples:
   ```
   EXAMPLES
   ```
3. Load one example into memory:
   ```
   LOADGIT "blinky.bas"
   ```
4. Run it:
   ```
   RUN
   ```

This is the fastest way to try features and learn Basic32 step by step, exactly as described in the manual.

---

## Program storage

- Save and load programs from SPIFFS or SD card  
- List, delete, rename files  
- Works with `.bas` files (extension optional)

---

## Support the project

If you like Basic32 and want to support its development, you can buy me a coffee or join the Telegram group to stay updated:

<p align="center">
  <a href="https://www.paypal.com/donate/?business=3LPTNPJ2RV6U8&no_recurring=0&item_name=Buy+me+a+coffee+if+you+like+to+contribute+to+the+app+development&currency_code=EUR">
    <img src="https://github.com/Ferrazzi/CarBox-Companion/blob/main/Assets/DonaPayPal.png" alt="Donate with PayPal" width="200"/>
  </a>
  &nbsp;&nbsp;&nbsp;
  <a href="https://t.me/Basic32ESP">
    <img src="https://github.com/Ferrazzi/CarBox-Launcher/blob/main/telegra-banner.jpg" alt="Telegram" width="200"/>
  </a>
</p>

<div align="center">
<p align="center"><img src="https://visitor-badge.laobi.icu/badge?page_id=<Ferrazzi>.<Basic32>" /></p> 
<br></div>
