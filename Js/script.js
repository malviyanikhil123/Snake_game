let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('Music/food.mp3');
const gameOverSound = new Audio('Music/gameover.mp3');
const moveSound = new Audio('Music/move.mp3');
const musicSound = new Audio('Music/music.mp3');

let lastPrintTime = 0;
let Speed = 5;
let score = 0;
let snakeArray = [
    { x: 13, y: 15 }
];
let food = { x: 6, y: 7 };

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPrintTime) / 1000 < 1 / Speed) {
        return;
    }
    lastPrintTime = ctime;
    gameEngien();
}

function isCollide(snake) {
    // Implement collision detection logic here
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}

function gameEngien() {
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over: if you want to play again, press any key!");
        snakeArray = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // Check if snake has eaten the food
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "HiScore: " + highscoreval;
        }
        scoreBox.innerHTML = "Score : " + score
        snakeArray.unshift({ x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y });

        // Generate new food position within bounds
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    // Move the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    // Display the snake and food
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    highscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(highscoreval))
}
else {
    highscoreval = JSON.parse(hiscore);
    highscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
