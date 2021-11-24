let video;
let poseNet;
let pose;
let skeleton;
let dstrange;
let activate = false;
let brain;
let poseCon;
let poseLabel;
let state = 'waiting';
let targetLabel;

function preload() {
    dstrange = loadImage("assets/doctorstrange.png");

}

function keyPressed() {
    if (key == 's') {
        brain.saveData();
    }
    targetLabel = key;
    console.log(targetLabel);
    setTimeout(function () {
        console.log('collecting');
        state = 'collecting';
        setTimeout(function () {
            console.log('not collecting');
            state = 'waiting';
        }, 10000);

    }, 10000);
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);


    let options = {
        inputs: 34,
        outputs: 4,
        task: 'classification',
        debug: true
    }
    brain = ml5.neuralNetwork(options);
    const modelInfo = {
        model: 'model/model.json',
        metadata: 'model/model_meta.json',
        weights: 'model/model.weights.bin'
    }
    brain.load(modelInfo, brainLoaded);
}

function modelReady() {
    console.log("model ready!");
}

function brainLoaded() {
    console.log('pose classifiction ready!');
    classifyPose();

}

function classifyPose() {
    if (pose) {
        let inputs = [];
        for (let i = 0; i < pose.keypoints.length; i++) {
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;
            inputs.push(x);
            inputs.push(y);
        }
        brain.classify(inputs, gotResult);
    } else {
        setTimeout(classifyPose, 100);
    }
}

function gotResult(error, results) {
    poseCon = results[0].confidence;
    poseLabel = results[0].label;
    if (poseLabel != 'd') {
        console.log(results[0].label);
    }


    classifyPose();
}

function dataReady() {
    brain.normalizeData();
    brain.train({
        epochs: 50
    }, finished);

}

function finished() {
    console.log('model trained');
    brain.save();
}

function gotPoses(poses) {
    //console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;

        if (state == 'collecting') {
            let inputs = [];
            for (let i = 0; i < pose.keypoints.length; i++) {
                let x = pose.keypoints[i].position.x;
                let y = pose.keypoints[i].position.y;
                inputs.push(x);
                inputs.push(y);


            }
            let target = [targetLabel];

            brain.addData(inputs, target);
        }
    }
}

function modelLoaded() {
    console.log('poseNet ready');
}

function draw() {
    imageMode(CORNER);
    image(video, 0, 0);

    if (pose) {

        //                let eyeR = pose.rightEye;
        //                let eyeL = pose.leftEye;
        //                let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        //
        //                        strokeWeight(0);
        //                        fill(255, 0, 0);
        //                        ellipse(pose.nose.x, pose.nose.y, d);

        if (poseLabel == 'f' && poseCon >= .95) {
            activate = true;
        }
        imageMode(CENTER);
        //        strokeWeight(0);
        //        fill(255);
        //        ellipse(pose.rightWrist.x, pose.rightWrist.y, 35);
        //        ellipse(pose.leftWrist.x, pose.leftWrist.y, 35);
        if (activate == true) {
            image(dstrange, pose.rightWrist.x, pose.rightWrist.y, 200, 200);

            image(dstrange, pose.leftWrist.x, pose.leftWrist.y, 200, 200);
            
            setTimeout(function (){
                if (poseLabel == 'f' && poseCon >= .90) {
                    activate = false;
                    setTimeout(function (){},1000);
                }
            }, 5000);

        }


        //        for (let i = 0; i < pose.keypoints.length; i++) {
        //            let x = pose.keypoints[i].position.x;
        //            let y = pose.keypoints[i].position.y;
        //
        //            strokeWeight(0);
        //            fill(255);
        //            ellipse(x, y, 16, 16);
        //        }
        //
        //        for (let i = 0; i < skeleton.length; i++) {
        //            let a = skeleton[i][0];
        //            let b = skeleton[i][1];
        //            strokeWeight(5);
        //            stroke(255);
        //            line(a.position.x, a.position.y, b.position.x, b.position.y);
        //        }
    }
}
