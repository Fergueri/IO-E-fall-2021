/* 
August 2019 - Doug Whitton 
play 3 analog sensors that output sound and circle graphic
The Arduino file that's running is "threeSensorExample"
*/

let osc;
let playing = false;
let serial;
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas
let splitter;
let diameter0 = 0, diameter1 = 0, diameter2 = 0;

let osc1, osc2, osc3, fft;

function setup() {
  
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort();

  serial.list();
  console.log("serial.list()   ", serial.list());

  serial.open("COM3");

  serial.on('connected', serverConnected);

  
  serial.on('list', gotList);
  
  serial.on('data', gotData);
  
  serial.on('error', gotError);

  serial.on('open', gotOpen);
 
}



osc1 = new p5.TriOsc();
osc1.amp(.5);
osc2 = new p5.TriOsc(); 
osc2.amp(.5);  
osc3 = new p5.TriOsc(); 
osc3.amp(.5);    

fft = new p5.FFT();
osc1.start();
osc2.start(); 
osc3.start();


function serverConnected() {
  console.log("Connected to Server");
}


function gotList(thelist) {
  console.log("List of Serial Ports:");
 
  for (var i = 0; i < thelist.length; i++) {
    
    console.log(i + " " + thelist[i]);
  }
}


function gotOpen() {
  console.log("Serial Port is Open");
}


function gotError(theerror) {
  console.log(theerror);
}


function gotData() {
  var currentString = serial.readLine();  
  trim(currentString);                    
  if (!currentString) return;             
  console.log("currentString  ", currentString);            
  latestData = currentString;            
  console.log("latestData" + latestData);   
  splitter = split(latestData, ',');       
  
  diameter0 = splitter[0];                
  diameter1 = splitter[1];
  diameter2 = splitter[2]; 



}


function gotRawData(thedata) {
  println("gotRawData" + thedata);
}


function draw() {
  
  background(255,255,255);
  text(latestData, 10,10);
  ellipseMode(RADIUS);    
  fill(255,0,0);
  noStroke(); 
  //console.log("diameter0  "  + diameter0);
  ellipse(100, 100, diameter0*100, diameter0*100);
  ellipseMode(RADIUS);    
  fill(0,255,0);
  ellipse(200, 100, diameter1, diameter1);
  ellipseMode(RADIUS);
  fill(0,0,255);
  ellipse(300, 100, diameter2, diameter2);
    
  
  var freq = map(diameter0, 0, width, 40, 880);    
    osc1.freq(freq);
    //console.log(freq);
    
  var freq2 = map(diameter1, 0, width, 40, 880);    
    osc2.freq(freq2);
    //console.log(freq2);
    
 var freq3 = map(diameter2*10, 0, width, 40, 880);    
    osc3.freq(freq3);
    //console.log(freq3); 
}


function mouseClicked(){
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    console.log("getAudioContext().state" + getAudioContext().state);
  }
  };
  


  

 