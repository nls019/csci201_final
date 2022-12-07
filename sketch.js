var playerRef;
var boxes = [];
var finish;
function setup() {
  createCanvas(600, 400);
  background(220);
  fill(255);
  for (numBoxes = 0; numBoxes < 8; numBoxes++) {
    boxes[numBoxes] = new Box(random(30, 500), random(30, 300), random(30, 100), random(30, 100), 'obstacle');
  }
  fill(0, 255, 0);
  finish = new Box(500,350,100,50, 'finish');
  playerRef = new Player(20, 20);
}

function draw() {
  playerRef.display();
  if (keyIsDown(LEFT_ARROW)) {
    playerRef.playerX -= 5;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerRef.playerX += 5;
  }
  else if (keyIsDown(UP_ARROW)) {
    playerRef.playerY -= 5;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerRef.playerY += 5;
  }
  
  for (i = 0; i < boxes.length; i++) {
    boxes[i].checkCollision(playerRef.playerX, playerRef.playerY);
  }
  finish.checkCollision(playerRef.playerX, playerRef.playerY);
}

class Player {
  constructor(playerX, playerY) {
    this.playerX = playerY;
    this.playerY = playerY;
    
  }
  
  display() {
    fill(0);
    ellipse(this.playerX, this.playerY, 30);
  }
  
  restart() {
    this.playerX = 20;
    this.playerY = 20;
    clear();
    background(220);
    fill(255);
    for (numBoxes = 0; numBoxes < 5; numBoxes++) {
      boxes[numBoxes] = new Box(random(50, 500), random(50, 300), random(10, 100), random(10, 100));
    }
    fill(0, 255, 0);
    finish = new Box(500,350,100,50, 'finish');
  }
  
  win() {
    clear();
    textSize(32);
    text('You win!', 300, 200);
  }
}

class Box {
  constructor(initialX, initialY, width, height, id) {
    this.x = initialX;
    this.y = initialY;
    this.width = width;
    this.height = height;
    this.id = id;
    rect(this.x, this.y, this.width, this.height);
  }
  
  checkCollision(playerX, playerY) {
    if (playerX + 15 >= (this.x - this.width / 2) && playerX - 15 <= (this.x + this.width / 2) && playerY + 15 >= (this.y - this.height / 2) && playerY - 15 <= (this.y + this.height / 2)) {
      if (this.id === 'finish') {
        playerRef.win();
      }
      else {
        playerRef.restart();
      }
    }
  }
}