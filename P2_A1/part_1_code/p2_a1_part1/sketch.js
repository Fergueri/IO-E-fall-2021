//Eric Ferguson
//IO&E
//Project 2
//Assignment 1
//Part 1
//11/1/21

//DESCRIPTION
//for this example I decided to combine the p5.Oscillator with the p5.Amplitude to create a Visualizer that works when clicking on the screen

//Code Reference
//https://www.youtube.com/watch?v=jEwAMgcCgOA
//https://p5js.org/reference/#/p5.Amplitude/getLevel

let osc, playing, freq, amp;
var volhistory = [];

function preload() {

}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator('triangle');
    amplitude = new p5.Amplitude();
  
}
function draw(){
    background(0);
    textAlign(CENTER, CENTER);
    
    freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
    amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
    
    
    
    
    let level =  amplitude.getLevel();
    
    volhistory.push(level);
    stroke(255);
    noFill();
    push();
    var currentY = map(level, 0, 1, height, 0);
    translate(0, height / 2 - currentY);
    
    beginShape();
        for (var i = 0; i < volhistory.length; i++) {
            var y = map(volhistory[i], 0, 1, height, 0);
            vertex(i, y);
        }
    endShape();
    pop();
    
    if (volhistory.length > width - 50) {
        volhistory.splice(0, 1);
    }
    stroke(255, 0, 0);
    line(volhistory.length, 0, volhistory.length, height);
    
    if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }


    
}

function playOscillator() {
    osc.start();
    playing = true;
}
function mouseReleased() {
  // ramp amplitude to 0 over 0.5 seconds
  osc.amp(0, 0.5);
  playing = false;
}