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
const INIT_PROGRESS = 0;
const LEVEL_STEP = 1;
const SCORE_STEP = 5;
const TOTAL_SECONDS = 30;
const PROGRESS_STEP = 100 / TOTAL_SECONDS;
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
let interval;

const countDown = () => {
    interval = setInterval(() => {
        progress += PROGRESS_STEP;
        setProgress(progress);
        if (100 < progress) doWhenIncorrect();
    }, 1000)
}

const resetCountDown = () => {
    progress = 0;
    setProgress(progress);
    clearInterval(interval);
}

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const generateEquation = () => {
    firstNumber = getRandomNumber(0, MAX_EXCLUSIVE_NUMBER);
    secondNumer = getRandomNumber(0, MAX_EXCLUSIVE_NUMBER);
    operator = OPERATORS[getRandomNumber(0, OPERATORS.length)];
    const equation = `${firstNumber} ${operator} ${secondNumer}`;
    result = eval(equation);
    answer = RESULTS[getRandomNumber(0, RESULTS.length)] ? result : result + getRandomNumber(-10, 10);
    qsContentEl.innerText = equation;
    qsAnswerEl.innerText = answer;
}

const reset = () => {
    resetCountDown();
    level = INIT_LEVEL;
    score = INIT_SCORE;
    progress = INIT_PROGRESS;
}

const init = () => {
    reset();
    setMetaInfo();
    generateEquation();
    countDown();
}

const doWhenCorrect = () => {
    level += LEVEL_STEP;
    score += SCORE_STEP;
    setMetaInfo();
}

const doWhenIncorrect = () => {
    alert(`Game Over! Your Score: ${score} Play new Game?`);
    init();
}

const setMetaInfo = () => {
    setLevel(level);
    setScore(score);
}

const isAnswerCorrect = (value) => {
    return value === (answer === result);
}

const doCheckAnswer = (choice) => {
    if (isAnswerCorrect(choice)) {
        doWhenCorrect();
        generateEquation();
        resetCountDown();
        countDown();
    } else {
        doWhenIncorrect();
    }
}

btnAgreeEl.addEventListener('click', (e) => {
    userChoice = true;
    doCheckAnswer(userChoice);
});

btnDisAgreeEl.addEventListener('click', (e) => {
    userChoice = false;
    doCheckAnswer(userChoice);
});