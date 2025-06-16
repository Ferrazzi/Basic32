# 🧠 Basic32 – A BASIC Interpreter for ESP32

**Basic32** is a lightweight, immediate and surprisingly powerful **BASIC interpreter** designed for **ESP32** boards. Its mission is to make hardware programming accessible, fast, and compiler-free.

With Basic32, you can write, test, and save code directly through a serial terminal, using a classic and readable BASIC syntax. It's the perfect tool for prototyping, learning, or simply enjoying coding like in the old days — powered by modern hardware.

---

## ✨ Why Choose Basic32?

- ⚡ **No compilation needed** – Write BASIC code straight from the serial terminal, no IDE required.
- 💾 **Load and save** programs using internal flash (SPIFFS) or external SD card.
- 🔧 **Full hardware control** – Access digital/analog I/O, PWM, sensors, actuators and filesystem.
- 🧩 **Support for variables, arrays, user-defined functions, control flow**, and more.
- 🔁 **Interactive execution** – Type and run instructions in real time, REPL-style.
- 👨‍🏫 **Perfect for education** – A great environment to learn electronics and programming logic.
- 🧪 **Rapid prototyping** – No build, no upload delays – just write and run.

---

## 🧰 Requirements

- Any **ESP32** development board with SPIFFS support
- USB connection to your computer
- (Optional) microSD card for external storage

---

## 🎯 Ideal For

- Retrocomputing enthusiasts
- Makers who want quick control over their ESP32 projects
- Educators and learners seeking an interactive environment
- Developers looking for a fast, no-frills prototyping tool

---

## 🚀 Getting Started

Download the precompiled firmware and flash it to your ESP32, using Basic32Terminal or other flashing application.
Once flashed:

1. Open Basic32Terminal or another serial terminal (115200 baud)
2. Wait for the prompt:  
   ```
   BASIC32 READY
   ```
3. Start coding!

```basic
10 PRINT "HELLO BASIC32"
20 GOTO 10
RUN
```

---

## 📂 Program Management

- Save/load programs from **SPIFFS** or **SD card**
- Files can be listed, verified, or deleted
- Compatible with `.bas` format (but extension is optional)

---

## 🛠 Features Overview

- BASIC-style programming with line numbers
- Command-line interface via serial
- Built-in commands like `LIST`, `RUN`, `SAVE`, `LOAD`, `HELP`, etc.
- GPIO configuration and digital/analog I/O
- Real-time user input handling
- File management with SD or internal flash

---

## 📚 Documentation

A full user manual with examples is available in the docs folder (or see the Manual for Basic32).

---

## 🤝 Contributing

Contributions, ideas, and pull requests are welcome! Whether you're optimizing the interpreter, expanding the command set, or just improving the documentation — you're invited to collaborate.

---

## ❤️ Inspired by

The spirit of classic 8-bit computers, BASIC interpreters from the '80s, and a desire to make microcontroller programming **accessible and fun again**.
