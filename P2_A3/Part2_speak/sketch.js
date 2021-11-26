//Eric Ferguson
//IO&E
//Project 2
//Assignment 3
//Part 1
//11/1/21
let lang;
let speechRec;


function setup() {
    noCanvas();
    voice = new p5.Speech(voiceReady);
    voice.speak('Bungie Gum');

    

}
function voiceReady() {
        console.log(speech.voices);
    }