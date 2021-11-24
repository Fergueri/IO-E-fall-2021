let video;
let poseNet;
let pose;
let skeleton;
let bird;
let buildings;
let moving = 0;
let pNoseX, pNoseY;

let gravity = 0.6;

function preload() {
    bird = loadImage("assets/bird.png");
    buildings = loadImage("assets/buldings.png");

}


function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);


    pixelDensity(1);
  pg = createGraphics(width, height);
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
        let noseX = pose.nose.x;
        let noseY = pose.nose.y;
        let wristRx = pose.rightWrist.x;
        let wristRy = pose.rightWrist.y;
        pNoseX = noseX;
        pNoseY = noseY;
        strokeWeight(0);
        fill(255);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 35);
        
        if (pose.score >= .3) {
            moving = moving - 1;

            image(buildings, moving, 0, 2100, 700);



        if (wristRy <= 200) {
                gravity = gravity + 5;
                let pNoseYGrav = pNoseY + gravity;
                if (pNoseYGrav >= 480){
                    pNoseYGrav = pose.nose.y;
                    gravity = 5;
                    pNoseYGrav = pNoseY + gravity;
                    pg.clear();
                }
                pg.noStroke();
                pg.fill(255,255,255);
                pg.ellipse(pNoseX, pNoseYGrav, 40, 40);
                image(pg,0,0,width,height);
                
        }
        else{
            pg.clear();
            pNoseYGrav = pose.nose.y;
        }
        }
        else{
            pg.clear();
        }
        
        if (moving <= -1400) {
            moving = 0;
        }

        imageMode(CENTER);

        image(bird, pNoseX, pNoseY, 100, 100);

        imageMode(CORNER);



        //                           let eyeR = pose.rightEye;
        //                           let eyeL = pose.leftEye;
        //                           let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        //        imageMode(CENTER);
        //        strokeWeight(0);
        //        fill(255);
        //        ellipse(pose.rightWrist.x, pose.rightWrist.y, 35);
        //        ellipse(pose.leftWrist.x, pose.leftWrist.y, 35);
        //        image(dstrange, pose.rightWrist.x, pose.rightWrist.y, 200, 200);
        //
        //        image(dstrange, pose.leftWrist.x, pose.leftWrist.y, 200, 200);
        //
        //
        //
        //                for (let i = 0; i < pose.keypoints.length; i++) {
        //                    let x = pose.keypoints[i].position.x;
        //                    let y = pose.keypoints[i].position.y;
        //                    
        //                    strokeWeight(0);
        //                    fill(255);
        //                    ellipse(x, y, 16, 16);
        //                }
        //        
        //                for (let i = 0; i < skeleton.length; i++) {
        //                    let a = skeleton[i][0];
        //                    let b = skeleton[i][1];
        //                    strokeWeight(5);
        //                    stroke(255);
        //                    line(a.position.x, a.position.y, b.position.x, b.position.y);
        //                }
        //    }
    }
}
