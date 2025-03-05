/*
----- Interactive Element Magnets -----
*/

let video; let handPose; let hands = [];
let font; let size = 42; // Increased font size for better visibility

const elementCombinations = {
  // Original combinations
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
  "water+fire": "steam",
  
  // New combinations - first batch
  "rain+smoke": "acid rain",
  "smoke+rain": "acid rain",
  "rain+smog": "acid rain",
  "smog+rain": "acid rain",
  "bird+steel": "airplane",
  "steel+bird": "airplane",
  "bird+metal": "airplane",
  "metal+bird": "airplane",
  "clock+sound": "alarm clock",
  "sound+clock": "alarm clock",
  "fruit+time": "alcohol",
  "time+fruit": "alcohol",
  "juice+time": "alcohol",
  "time+juice": "alcohol",
  "water+plant": "algae",
  "plant+water": "algae",
  "sea+plant": "algae",
  "plant+sea": "algae",
  "ocean+plant": "algae",
  "plant+ocean": "algae",
  "life+space": "alien",
  "space+life": "alien",
  "human+dust": "allergy",
  "dust+human": "allergy",
  "lizard+swamp": "alligator",
  "swamp+lizard": "alligator",
  "lizard+river": "alligator",
  "river+lizard": "alligator",
  "mountain+sheep": "alpaca",
  "sheep+mountain": "alpaca",
  "car+hospital": "ambulance",
  "hospital+car": "ambulance",
  "car+doctor": "ambulance",
  "doctor+car": "ambulance",
  "human+bird": "angel",
  "bird+human": "angel",
  "human+fishing rod": "angler",
  "fishing rod+human": "angler",
  "grass+wild animal": "ant",
  "wild animal+grass": "ant",
  "wild animal+sugar": "ant",
  "sugar+wild animal": "ant",
  "snow+desert": "antarctica",
  "desert+snow": "antarctica",
  "ice+desert": "antarctica",
  "desert+ice": "antarctica",
  "water+glass": "aquarium",
  "glass+water": "aquarium",
  "glass+fish": "aquarium",
  "fish+glass": "aquarium",
  "isle+isle": "archipelago",
  "wild animal+armor": "armadillo",
  "armor+wild animal": "armadillo",
  "tool+metal": "armor",
  "metal+tool": "armor",
  "tool+steel": "armor",
  "steel+tool": "armor",
  "volcano+energy": "ash",
  "energy+volcano": "ash",
  "human+moon": "astronaut",
  "moon+human": "astronaut",
  "rocket+human": "astronaut",
  "human+rocket": "astronaut",
  "human+space station": "astronaut",
  "space station+human": "astronaut",
  "human+space": "astronaut",
  "space+human": "astronaut",
  "ice cream+astronaut": "astronaut ice cream",
  "astronaut+ice cream": "astronaut ice cream",
  "air+pressure": "atmosphere",
  "pressure+air": "atmosphere",
  "sky+pressure": "atmosphere",
  "pressure+sky": "atmosphere",
  "energy+explosion": "atomic bomb",
  "explosion+energy": "atomic bomb",
  "sun+antarctica": "aurora",
  "antarctica+sun": "aurora",
  "sky+antarctica": "aurora",
  "antarctica+sky": "aurora",
  "antarctica+atmosphere": "aurora",
  "atmosphere+antarctica": "aurora",
  "energy+snow": "avalanche",
  "snow+energy": "avalanche",
  "blade+wood": "axe",
  "wood+blade": "axe",
  "pig+fire": "bacon",
  "fire+pig": "bacon",
  "swamp+life": "bacteria",
  "life+swamp": "bacteria",
  "human+flour": "baker",
  "flour+human": "baker",
  "human+bread": "baker",
  "bread+human": "baker",
  "human+dough": "baker",
  "dough+human": "baker",
  "house+baker": "bakery",
  "baker+house": "bakery",
  "house+bread": "bakery",
  "bread+house": "bakery",
  "fruit+monkey": "banana",
  "monkey+fruit": "banana",
  "bread+banana": "banana bread",
  "banana+bread": "banana bread",
  "blood+fabric": "bandage",
  "fabric+blood": "bandage",
  "house+money": "bank",
  "money+house": "bank",
  "house+gold": "bank",
  "gold+house": "bank",
  "house+safe": "bank",
  "safe+house": "bank",
  "cow+house": "barn",
  "house+cow": "barn",
  "livestock+house": "barn",
  "house+livestock": "barn",
  "house+hay": "barn",
  "hay+house": "barn",
  "mouse+bird": "bat",
  "bird+mouse": "bat",
  "mouse+sky": "bat",
  "sky+mouse": "bat",
  "bat+human": "batman",
  "human+bat": "batman",
  "flour+milk": "batter",
  "milk+flour": "batter",
  "gun+blade": "bayonet",
  "blade+gun": "bayonet",
  "gun+sword": "bayonet",
  "sword+gun": "bayonet",
  "campfire+meat": "bbq",
  "meat+campfire": "bbq",
  "campfire+garden": "bbq",
  "garden+campfire": "bbq",
  "sea+sand": "beach",
  "sand+sea": "beach",
  "ocean+sand": "beach",
  "sand+ocean": "beach",
  "wild animal+wood": "beaver",
  "wood+wild animal": "beaver",
  "wild animal+dam": "beaver",
  "dam+wild animal": "beaver",
  "flower+wild animal": "bee",
  "wild animal+flower": "bee",
  "bee+house": "beehive",
  "house+bee": "beehive",
  "bee+tree": "beehive",
  "tree+bee": "beehive",
  "alcohol+wheat": "beer",
  "wheat+alcohol": "beer",
  "wheel+wheel": "bicycle",
  "air+life": "bird",
  "life+air": "bird",
  "life+sky": "bird",
  "sky+life": "bird",
  "egg+air": "bird",
  "air+egg": "bird",
  "egg+sky": "bird",
  "sky+egg": "bird",
  "bird+house": "birdhouse",
  "house+bird": "birdhouse",
  "star+pressure": "black hole",
  "pressure+star": "black hole",
  "metal+stone": "blade",
  "stone+metal": "blade",
  "glass+blade": "blender",
  "blade+glass": "blender",
  "blade+electricity": "blender",
  "electricity+blade": "blender",
  "snow+snow": "blizzard",
  "snow+storm": "blizzard",
  "storm+snow": "blizzard",
  "snow+wind": "blizzard",
  "wind+snow": "blizzard",
  "human+blade": "blood",
  "blade+human": "blood",
  "engineer+paper": "blueprint",
  "paper+engineer": "blueprint",
  "water+wood": "boat",
  "wood+water": "boat",
  "steam+metal": "boiler",
  "metal+steam": "boiler",
  "corpse+time": "bone",
  "time+corpse": "bone",
  "tree+pottery": "bonsai tree",
  "pottery+tree": "bonsai tree",
  "tree+scissors": "bonsai tree",
  "scissors+tree": "bonsai tree",
  "paper+wood": "book",
  "wood+paper": "book",
  "paper+story": "book",
  "story+paper": "book",
  "dough+fire": "bread",
  "fire+dough": "bread",
  "clay+fire": "brick",
  "fire+clay": "brick",
  "mud+fire": "brick",
  "fire+mud": "brick",
  "mud+sun": "brick",
  "sun+mud": "brick",
  "clay+sun": "brick",
  "sun+clay": "brick",
  "river+wood": "bridge",
  "wood+river": "bridge",
  "river+metal": "bridge",
  "metal+river": "bridge",
  "river+steel": "bridge",
  "steel+river": "bridge",
  "wood+hay": "broom",
  "hay+wood": "broom",
  "gunpowder+metal": "bullet",
  "metal+gunpowder": "bullet",
  "bullet+armor": "bulletproof vest",
  "armor+bullet": "bulletproof vest",
  "car+car": "bus",
  "human+meat": "butcher",
  "meat+human": "butcher",
  "energy+milk": "butter",
  "milk+energy": "butter",
  "milk+pressure": "butter",
  "pressure+milk": "butter",
  "flower+wild animal": "butterfly",
  "wild animal+flower": "butterfly",
  "desert+plant": "cactus",
  "plant+desert": "cactus",
  "sand+plant": "cactus",
  "plant+sand": "cactus",
  "dough+candle": "cake",
  "candle+dough": "cake",
  "desert+wild animal": "camel",
  "wild animal+desert": "camel",
  "desert+horse": "camel",
  "horse+desert": "camel",
  "livestock+desert": "camel",
  "desert+livestock": "camel",
  "fire+wood": "campfire",
  "wood+fire": "campfire",
  "wax+thread": "candle",
  "thread+wax": "candle",
  "wax+fire": "candle",
  "fire+wax": "candle",
  "sugar+christmas tree": "candy cane",
  "christmas tree+sugar": "candy cane",
  "gunpowder+pirate ship": "cannon",
  "pirate ship+gunpowder": "cannon",
  "gunpowder+castle": "cannon",
  "castle+gunpowder": "cannon",
  "hero+fabric": "cape",
  "fabric+hero": "cape",
  "wheel+metal": "car",
  "metal+wheel": "car",
  "sugar+fire": "caramel",
  "fire+sugar": "caramel",
  "human+oxygen": "carbon dioxide",
  "oxygen+human": "carbon dioxide",
  "plant+night": "carbon dioxide",
  "night+plant": "carbon dioxide",
  "tree+night": "carbon dioxide",
  "night+tree": "carbon dioxide",
  "snowman+vegetable": "carrot",
  "vegetable+snowman": "carrot",
  "sun+snowman": "carrot",
  "snowman+sun": "carrot",
  "wheel+wood": "cart",
  "wood+wheel": "cart",
  "tool+mountain goat": "cashmere",
  "mountain goat+tool": "cashmere",
  "thread+mountain goat": "cashmere",
  "mountain goat+thread": "cashmere",
  "fabric+mountain goat": "cashmere",
  "mountain goat+fabric": "cashmere",
  "scissors+mountain goat": "cashmere",
  "mountain goat+scissors": "cashmere",
  "wool+mountain goat": "cashmere",
  "mountain goat+wool": "cashmere",
  "house+knight": "castle",
  "knight+house": "castle",
  "wild animal+milk": "cat",
  "milk+wild animal": "cat",
  "cat+plant": "catnip",
  "plant+cat": "catnip",
  "metal+witch": "cauldron",
  "witch+metal": "cauldron",
  "steel+witch": "cauldron",
  "witch+steel": "cauldron",
  "fireplace+witch": "cauldron",
  "witch+fireplace": "cauldron",
  "campfire+witch": "cauldron",
  "witch+campfire": "cauldron",
  "hard roe+human": "caviar",
  "human+hard roe": "caviar",
  "horse+human": "centaur",
  "human+horse": "centaur",
  "wheat+milk": "cereal",
  "milk+wheat": "cereal",
  "metal+rope": "chain",
  "rope+metal": "chain",
  "steel+rope": "chain",
  "rope+steel": "chain",
  "axe+electricity": "chainsaw",
  "electricity+axe": "chainsaw",
  "lizard+rainbow": "chameleon",
  "rainbow+lizard": "chameleon",
  "fire+wood": "charcoal",
  "wood+fire": "charcoal",
  "time+milk": "cheese",
  "milk+time": "cheese",
  "cheese+hamburger": "cheeseburger",
  "hamburger+cheese": "cheeseburger",
  "egg+livestock": "chicken",
  "livestock+egg": "chicken",
  "livestock+bird": "chicken",
  "bird+livestock": "chicken",
  "bird+farmer": "chicken",
  "farmer+bird": "chicken",
  "water+chicken": "chicken soup",
  "chicken+water": "chicken soup",
  "chicken+bone": "chicken wing",
  "bone+chicken": "chicken wing",
  "house+fireplace": "chimney",
  "fireplace+house": "chimney",
  "smoke+brick": "chimney",
  "brick+smoke": "chimney",
  "fireplace+brick": "chimney",
  "brick+fireplace": "chimney",
  "wool+fireplace": "christmas stocking",
  "fireplace+wool": "christmas stocking",
  "light bulb+tree": "christmas tree",
  "tree+light bulb": "christmas tree",
  "tree+star": "christmas tree",
  "star+tree": "christmas tree",
  "tobacco+paper": "cigarette",
  "paper+tobacco": "cigarette",
  "village+village": "city",
  "skyscraper+skyscraper": "city",
  "sand+mud": "clay",
  "mud+sand": "clay",
  "time+tool": "clock",
  "tool+time": "clock",
  "time+wheel": "clock",
  "wheel+time": "clock",
  "time+electricity": "clock",
  "electricity+time": "clock",
  "air+steam": "cloud",
  "steam+air": "cloud",
  "pressure+plant": "coal",
  "plant+pressure": "coal",
  "sun+snowman": "coal",
  "snowman+sun": "coal",
  "palm+fruit": "coconut",
  "fruit+palm": "coconut",
  "coconut+tool": "coconut milk",
  "tool+coconut": "coconut milk",
  "milk+coconut": "coconut milk",
  "coconut+milk": "coconut milk",
  "wood+corpse": "coffin",
  "corpse+wood": "coffin",
  "human+rain": "cold",
  "rain+human": "cold",
  "electricity+nerd": "computer",
  "nerd+electricity": "computer",
  "wire+nerd": "computer",
  "nerd+wire": "computer",
  "tool+nerd": "computer",
  "nerd+tool": "computer",
  "mouse+computer": "computer mouse",
  "computer+mouse": "computer mouse",
  "paper+blade": "confetti",
  "blade+paper": "confetti",
  "paper+scissors": "confetti",
  "scissors+paper": "confetti",
  "book+recipe": "cookbook",
  "recipe+book": "cookbook",
  "recipe+recipe": "cookbook",
  "star+star": "constellation",
  "dough+sugar": "cookie",
  "sugar+dough": "cookie",
  "human+gun": "corpse",
  "gun+human": "corpse",
  "human+grim reaper": "corpse",
  "grim reaper+human": "corpse",
  "plant+cloud": "cotton",
  "cloud+plant": "cotton",
  "grass+livestock": "cow",
  "livestock+grass": "cow"
};

function preload() {
  // Use a web-safe font
  font = 'Outfit'; // Will use the Google Font loaded in the HTML
  handPose = ml5.handPose({flipped: true});
}

function setup() {
  // Create the canvas and center it
  let canvas = createCanvas(800, 600);
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
  line(0, height - 150, width, height - 150);
  noStroke();
  
  if (hands.length > 0) {
    // Get the positions of the index finger and thumb
    let index = hands[0].keypoints[8]; // Index finger tip
    let thumb = hands[0].keypoints[4]; // Thumb tip
    
    // Display visual indicators for finger positions
    fill(0, 255, 0, 180); // Semi-transparent green
    stroke(255);
    strokeWeight(1);
    ellipse(index.x, index.y, 15, 15); // Show index finger position
    
    fill(255, 165, 0, 180); // Semi-transparent orange
    ellipse(thumb.x, thumb.y, 15, 15); // Show thumb position
  
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
