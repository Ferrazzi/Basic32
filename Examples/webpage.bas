10 PINMODE 2 OUTPUT NOPULL
20 WIFI "ssid" "password"  
30 HTMLOBJ "<h2>On-board LED control</h2>"  
40 HTMLOBJ "<button onclick='fetch(\"/exec?cmd=DWRITE 2 1\")'>Turn ON the LED</button>"  
50 HTMLOBJ "<button onclick='fetch(\"/exec?cmd=DWRITE 2 0\")'>Turn OFF the LED</button>"  
60 HTMLSTART  

