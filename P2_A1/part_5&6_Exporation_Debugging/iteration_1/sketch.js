let osc;
let playing = false;
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let splitter;
let diameter0 = 0,
    diameter1 = 0,
    diameter2 = 0;
let wheel;
let honk = false;
let cnv;
let osc1, osc2, osc3;

function preload() {
    wheel = loadImage('assets/steeringwheel.jpeg');
}

function setup() {

    cnv = createCanvas(windowWidth, windowHeight);

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
osc2 = new p5.TriOsc();




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
    //console.log("currentString  ", currentString);            
    latestData = currentString;
    //console.log("latestData" + latestData);   
    splitter = split(latestData, ',');

    diameter0 = splitter[0];
    diameter1 = splitter[1];
    diameter2 = splitter[2];

    osc1.start();
    osc2.start();
}


function gotRawData(thedata) {
    println("gotRawData" + thedata);

}


function draw() {
    console.log(diameter2);
    background(255, 255, 255);
    textAlign(LEFT);
    textSize(10);
    fill(0);
    text(latestData, 10, 10);

    //changing the steering wheel position 
    let steering = (diameter1 / PI) / 6;
    textAlign(LEFT);
    textSize(10);
    fill(0);
    text(steering, 10, 40);

    translate(width / 2, height / 2);
    rotate(steering / PI);
    imageMode(CENTER);
    image(wheel, 0, 0, 500, 500);


    if (diameter2 == 0) {
        textAlign(CENTER);
        textSize(50);
        fill(0, 255, 0);
        text('ENGINE ON!', 0, 50);
        var freq2 = map(diameter2 * 1, width, 0, 100, 200);
        osc2.freq(freq2);
        osc2.amp(.2);
    } else {

        osc2.amp(0);
    }

    if (diameter0 == 1) { //changing a boolean based on the change of buttonstate
        honk = true;

    } else {
        honk = false
    }
    if (honk == true) { //deciding if the button is pressed or not and giving a freqency depending
        textAlign(CENTER);
        textSize(50);
        fill(255, 0, 0);
        text('HONK!', 0, 0);


        var freq = map(diameter0 * 1000, width, 0, 100, 880);
        osc1.freq(freq);
        osc1.amp(.5);

    } else {


        osc1.amp(0);
    }


}


function mouseClicked() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
        console.log("getAudioContext().state" + getAudioContext().state);
    }
};
