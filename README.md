# FlameNet

![](./src/flamenet-logo-white.png)

Protecting your moms house since 2022

Live Demo at [https://***REMOVED***.web.app/dashboard]

<h4 align="center">FlameNet Dashboard</h4>

![](./src/imgs/dashboardSS.png)

<h4 align="center">FlameNet Home Page</h4>

![](./src/imgs/homeSS.png)

## Materials:

Hardware:

- [3x ESP32 Development Boards](https://www.amazon.com/Development-Microcontroller-Integrated-Antenna-Amplifiers/dp/B09GK74F7N/ref=sr_1_3?crid=2LQLVK5DUFJB0&keywords=esp32&qid=1668334356&sprefix=esp32%2Caps%2C107&sr=8-3)
- [3x Grove Temperature Sensors](https://www.digikey.com/en/products/detail/seeed-technology-co.,-ltd/101020015/5482612?utm_adgroup=Seeed%20Technology%20Co.%2C%20LTD.&utm_source=google&utm_medium=cpc&utm_campaign=Shopping_DK%2BSupplier_Tier%201%20-%20Block%202&utm_term=&utm_content=Seeed%20Technology%20Co.%2C%20LTD.&gclid=Cj0KCQiAyMKbBhD1ARIsANs7rEGy_DBF9nZJGFLarfIc-xHm5h-tDILt3xnjRtCqa0iZ1K66xrJRKNAaAr_TEALw_wcB)
- 3x Buttons
- Jumper Cables and a Breadboard

Software:

- [Firebase React App and Realtime Database](https://firebase.google.com/)
- [Twilio](https://www.twilio.com/)
- [Arduino IDE](https://docs.arduino.cc/software/ide-v2)

## Hardware Setup:

To create our mesh network of CFire units, we used ESP-NOW to communicate between multiple nodes, creating a resilient communication network that works in areas that don't have cellular service or WiFi. ESP-NOW can work at ranges up to 1600 feet allowing you to create a wide reaching network at a low cost. In the future we would also like to implement the network using LORA radio communication to allow the distance between CFire units to be upto 10 miles.

To replicate our setup, you will need multiple ESP32 boards, and must designate one to be the master node, which will communicate with a WiFi network. All of the other nodes, will be the child CFire units, that dont need to connect to any WiFi network.

You can flash the master unit the "BlueToothMasterNodeCode.ino", making sure to change the WiFi SSID and password to that of your network, and updating the Twilio and Firebase API urls. Each child unit needs to be flashed with the "BlueToohChildNodeCode.ino" code, making sure to change nodeNum, to a unique value for your network, and adding the Mac Address, of all the connecting units in the network. If you don't know the Mac Address you can run the "FindMacAdress.ino" script on the ESP32 and read the address from the Serial Monitor.
