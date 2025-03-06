let elementMagnets = [
  // Tier 0 - Basic Elements
  { name: "fire", color: "#FF5722" },
  { name: "water", color: "#2196F3" },
  { name: "air", color: "#E0F7FA" },
  { name: "earth", color: "#795548" },
  
  // Tier 1 - First Combinations
  { name: "dust", color: "#E0E0E0" },
  { name: "energy", color: "#FFC107" },
  { name: "rain", color: "#90CAF9" },
  { name: "mud", color: "#8D6E63" },
  { name: "lava", color: "#FF9800" },
  { name: "steam", color: "#B3E5FC" },
  
  // Tier 2 - Secondary Combinations
  { name: "clay", color: "#D7CCC8" },
  { name: "lightning", color: "#FFEB3B" },
  { name: "obsidian", color: "#37474F" },
  { name: "cloud", color: "#ECEFF1" },
  { name: "brick", color: "#C62828" },
  { name: "plant", color: "#66BB6A" },
  
  // Tier 3 - Complex Combinations
  { name: "tree", color: "#33691E" },
  { name: "storm", color: "#546E7A" },
  { name: "pottery", color: "#A1887F" },
  { name: "crystal", color: "#B39DDB" },
  { name: "glass", color: "#CFD8DC" },
  { name: "wall", color: "#BCAAA4" },
  { name: "fog", color: "#F5F5F5" }
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

        // Fixed icons code - resolving the color transparency issues

      // Tier 2 elements
      case "clay":
        fill("#D7CCC8");
        // Clay icon (pottery wheel with clay)
        ellipse(0, 0, size/1.5, size/3); // Wheel
        beginShape(); // Clay on wheel
        vertex(-size/4, -size/6);
        vertex(-size/6, -size/3);
        vertex(size/6, -size/3);
        vertex(size/4, -size/6);
        vertex(size/4, size/6);
        vertex(-size/4, size/6);
        endShape(CLOSE);
        fill("#C5B9B4"); // Darker shade for details
        ellipse(0, 0, size/4, size/8); // Center of wheel
        break;
        
      case "lightning":
        // Lightning bolt with glow effect
        // First draw glow
        fill(255, 248, 225, 100);  // This needs to be fixed
        ellipse(0, 0, size, size);
        
        // Then draw lightning
        fill("#FFEB3B");
        beginShape();
        vertex(-size/6, -size/2);
        vertex(size/8, -size/8);
        vertex(-size/8, size/6);
        vertex(size/6, size/2);
        endShape(CLOSE);
        
        // Add some small sparks
        for (let i = 0; i < 5; i++) {
          let angle = random(TWO_PI);
          let dist = random(size/3, size/2);
          let x = cos(angle) * dist;
          let y = sin(angle) * dist;
          let sparkSize = random(size/20, size/10);
          ellipse(x, y, sparkSize, sparkSize);
        }
        break;
        
      case "obsidian":
        // Obsidian (shiny black volcanic glass)
        fill("#263238"); // Darker base
        beginShape();
        vertex(0, -size/2);
        vertex(size/3, -size/6);
        vertex(size/5, size/3);
        vertex(-size/5, size/3);
        vertex(-size/3, -size/6);
        endShape(CLOSE);
        
        // Add reflective highlights
        stroke("#FFFFFF");
        strokeWeight(size/40);
        line(-size/6, -size/3, size/8, -size/4);
        line(-size/10, size/6, size/6, 0);
        noStroke();
        
        // Add some texture/cracks
        stroke("#000000");
        strokeWeight(size/60);
        line(0, -size/3, 0, size/5);
        line(-size/5, 0, size/5, -size/8);
        noStroke();
        break;
        
      case "cloud":
        noStroke();
        // Cloud with dynamic fluffiness
        fill("#ECEFF1");
        // Main cloud body
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.2) {
          let r = size/2 * (0.5 + 0.3 * sin(i * 3));
          let px = r * cos(i);
          let py = r * sin(i) * 0.6; // Flatten it a bit
          vertex(px, py);
        }
        endShape(CLOSE);
        
        // Add some little cloud puffs
        fill("#FFFFFF");
        ellipse(-size/3, -size/8, size/3, size/4);
        ellipse(size/3, -size/8, size/3, size/4);
        ellipse(-size/5, size/8, size/4, size/3);
        ellipse(size/5, size/8, size/4, size/3);
        
        // Add some shadow underneath
        fill("#C8C8C8");
        ellipse(0, size/6, size/1.5, size/8);
        break;
        
      case "brick":
        // Detailed brick with texture
        fill("#C62828"); // Main brick color
        rect(0, 0, size/1.5, size/2.5, size/30); // Rounded corners
        
        // Add brick texture/details
        fill("#B71C1C"); // Darker shade for details
        rect(-size/8, 0, size/12, size/2.5); // Left groove
        rect(size/8, 0, size/12, size/2.5); // Right groove
        
        // Add highlights/shadows for 3D effect
        fill("#FFFFFF"); // Highlight
        rect(-size/3.5, -size/6, size/1.6, size/12, size/50);
        
        fill("#000000"); // Shadow
        rect(-size/3.5, size/6, size/1.6, size/12, size/50);
        break;
        
      case "plant":
        // Plant with stem, leaves and soil
        // Soil
        fill("#5D4037");
        arc(0, size/4, size/1.5, size/3, PI, TWO_PI);
        
        // Stem
        fill("#4CAF50");
        rect(0, 0, size/12, size/2);
        
        // Leaves
        fill("#66BB6A");
        push();
        translate(-size/6, -size/6);
        rotate(-PI/4);
        ellipse(0, 0, size/4, size/8);
        pop();
        
        push();
        translate(size/6, -size/4);
        rotate(PI/4);
        ellipse(0, 0, size/4, size/8);
        pop();
        
        // Small flower or bud at top
        fill("#A5D6A7");
        ellipse(0, -size/3, size/6, size/6);
        fill("#81C784");
        ellipse(0, -size/3, size/10, size/10);
        break;

      // Tier 3 elements
      case "tree":
        // Detailed tree with trunk and layered foliage
        // Trunk
        fill("#795548");
        rect(0, size/6, size/8, size/3);
        
        // Tree bark texture
        fill("#6D4C41");
        rect(-size/25, size/6, size/20, size/3);
        rect(size/25, size/4, size/20, size/6);
        
        // Foliage layers (from bottom to top)
        fill("#2E7D32"); // Dark green
        triangle(-size/2.2, size/10, 0, -size/6, size/2.2, size/10);
        
        fill("#388E3C"); // Medium green
        triangle(-size/2.5, -size/8, 0, -size/3, size/2.5, -size/8);
        
        fill("#43A047"); // Light green
        triangle(-size/3, -size/4, 0, -size/2, size/3, -size/4);
        
        // Add some texture to the foliage
        fill("#1B5E20"); // Dark green
        ellipse(-size/5, -size/8, size/8, size/8);
        ellipse(size/6, -size/5, size/8, size/8);
        ellipse(0, -size/3, size/10, size/10);
        break;
        
      case "storm":
        // Dynamic storm cloud with lightning and rain
        // Dark storm cloud
        fill("#37474F");
        beginShape();
        for (let i = 0; i < TWO_PI; i += 0.2) {
          let r = size/2 * (0.6 + 0.3 * sin(i * 4));
          let px = r * cos(i);
          let py = r * sin(i) * 0.5 - size/10; // Flatten and raise it
          vertex(px, py);
        }
        endShape(CLOSE);
        
        // Add cloud details
        fill("#455A64");
        ellipse(-size/3, -size/6, size/3, size/5);
        ellipse(size/3, -size/6, size/3, size/5);
        
        // Lightning bolt with glow effect
        fill("#FFFFC8"); // Yellow glow
        ellipse(0, size/8, size/4, size/4);
        
        fill("#FFEB3B");
        beginShape();
        vertex(-size/20, -size/10);
        vertex(size/15, size/15);
        vertex(-size/25, size/8);
        vertex(size/10, size/3);
        endShape(CLOSE);
        
        // Rain drops
        fill("#64B5F6");
        for (let i = 0; i < 6; i++) {
          let x = map(i, 0, 5, -size/2, size/2);
          let y = size/5 + (i % 2) * size/10;
          ellipse(x, y, size/30, size/20);
        }
        break;
        
      case "pottery":
        // Detailed pottery vase with decorations
        // Main vase body
        fill("#A1887F");
        beginShape();
        vertex(-size/3, size/3);
        vertex(-size/3.5, size/6);
        vertex(-size/4, -size/6);
        vertex(-size/5, -size/3);
        vertex(size/5, -size/3);
        vertex(size/4, -size/6);
        vertex(size/3.5, size/6);
        vertex(size/3, size/3);
        endShape(CLOSE);
        
        // Vase opening
        fill("#8D6E63");
        ellipse(0, -size/3, size/2.5, size/6);
        fill("#795548");
        ellipse(0, -size/3, size/3.5, size/12);
        
        // Decorative patterns
        stroke("#5D4037");
        strokeWeight(size/60);
        noFill();
        
        // Neck pattern
        line(-size/4, -size/4, size/4, -size/4);
        
        // Middle pattern
        beginShape();
        for (let i = 0; i < TWO_PI; i += PI/8) {
          let r = size/4;
          let px = r * cos(i) * 0.8; // Flatten it horizontally
          let py = r * sin(i) * 0.2 + size/10; // Flatten it vertically and position
          curveVertex(px, py);
        }
        endShape();
        
        // Base pattern
        line(-size/3, size/4, size/3, size/4);
        
        noStroke();
        break;
        
      case "crystal":
        // Multifaceted crystal with reflections
        // Main crystal body
        fill("#B39DDB");
        beginShape();
        vertex(0, -size/2);
        vertex(size/4, -size/4);
        vertex(size/4, size/4);
        vertex(0, size/2);
        vertex(-size/4, size/4);
        vertex(-size/4, -size/4);
        endShape(CLOSE);
        
        // Inner facets
        fill("#9575CD");
        beginShape();
        vertex(0, -size/3);
        vertex(size/6, -size/6);
        vertex(0, size/6);
        vertex(-size/6, -size/6);
        endShape(CLOSE);
        
        // Highlights/reflections
        fill("#FFFFFF");
        beginShape();
        vertex(-size/4, -size/4);
        vertex(-size/8, -size/8);
        vertex(-size/4, size/8);
        endShape(CLOSE);
        
        // Sparkle effects
        fill("#FFFFFF");
        for (let i = 0; i < 3; i++) {
          let angle = random(TWO_PI);
          let r = random(size/10, size/6);
          let x = r * cos(angle);
          let y = r * sin(angle);
          
          // Star shape
          push();
          translate(x, y);
          rotate(random(TWO_PI));
          for (let j = 0; j < 4; j++) {
            rotate(PI/2);
            stroke("#FFFFFF");
            line(0, 0, 0, size/20);
          }
          pop();
        }
        noStroke();
        break;
        
      case "glass":
        // Realistic glass with transparency and reflections
        // Semi-transparent glass pane
        fill("#C8DCF0");
        rect(0, 0, size/1.5, size/1.5, size/30);
        
        // Add glass shine/reflections
        stroke("#FFFFFF");
        strokeWeight(size/40);
        line(-size/4, -size/4, size/4, size/4);
        
        // Add subtle blue tint along edges
        strokeWeight(size/20);
        stroke("#B4C8FF");
        noFill();
        rect(0, 0, size/1.3, size/1.3, size/25);
        
        // Edge highlight
        strokeWeight(size/60);
        stroke("#FFFFFF");
        rect(0, 0, size/1.5, size/1.5, size/30);
        
        noStroke();
        break;
        
      case "wall":
        // Detailed brick wall with mortar and texture
        // Background/mortar
        fill("#E0E0E0");
        rect(0, 0, size/1.2, size/1.2);
        
        // Brick pattern with offset rows
        fill("#C62828");
        
        // First row
        for (let x = -size/2.8; x <= size/2.8; x += size/3.5) {
          rect(x, -size/4, size/4, size/8);
          
          // Add brick texture
          fill("#B71C1C");
          rect(x, -size/4, size/20, size/8); // Shadow side
          fill("#D32F2F");
          rect(x + size/12, -size/4, size/20, size/8); // Highlight side
          fill("#C62828"); // Reset for next brick
        }
        
        // Second row (offset)
        for (let x = -size/3.8; x <= size/3.8; x += size/3.5) {
          rect(x, 0, size/4, size/8);
          
          // Add brick texture
          fill("#B71C1C");
          rect(x, 0, size/20, size/8);
          fill("#D32F2F");
          rect(x + size/12, 0, size/20, size/8);
          fill("#C62828");
        }
        
        // Third row
        for (let x = -size/2.8; x <= size/2.8; x += size/3.5) {
          rect(x, size/4, size/4, size/8);
          
          // Add brick texture
          fill("#B71C1C");
          rect(x, size/4, size/20, size/8);
          fill("#D32F2F");
          rect(x + size/12, size/4, size/20, size/8);
          fill("#C62828");
        }
        break;
        
      case "fog":
        // Atmospheric fog with depth and movement
        noStroke();
        
        // Create layered fog effect with different opacities
        for (let i = 0; i < 12; i++) {
          // Vary the opacity based on position to create depth
          let fogColor = color("#F5F5FA");
          fogColor.setAlpha(map(i, 0, 12, 50, 200));
          fill(fogColor);
          
          // Create swirling fog effect
          let xOffset = sin(i * 0.5) * size/6;
          let yOffset = cos(i * 0.5) * size/8;
          let fogWidth = map(i, 0, 12, size/4, size/1.5);
          let fogHeight = map(i, 0, 12, size/6, size/3);
          
          ellipse(xOffset, yOffset, fogWidth, fogHeight);
        }
        
        // Add some subtle highlights
        fill("#FFFFFF");
        ellipse(size/6, -size/8, size/3, size/5);
        ellipse(-size/5, size/10, size/4, size/4);
        
        // Add subtle depth shadows
        fill("#C8C8DC");
        ellipse(0, size/6, size, size/3);
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