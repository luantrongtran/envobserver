# EnvObserver

EnvObserver is a a hobby project I created to record temperature, humidity, and soil moisture. This has 3 modules:

*   [EnvObserver_arduino](https://github.com/luantrongtran/envobserver_arduino): which is an Arduino project (Arduino wifi board + sensors) to record temperature, humidity and soil moisture
*   [EnvObserver](https://github.com/luantrongtran/envobserver): web services to which is the endpoint where Arduino units upload data
*  [EnvObserver\_mobile](https://github.com/luantrongtran/envobservers_mobile): a hybrid mobile app to see the data uploaded by Arduino
  

#### EnvObserver Web Services
*   This project is the Web Services to which the Arduino will send data; and can be used by the envobserver_mobile to retrieve the data.
*   This is written using node.js + express.js + mongoDB
*   To run the app on an Ubuntu machine:
    *   Instal mongodb, and run it on its default port
    *   Install Nodejs and Express.js
    *   Instal PM2 (Optional)
    *   Download the source code, then run the app
