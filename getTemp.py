from serialPort import serial_ports
from serial import Serial

def sendRcv(s):
    s.write(b'T')
    return s.readline()

s_port: str = serial_ports()
if not s_port:
    exit()

s = Serial(s_port, 9600, timeout=1)
res = sendRcv(s)
while True:
    if res:
        try:
            temp = round(float(res),1)
            print(temp)
            break
        except:
            pass
    res = sendRcv(s)
