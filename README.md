# Known Pleasures - Wave Interaction in p5.js

## Description
This project creates a dynamic, interactive wave pattern using the p5.js library. Users can click or tap on the screen, causing waves to "push away" from the point of interaction, mimicking a ripple effect. The waves gradually return to their original positions over time, creating a smooth and organic flow.

## Features
- **Interactive Waves**: Click or tap to create ripple effects that push the waves away from the point of interaction.
- **Dynamic Push Effect**: The strength of the push diminishes as the waves move further from the interaction point.
- **Auto-resizing Canvas**: The canvas automatically resizes to fit the window, ensuring full-screen coverage on any device.

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd <your-project-directory>
    ```



2. Create an `index.html` file with the following content:
    ```html
    <!DOCTYPE html>
    <html lang="sv">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Known Pleasures</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <script src="sketch.js"></script>
    </body>
    </html>
    ```

3. Create a `styles.css` file to style the canvas:
    ```css
    body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      overflow: hidden;
    }
    ```

4. Create the `sketch.js` file for the wave animation:
    ```javascript
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
    ```

## How to Run

1. Open the `index.html` file in your web browser.
2. Click or tap anywhere on the screen to interact with the waves.
3. Resize the browser window, and the canvas will automatically adjust.

## Customization
- **Wave Speed**: Adjust the `baseFlowSpeed` to control how fast the waves move.
- **Impact Radius**: Modify the `impactRadius` to change how large the ripple effect is.
- **Fade Duration**: Tweak the `fadeDuration` value to adjust how long the impact lasts.

## License
This project is open-source and available under the [MIT License](LICENSE).

Enjoy creating your own dynamic, interactive wave animations!
