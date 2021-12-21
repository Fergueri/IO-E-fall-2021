// Eric Ferguson
// Project 4
// Fall 2021

var video;
var poseNet;
var pose;
var canvas;

var leftArm, rightArm, leftUpperArm, rightUpperArm, 
    leftFem, rightFem, leftLeg, rightLeg, 
    pelvis, body;

var skull;

//var rWx,rWy,rEx,rEy,
//    rSx,rSy,lWx,lWy,
//    lEx,lEy,lSx,lSy,
//    rAx,rAy,rKx,rKy,
//    rHx,rHy,lAx,lAy,
//    lKx,lKy,lHx,lHy,
//    nX,nY;

var stableRWX = 0, stableRWY = 0, stableREX = 0, stableREY = 0,
    stableRSX = 0, stableRSY = 0, stableLWX = 0, stableLWY = 0,
    stableLEX = 0, stableLEY = 0, stableLSX = 0, stableLSY = 0,
    stableRAX = 0, stableRAY = 0, stableRKX = 0, stableRKY = 0, 
    stableRHX = 0, stableRHY = 0, stableLAX = 0, stableLAY = 0, 
    stableLKX = 0, stableLKY = 0, stableLHX = 0, stableLHY = 0, 
    stableNX = 0, stableNY = 0;

var midRArmX,midRArmY,midRUpperArmX,midRUpperArmY,
    midLArmX,midLArmY,midLUpperArmX,midLUpperArmY,
    midRLegX,midRLegY,midRFemX,midRFemY,
    midLLegX,midLLegY,midLFemX,midLFemY,
    midCollarX,midCollarY,midPelvisX,
    midPelvisY,midBodyX,midBodyY;

var disRArm,disRUPArm,disLArm,disLUPArm,
    disRLeg,disRFem,disLLeg,disLFem,
    disPelvis,disBody;

var RArmAngle, RUPArmAngle, LArnAngle, LUPArmAngle,
    RLegAngle, RFemAngle, LLegAngle, LFemAngle,
    PelvisAngle, BodyAngle;

preload = () => {
    //preloads the images used
    //skull difference
    skull = loadImage("_img/skullForward.svg");
    leftArm = loadImage("_img/leftArm.svg");
    leftUpperArm = loadImage("_img/leftUpperArm.svg");
    leftFem = loadImage("_img/leftFem.svg");
    leftLeg = loadImage("_img/leftLeg.svg");
    rightArm = loadImage("_img/rightArm.svg");
    rightUpperArm = loadImage("_img/rightUpperArm.svg");
    rightLeg = loadImage("_img/rightLeg.svg");
    rightUpperLeg = loadImage("_img/rightFem.svg");
    pelvis = loadImage("_img/Pelvis.svg");
    body = loadImage("_img/body.svg");
    
}
setup = () => {
    canvas = createCanvas(1280, 920); // creates canvas
    
    // sets the constraints for the webcam
    
    video = createCapture(VIDEO); //creates the webcam
    video.hide(); //hides the webcam
    video.size(1280,920);
    //initializes posenet with the capture and loads the poseNet model
    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on('pose', gotPoses);


}

 gotPoses = (poses) => {
  if (poses.length > 0) {
    pose = poses[0].pose;

  }
}

 modelLoaded = () => {
  console.log('poseNet ready');
}
 
