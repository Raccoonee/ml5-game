let elementMagnets = [
  // Base elements
  { name: "fire", color: "#FF5722" },
  { name: "water", color: "#2196F3" },
  { name: "air", color: "#E0F7FA" },
  { name: "earth", color: "#795548" },
  
  // Original combined elements
  { name: "dust", color: "#E0E0E0" },
  { name: "energy", color: "#FFC107" },
  { name: "rain", color: "#90CAF9" },
  { name: "mud", color: "#8D6E63" },
  { name: "lava", color: "#FF9800" },
  { name: "steam", color: "#B3E5FC" },
  
  // New elements
  { name: "acid rain", color: "#4DB6AC" },
  { name: "airplane", color: "#B0BEC5" },
  { name: "alarm clock", color: "#FF7043" },
  { name: "alcohol", color: "#FFECB3" },
  { name: "algae", color: "#66BB6A" },
  { name: "alien", color: "#9CCC65" },
  { name: "allergy", color: "#FFCCBC" },
  { name: "alligator", color: "#558B2F" },
  { name: "alpaca", color: "#D7CCC8" },
  { name: "ambulance", color: "#EF5350" },
  { name: "angel", color: "#F5F5F5" },
  { name: "angler", color: "#5D4037" },
  { name: "ant", color: "#3E2723" },
  { name: "antarctica", color: "#E0F7FA" },
  { name: "aquarium", color: "#81D4FA" },
  { name: "archipelago", color: "#4FC3F7" },
  { name: "armadillo", color: "#8D6E63" },
  { name: "armor", color: "#78909C" },
  { name: "ash", color: "#9E9E9E" },
  { name: "astronaut", color: "#ECEFF1" },
  { name: "astronaut ice cream", color: "#F8BBD0" },
  { name: "atmosphere", color: "#B3E5FC" },
  { name: "atomic bomb", color: "#FF5252" },
  { name: "aurora", color: "#CE93D8" },
  { name: "avalanche", color: "#F5F5F5" },
  { name: "axe", color: "#8D6E63" },
  { name: "bacon", color: "#FF8A65" },
  { name: "bacteria", color: "#81C784" },
  { name: "baker", color: "#FFECB3" },
  { name: "bakery", color: "#FFCC80" },
  { name: "banana", color: "#FFEB3B" },
  { name: "banana bread", color: "#FFD54F" },
  { name: "bandage", color: "#EEEEEE" },
  { name: "bank", color: "#B0BEC5" },
  { name: "barn", color: "#C62828" },
  { name: "bat", color: "#424242" },
  { name: "batman", color: "#212121" },
  { name: "batter", color: "#FFF9C4" },
  { name: "bayonet", color: "#9E9E9E" },
  { name: "bbq", color: "#BF360C" },
  { name: "beach", color: "#FFF59D" },
  { name: "beaver", color: "#795548" },
  { name: "bee", color: "#FDD835" },
  { name: "beehive", color: "#FFA000" },
  { name: "beer", color: "#FFB300" },
  { name: "bicycle", color: "#757575" },
  { name: "bird", color: "#81C784" },
  { name: "birdhouse", color: "#A1887F" },
  { name: "black hole", color: "#212121" },
  { name: "blade", color: "#9E9E9E" },
  { name: "blender", color: "#B0BEC5" },
  { name: "blizzard", color: "#E1F5FE" },
  { name: "blood", color: "#F44336" },
  { name: "blueprint", color: "#1976D2" },
  { name: "boat", color: "#8D6E63" },
  { name: "boiler", color: "#78909C" },
  { name: "bone", color: "#F5F5F5" },
  { name: "bonsai tree", color: "#66BB6A" },
  { name: "book", color: "#795548" },
  { name: "bread", color: "#FFB74D" },
  { name: "brick", color: "#D84315" },
  { name: "bridge", color: "#8D6E63" },
  { name: "broom", color: "#A1887F" },
  { name: "bullet", color: "#9E9E9E" },
  { name: "bulletproof vest", color: "#607D8B" },
  { name: "bus", color: "#FFC107" },
  { name: "butcher", color: "#D32F2F" },
  { name: "butter", color: "#FFECB3" },
  { name: "butterfly", color: "#E91E63" },
  { name: "cactus", color: "#66BB6A" },
  { name: "cake", color: "#FFAB91" },
  { name: "camel", color: "#D7CCC8" },
  { name: "campfire", color: "#FF5722" },
  { name: "candle", color: "#FFECB3" },
  { name: "candy cane", color: "#F44336" },
  { name: "cannon", color: "#424242" },
  { name: "cape", color: "#F44336" },
  { name: "car", color: "#90A4AE" },
  { name: "caramel", color: "#FFB74D" },
  { name: "carbon dioxide", color: "#ECEFF1" },
  { name: "carrot", color: "#FF9800" },
  { name: "cart", color: "#8D6E63" },
  { name: "cashmere", color: "#EFEBE9" },
  { name: "castle", color: "#90A4AE" },
  { name: "cat", color: "#616161" },
  { name: "catnip", color: "#81C784" },
  { name: "cauldron", color: "#424242" },
  { name: "caviar", color: "#263238" },
  { name: "centaur", color: "#8D6E63" },
  { name: "cereal", color: "#FFF176" },
  { name: "chain", color: "#9E9E9E" },
  { name: "chainsaw", color: "#F44336" },
  { name: "chameleon", color: "#8BC34A" },
  { name: "charcoal", color: "#424242" },
  { name: "cheese", color: "#FFC107" },
  { name: "cheeseburger", color: "#FF9800" },
  { name: "chicken", color: "#FFCC80" },
  { name: "chicken soup", color: "#FFE0B2" },
  { name: "chicken wing", color: "#FFCC80" },
  { name: "chimney", color: "#795548" },
  { name: "christmas stocking", color: "#F44336" },
  { name: "christmas tree", color: "#2E7D32" },
  { name: "cigarette", color: "#BDBDBD" },
  { name: "city", color: "#607D8B" },
  { name: "clay", color: "#BCAAA4" },
  { name: "clock", color: "#607D8B" },
  { name: "cloud", color: "#ECEFF1" },
  { name: "coal", color: "#424242" },
  { name: "coconut", color: "#8D6E63" },
  { name: "coconut milk", color: "#FFFFFF" },
  { name: "coffin", color: "#5D4037" },
  { name: "cold", color: "#B3E5FC" },
  { name: "computer", color: "#78909C" },
  { name: "computer mouse", color: "#9E9E9E" },
  { name: "confetti", color: "#F48FB1" },
  { name: "cookbook", color: "#FFCC80" },
  { name: "constellation", color: "#303F9F" },
  { name: "cookie", color: "#FFD54F" },
  { name: "corpse", color: "#BDBDBD" },
  { name: "cotton", color: "#F5F5F5" },
  { name: "cow", color: "#795548" }
];

