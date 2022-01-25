const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 900;

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};

const img = new Image();
img.src = "../images/ufo.png";

class Player {
  constructor() {
    this.x = canvas.width / 2 - 50;
    this.y = canvas.height / 2 - 50;
    this.driftX = 0;
    this.driftY = 0;
    this.w = 120;
    this.h = 60;
    this.angle = 0;
    this.image = "../images/racecar.png";
  }
  //   newPos() {
  //     this.x += this.speedX;
  //     this.y += this.speedY;
  //   }

  move(direction) {
    switch (direction) {
      case "left":
        if (this.x <= 10) {
          this.x = 10;
          this.driftX = 0;
          this.driftY = 0;
        } else {
          this.x -= 15;
          this.driftX = -0.6;
        }
        break;
      case "right":
        if (this.x + this.w >= canvas.width - 10) {
          this.x = canvas.width - 10 - this.w;
          this.driftX = 0;
          this.driftY = 0;
        } else {
          this.x += 15;
          this.driftX = 0.6;
        }
        break;
      case "up":
        if (this.y <= 10) {
          this.y = 10;
          this.driftX = 0;
          this.driftY = 0;
        } else {
          this.y -= 15;
          this.driftY = -0.6;
        }
        break;
      case "down":
        if (this.y + this.h >= canvas.height - 10) {
          this.y = canvas.height - 10 - this.h;
          this.driftX = 0;
          this.driftY = 0;
        } else {
          this.y += 15;
          this.driftY = 0.6;
        }
    }
  }
}

class Item {
  constructor(id) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.w = 20;
    this.h = 20;
    this.points = this.generatePoints();
    this.id = id;
  }

  generatePoints = () => {
    return Math.floor(Math.random() * 5) + 1;
  };
}

let itemArr = [];

function addItem() {
  itemArr.push(new Item(1));
}

const itemInterval = setInterval(addItem, 7000);

let score = 0;

function detectCollision(player, obj) {
  if (
    player.x < obj.x + obj.w &&
    player.x + player.w > obj.x &&
    player.y < obj.y + obj.h &&
    player.y + player.h > obj.y
  ) {
    score += obj.points;
  }
}

let time = 30;
function timer() {
  time -= 1;
  console.log(time);
}

const driver = new Player();

function startGame() {
  setInterval(timer, 1000);
  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "ArrowLeft":
        driver.move("left");
        break;
      case "ArrowRight":
        driver.move("right");
        break;
      case "ArrowUp":
        driver.move("up");
        break;
      case "ArrowDown":
        driver.move("down");
        break;
    }
  });

  animate();
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  driver.x += driver.driftX;
  driver.y += driver.driftY;
  ctx.drawImage(img, driver.x, driver.y, driver.w, driver.h);
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Time:" + time, 20, 20);
  detectWalls(driver);
  window.requestAnimationFrame(animate);
};

const detectWalls = (player) => {
  if (player.x < 10) {
    player.x = 11;
    player.driftX = 0;
    player.driftY = 0;
  }
  if (player.x + player.w > canvas.width - 10) {
    player.driftX = 0;
    player.driftY = 0;
  }
  if (player.y < 10) {
    player.driftX = 0;
    player.driftY = 0;
  }
  if (player.y > canvas.height - player.h - 10) {
    player.driftX = 0;
    player.driftY = 0;
  }
};
