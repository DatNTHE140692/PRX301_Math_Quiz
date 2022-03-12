const scoreEl = document.querySelector('#score-value');
const levelEl = document.querySelector('#level-value');
const progressEl = document.querySelector('#progress');
const btnAgreeEl = document.querySelector('#btn-agree');
const btnDisAgreeEl = document.querySelector('#btn-disagree');
const qsContentEl = document.querySelector('#qs-content');
const qsAnswerEl = document.querySelector('#qs-answer');

// Methods
const setLevel = (value) => levelEl.innerText = value;
const setScore = (value) => scoreEl.innerText = value;
const setProgress = (percent) => progressEl.style.width = `${percent}%`;

// Game info
const INIT_LEVEL = 1;
const INIT_SCORE = 0;
const INIT_PROGRESS = 20;
const LEVEL_STEP = 1;
const SCORE_STEP = 5;
const PROGRESS_STEP = 20;
const MAX_EXCLUSIVE_NUMBER = 1000;
const OPERATORS = ['+', '-', '*'];
const RESULTS = [true, false];

let level = 1;
let score = 0;
let progress = 0;

let firstNumber;
let secondNumer;
let operator;
let result;
let answer;
let userChoice;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const generateEquation = () => {
    firstNumber = getRandomNumber(0, MAX_EXCLUSIVE_NUMBER);
    secondNumer = getRandomNumber(0, MAX_EXCLUSIVE_NUMBER);
    operator = OPERATORS[getRandomNumber(0, OPERATORS.length)];
    switch (operator) {
        case '+':
            result = firstNumber + secondNumer;
            answer = getRandomNumber(0, MAX_EXCLUSIVE_NUMBER + MAX_EXCLUSIVE_NUMBER);
            break;
        case '-':
            result = firstNumber - secondNumer;
            answer = getRandomNumber(MAX_EXCLUSIVE_NUMBER * (-1), MAX_EXCLUSIVE_NUMBER);
            break;
        case '*':
            result = firstNumber * secondNumer;
            answer = getRandomNumber(0, MAX_EXCLUSIVE_NUMBER * MAX_EXCLUSIVE_NUMBER);
            break;
        default:
            break;
    }
    qsContentEl.innerText = `${firstNumber} ${operator} ${secondNumer}`;
    qsAnswerEl.innerText = answer;
}

const reset = () => {
    level = INIT_LEVEL;
    score = INIT_SCORE;
    progress = INIT_PROGRESS;
}

const init = () => {
    reset();
    setMetaInfo();
    generateEquation();
}

const doWhenCorrect = () => {
    level += LEVEL_STEP;
    score += SCORE_STEP;
    progress = (level / (100 / PROGRESS_STEP)) * 100 % 100;
    if (0 === progress) progress = 100;
    setMetaInfo();
}

const doWhenIncorrect = () => {
    alert('Game Over! Play new Game?');
    init();
}

const setMetaInfo = () => {
    setLevel(level);
    setScore(score);
    setProgress(progress);
}

const isAnswerCorrect = (value) => {
    return value === (answer === result);
}

btnAgreeEl.addEventListener('click', (e) => {
    if (isAnswerCorrect(true)) {
        doWhenCorrect();
        generateEquation();
    } else {
        doWhenIncorrect();
    }
});

btnDisAgreeEl.addEventListener('click', (e) => {
    if (isAnswerCorrect(false)) {
        doWhenCorrect();
        generateEquation();
    } else {
        doWhenIncorrect();
    }
});