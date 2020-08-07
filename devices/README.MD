# Default Devices


## Raspi-sensors
For this to work you have to enable 1 wire sensors, enable gpio, and connect a temperature sensor.
For enabling these features: 
```shell
sudo modprobe wire
sudo modprobe w1-gpio
sudo modprobe w1-therm
```
