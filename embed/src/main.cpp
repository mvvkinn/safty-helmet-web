#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <PubSubClientTools.h>
#include <ArduinoJson.h>

#include <Adafruit_SSD1306.h>
#include <Adafruit_GFX.h>

#include <DHT.h>

#if CONFIG_FREERTOS_UNICORE
#define ARDUINO_RUNNING_CORE 0
#else
#define ARDUINO_RUNNING_CORE 1
#endif

// Setting Network
const char *wifi_ssid = "";
const char *wifi_passwd = "";
const char *mqtt_server = "";
const int mqtt_port = 1883;
const char *mqtt_user = "";
const char *mqtt_passwd = "";

WiFiClient ESPClient;
PubSubClient client(ESPClient);
PubSubClientTools mqtt(client); // Easier to use subscribe and callback

// Setting DHT11 temperature humidity
#define DHTPIN 23
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
float humid, temp;

// Setting photoresistor lightness detection
int photoresistor_pin = 34;
int photo_val = 0;

// Setting SW-420 shock detection
int shock_pin = 18;
bool shock_val = false;

// Setting HC-SR04 distance
int uw_trig_pin = 14;
int uw_echo_pin = 12;
long duration, distance;

// Setting LED
int led_red = 32;
int led_green = 33;
int led_blue = 25;
int led_front = 19;

float latitude = 37.58510543, longtitude = 126.92524348;

bool worker_danger = false;

// Setting OLED Display
#define OLED_ADDR 0x3c
Adafruit_SSD1306 display(-1); // -1 = no reset pin

// FreeRTOS multitask variable
// SemaphoreHandle_t xMutex;

// Callback from MQTT Message
void message_callback(String topic, String message){
  Serial.println("스마트안전모 > " + topic + " : " + message);

  if (topic == "helmet" && message == "Online"){
    display.clearDisplay();
    display.setTextColor(WHITE);
    display.setCursor(0, 16);
    display.println(message);
    display.display();
  }
}

// WiFi, Network connection
void network_conn(void *parameter){
  while (1) {
    // Connect to WiFi when not connected
    while (!client.connected() || WiFi.status() != WL_CONNECTED) {
      WiFi.begin(wifi_ssid, wifi_passwd);
      Serial.print("Connecting to WiFi");
      while(WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
      }
      Serial.println("\nConnected to WiFi");

      // Connect to MQTT when not connected
      client.setServer(mqtt_server, mqtt_port);
      Serial.print("Connecting to MQTT");
      while(!client.connected()) {
        Serial.print(".");
        if (client.connect("ESP32Client", mqtt_user, mqtt_passwd)){
          Serial.println("\nConnected to MQTT");

          mqtt.subscribe("helmet", message_callback);
        } else {
          Serial.print("Error > Failed with state ");
          Serial.println(client.state());
          delay(2000);
        }
      }
      mqtt.publish("helmet", "Online");
    }
    vTaskDelay(1000/portTICK_PERIOD_MS);
  }
}

// Convert data to JSON and publish
void dataToJson_publish(void *parameter){
  while(1){
    String json_data;

    StaticJsonDocument<256> doc;

    doc["helmet"] = "helmet1";

    JsonObject sensor = doc.createNestedObject("sensor");

    JsonArray sensor_gps = sensor.createNestedArray("gps"); // "sensor" : {"gps" : [latitude, longtitude]}
    sensor_gps.add(latitude);
    sensor_gps.add(longtitude);

    JsonArray sensor_dht = sensor.createNestedArray("dht"); // "sensor":  {"dht" : [humid, temp] }
    sensor_dht.add(humid);
    sensor_dht.add(temp);

    sensor["photoresitor"] = photo_val;
    sensor["distance"] = distance;

    sensor["shock"] = shock_val;

    doc["worker_danger"] = worker_danger;

    serializeJson(doc, json_data);

    mqtt.publish("helmet", json_data);

    vTaskDelay(1000/portTICK_PERIOD_MS);
  }
}

// Read temp humid from DHT11
void dhtState(void *parameter){
  while (1){
    humid = dht.readHumidity();
    temp = dht.readTemperature();
    if (isnan(humid) || isnan(temp)){
      humid = 255.0;
      temp = 255.0;
    }

    vTaskDelay(900/portTICK_PERIOD_MS);
  }
}

// Read lightness from photoresistor
void photoresistor(void *parameter){
  while (1) {
    photo_val = analogRead(photoresistor_pin);

    vTaskDelay(600/portTICK_PERIOD_MS);
  }
}

// Read shock from SW-240
void shock(void *parameter){
  while(1){
    int count = 0;
    if (digitalRead(shock_pin) == HIGH){
      shock_val = true;
    } else {
      shock_val = false;
    }

    vTaskDelay(800/portTICK_PERIOD_MS);
  }
}

// Read distance from HC-SR04 
void uw_distance(void *parameter){
  while (1){
    digitalWrite(uw_trig_pin, LOW);       
    delayMicroseconds(2);
    digitalWrite(uw_trig_pin, HIGH);   
    delayMicroseconds(10);
    digitalWrite(uw_trig_pin, LOW);

    duration = pulseIn(uw_echo_pin, HIGH);
    distance = duration / 29.1 / 2;

    vTaskDelay(100/portTICK_PERIOD_MS);
  }
}

// RGB led
void rgb(bool red, bool green, bool blue){
  digitalWrite(led_red, red);
  digitalWrite(led_green, green);
  digitalWrite(led_blue, blue);
}

// Change bool worker_danger to true when shock detected
void worker_situation(void *parameter){
  while(1){
    // change to worker_danger = shock && gyro_shock
    // gyro_shock == if there is no changes after shock
    if (shock_val == true){
      // this informs admin worker is in danger
      worker_danger = true;
    } // add distance, and more 
  }
}

int i = 0;

void setup(){
  Serial.begin(115200);

  pinMode(led_red, OUTPUT);
  pinMode(led_green, OUTPUT);
  pinMode(led_blue, OUTPUT);

  pinMode(shock_pin, INPUT);

  pinMode(uw_trig_pin, OUTPUT);
  pinMode(uw_echo_pin, INPUT);

  // setup OLED Display
  display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR);
  display.clearDisplay();
  display.display();

  // task function, process name, stack size, parameter of task, priority of task, task handle, core number
  /*
  xTaskCreatePinnedToCore(network_conn, "network_conn",4000, NULL, 10, NULL, ARDUINO_RUNNING_CORE);
  xTaskCreatePinnedToCore(photoresistor, "phtoresistor", 4000, NULL, 10, NULL, ARDUINO_RUNNING_CORE);
  xTaskCreatePinnedToCore(dhtState, "dhtState", 4000, NULL, 10, NULL, ARDUINO_RUNNING_CORE);
  */

  xTaskCreate(network_conn, "network_conn", 4000, NULL, 10, NULL);
  xTaskCreate(photoresistor, "photoresistor", 4000, NULL, 10, NULL);
  xTaskCreate(dhtState, "dhtState", 4000, NULL, 10, NULL);
  xTaskCreate(shock, "shock", 4000, NULL, 10, NULL);
  xTaskCreate(uw_distance, "uw_distance", 4000, NULL, 10, NULL);
  xTaskCreate(dataToJson_publish, "dataToJson_Publish", 4000, NULL, 10, NULL);
}

void loop(){
  client.loop();
  if (i < 1)
  {
    Serial.print("loop is running on core : ");
    Serial.println(xPortGetCoreID());
    i++;
  }
}
