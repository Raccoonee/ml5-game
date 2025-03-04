let elementMagnets = [
    { name: "fire", color: "#FF5722" },
    { name: "water", color: "#2196F3" },
    { name: "air", color: "#E0F7FA" },
    { name: "earth", color: "#795548" }
  ];
  
  class Magnet {
    constructor() {
      // Pick a random element
      this.element = random(elementMagnets);
      this.t = this.element.name;
      this.x = random(width);
      this.y = random(height);
      this.angle = random(TWO_PI);
      this.c = color(255);
      
      // Update how we handle the font bounding box
      textFont(font);
      textSize(size/2);
      textAlign(CENTER, CENTER);
      this.w = textWidth(this.t) + 60; // Add more padding for icons
      this.h = size + 20; // Increase height for icons
      this.bbox = { x: this.x, y: this.y, w: this.w, h: this.h };
      this.pos = createVector(this.bbox.x, this.bbox.y);
      this.w = this.bbox.w;
      this.h = this.bbox.h;
      
      this.fingerx = 0;
      this.fingery = 0;
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
      
      fill(255, 0, 0);
      ellipse(this.fingerx, this.fingery, 10, 10);
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
      }
      
      pop();
    }
    
    touch(thumbx, thumby, indexx, indexy) {
      let distBetweenFingers = dist(thumbx, thumby, indexx, indexy);
      this.fingerx = abs(thumbx - indexx) + min(thumbx, indexx);
      this.fingery = abs(thumby - indexy) + min(thumby, indexy);
      
      let distFromFingers = dist(this.pos.x, this.pos.y, this.fingerx, this.fingery);
      
      if (distBetweenFingers < 40 && distFromFingers < this.w/2) {
        this.c = color(this.element.color); // Use element color when selected
        this.pos.x = this.fingerx;
        this.pos.y = this.fingery;
      } else {
        this.c = color(255);
      }
    }
  }