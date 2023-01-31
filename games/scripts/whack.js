const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');

const score = document.querySelector('#score');
const timeLeft = document.querySelector('#time-left');

const TIMER_LENGTH = 500;

let result = 0;
let hitPos;
let currentTime = 60;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPos = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPos) {
            result++;
            console.log(result);
            score.textContent = result;
            hitPos = null;
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, TIMER_LENGTH);
}

let timerId = null; 
moveMole();

function countdown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countdownTimerId);
        clearInterval(timerId);
        alert('GAME OVER! Your final score is ' + result);
    }
}

let countdownTimerId = setInterval(countdown, 1000);