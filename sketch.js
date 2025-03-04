/*
----- Coding Tutorial by Patt Vira ----- 
Name: Interactive Fridge Magnets
Video Tutorial: https://youtu.be/72pAzuD8tqE

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/

let video; let handPose; let hands = [];
let font; let size = 35;
let magnets = []; let num = 5;

function preload() {
  // Use a web-safe font instead of loading a TTF file
  // Option 1: Use a web-safe font that's already available
  // In p5.js, we need to actually create a p5.Font object
  // when using a system font or Google Font
  font = 'Outfit'; // Will use the Google Font loaded in the HTML
  
  // Option 2: If you still want to load a local font, make sure the path is correct
  // font = loadFont("assets/Outfit-Regular.ttf"); // Make sure the font is in an assets folder
  
  handPose = ml5.handPose({flipped: true});
}

function setup() {
  // Create the canvas and center it
  let canvas = createCanvas(640, 480);
  canvas.parent('canvas-container'); // Put canvas in the container with this ID
  
  // Detect video & load ML model
  video = createCapture(VIDEO, {flipped: true});
  video.hide();
  handPose.detectStart(video, gotHands);
  
  // Create magnet objects
  rectMode(CENTER);
  for (let i=0; i<num; i++) {
    magnets[i] = new Magnet();
  }
}

function draw() {
  background(220);
  
  // Display video and detect index and thumb position
  image(video, 0, 0, width, height);
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    
    noFill();
    stroke(0, 255, 0);
    text("index", index.x, index.y);
    text("thumb", thumb.x, thumb.y);
  
    for (let i=0; i<num; i++) {
      magnets[i].touch(thumb.x, thumb.y, index.x, index.y);
    }
  }
  
  for (let i=0; i<num; i++) {
    magnets[i].display();
  }
}

function gotHands(results) {
  hands = results;
}