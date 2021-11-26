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
let speechText;
let speechCon;
let continuous;
let interim;
let cnv;
let bird;
let back;
let moving = 0;
let start = false;


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
        if (pose.score >= .3) {
            if (speechText == "ready" && speechCon >= .05){
                start = true
            }
            
            
        }
        if (start ==  true){
            moving--;
            
            image(back, moving, 0, 6000, 480,);
        }
        
        
        if (moving == 5340) {
            speechRec.speak('YOU WIN!');
        }

        imageMode(CENTER);

        image(bird, pose.nose.x, pose.nose.y, 100, 100);

        imageMode(CORNER);

        
        

            textAlign(CENTER);
            fill(255);
            textSize(50)
            text(speechText, 0, 30, cnv.width);
        }
    }


