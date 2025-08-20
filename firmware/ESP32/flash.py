import subprocess
import sys
import os
import re

try:
    import importlib.metadata as importlib_metadata
except Exception:
    importlib_metadata = None

def ensure_module_installed(import_name, pip_name=None):
    pip_name = pip_name or import_name
    try:
        __import__(import_name)
    except ImportError:
        print(f"The module '{import_name}' is not installed. Installing '{pip_name}'...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", pip_name])
        print(f"'{pip_name}' installed successfully.")

def get_installed_version(dist_name):
    if importlib_metadata is None:
        return None
    try:
        return importlib_metadata.version(dist_name)
    except Exception:
        return None

def get_latest_version_from_pip(package_name):
    try:
        res = subprocess.run(
            [sys.executable, "-m", "pip", "index", "versions", package_name],
            capture_output=True, text=True, check=True
        )
        m = re.search(r"Available versions:\s*([0-9][0-9A-Za-z\.\-\+]*)", res.stdout)
        if m:
            return m.group(1).strip()
    except subprocess.CalledProcessError:
        pass
    return None

def version_cmp(v1, v2):
    def norm(v):
        parts = re.split(r"[.\-+]", v)
        out = []
        for p in parts:
            if p.isdigit():
                out.append((0, int(p)))
            else:
                out.append((1, p))
        return out
    a, b = norm(v1), norm(v2)
    for (ta, va), (tb, vb) in zip(a, b):
        if ta != tb:
            return -1 if ta > tb else 1
        if va != vb:
            if isinstance(va, int) and isinstance(vb, int):
                return -1 if va < vb else 1
            return -1 if str(va) < str(vb) else 1
    return 0 if len(a) == len(b) else (1 if len(a) > len(b) else -1)

def check_and_update_esptool():
    installed = get_installed_version("esptool")
    if installed is None:
        print("esptool is not installed. Installing...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "esptool"])
        return
    print(f"Installed esptool version: {installed}")
    latest = get_latest_version_from_pip("esptool")
    if not latest:
        return
    if version_cmp(installed, latest) < 0:
        ans = input(f"Update esptool {installed} → {latest}? [y/N]: ").strip().lower()
        if ans == "y":
            subprocess.check_call([sys.executable, "-m", "pip", "install", "--upgrade", "esptool"])
            print("Update completed.")

ensure_module_installed("serial", "pyserial")
ensure_module_installed("esptool", "esptool")
check_and_update_esptool()

import serial.tools.list_ports

if getattr(sys, 'frozen', False):
    SCRIPT_DIR = sys._MEIPASS
else:
    SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

ESPT_CMD = [sys.executable, "-m", "esptool"]

PRESETS = {
    "1": {"name": "Safe",  "mode": "dio", "freq": "40m", "size": "detect"},
    "2": {"name": "Fast",  "mode": "qio", "freq": "80m", "size": "detect"},
}
VALID_SIZES = {"detect", "2MB", "4MB", "8MB", "16MB", "32MB"}
VALID_MODES = {"dio", "qio", "dout", "qout"}
VALID_FREQS = {"20m", "26m", "40m", "80m"}

FLASH_LAYOUTS = {
    "esp32": {
        "0x1000":  "Basic32.ino.bootloader.bin",
        "0x8000":  "Basic32.ino.partitions.bin",
        "0x10000": "Basic32.ino.bin",
    },
    "esp32c3": {
        "0x0":     "Basic32.ino.bootloader.bin",
        "0x8000":  "Basic32.ino.partitions.bin",
        "0x10000": "Basic32.ino.bin",
    },
    "esp32s3": {
        "0x0":     "Basic32.ino.bootloader.bin",
        "0x8000":  "Basic32.ino.partitions.bin",
        "0x10000": "Basic32.ino.bin",
    },
}

def check_files(flash_files):
    missing = [f for f in flash_files.values()
               if not os.path.isfile(os.path.join(SCRIPT_DIR, f))]
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
    while True:
        idx = input("Select port [number]: ").strip()
        try:
            sel = int(idx)
            if 0 <= sel < len(ports):
                return ports[sel].device
        except ValueError:
            pass
        print("Invalid selection. Try again.")

def choose_chip():
    while True:
        print("\nSelect chip:")
        print("  [1] ESP32")
        print("  [2] ESP32-C3")
        print("  [3] ESP32-S3")
        choice = input("Choice [1/2/3]: ").strip()
        mapping = {"1": "esp32", "2": "esp32c3", "3": "esp32s3"}
        chip = mapping.get(choice)
        if chip:
            print(f"Selected: {chip.upper()}")
            return chip
        print("Invalid choice. Try again.")

def choose_preset():
    while True:
        print("\nSelect flash preset:")
        print("  [1] Safe   (dio, 40m, detect)")
        print("  [2] Fast   (qio, 80m, detect)")
        print("  [3] Custom (manual values)")
        choice = input("Choice [1/2/3]: ").strip()
        if choice in PRESETS:
            p = PRESETS[choice]
            return p["mode"], p["freq"], p["size"]
        if choice == "3":
            mode = input(f"flash-mode ({'/'.join(sorted(VALID_MODES))}) [dio]: ").strip().lower() or "dio"
            if mode not in VALID_MODES:
                print("Invalid flash-mode.")
                continue
            freq = input(f"flash-freq ({'/'.join(sorted(VALID_FREQS))}) [40m]: ").strip().lower() or "40m"
            if freq not in VALID_FREQS:
                print("Invalid flash-freq.")
                continue
            size = input(f"flash-size ({'/'.join(sorted(VALID_SIZES))}) [detect]: ").strip().lower() or "detect"
            if size not in VALID_SIZES:
                print("Invalid flash-size.")
                continue
            return mode, freq, size
        print("Invalid choice. Try again.")

def maybe_erase_flash(port, chip):
    ans = input("Do you want to run 'erase-flash' before flashing? [y/N]: ").strip().lower()
    if ans == "y":
        subprocess.run(
            ESPT_CMD + ["--port", port, "--chip", chip, "erase-flash"],
            check=True
        )

def flash_device(port, chip, flash_files, mode, freq, size):
    flash_args = [
        "--chip", chip,
        "--baud", "921600",
        "--before", "default-reset",
        "--after", "hard-reset",
        "write-flash", "-z",
        "--flash-mode", mode,
        "--flash-freq", freq,
        "--flash-size", size,
    ]
    for addr, fname in flash_files.items():
        flash_args += [addr, os.path.join(SCRIPT_DIR, fname)]
    flash_cmd = ESPT_CMD + ["--port", port] + flash_args
    subprocess.run(flash_cmd, check=True)

if __name__ == "__main__":
    print("Starting ESP flashing...")
    print("Scanning serial ports...")
    ports = list_serial_ports()
    if not ports:
        print("No serial ports found.")
        sys.exit(1)
    selected_port = get_user_selection(ports)
    chip = choose_chip()
    flash_files = FLASH_LAYOUTS[chip]
    check_files(flash_files)
    mode, freq, size = choose_preset()
    maybe_erase_flash(selected_port, chip)
    flash_device(selected_port, chip, flash_files, mode, freq, size)
    print("\nFlashing completed successfully.")
