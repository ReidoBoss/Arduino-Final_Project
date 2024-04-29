//LCD I2C DEPENDENCIES
#include <Wire.h>  
#include <LiquidCrystal_I2C.h>  

#define I2C_ADDR    0x27  
#define LCD_COLS    16
#define LCD_ROWS    2

LiquidCrystal_I2C lcd(I2C_ADDR, LCD_COLS, LCD_ROWS);

// WEBSOCKET DEPENDENCIES
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <AsyncWebSocket.h>

const char* ssid = "S A G A R I N O";
const char* password = "741895623";

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Wire.begin();
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  ws.onEvent(onWsEvent);
  server.addHandler(&ws);
  server.begin();

  lcd.init();
  lcd.backlight();
  lcd.clear();
}

void loop() {
  ws.cleanupClients(); 
  // if (Serial.available() > 0) {
  //   String data = Serial.readStringUntil('\n');
  //   ws.textAll(data);
  // }
  epMode();
  delay(50); 
}

void onWsEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
    String stringData((char*)data);

    switch (type) {
        case WS_EVT_CONNECT:
            Serial.println("WebSocket client connected");
            break;
        case WS_EVT_DISCONNECT:
            Serial.println("WebSocket client disconnected");
            break;
        case WS_EVT_DATA:
            Serial.println("WebSocket data received");

            // Initialize stringData within the case block

            // Convert data to String and pass to lcdMessage()
            lcdMessage(stringData);

            // Perform string comparisons
            if (stringData.equalsIgnoreCase("lock") || stringData.equalsIgnoreCase("open") || stringData.equalsIgnoreCase("off") || stringData.equalsIgnoreCase("on")) {
                Serial.write(data, len);
                if (stringData.equalsIgnoreCase("lock")) {
                    lcdMessage("Door Locked");
                } else if (stringData.equalsIgnoreCase("off") || stringData.equalsIgnoreCase("on")) {
                    lcdMessage("Enter Password");
                } else if (stringData.equalsIgnoreCase("open")) {
                    lcdMessage("Welcome");
            
                }
            }
            break;
        case WS_EVT_ERROR:
            Serial.println("WebSocket error");
            break;
    }
}





void lcdMessage(String text) {
  int length = text.length();
  int lines = length / LCD_COLS + 1; // Calculate number of lines needed
  lcd.clear();
  // Display text line by line with word wrap
  for (int i = 0; i < lines; i++) {
    String line = text.substring(i * LCD_COLS, min((i + 1) * LCD_COLS, length));
    lcd.setCursor(0, i);
    lcd.print(line);
  }
}

void epMode() {
  char lastSerialMessage[100]; // Character array to store the last received message
  int index = 0; // Index to track the position in the character array
  while (Serial.available() > 0) {
    char receivedChar = Serial.read();
    if (receivedChar != '\n') { // Check if the received character is not a line break
      lastSerialMessage[index++] = receivedChar; // Add the received character to the character array
    }
    lastSerialMessage[index] = '\0'; // Null-terminate the character array
  }

  // Check if the character array contains the substring "max"
  if (strstr(lastSerialMessage, "Max") != NULL) {
    ws.textAll("Max is Reached!");
  }


  // Display the last received message after filtering out line breaks
  if (lastSerialMessage[0] != '\0') { // Check if the character array is not empty
    Serial.println(lastSerialMessage);
    lcd.clear();
    wordWrap(lastSerialMessage);
  }

  if (strstr(lastSerialMessage, "Letter-A") != NULL) {
    ws.textAll("Letter A Pressed!");
  }
  else if (strstr(lastSerialMessage, "Letter-B") != NULL) {
    ws.textAll("Letter B Pressed!");
  }
  else if (strstr(lastSerialMessage, "Letter-C") != NULL) {
    ws.textAll("Letter C Pressed!");
  }
  else if (strstr(lastSerialMessage, "Letter-D") != NULL) {
    ws.textAll("Letter D Pressed!");
  }    
}





void wordWrap(String text) {
  int length = text.length();
  int lines = length / LCD_COLS + 1; // Calculate number of lines needed
  
  // Display text line by line with word wrap
  for (int i = 0; i < lines; i++) {
    String line = text.substring(i * LCD_COLS, min((i + 1) * LCD_COLS, length));
    lcd.setCursor(0, i);
    lcd.print(line);
  }
}
