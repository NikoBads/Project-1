import Player from "/player.js";
let engine;
let timeInterval;
let itemInterval;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 600;
canvas.width = 900;

let driver;

window.onload = () => {
    document.getElementById("start-button").onclick = () => {
        startGame();
        document.getElementById("start-button").style.visibility = "hidden";
    };
};

const meow1 = new Audio();
meow1.src = "/sounds/meow1";

const meow2 = new Audio();
meow2.src = "/sounds/meow2";

const meow3 = new Audio();
meow3.src = "/sounds/meow3";

const meow4 = new Audio();
meow4.src = "/sounds/meow4";

const meow5 = new Audio();
meow5.src = "/sounds/meow5";

const meow6 = new Audio();
meow6.src = "/sounds/meow6";

let meowArr = [meow1, meow2, meow3, meow4, meow5, meow6];

var audioType;
var audio = new Audio();
if (audio.canPlayType("audio/mp3")) {
    audioType = ".mp3";
}

function playAudio(meowsound) {
    var audio = new Audio("/sounds/meow5" + audioType);
    audio.play();
}

let gameStart = false;

const img = new Image();
img.src = "/images/ufo.png";

const bgimg = new Image();
bgimg.src = "/images/AlienCats.png";

const cat1 = new Image();
cat1.src = "/images/cat1.png";
const cat2 = new Image();
cat2.src = "/images/cat2.png";
const cat3 = new Image();
cat3.src = "/images/cat3.png";
const cat4 = new Image();
cat4.src = "/images/cat4.png";

let imageArr = [cat1, cat2, cat3, cat4];

function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

class Item {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.w = 35;
        this.h = 40;
        this.points = 5;
        this.image = randomElement(imageArr);
        this.sound = randomElement(meowArr);
    }
}

let itemArr = [];

function addItem() {
    itemArr.push(new Item());
}

let score = 0;

let time = 30;

function timer() {
    --time;
    if (time < 0) {
        time = 30;
    }
}

let oneSecond = 1000;

//
// ENGINE
//

document.addEventListener("keydown", function(e) {
    e.preventDefault();
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

function startGame() {
    if (!gameStart) {
        time = 30;
        driver = new Player(canvas.width, canvas.height);
        score = 0;
        itemArr = [];
        timeInterval = setInterval(timer, oneSecond);
        gameStart = true;
        animate();
    }
}

let spawn = 60;

const animate = () => {
    engine = window.requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let guess = Math.floor(Math.random() * 120);
    // console.log(guess);
    if (guess === spawn) {
        addItem();
    }
    driver.x += driver.driftX;
    driver.y += driver.driftY;
    ctx.drawImage(img, driver.x, driver.y, driver.w, driver.h);
    ctx.fillStyle = "#21ff00";
    ctx.font = "24px Arial";
    ctx.fillText("Time:" + time, 15, 20);
    ctx.fillText("Score:" + score, 15, 45);
    detectWalls(driver);

    for (let i = 0; i < itemArr.length; i++) {
        const item = itemArr[i];

        ctx.fillStyle = "black";
        ctx.drawImage(item.image, item.x, item.y, item.w, item.h);
        detectCollision(driver, item);
        let didCollide = detectCollision(driver, itemArr[i]);
        if (didCollide) {
            itemArr.splice(i, 1);
            playAudio();
        }
    }
    if (time === 0) {
        gameOver();
    }
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
    itemArr = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.drawImage(bgimg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#21ff00";
    ctx.font = "bold 40px fantasy";
    ctx.fillText("GAME OVER", canvas.width / 2 - 110, canvas.height / 2 - 210);
    ctx.fillText(
        "Score:" + score,
        canvas.width / 2 - 75,
        canvas.height / 2 - 170
    );
    document.getElementById("start-button").style.visibility = "visible";
    gameStart = false;
    clearInterval(itemInterval);
    clearInterval(timeInterval);
    window.cancelAnimationFrame(engine);
    score = 0;
}

const detectWalls = (player) => {
    if (player.x < 6) {
        player.x = 11;
        player.driftX = 0;
        player.driftY = 0;
    }
    if (player.x + player.w > canvas.width - 6) {
        player.driftX = 0;
        player.driftY = 0;
    }
    if (player.y < 6) {
        player.driftX = 0;
        player.driftY = 0;
    }
    if (player.y > canvas.height - player.h - 6) {
        player.driftX = 0;
        player.driftY = 0;
    }
};