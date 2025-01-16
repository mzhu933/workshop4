// Array to hold images
let images = [];
let displayedImages = [];

// UI Elements
let button, checkbox, slider;

function preload() {
  // Load images
  images[0] = loadImage("images/img1.png");
  images[1] = loadImage("images/img2.png");
  images[2] = loadImage("images/img3.png");
}

function setup() {
  // Create canvas
  createCanvas(windowWidth, windowHeight);
  background(255, 182, 193); // Light pink background

  // Create button to display random image
  button = createButton("Click Here");
  button.position(10, 10);
  button.mousePressed(showRandomImage);

  // Create checkbox to toggle background color
  checkbox = createCheckbox("Light Blue Background", false);
  checkbox.position(120, 10);

  // Create slider to adjust image color
  slider = createSlider(0, 1, 0, 0.01); // Range 0 (original color) to 1 (posterize effect)
  slider.position(10, 40);
}

function draw() {
  // Set background color based on checkbox
  if (checkbox.checked()) {
    background(173, 216, 230); // Light blue
  } else {
    background(255, 182, 193); // Light pink
  }

  // Display all previously shown images
  for (let imgData of displayedImages) {
    let processedImage = adjustImageColor(imgData.img, slider.value());
    imageMode(CENTER);
    image(processedImage, imgData.x, imgData.y, 300, 300); // Unified size
  }
}

function showRandomImage() {
  let img = random(images);
  let x = random(150, width - 150); // Avoid edges
  let y = random(150, height - 150);
  displayedImages.push({ img, x, y });
}

function adjustImageColor(img, effectLevel) {
  let adjustedImg = createImage(img.width, img.height);
  img.loadPixels();
  adjustedImg.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    let r = img.pixels[i];
    let g = img.pixels[i + 1];
    let b = img.pixels[i + 2];

    // Apply posterize effect based on slider value
    let steps = lerp(256, 5, effectLevel); // Interpolates between full color (256 levels) and posterized (5 levels)
    let newR = Math.floor(r / steps) * steps;
    let newG = Math.floor(g / steps) * steps;
    let newB = Math.floor(b / steps) * steps;

    adjustedImg.pixels[i] = newR;
    adjustedImg.pixels[i + 1] = newG;
    adjustedImg.pixels[i + 2] = newB;
    adjustedImg.pixels[i + 3] = img.pixels[i + 3]; // Keep alpha unchanged
  }

  adjustedImg.updatePixels();
  return adjustedImg;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}