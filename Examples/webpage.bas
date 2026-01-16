10  PINMODE 7 OUTPUT NOPULL
20  WIFI "ssid" "password"
30  IF WIFICONNECTED = 0 THEN GOTO 30 ELSE PRINT "WIFI CONNECTED"
50  HTMLOBJ "<h2>On-board LED control</h2>"
60  HTMLOBJ "<button onclick='fetch("+CHR$(34)+"/exec?cmd=DWRITE%207%201"+CHR$(34)+")'>Turn ON the LED</button>"
70  HTMLOBJ "<button onclick='fetch("+CHR$(34)+"/exec?cmd=DWRITE%207%200"+CHR$(34)+")'>Turn OFF the LED</button>"
80  HTMLSTART
90  PRINT "SERVER STARTED"
