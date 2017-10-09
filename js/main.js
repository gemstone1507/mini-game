console.log('test');
'use strict'
const holes = document.getElementsByClassName('game__canvas--block');
const person = document.getElementsByClassName('gc__block--person');
const timerToEnd = document.getElementById('timer');
const score = document.getElementById('score');
const startBtn = document.getElementById('btn_start');
const stopBtn = document.getElementById('btn_stop');
const newPerson = document.getElementsByClassName('person__choosen');
const chooseBtn = document.getElementById('choose__person');
const personList = document.getElementById('persons__list');
let lastHole;
let startGame = false;
let gameTimerTest = false;
let kick;
stopBtn.disabled = true;

// оберає рандомно звідки вилізе персонаж
function chooseRandomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        // console.log('try again');
        return chooseRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}
// рандомна генерація часу
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// прижок персонажу
function peep() {
    const time = randomTime(400, 900);
    const hole = chooseRandomHole(holes);
    hole.childNodes[1].classList.add('up');
    setTimeout(() => {
        hole.childNodes[1].classList.remove('up');
        if (!startGame) peep();
    }, time);

}
// таймер 60 сек на гру
function gameTimer() {

    let timerCounter = 59;

    setInterval(function () {
        if (!gameTimerTest) {
            if (timerCounter < 0) {
                startGame = true;
            }
            else {
                timerToEnd.innerHTML = timerCounter;
                timerCounter--;
            }
        }
        else {
            timerCounter = 60;
            timerToEnd.innerHTML = timerCounter;
        }
    }, 1000)
}
for (let i = 0; i < person.length; i++) {
    person[i].addEventListener('click', kickCounter);
}
function kickCounter() {
    this.classList.remove('up');
    kick++;
    score.innerHTML = kick;
}
// запуск гри
function start() {
    kick = 0;
    score.innerHTML = kick;
    gameTimerTest = false;
    startGame = false;
    gameTimer();
    peep();
    startBtn.disabled = true;
    stopBtn.disabled = false;
}
function stop() {
    startGame = true;
    gameTimerTest = true;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}
for (let i = 0; i < newPerson.length; i++) {
    newPerson[i].addEventListener('click', changePerson)
}
function changePerson() {
    // person.src = this.getAttribute('data-item');
    for (let i = 0; i < person.length; i++) {
        person[i].src = this.getAttribute('data-item')
    }

}
function openList() {
    personList.classList.toggle('display__none');
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
chooseBtn.addEventListener('click', openList)
