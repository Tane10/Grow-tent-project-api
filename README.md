# Grow-tent-project
## Brief
This is a personal side project, using IoT and cloud technologies to allow me to plan, track, monitor, capture and control a growing environment. This project has been a want for a long while and I need to get it done. I would like to test it in an indoor environment and outdoors on different scale grows.
## Purpose
The reason for this is to create a self-sustaining application to help a small scale gardener control / automate there garden, maximising yield and minimising the hard wok allowing a gardener to enjoy their growing experience.

P.s. can build a very smal green house using the plastic sheet i have jus this this: https://www.hackster.io/drpanosv/smart-greenhouse-fbc739

## Tech
- Backend 
    - Typescript
    - Nodejs 
    - Express
    - Docker
    - Npm
        - https://www.npmjs.com/package/pigpio#pulse-an-led-with-pwm
        - https://www.npmjs.com/package/socket.io
        - https://www.npmjs.com/package/onoff
    - NoSQL DB
- Frontend
    - React or Vuejs

## Useful links:
https://www.w3schools.com/nodejs/nodejs_raspberrypi_webserver_websocket.asp
https://www.w3schools.com/nodejs/nodejs_raspberrypi_components.asp#socket.io

## Todo
- set up simple using bread board
    - LED
        - turn LED green when loged in
        - flash red led when an operation is taking place
    - Water pump
        - turn on Water pump to water plants
    - read soil wetness
    - read temp and humidty
- use socket.io to control / trigger worker pi
- solder it all togeter
- run it from a chargeable battery

## MVP:
- Web server running on docker on pi (done)
- Web server getting current weather (done)
- Login / jwt security (cause it will be open) (done)
- Trigger simple pi commands to a separate pi 
