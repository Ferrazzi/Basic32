10  PINMODE 7 OUTPUT NOPULL
20  WIFI "ssid" "password"
30  HTMLOBJ "<h2>On-board LED control</h2>"
40  HTMLOBJ "<button onclick='fetch("+CHR$(34)+"/exec?cmd=DWRITE%207%201"+CHR$(34)+")'>Turn ON the LED</button>"
50  HTMLOBJ "<button onclick='fetch("+CHR$(34)+"/exec?cmd=DWRITE%207%200"+CHR$(34)+")'>Turn OFF the LED</button>"
60  HTMLSTART
