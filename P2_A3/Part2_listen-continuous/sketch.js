//Eric Ferguson
//IO&E
//Project 2
//Assignment 3
//Part 1
//11/1/21
let lang;
let speechRec;
let continuous;
let interim;

function setup() {
    noCanvas();
    lang = navigator.language || 'en-US';
    speechRec = new p5.SpeechRec(lang, gotSpeech);
    
    continuous = true;
    interim = true;
    
    speechRec.start(continuous, interim);
}


function gotSpeech() {
    if (speechRec.resultValue) {
        createP(speechRec.resultString);
    }
}
