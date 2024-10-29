import time
import sys
import select

x, dx = [float(val.strip()) for val in "20.17 +- 0.5".split("+-")]

input("Press Enter and Start Clock... :")
timer = time.time()
timed = time.time()
while True:
    try:
        timed = time.time()
        sys.stdout.write('\r')
        sys.stdout.write(f"Press Enter and Stop  Clock... : {(timed - timer):.2f} sec")
        sys.stdout.flush()
        time.sleep(0.05)
        if sys.stdin in select.select([sys.stdin], [], [], 0)[0]:
            input("\n")
            break
    except KeyboardInterrupt:
        print("\n")
        break

timer = timed - timer
t, dt = [float(val.strip()) for val in f"{timer} +- 0.3".split("+-")]
v = (x / t) * 3.6
dv = (dx / x + dt / t) * v
print(f"Distance measured: {x:05.2f} +- {dx:05.2f} metres_")
print(f"Time measured is : {t:05.3f} +- {dt:03.3f} seconds")
print(f"Bowling speed is : {v:05.2f} +- {dv:05.2f} km/h")