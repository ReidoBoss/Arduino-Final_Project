#include <Servo.h>
#include <Keypad.h>

Servo myServo;  // Create a servo object to control a servo
const byte ROWS = 4; // Four rows
const byte COLS = 4; // Four columns
char keys[ROWS][COLS] = {
  {'1','2','3','A'},
  {'4','5','6','B'},
  {'7','8','9','C'},
  {'*','0','#','D'}
};
byte rowPins[ROWS] = {9, 8, 7, 6}; // Connect keypad ROW0, ROW1, ROW2 and ROW3 to these Arduino pins.
byte colPins[COLS] = {5, 4, 3, 2}; // Connect keypad COL0, COL1, COL2 and COL3 to these Arduino pins.
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

const String PASSWORD = "1234"; // Change to your desired password
const int MAX_TRIES = 3; // Maximum number of password attempts allowed
int tries = 0; // Number of password attempts made
const int buzzerPin = 10; // Connect the buzzer to this Arduino pin
const int ledPin = 11; // Change this to the pin number you've connected your LED to

void setup() {
    Serial.begin(115200); // Begin serial communication at 115200 baud rate
    myServo.attach(13);  // Attach the servo to pin 9
    pinMode(buzzerPin, OUTPUT); // Set the buzzer pin as an output
    pinMode(ledPin, OUTPUT); // Set the LED pin as an output

}

void loop() {
    if (Serial.available() > 0) {
        String data = Serial.readStringUntil('\n'); 
        
        if (data.equalsIgnoreCase("lock")) {
            playBuzzer(1000);
            myServo.write(0);
        }
        else if (data.equalsIgnoreCase("open")) {
            playBuzzer(1000);
            myServo.write(180);
        }
        else if (data.equalsIgnoreCase("on")) {
            digitalWrite(ledPin, HIGH);
        }
        else if (data.equalsIgnoreCase("off")) {
            digitalWrite(ledPin, LOW);
        }

    }
    epMode();
}





void playBuzzer(int duration) {
    tone(buzzerPin, 1000); // Play a tone of 1000Hz on the buzzer pin
    delay(duration); // Wait for the specified duration
    noTone(buzzerPin); // Turn off the buzzer
}

void epMode(){
  char key = keypad.getKey();
  
  if (key != NO_KEY) {
    static String enteredPassword = ""; // Variable to store entered password
    
    if (key == 'A') {
      playBuzzer(200);
      Serial.println("Letter-A pressed"); // Print the key pressed
    }
    else if (key == 'B') {
      playBuzzer(200);
      Serial.println("Letter-B pressed"); // Print the key pressed
    }
    else if (key == 'C') {
      playBuzzer(200);
      Serial.println("Letter-C pressed"); // Print the key pressed
    }
    else if (key == 'D') {
      playBuzzer(200);
      Serial.println("Letter-D pressed"); // Print the key pressed
    }
    else if (key != '#') {
      playBuzzer(100);
      enteredPassword += key; // Append key to entered password
      Serial.println(enteredPassword); // Print the key pressed
    }


     else {
      // Check if entered password matches predefined password
      if (enteredPassword == PASSWORD) {
        playBuzzer(200);
        delay(100);
        playBuzzer(100);
        myServo.write(180);
        Serial.println("Correct!");
        delay(1000);
        Serial.println("Welcome to MRS - Final Project");
        delay(2000);
        delay(4000); // delay before closing again
        Serial.println("");        
        myServo.write(0);
        tries = 0; // Reset the number of attempts
      } else {
        playBuzzer(1000);
        tries++; // Increment the number of attempts
        Serial.print("Attempts remaining: ");
        Serial.println(MAX_TRIES - tries);
        delay(2000);
        if (tries < MAX_TRIES) {
          Serial.println("Enter Pass Again");
        } else {
          Serial.println("Max reached");
          delay(3000);
          Serial.println("Contact Owner/State your purpose"); 
          delay(2000);
          Serial.println("CHOOSE LETTER A - B - C - D"); 
          delay(2000);
          Serial.println("A: SHOPEE DELIVERY"); 
          delay(2000);
          Serial.println("B: Maningils Utang"); 
          delay(2000);
          Serial.println("C: Naabot na ko"); 
          delay(2000);
          Serial.println("D: Doorbell"); 
          tries = 0; // for trying
        }
      }
      // Clear entered password for next input
      enteredPassword = "";
    }
  }

}
