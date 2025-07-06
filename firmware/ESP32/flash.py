import subprocess
import sys
import os
import re

def ensure_package_installed(package):
    try:
        __import__(package)
    except ImportError:
        print(f"The package '{package}' is not installed. Installing now...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
            print(f"'{package}' installed successfully.")
        except subprocess.CalledProcessError:
            print(f"Failed to install '{package}'. Please install it manually using:")
            print(f"    pip install {package}")
            sys.exit(1)

ensure_package_installed("serial")
ensure_package_installed("esptool")

import serial.tools.list_ports

if getattr(sys, 'frozen', False):
    SCRIPT_DIR = sys._MEIPASS
else:
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

ESPT_CMD = [sys.executable, "-m", "esptool"]

FLASH_FILES = {
    "0x1000": "Basic32.ino.bootloader.bin",
    "0x8000": "Basic32.ino.partitions.bin",
    "0x10000": "Basic32.ino.bin"
}

CHIP_MAP = {
    "ESP32": "esp32",
    "ESP32-C3": "esp32c3",
    "ESP32-S3": "esp32s3"
}

CHIP_CHOICES = sorted(set(CHIP_MAP.values()))

def check_files():
    missing = [f for f in FLASH_FILES.values() if not os.path.isfile(os.path.join(SCRIPT_DIR, f))]
    if missing:
        print("Missing firmware files:")
        for f in missing:
            print(" -", f)
        sys.exit(1)

def list_serial_ports():
    ports = list(serial.tools.list_ports.comports())
    for i, port in enumerate(ports):
        print(f"[{i}] {port.device} - {port.description}")
    return ports

def get_user_selection(ports):
    idx = input("Select port [number]: ")
    try:
        return ports[int(idx)].device
    except (IndexError, ValueError):
        print("Invalid selection.")
        sys.exit(1)

def manual_chip_selection():
    print("Could not detect the chip automatically.")
    print("Please select the ESP type manually:")
    for i, chip in enumerate(CHIP_CHOICES):
        print(f"  [{i}] {chip}")
    idx = input("Enter chip number: ")
    try:
        return CHIP_CHOICES[int(idx)]
    except (IndexError, ValueError):
        print("Invalid choice.")
        sys.exit(1)

def detect_chip(port):
    print(f"Detecting chip on {port}...")
    try:
        result = subprocess.run(
            ESPT_CMD + ["--port", port, "chip_id"],
            capture_output=True,
            text=True,
            check=True
        )
        match = re.search(r"Detecting chip type\.\.\. ([A-Z0-9\-]+)", result.stdout)
        if match:
            chip_name = match.group(1)
            chip = CHIP_MAP.get(chip_name)
            if chip:
                print(f"Detected chip: {chip_name}")
                return chip
            else:
                print(f"Unsupported chip: {chip_name}")
    except subprocess.CalledProcessError:
        pass

    return manual_chip_selection()

def flash_device(port, chip):
    flash_args = [
        "--chip", chip,
        "--baud", "921600",
        "--before", "default_reset",
        "--after", "hard_reset",
        "write_flash", "-z",
        "--flash_mode", "qio",
        "--flash_freq", "80m",
        "--flash_size", "4MB"
    ]

    for addr, file in FLASH_FILES.items():
        flash_args += [addr, os.path.join(SCRIPT_DIR, file)]

    flash_cmd = ESPT_CMD + ["--port", port] + flash_args

    print(f"Flashing {chip} on {port}...")
    try:
        subprocess.run(flash_cmd, check=True)
        print("Flash completed.")
    except subprocess.CalledProcessError:
        print("Flashing failed.")

if __name__ == "__main__":
    print("Scanning serial ports...")
    check_files()
    ports = list_serial_ports()

    if not ports:
        print("No serial ports found.")
        sys.exit(1)

    selected_port = get_user_selection(ports)
    detected_chip = detect_chip(selected_port)
    flash_device(selected_port, detected_chip)
