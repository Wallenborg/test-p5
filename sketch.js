let noiseScale = 0.01; 
let baseFlowSpeed = 0.002; 
let impactPoints = []; 
let impactRadius = 100;
let fadeDuration = 200; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill(); 
  stroke(180); 
}

function draw() {
  background(20); 
  drawWavesWithPushEffect(); 
}

function drawWavesWithPushEffect() {
  for (let y = 0; y < height; y += 15) { 
    beginShape();
    for (let x = 0; x < width; x += 10) { 
      let flowSpeed = baseFlowSpeed;
      let noiseFactor = noise(x * noiseScale, y * noiseScale + frameCount * flowSpeed);

     
      let yOffset = map(pow(noiseFactor, 3), 0, 1, -150, 150); 

  
      let xOffset = 0;
      for (let i = 0; i < impactPoints.length; i++) {
        let impactPoint = impactPoints[i];
        let d = dist(x, y, impactPoint.x, impactPoint.y); 
        let timePassed = frameCount - impactPoint.time;

       
        if (timePassed > fadeDuration) {
          impactPoints.splice(i, 1);
          continue;
        }

   
        if (d < impactRadius) {
          let effectStrength = map(timePassed, 0, fadeDuration, 1, 0); 
          
    
          let pushForce = map(d, 0, impactRadius, 100, 0) * effectStrength;
          xOffset += (x - impactPoint.x) / d * pushForce; 
          yOffset += (y - impactPoint.y) / d * pushForce; 
        }
      }

    
      vertex(x + xOffset, y + yOffset); 
    }
    endShape();
  }
}


function mousePressed() {
  impactPoints.push({x: mouseX, y: mouseY, time: frameCount}); 
}


function touchEnded() {
  impactPoints.push({x: touchX, y: touchY, time: frameCount}); 
  return false; 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}