draw = () => {
    
    if(pose){
    //background(0);
        
    imageMode(CORNER);
    image(video, 0, 0,1280,920);
    
    var rWx = pose.rightWrist.x; //gets x of right wrist
    //console.log(rWx);
    var rWy = pose.rightWrist.y; //gets y of right wrist
    var rEx = pose.rightElbow.x; //gets x of right elbow
    var rEy = pose.rightElbow.y; //gets y of right elbow
    var rSx = pose.rightShoulder.x; //gets y of right elbow
    var rSy = pose.rightShoulder.y; //gets y of right elbow
    
    var lWx = pose.leftWrist.x; //gets x of left wrist
    var lWy = pose.leftWrist.y; //gets y of left wrist
    var lEx = pose.leftElbow.x; //gets x of left elbow
    var lEy = pose.leftElbow.y; //gets y of left elbow
    var lSx = pose.leftShoulder.x; //gets x of left shoulder
    var lSy = pose.leftShoulder.y; //gets y of left elbow
    
    var rAx = pose.rightAnkle.x; //gets x of right ankle
    var rAy = pose.rightAnkle.y; //gets y of right ankle
    var rKx = pose.rightKnee.x; //gets x of right Knee
    var rKy = pose.rightKnee.y; //gets y of right Knee
    var rHx = pose.rightHip.x; //gets x of right Hip
    var rHy = pose.rightHip.y; //gets y of right Hip
    
    var lAx = pose.leftAnkle.x; //gets x of left ankle
    var lAy = pose.leftAnkle.y; //gets y of left ankle
    var lKx = pose.leftKnee.x; //gets x of left Knee
    var lKy = pose.leftKnee.y; //gets y of left Knee
    var lHx = pose.leftHip.x; //gets x of left Hip
    var lHy = pose.leftHip.y; //gets y of left Hip
    
    var nX = pose.nose.x; //gets x of nose
    var nY = pose.nose.y; //gets y of nose
    
    
    //lerps each coordinate to help sturdy the points
        stableRWX = lerp(stableRWX,rWx,0.5);
        console.log(stableRWX);
        stableRWY = lerp(stableRWY,rWy,0.5); 
        stableREX = lerp(stableREX,rEx,0.2); 
        stableREY = lerp(stableREY,rEy,0.2); 
        stableRSX = lerp(stableRSX,rSx,0.2); 
        stableRSY = lerp(stableRSY,rSy,0.2); 
    
        stableLWX = lerp(stableLWX,lWx,0.2); 
        stableLWY = lerp(stableLWY,lWy,0.2); 
        stableLEX = lerp(stableLEX,lEx,0.2); 
        stableLEY = lerp(stableLEY,lEy,0.2); 
        stableLSX = lerp(stableLSX,lSx,0.2); 
        stableLSY = lerp(stableLSY,lSy,0.2); 
    
        stableRAX = lerp(stableRAX,rAx,0.2); 
        stableRAY = lerp(stableRAY,rAy,0.2); 
        stableRKX = lerp(stableRKX,rKx,0.2); 
        stableRKY = lerp(stableRKY,rKy,0.2); 
        stableRHX = lerp(stableRHX,rHx,0.2); 
        stableRHY = lerp(stableRHY,rHy,0.2); 
    
        stableLAX = lerp(stableLAX,lAx,0.2); 
        stableLAY = lerp(stableLAY,lAy,0.2); 
        stableLKX = lerp(stableLKX,lKx,0.2); 
        stableLKY = lerp(stableLKY,lKy,0.2); 
        stableLHX = lerp(stableLHX,lHx,0.2); 
        stableLHY = lerp(stableLHY,lHy,0.2); 
    
        stableNX = lerp(stableNX,nX,0.2); 
        stableNY = lerp(stableNY,nY,0.2); 
    
                
    angleMode(DEGREES); //changes angle mode to DEGREES
                
                
                midRArmX = lerp(stableRWX, stableREX, 0.5); //lerps the center of both points in right lower Arm
                midRArmY = lerp(stableRWY, stableREY, 0.5);
    
                midRUpperArmX = lerp(stableRSX, stableREX, 0.5); //lerps the center of both points in  right Upper Arm
                midRUpperArmY = lerp(stableRSY, stableREY, 0.5);
    
                midLArmX = lerp(stableLWX, stableLEX, 0.5); //lerps the center of both points in left lower Arm
                midLArmY = lerp(stableLWY, stableLEY, 0.5);
    
                midLUpperArmX = lerp(stableLSX, stableLEX, 0.5); //lerps the center of both points in left Upper Arm
                midLUpperArmY = lerp(stableLSY, stableLEY, 0.5);
    
                midRLegX = lerp(stableRAX, stableRKX, 0.5); //lerps the center of both points in right leg
                midRLegY = lerp(stableRAY, stableRKY, 0.5);
    
                midRFemX = lerp(stableRKX, stableRHX, 0.5); //lerps the center of both points in the right Femur
                midRFemY = lerp(stableRKY, stableRHY, 0.5);
    
                midLLegX = lerp(stableLAX, stableLKX, 0.5); //lerps the center of both points in left leg
                midLLegY = lerp(stableLAY, stableLKY, 0.5);
    
                midLFemX = lerp(stableLKX, stableLHX, 0.5); //lerps the center of both points in The left Femur
                midLFemY = lerp(stableLKY, stableLHY, 0.5);
    
                midCollarX = lerp(stableLSX, stableRSX, 0.5); //lerps the center of both points on the collar bone
                midCollarY = lerp(stableLSY, stableRSY, 0.5);
    
                midPelvisX = lerp(stableLHX, stableRHX, 0.5); //lerps the center of both points on the pelvis bone
                midPelvisY = lerp(stableLHY, stableRHY, 0.5);
    
                midBodyX = lerp(midCollarX, midPelvisX, 0.5); //lerps the center of both points to get the center of the body
                midBodyY = lerp(midCollarY, midPelvisY, 0.5);
            
                
                
                disRArm = dist(rWx, rWy, rEx, rEy);
                disRUPArm = dist(rEx, rEy, rSx, rSy);
                disLArm = dist(lWx, lWy, lEx, lEy);
                disLUPArm = dist(lEx, lEy, lSx, lSy);
                disRLeg = dist(rAx, rAy, rKx, rKy);
                disRFem = dist(rKx, rKy, rHx, rHy);
                disLLeg = dist(lAx, lAy, lKx, lKy);
                disLFem = dist(lKx, lKy, lHx, lHy);
                disPelvis = dist(rHx, rHy, lHx, lHy);
                disBody = dist(midCollarX, midCollarY, midPelvisX, midPelvisY);
                
                RArmAngle  = atan2(rWy - rEy, rWx - rEx);
                RUPArmAngle = atan2(rEy - rSy, rEx - rSx);
                LArnAngle = atan2(lWy - lEy, lWx - lEx);
                LUPArmAngle = atan2(lEy - lSy, lEx - lSx);
                RLegAngle = atan2(rAy - rKy, rAx - rKx);
                RFemAngle = atan2(rKy - rHy, rKx - rHx);
                LLegAngle = atan2(lAy - lKy, lAx - lKx);
                LFemAngle = atan2(lKy - lHy, lKx - lHx);
                PelvisAngle = atan2(rHy - lHy, rHx - lHx);
                BodyAngle = atan2(midCollarY - midPelvisY, midCollarX - midPelvisX);
    
    
                var RArmtrueAngle = RArmAngle -90; //adds 90 to correct the angle
                var RUPArmtrueAngle = RUPArmAngle -90; //adds 90 to correct the angle
                var LArmtrueAngle = LArnAngle -90; //adds 90 to correct the angle
                var LUPArmtrueAngle = LUPArmAngle -90; //adds 90 to correct the angle
                var RLegtrueAngle = RLegAngle -90; //adds 90 to correct the angle
                var RFemtrueAngle = RFemAngle -90; //adds 90 to correct the angle
                var LLegtrueAngle = LLegAngle -90; //adds 90 to correct the angle
                var LFemtrueAngle = LFemAngle -90; //adds 90 to correct the angletrue
                var PelvistrueAngle = PelvisAngle -90; //adds 90 to correct the angle
                var BodytrueAngle = BodyAngle -90; //adds 90 to correct the angle
                
                translate(midRArmX,midRArmY); //translate the image to the center of both points
                rotate(RArmtrueAngle); //rotates the image based on the true angle
                imageMode(CENTER);
                image(rightArm,0,0, -200, disRArm + 150);
        
                translate(midRUpperArmX,midRUpperArmY); //translate the image to the center of both points
                rotate(RUPArmtrueAngle); //rotates the image based on the true angle
                imageMode(CENTER);
                image(rightUpperArm,0,60,disRUPArm );     
                
//                translate(midLArmX,midRArmY); //translate the image to the center of both points
//                rotate(LArmtrueAngle); //rotates the image based on the true angle            
//                imageMode(CENTER);
//                image(leftArm,0,0, -200, disLArm + 150);    
//        
//                translate(midLUpperArmX,midLUpperArmY); //translate the image to the center of both points
//                rotate(LUPArmtrueAngle); //rotates the image based on the true angle
//                imageMode(CENTER);
//                image(leftUpperArm,0,0, -200, disLUPArm + 150);     
//            
//                translate(midLLegX,midLLegY); //translate the image to the center of both points
//                rotate(RLegtrueAngle); //rotates the image based on the true angle
//                imageMode(CENTER);
//                image(rightLeg,0,0, -200, disRLeg + 150);
//                
//                translate(midLFemX,midLFemY); //translate the image to the center of both points
//                rotate(RFemtrueAngle); //rotates the image based on the true angle
//                imageMode(CENTER);
//                image(rightUpperLeg, 0,0, -200, disRFem + 150);
//        
//                translate(midLLegX,midLLegY); //translate the image to the center of both points
//                rotate(LLegtrueAngle); //rotates the image based on the true angle
//                imageMode(CENTER);
//                image(leftLeg,0,0, -200, disLLeg + 150);
//                
//                translate(midLFemX,midLFemY); //translate the image to the center of both points
//                rotate(LFemtrueAngle); //rotates the image based on the true angle
//                imageMode(CENTER);
//                image(leftFem, 0,0, -200, disLFem + 150);   
//            
//                translate(midPelvisX,midPelvisY); //translate the image to the center of both points
//                rotate(PelvistrueAngle); //rotates the image based on the true angle
//                imageMode(CENTER);
//                image(pelvis,0,0, -200, disPelvis + 150);    
//        
//                translate(midBodyX,midBodyY); //translate the image to the center of both points
//                rotate(BodytrueAngle); //rotates the image based on the true angle
//                imageMode(CENTER);
//                image(body,0,0, -200, disBody + 150);    

    
    
}
}