let baseElements = []; // Store our fixed element magnets
let userMagnets = []; // Store user-created magnets
let lastCreationTime = 0; // Track when the last element was created
const creationDelay = 1000; // Delay in milliseconds (1 second) between creations

class Magnet {
  constructor(elementType, isBase = false) {
    // Set element based on the passed type or randomly
    if (elementType !== undefined) {
      this.element = elementMagnets.find(e => e.name === elementType);
      
      // If element not found, default to a random base element
      if (!this.element) {
        console.warn(`Element type "${elementType}" not found, using random element instead`);
        this.element = random(elementMagnets.slice(0, 4)); // Only use base elements when defaulting
      }
    } else {
      this.element = random(elementMagnets);
    }
    
    this.t = this.element.name;
    this.angle = 0; // Always keep elements horizontal and upright
    this.c = color(255);
    this.isBase = isBase; // Flag to identify fixed base elements
    
    // Update how we handle the font bounding box
    textFont(font);
    textSize(size/2);
    textAlign(CENTER, CENTER);
    this.w = textWidth(this.t) + 80; // Add more padding for icons
    this.h = size + 30; // Increase height for icons
    
    // For base elements, position at bottom. For user magnets, position randomly
    if (isBase) {
      // Position will be set by setupBaseElements
      this.x = 0;
      this.y = 0;
    } else {
      this.x = random(width);
      this.y = random(height/2); // Keep in upper half initially
    }
    
    this.bbox = { x: this.x, y: this.y, w: this.w, h: this.h };
    this.pos = createVector(this.bbox.x, this.bbox.y);
    this.w = this.bbox.w;
    this.h = this.bbox.h;
    
    this.fingerx = 0;
    this.fingery = 0;
    this.isDragging = false;
  }
  
