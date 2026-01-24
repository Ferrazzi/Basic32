10 REM ==========================================
20 REM ESP-NOW SERVER (RX queue + ACK)
30 REM Uses: NOWINIT, NOWPOLL, NOWSEND, NOWCLR
40 REM ==========================================
50 NOWINIT RX$
60 PRINT "ESP-NOW SERVER"
70 PRINT "SERVER MAC: "; MAC$
80 PRINT "Waiting for messages..."
90 PRINT
100 REM --- set the CLIENT MAC here (the device that will receive ACKs)
110 CLIENTMAC$ = "00:00:00:00:00:00"   : REM <-- PUT CLIENT MAC HERE
120 REM --- variables
130 MSG$ = ""
140 LEFTINQ = 0
150 ACK$ = ""
160 REM --- main loop
170 NOWPOLL MSG$ LEFTINQ
180 IF MSG$ <> "" THEN PRINT "RX: "; MSG$; "  (queue left: "; LEFTINQ; ")"
190 REM --- send ACK only when something arrived
200 IF MSG$ <> "" THEN ACK$ = "ACK: " + MSG$
210 IF MSG$ <> "" THEN NOWSEND CLIENTMAC$ ACK$
220 REM --- clear historical RX variable (demo of NOWCLR)
230 IF RX$ <> "" THEN NOWCLR
240 WAIT 50
250 GOTO 170
