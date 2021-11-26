//Eric Ferguson
//IO&E
//Project 2
//Assignment 3
//Part 1
//11/1/21
let lang;
let video;
let poseNet;
let pose;
let skeleton;
let speechRec;
let speechText = '';
let speechCon;
let continuous;
let interim;
let cnv;
let bird;
let back;
let moving = 0;
let start = false;
let speak;


function preload() {
    bird = loadImage("assets/bird.png");
    back = loadImage("assets/backgroundthin.png");

}

function setup() {
    cnv = createCanvas(620, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    lang = navigator.language || 'en-AU';
    speechRec = new p5.SpeechRec(lang, gotSpeech);

    speak = new p5.Speech(lang, voiceReady);
    

    continuous = true;
    interim = true;

    speechRec.start(continuous, interim);
}

function voiceReady() {
    speak.interrupt = false;
    
}

function gotSpeech() {

    if (speechRec.resultValue) {
        console.log(speechRec);
        speechCon = speechRec.resultConfidence;
        speechText = speechRec.resultString;
        console.log(speechRec.resultConfidence);
    }
}

function gotPoses(poses) {
    //console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }

}

function modelLoaded() {
    console.log('poseNet ready');
}



function draw() {
    imageMode(CORNER);
    
    image(video, 0, 0);

    if (pose) {

        if (speechText == '') {
            fill(255, 100, 100);
            text('SAY "START" TO START', 0, 30, cnv.width);
        }

        fill(255);

        if (pose.score >= .3 && speechText == "start" && speechCon >= .5 && start == false) {
            speak.speak('starting');
            start = true;



        } else if (pose.score < .2) {
            fill(100, 255, 100);
            start = false;
            text('OUT OF BOUNDS', 0, 80, cnv.width);
        }
        fill(255);
        if (start == true) {
             
            image(back, moving, 0, 6000, 480, );
            text(speechText, 0, 30, cnv.width);
            moving--;
        }

        if (speechText == "pause" && speechCon >= .5) {
            start = false;
            speak.speak('pause');
            
            speechText = "PAUSED";
        }
     if (speechText == "continue" && speechCon >= .5){
            start = true;
            speak.speak('continue');
            speechText = "CONTINUE";
           }
        
        if(speechText == "PAUSED"){
            image(back, moving, 0, 6000, 480, );
            text('PAUSED', 0, 30, cnv.width);
           }
        
        
        if (moving >= 5340) {
            start = false;
            speak.speak('YOU WIN!');
            text('YOU WIN', 0, 30, cnv.width);
        }

        imageMode(CENTER);
        image(bird, pose.nose.x, pose.nose.y, 70, 70);
        imageMode(CORNER);




        textAlign(CENTER);

        textSize(50)

    }
}
