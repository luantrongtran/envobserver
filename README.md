<!----- Conversion time: 2.792 seconds.


Using this Markdown file:

1. Cut and paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β22
* Thu Apr 30 2020 00:17:25 GMT-0700 (PDT)
* Source doc: EnvObserver Wiki
* Tables are currently converted to HTML tables.
* This document has images: check for >>>>>  gd2md-html alert:  inline image link in generated source and store images to your server.

WARNING:
You have 2 H1 headings. You may want to use the "H1 -> H2" option to demote all headings by one level.

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 1; ALERTS: 2.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>



# EnvObserver





1. Setup
1. Hardware
2. Arduino IDE
1. Instal driver
*   Download the driver (for Mac) from the following link:

[https://raw.githubusercontent.com/nodemcu/nodemcu-devkit/master/Drivers/CH341SER_MAC.ZIP](https://raw.githubusercontent.com/nodemcu/nodemcu-devkit/master/Drivers/CH341SER_MAC.ZIP)



2. Install arduino Libraries
*   Install RTC DS3231 as below picture:



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/EnvObserver-Wiki0.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/EnvObserver-Wiki0.png "image_tooltip")




3. Board Setup
*   Install driver (if using Mac)
*   Board selection in Arduino, as below picture



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/EnvObserver-Wiki1.png). Store image on your image server and adjust path/filename if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/EnvObserver-Wiki1.png "image_tooltip")




4. Port selection

            There are different models of ESP8266 nodeMCU, therefore, the port appearing in the Arduino may vary. A way to know which is the port of the ESP8266 is to compare the port list before and after the board plugged into the PC.


            Otherwise, try port names with “1430”

3. Upload code on ESP8266 board
    1.  Download code at [https://codeload.github.com/luantrongtran/envobserver_arduino/zip/master](https://codeload.github.com/luantrongtran/envobserver_arduino/zip/master) 
    2. Open Android IDE
    3.  Unzip and Open the downloaded folder
    4.  Select board and port as above instruction
    5.  Plug the ESP8266 into your PC
    6.  Click “Upload” button, which is the arrow icon on top left corner
4. 





2. Schematic
1. Humidity & Temperature Sensor

<table>
  <tr>
   <td>
DH11 / DH12
   </td>
   <td>ESP8266
   </td>
  </tr>
  <tr>
   <td>+
   </td>
   <td>3.3v
   </td>
  </tr>
  <tr>
   <td>-
   </td>
   <td>Ground
   </td>
  </tr>
  <tr>
   <td>out
   </td>
   <td>D3
   </td>
  </tr>
</table>




2. RTC (DS3231

<table>
  <tr>
   <td>
DS3231
   </td>
   <td>esp8266
   </td>
  </tr>
  <tr>
   <td>+
   </td>
   <td>3.3v
   </td>
  </tr>
  <tr>
   <td>-
   </td>
   <td>Ground
   </td>
  </tr>
  <tr>
   <td>SDA
   </td>
   <td>D2
   </td>
  </tr>
  <tr>
   <td>SCL
   </td>
   <td>D1
   </td>
  </tr>
</table>




3. Soil Sensor

<table>
  <tr>
   <td>
Moisture Sensor
   </td>
   <td>ESP8266
   </td>
  </tr>
  <tr>
   <td>+
   </td>
   <td>3.3v
   </td>
  </tr>
  <tr>
   <td>-
   </td>
   <td>Ground
   </td>
  </tr>
  <tr>
   <td>out
   </td>
   <td>A0
   </td>
  </tr>
</table>



# 



3. Mobile app

    The mobile app can be used to control EnvObserver devices, and observe their data.


    Download link: [https://www.dropbox.com/s/zqzwfxzcfyp201t/app-debug.apk?dl=0](https://www.dropbox.com/s/zqzwfxzcfyp201t/app-debug.apk?dl=0) 


# 
    

4. References
*   [https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i](https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i)

<!-- Docs to Markdown version 1.0β22 -->
