//Eric Ferguson
//IO&E
//Project 2
//Assignment 3
//Part 1
//11/1/21
let lang;
let speechRec;
let speechText;
let continuous;
let interim;
let cnv;

function setup() {
    cnv = createCanvas(620, 480);
    lang = navigator.language || 'en-US';
    speechRec = new p5.SpeechRec(lang, gotSpeech);

    continuous = true;
    interim = true;

    speechRec.start(continuous, interim);
}


function gotSpeech() {
    if (speechRec.resultValue) {
        console.log(speechRec);
        speechText = speechRec.resultString
    }
}

function draw() {
background(100,150,210);
    
    if (speechRec.resultValue) {
        clear();
        background(100,150,210);
    }  
        textAlign(CENTER);
        fill(255);
        textWrap(WORD);
        textSize(100)
        text(speechText, 0, 30, cnv.width);
        
        
    
}
