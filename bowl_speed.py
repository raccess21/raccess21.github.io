x, dx = [float(val.strip()) for val in  "1 + 0.1".split("+")]
t, dt = [float(val.strip()) for val in  "1 + 0.1".split("+")]

v = x / t
dv = dx / x + dt / t

print(f"Distance measured: {x:.2f} +- {dx} metres")
print(f"Time measured is : {t:.2f} +- {dt} seconds")
print(f"Bowling speed is : {v:.2f} +- {dv} m / s")