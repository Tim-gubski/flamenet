#include <esp_now.h>
#include <esp_wifi.h>
#include <WiFi.h>

#include <Wire.h>

#define BUTTON_PIN 21

// REPLACE WITH THE MAC Address of your receiver 
// uint8_t broadcastAddress[] = {0xC8, 0xF0, 0x9E, 0x9F, 0x6F, 0xA0}; // enable for board node 3
uint8_t broadcastAddress[] = {0xC8, 0xF0, 0x9E, 0x9F, 0x72, 0xEC}; // enable for node 2.

int currentState;

int nodeNum = 2;
bool status = false;
// Define variables to store incoming readings
int incNodeNum;
bool incStatus;

constexpr char WIFI_SSID[] = "Tims iPhone";

int32_t getWiFiChannel(const char *ssid) {
  if (int32_t n = WiFi.scanNetworks()) {
      for (uint8_t i=0; i<n; i++) {
          if (!strcmp(ssid, WiFi.SSID(i).c_str())) {
              return WiFi.channel(i);
          }
      }
  }
  return 0;
}

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

// Callback when data is sent
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
  Serial.print("\r\nLast Packet Send Status:\t");
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
  if (status ==0){
    success = "Delivery Success :)";
  }
  else{
    success = "Delivery Fail :(";
  }
}

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

  outgoingReadings.num = incNodeNum;
  outgoingReadings.status = incStatus;

  // Relay information to next node
  esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &outgoingReadings, sizeof(outgoingReadings));
  if (result == ESP_OK) {
    Serial.println("Sent with success");
  }
  else {
    Serial.println("Error sending the data");
  }
}
 
void setup() {
  // Init Serial Monitor
  Serial.begin(115200);
 
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  // Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  int32_t channel = getWiFiChannel(WIFI_SSID);

  WiFi.printDiag(Serial); // Uncomment to verify channel number before
  esp_wifi_set_promiscuous(true);
  esp_wifi_set_channel(channel, WIFI_SECOND_CHAN_NONE);
  esp_wifi_set_promiscuous(false);
  WiFi.printDiag(Serial); // Uncomment to verify channel change after

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  // Once ESPNow is successfully Init, we will register for Send CB to
  // get the status of Trasnmitted packet
  esp_now_register_send_cb(OnDataSent);
  
  // Register peer
  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;  
  peerInfo.encrypt = false;
  
  // Add peer        
  if (esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer");
    return;
  }
  // Register for a callback function that will be called when data is received
  esp_now_register_recv_cb(OnDataRecv);
}
 
void loop() {
  currentState = digitalRead(BUTTON_PIN);
  if(currentState == LOW){
    status = !status;
  
    // Set values to send
    outgoingReadings.num = nodeNum;
    outgoingReadings.status = status;

    // Send message via ESP-NOW
    esp_err_t result = esp_now_send(broadcastAddress, (uint8_t *) &outgoingReadings, sizeof(outgoingReadings));
    
    if (result == ESP_OK) {
      Serial.println("Sent with success");
    }
    else {
      Serial.println("Error sending the data");
    }
    delay(1000);
  }
}
