let elementMagnets = [
  { name: "fire", color: "#FF5722" },
  { name: "water", color: "#2196F3" },
  { name: "air", color: "#E0F7FA" },
  { name: "earth", color: "#795548" },
  // Add combined elements with their properties
  { name: "dust", color: "#E0E0E0" },
  { name: "energy", color: "#FFC107" },
  { name: "rain", color: "#90CAF9" },
  { name: "mud", color: "#8D6E63" },
  { name: "lava", color: "#FF9800" },
  { name: "steam", color: "#B3E5FC" }
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
    this.w = textWidth(this.t) + 60; // Add more padding for icons
    this.h = size + 20; // Increase height for icons
    
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
      fill(255, 0, 0);
      ellipse(this.fingerx, this.fingery, 10, 10);
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
    this.fingerx = abs(thumbx - indexx) + min(thumbx, indexx);
    this.fingery = abs(thumby - indexy) + min(thumby, indexy);
    
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
    baseElements[i].setPosition(xPos, height - 60);
    
    // Use element color for base elements
    baseElements[i].c = color(baseElements[i].element.color);
  }
}