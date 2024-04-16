import time

x, dx = [float(val.strip())/1000 for val in  "20.17 +- 0.5".split("+-")]

input("Start Clock... :")
t1 = time.time()
input("Stop  Clock... :")
timer = time.time() - t1

t, dt = [float(val.strip())/3600 for val in  f"{timer} +- 0.5".split("+-")]
v = x / t
dv = dx / x + dt / t

print(f"Distance measured: {x:08.5f} +- {dx:08.5f} kms")
print(f"Time measured is : {t:08.5f} +- {dt:08.5f} hrs")
print(f"Bowling speed is : {v:08.5f} +- {dv:08.5f} km/h")