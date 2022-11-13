#include <esp_now.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include <Wire.h>

#define BUTTON_PIN 21

int currentState;

const char* ssid = "Tims iPhone";
const char* password = "1234567890";

const char* serverName1 = "***REMOVED***/nodes/node1.json";
const char* serverName2 = "***REMOVED***/nodes/node2.json";
const char* serverName3 = "***REMOVED***/nodes/node3.json";


int nodeNum = 1;
bool status = false;
// Define variables to store incoming readings
int incNodeNum;
bool incStatus;

// Variable to store if sending data was successful
String success;

//Structure example to send data
//Must match the receiver structure
typedef struct struct_message {
    int num;
    bool status;

} struct_message;

struct_message outgoingReadings;

struct_message incomingReadings;


esp_now_peer_info_t peerInfo;

// Callback when data is received
void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
  memcpy(&incomingReadings, incomingData, sizeof(incomingReadings));
  Serial.print("Bytes received: ");
  Serial.println(len);
  incNodeNum = incomingReadings.num;
  incStatus = incomingReadings.status;
  Serial.print("Incoming Node Number: ");
  Serial.println(incNodeNum);
  Serial.print("Incoming Status: ");
  Serial.println(incStatus);
  
  putToDB(incNodeNum, incStatus);
}

void putToDB(int number, bool status){
  if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;
    
      // Your Domain name with URL path or IP address with path
      if(number == 1){
        http.begin(serverName1);
      }else if (number == 2){
        http.begin(serverName2);
      }else{
        http.begin(serverName3);
      }
      
      
      // If you need Node-RED/server authentication, insert user and password below
      //http.setAuthorization("REPLACE_WITH_SERVER_USERNAME", "REPLACE_WITH_SERVER_PASSWORD");
 
      
      // If you need an HTTP request with a content type: application/json, use the following:
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode;
      if(status){
        httpResponseCode = http.PUT("{\"location\":\"your moms house\",\"status\":\"on fire\"}");
      }else{
        httpResponseCode = http.PUT("{\"location\":\"your moms house\",\"status\":\"not on fire\"}");
      }      
      

     
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
      http.begin("***REMOVED***");
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");
      http.setAuthorization("***REMOVED***", "***REMOVED***");
      // Data to send with HTTP POST
      httpResponseCode = http.POST("Body=There is a fire!&From=***REMOVED***&To=***REMOVED***");
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
}


void connectWIFI(){
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Wi-Fi Channel: ");
  Serial.println(WiFi.channel());
}
 
void setup() {
  // Init Serial Monitor
  Serial.begin(115200);
 
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);  

  connectWIFI();

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  // Register for a callback function that will be called when data is received
  esp_now_register_recv_cb(OnDataRecv);
}
 
void loop() {
  currentState = digitalRead(BUTTON_PIN);
  // if(currentState == LOW){
  //   putToDB(nodeNum,status);
  //   delay(500);
  // }
}
