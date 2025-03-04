/*
----- Interactive Element Magnets -----
*/

let video; let handPose; let hands = [];
let font; let size = 35;

const elementCombinations = {
  "air+earth": "dust",
  "earth+air": "dust",
  "air+fire": "energy",
  "fire+air": "energy",
  "air+water": "rain",
  "water+air": "rain",
  "earth+water": "mud",
  "water+earth": "mud",
  "fire+earth": "lava",
  "earth+fire": "lava",
  "fire+water": "steam",
  "water+fire": "steam"
};

function preload() {
  // Use a web-safe font
  font = 'Outfit'; // Will use the Google Font loaded in the HTML
  handPose = ml5.handPose({flipped: true});
}

function setup() {
  // Create the canvas and center it
  let canvas = createCanvas(640, 480);
  canvas.parent('canvas-container');
  
  // Detect video & load ML model
  video = createCapture(VIDEO, {flipped: true});
  video.hide();
  handPose.detectStart(video, gotHands);
  
  // Set up the fixed elements at the bottom
  setupBaseElements();
  
  // Initialize user magnets array
  userMagnets = [];
  
  rectMode(CENTER);

  // Add event listener for the clear button
  document.getElementById('clear-button').addEventListener('click', () => {
    userMagnets = []; // Clear all user-created elements
  });
}

function draw() {
  background(220);
  
  // Display video and detect index and thumb position
  image(video, 0, 0, width, height);
  
  // Draw a subtle divider line
  stroke(180);
  line(0, height - 120, width, height - 120);
  noStroke();
  
  if (hands.length > 0) {
    let index = hands[0].keypoints[8];
    let thumb = hands[0].keypoints[4];
    
    // Optional debugging visual for hand tracking
    fill(0, 255, 0);
    noStroke();
    ellipse(index.x, index.y, 10, 10); // Show index finger position
    ellipse(thumb.x, thumb.y, 10, 10); // Show thumb position
  
    // Process interactions with base elements
    for (let i = 0; i < baseElements.length; i++) {
      baseElements[i].touch(thumb.x, thumb.y, index.x, index.y);
    }
    
    // Process interactions with user-created magnets
    for (let i = 0; i < userMagnets.length; i++) {
      userMagnets[i].touch(thumb.x, thumb.y, index.x, index.y);
    }
    
    checkForCombinations();
  }
  
  // Display all base elements
  for (let i = 0; i < baseElements.length; i++) {
    baseElements[i].display();
  }
  
  // Display all user magnets
  for (let i = 0; i < userMagnets.length; i++) {
    userMagnets[i].display();
  }
}

function gotHands(results) {
  hands = results;
}

function checkForCombinations() {
  for (let i = 0; i < userMagnets.length; i++) {
    for (let j = i + 1; j < userMagnets.length; j++) {
      let magnetA = userMagnets[i];
      let magnetB = userMagnets[j];
      
      if (dist(magnetA.pos.x, magnetA.pos.y, magnetB.pos.x, magnetB.pos.y) < 50) {
        let key = `${magnetA.t}+${magnetB.t}`;
        if (elementCombinations[key]) {
          let newMagnet = new Magnet(elementCombinations[key]);
          newMagnet.pos.x = (magnetA.pos.x + magnetB.pos.x) / 2;
          newMagnet.pos.y = (magnetA.pos.y + magnetB.pos.y) / 2;
          userMagnets.splice(j, 1);
          userMagnets.splice(i, 1);
          userMagnets.push(newMagnet);
          return;
        }
      }
    }
  }
}

// Handle window resize
function windowResized() {
  // Recalculate the positions of base elements
  setupBaseElements();
}
