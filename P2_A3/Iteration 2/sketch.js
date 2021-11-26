//Eric Ferguson
//IO&E
//Project 2
//Assignment 3
//Part 1
//11/1/21
let lang;
let speechRec;
let speechText;
let speechCon;
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
        speechCon = speechRec.resultConfidence;
        speechText = speechRec.resultString
        console.log(speechRec.resultConfidence);
    }
}

function draw() {
background(100,150,210);
    
    if (speechRec.resultValue) {
        clear();
        background(100,150,210);
    }  
    
    if(speechCon >= .50){
        if(speechText == 'green'){
            background(100,255,100);
        }
        else if(speechText == 'blue'){
            background(100,100,255);
        }
        else if(speechText == 'red'){
            background(255,100,100);
        }
    
        textAlign(CENTER);
        fill(255);
        textWrap(WORD);
        textSize(100)
        text(speechText, 0, 30, cnv.width);
        }
        
    
}
