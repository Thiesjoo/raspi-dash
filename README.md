# Raspi-dash
### *Made by Thies Nieborg*

This will be an app to monitor sensors all a round the house.
Base code is currently updated, was working on the first device.

## Folder structure
All web services are in `./services`
* Database manages the db connection
* Device registry manages the device creation and management.


And all sample devices are in `./devices`
* Raspi-sensors handles the cpu temp, 

## Database choice

Currently hosted with a mongodb
Maybe migrate to Timescaledb???
Pros:
- Faster lookup
- Less storage
- Made for time series data

Cons:
- Have to host it myself
- Have to learn SQL again