  setPosition(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }
  
  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    
    // Draw background rectangle
    fill(this.c);
    
    // Add a visible outline for base elements
    if (this.isBase) {
      strokeWeight(3);
      stroke(50, 50, 50, 180); // Dark gray outline with some transparency
    } else {
      noStroke();
    }
    
    rect(0, 0, this.w, this.h, 8); // Added rounded corners
    
    // Draw element name
    fill(0);
    noStroke();
    textFont(font);
    textSize(size/2);
    textAlign(CENTER, CENTER);
    text(this.t, 0, this.h/4);
    
    // Draw element icon
    this.drawElementIcon(0, -this.h/4, this.w/3);
    
    pop();
    
    // Only draw the finger position indicator for non-base elements
    if (!this.isBase && this.isDragging) {
      fill(255, 0, 0, 180); // Semi-transparent red
      stroke(255);
      strokeWeight(1);
      ellipse(this.fingerx, this.fingery, 15, 15);
    }
  }
  
  // Draw icons for each element
  drawElementIcon(x, y, size) {
    push();
    translate(x, y);
    
    switch(this.element.name) {
      case "fire":
        fill("#FF5722");
        // Fire icon (simplified flame)
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.5) {
          let r = size/2 * (0.8 + 0.3 * sin(i * 3));
          let px = r * cos(i);
          let py = r * sin(i);
          vertex(px, py);
        }
        endShape(CLOSE);
        break;
        
      case "water":
        fill("#2196F3");
        // Water icon (droplet)
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.1) {
          let r = size/2 * (0.6 + 0.4 * sin(i));
          let px = r * cos(i);
          let py = r * sin(i) + size/8 * sin(i);
          vertex(px, py);
        }
        endShape(CLOSE);
        break;
        
      case "air":
        fill("#E0F7FA");
        stroke(200);
        // Air icon (cloud)
        ellipse(-size/4, 0, size/2);
        ellipse(0, -size/6, size/2);
        ellipse(size/4, 0, size/2);
        noStroke();
        break;
        
      case "earth":
        fill("#795548");
        // Earth icon (mountain)
        triangle(-size/2, size/3, 0, -size/3, size/2, size/3);
        fill("#8D6E63");
        triangle(-size/3, size/3, -size/6, 0, 0, size/3);
        break;
        
      // Add icons for combined elements
      case "dust":
        fill("#E0E0E0");
        // Dust icon (particles)
        for (let i = 0; i < 12; i++) {
          let px = random(-size/2, size/2);
          let py = random(-size/2, size/2);
          ellipse(px, py, size/10);
        }
        break;
        
      case "energy":
        fill("#FFC107");
        // Energy icon (lightning bolt)
        beginShape();
        vertex(-size/5, -size/2);
        vertex(size/10, -size/10);
        vertex(-size/8, size/10);
        vertex(size/5, size/2);
        endShape(CLOSE);
        break;
        
      case "rain":
        fill("#90CAF9");
        // Rain icon (raindrops)
        for (let i = 0; i < 5; i++) {
          let px = map(i, 0, 4, -size/2, size/2);
          triangle(px, -size/4, px-size/20, size/4, px+size/20, size/4);
        }
        break;
        
      case "mud":
        fill("#8D6E63");
        // Mud icon (puddle)
        ellipse(0, 0, size, size/2);
        fill("#795548");
        ellipse(size/6, -size/10, size/3, size/6);
        break;
        
      case "lava":
        fill("#FF9800");
        // Lava icon (flowing lava)
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.3) {
          let r = size/2 * (0.7 + 0.3 * sin(i * 5));
          let px = r * cos(i);
          let py = r * sin(i);
          vertex(px, py);
        }
        endShape(CLOSE);
        break;
        
      case "steam":
        fill("#B3E5FC");
        noStroke();
        // Steam icon (clouds rising)
        ellipse(-size/4, -size/10, size/3);
        ellipse(0, -size/4, size/3);
        ellipse(size/4, -size/10, size/3);
        ellipse(-size/6, -size/2, size/4);
        ellipse(size/6, -size/2, size/4);
        break;
        
      default:
        // Generic icon for any other element
        fill("#9E9E9E");
        ellipse(0, 0, size/2);
        break;
    }
    
    pop();
  }
  
  touch(thumbx, thumby, indexx, indexy) {
    let distBetweenFingers = dist(thumbx, thumby, indexx, indexy);
    
    // Calculate the midpoint between thumb and index finger
    this.fingerx = (thumbx + indexx) / 2;
    this.fingery = (thumby + indexy) / 2;
    
    // Calculate distance from magnet to the midpoint between fingers
    let distFromFingers = dist(this.pos.x, this.pos.y, this.fingerx, this.fingery);
    
    if (distBetweenFingers < 40 && distFromFingers < this.w/2) {
      // If this is a base element and we're picking it up for first time
      if (this.isBase && !this.isDragging) {
        // Check if enough time has passed since the last creation
        let currentTime = millis();
        if (currentTime - lastCreationTime < creationDelay) {
          return; // Skip creation if not enough time has passed
        }
        
        // Create a new user magnet of the same element type
        let newMagnet = new Magnet(this.element.name);
        newMagnet.pos.x = this.fingerx;
        newMagnet.pos.y = this.fingery;
        newMagnet.c = color(this.element.color);
        newMagnet.isDragging = true;
        userMagnets.push(newMagnet);
        
        // Update the last creation time
        lastCreationTime = currentTime;
        
        // Continue showing the base element in position
        return;
      }
      
      // For user magnets, allow dragging
      if (!this.isBase) {
        this.c = color(this.element.color); // Use element color when selected
        this.pos.x = this.fingerx;
        this.pos.y = this.fingery;
        this.isDragging = true;
      }
    } else {
      // No longer dragging this magnet
      if (!this.isBase) {
        this.isDragging = false;
        this.c = color(255); // Return to white when not selected
      }
    }
  }
}

// Function to set up the base elements at the bottom of the screen
function setupBaseElements() {
  baseElements = [];
  
  // Calculate spacing
  let totalWidth = 0;
  let baseElementsWidth = [];
  
  // First, create all base elements to get their widths
  for (let i = 0; i < 4; i++) { // Only use the first 4 elements (base elements)
    let magnet = new Magnet(elementMagnets[i].name, true);
    baseElements.push(magnet);
    baseElementsWidth.push(magnet.w);
    totalWidth += magnet.w;
  }
  
  // Add padding between elements
  let padding = 20;
  totalWidth += padding * (baseElements.length - 1);
  
  // Calculate starting X position to center all elements
  let startX = (width - totalWidth) / 2;
  
  // Position each base element
  for (let i = 0; i < baseElements.length; i++) {
    let xPos = startX + baseElements[i].w / 2;
    if (i > 0) {
      // Add width of previous elements plus padding
      for (let j = 0; j < i; j++) {
        xPos += baseElementsWidth[j] + padding;
      }
    }
    
    // Set position for this element at the bottom of the screen
    baseElements[i].setPosition(xPos, height - 75);
    
    // Use element color for base elements
    baseElements[i].c = color(baseElements[i].element.color);
  }
}
