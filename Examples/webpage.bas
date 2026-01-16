10 PINMODE 32 OUTPUT NOPULL
20 WIFI "ssid" "password"
30 HTMLOBJ "<div style='font-family:Arial,sans-serif;background:#202124;color:#fff;text-align:center;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;'>"
40 HTMLOBJ "<h2 style='font-size:32px;margin-bottom:40px;'>Controllo LED on board</h2>"
50 HTMLOBJ "<iframe name='exec_hidden' style='display:none;width:0;height:0;border:0;'></iframe>"
60 HTMLOBJ "<a href='/exec?cmd=DWRITE%2032%201' target='exec_hidden'>"
70 HTMLOBJ "<button style='font-size:24px;padding:12px 24px;margin:10px;border-radius:10px;border:none;cursor:pointer;background:#4caf50;color:#fff;'>Accendi LED</button>"
80 HTMLOBJ "</a>"
90 HTMLOBJ "<a href='/exec?cmd=DWRITE%2032%200' target='exec_hidden'>"
100 HTMLOBJ "<button style='font-size:24px;padding:12px 24px;margin:10px;border-radius:10px;border:none;cursor:pointer;background:#f44336;color:#fff;'>Spegni LED</button>"
110 HTMLOBJ "</a>"
120 HTMLOBJ "</div>"
130 HTMLSTART
