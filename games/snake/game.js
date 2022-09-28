import { update as updateSnake, draw as drawSnake, snakeSpeed,
        getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import { getPaused } from './input.js';
import { pause, unpause } from './pause.js'

let lastRenderTime = 0;
let gameOver = false;
let gamePaused = false;
const gameBoard = document.getElementById('game-board'); 

function main(currentTime) {
    if (gameOver) {
        if (confirm("You lost. Press ok to restart.")) {
            gameOver = false;
            window.location = '/snake';
        } 
        return;
    }

    window.requestAnimationFrame(main);

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;
    
    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {

    if (gamePaused) {
        if (!getPaused()) {
            unpause();
            gamePaused = false;
        } else {
            return;
        }
    }

    updateSnake();
    updateFood();
    checkForDeath();

    // ESC TO PAUSE OR UNPAUSE
    if (getPaused()) {
        pause();
        gamePaused = true;
    }
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkForDeath() {
    gameOver = outsideGrid( getSnakeHead() ) || snakeIntersection();
}