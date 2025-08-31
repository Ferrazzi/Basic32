10 RFID INIT 5 33
20 RFIDDB INIT "tags.json"
30 PRINT "Hold a new tag near within 10 seconds..."
40 LET A$ = "Test"
50 RFIDDB ADD PRESENT A$ 10000 GOTO 90
60 RFIDDB SAVE
70 PRINT "Tag inserted and saved"
80 END
90 PRINT "Time expired"
