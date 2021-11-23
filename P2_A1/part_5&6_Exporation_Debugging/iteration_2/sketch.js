let osc;
let playing = false;
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let splitter;
let sensor0 = 0,
    sensor1 = 0,
    sensor2 = 0;
let song;
let record
let cnv;
let volumeS;
let osc1, osc2, osc3;
let rotation = 0;
let toggle;

function preload() {

    song = createAudio('assets/takeOnMe.mp3')
    record = loadImage('assets/record.png')
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

    sensor0 = splitter[0];
    sensor1 = splitter[1];
    sensor2 = splitter[2];


}


function gotRawData(thedata) {
    println("gotRawData" + thedata);

}


function draw() {
    background(255, 255, 255);
    text(latestData, 10, 10);
    
    let speed = map(sensor1, 1, height, 0, 2);
    
    
    
    push();
    translate(width / 2, height / 2);
    rotate(rotation * 0.01);
    imageMode(CENTER);
    image(record, 0,0,500, 500);
    
    if (sensor0 == 1) {
        song.play();
        rotation = rotation + 1 + (5 * speed);
    } else {
        song.pause();
    }

    speed = constrain(speed, 1, 2);
    song.speed(speed);


    volumeS = (sensor2 / 2) * 0.1;
    song.volume(volumeS);





}
