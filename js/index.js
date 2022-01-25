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
        this.points = 5;
        this.id = id;
        this.image = randomImage();
        this.imageArr = [
            "../images/cat1.png",
            "../images/cat2.png",
            "../images/cat3.png",
            "../images/cat4.png",
        ];
    }
    randomImage() {
        this.imageArr[Math.floor(Math.random() * this.imageArr.length)];
    }
}

let itemArr = [];

function addItem() {
    itemArr.push(new Item(1));
}

let score = 0;

let time = 30;

function timer() {
    time -= 1;
    console.log(time);
}

const driver = new Player();
//
// ENGINE
//
function startGame() {
    setInterval(timer, 1000);
    document.addEventListener("keydown", function(e) {
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
    const itemInterval = setInterval(addItem, 1500);

    animate();
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    driver.x += driver.driftX;
    driver.y += driver.driftY;
    ctx.drawImage(img, driver.x, driver.y, driver.w, driver.h);
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Time:" + time, 15, 20);
    ctx.fillText("Score:" + score, 15, 45);
    detectWalls(driver);

    for (let i = 0; i < itemArr.length; i++) {
        const item = itemArr[i];
        console;
        ctx.fillStyle = "black";
        ctx.drawImage(item.image, item.x, item.y, item.w, item.h);
        detectCollision(driver, item);
        didCollide = detectCollision(driver, itemArr[i]);
        if (didCollide) {
            itemArr.splice(i, 1);
        }
    }

    if (time === 0) {
        gameOver();
    }
    window.requestAnimationFrame(animate);
};

function detectCollision(player, obj) {
    if (
        player.x < obj.x + obj.w &&
        player.x + player.w > obj.x &&
        player.y < obj.y + obj.h &&
        player.y + player.h > obj.y
    ) {
        score += obj.points;
        return true;
    }
}

//
// GAME OVER
//
function gameOver() {
    obstArr = [];
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = 50;
    ctx.fillText("GAME OVER", canvas.width / 2 - 80, canvas.height / 2 - 30);
    ctx.fillText("Score:" + score, canvas.width / 2 - 80, canvas.height / 2);

    window.cancelAnimationFrame(engine);
}

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