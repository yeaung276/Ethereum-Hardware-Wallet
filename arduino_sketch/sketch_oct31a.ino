#include <ethers.h>
#include <uECC.h>
#include <EEPROM.h>

uint8_t buf[32];
const unsigned int cmd1[] = {1,2,3};
//char data[] = {0,0};

uint8_t data[32];
uint8_t s_d[32];

int a = 0;
int i;

//uint8_t u_t_h[] = {214,96,140,59,240,14,85,155,72,176,27,134,98,77,197,61,142,234,162,255,63,48,244,8,40,53,255,92,42,179,25,199};
uint8_t signature[64];
//uint8_t pub_key[64] = {216, 210, 65, 27, 113, 93, 43, 57, 229, 55, 14, 10, 123, 194, 198, 68, 132, 29, 173, 85, 166, 16, 221, 128, 140, 219, 30, 16, 201, 124, 235, 100, 182, 217, 128, 152, 197, 8, 38, 165, 153, 133, 102, 117, 180, 178, 138, 184, 51, 138, 181, 220, 173, 183, 148, 155, 160, 225, 68, 74, 3, 208, 102, 232};
uint8_t priv_key[32] = {178, 88, 221, 140, 146, 73, 55, 130, 82, 238, 250, 34, 88, 109, 116, 172, 108, 157, 118, 99, 187, 157, 224, 50, 94, 152, 141, 82, 125, 89, 213, 75};
uECC_Curve curve;
void setup() { 

    Serial.begin(9600);
    pinMode(7,OUTPUT);

    readPrivKey();
//    for(int i = 0 ; i < 32;i++){
//      priv_key[i] = EEPROM.read(i);
//      }
    
//    i = 0;
//    while(Serial.available()>0){
//        data = Serial.read();
//        buf[a] = data;
//        a++;
//    }
//    for(int i = 0; i <= 1; i++){
//      Serial.println(buf[i]);
//    }

}
void loop(){
  unsigned int command;
  if(Serial.available() > 0){
    command = Serial.read();
    switch(command){
      case 1 : sign();
      break;
      case 2 : getAcc();
      break;
      }
    }

   

//  while(Serial.available()>0){
//        data = Serial.read();
//        buf[a] = data;
//        a++;
//    }
//  while(i<=1){
//    Serial.println(buf[i]);
//    i++;
//  }
  }
  void sign(){
    while(Serial.available() == 0);
    Serial.readBytes(data,32);
    delay(500);
   // Serial.write(data,32);
    if(ethers_sign(priv_key,data,signature)){digitalWrite(7,HIGH);delay(1000);digitalWrite(7,LOW);}
   uint8_t temp[4];
    for(int i = 0;i < 16;i++){
      for(int j = 0;j < 4;j++){
        temp[j] = signature[(i*4)+j];
      }
       Serial.write(temp,4); 
       delay(500);
      

  }}
  
  void getAcc(){
    while(Serial.available() == 0);
    Serial.readBytes(data,32);
    for(int i = 0;i < 32;i++){
      EEPROM.write(i,data[i]);
    }
//
//    for(int i = 0;i < 32;i++){
//     s_d[i] =  EEPROM.read(i);
//      }
//       uint8_t temp[4];
//    for(int i = 0;i < 8;i++){
//      for(int j = 0;j < 4;j++){
//        temp[j] = s_d[(i*4)+j];
//      }
//       Serial.write(temp,4); 
//       delay(1000);
//    }
    readPrivKey();
  }
  void readPrivKey(){
     for(int i = 0 ; i < 32;i++){
      priv_key[i] = EEPROM.read(i);
      }
    
    }
  
