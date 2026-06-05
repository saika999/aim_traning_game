'use strict';

import { range } from './range.js';
import { saveResult } from './saveResult.js';

const btnStart = document.querySelector('#start');
const allScreens = document.querySelectorAll('.screen');
const listTimes = document.querySelector('#time_list');
const listSizes = document.querySelector('#size_list');
const btnNext = document.querySelector('#btn_next');
const timeCounter = document.querySelector('#time');
const inputRange = document.getElementById('range-input');
const board = document.querySelector('#board');

const COLORS = ['#15e943', '#f31212', '#12c3f0', '#f3e51e', '#e914a9'];

let time = 0;
let score = 0;
let autoClickInterval = null;
let timerInterval = null;
let game_time = 0;

range();

btnStart.addEventListener('click', (e) => {
    e.preventDefault();
    allScreens[0].classList.add('up');
});

btnNext.addEventListener('click', () => {
    allScreens[1].classList.add('up');
});

listSizes.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-size');
    if (!btn) return;
    document.querySelectorAll('.btn-size').forEach(b => b.classList.remove('btn-size_active'));
    btn.classList.add('btn-size_active');
    board.style.width = btn.dataset.width + 'px';
    board.style.height = btn.dataset.height + 'px';
});

listTimes.addEventListener('click', getTimeAndStartGame);

function saveGameTime(e) {
    if (!e.target.dataset.time) return;
    time = parseInt(e.target.dataset.time);
    game_time = time;
    score = 0;
    allScreens[2].classList.add('up');
    return game_time;
}

function getTimeAndStartGame(e) {
    saveGameTime(e);
    startGame();
}

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
    if (e.target.id === 'restart') {
        location.reload();
    }
});

function startGame() {
    createRandomCircle();
    timerInterval = setInterval(decreaseTime, 1000);
    // if (parseInt(inputRange.value) > 0) winGame();
}

function finishGame() {
    clearInterval(timerInterval);
    clearInterval(autoClickInterval);
    timeCounter.parentNode.classList.add('hide');
    board.innerHTML = `
        <h1>Счёт: <span class="primary">${score}</span></h1>
        <button id="restart" class="btn-restart">Играть заново</button>
    `;
    saveResult(score, game_time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
        return;
    }
    const currentTime = --time;
    setTime(currentTime < 10 ? `0${currentTime}` : `${currentTime}`);
}

function setTime(value) {
    timeCounter.innerHTML = `00:${value}`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(15, 40);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.setAttribute('id', 'circle-el');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = getRandomColor(COLORS);

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor(colorsArr) {
    return colorsArr[getRandomNumber(0, colorsArr.length)];
}

function winGame() {
    function killCircle() {
        const circleEl = document.getElementById('circle-el');
        if (circleEl) circleEl.click();
    }

    let currentMs = parseInt(inputRange.value);
    autoClickInterval = setInterval(killCircle, currentMs);

    inputRange.addEventListener('input', () => {
        clearInterval(autoClickInterval);
        currentMs = parseInt(inputRange.value);
        if (currentMs > 0) autoClickInterval = setInterval(killCircle, currentMs);
    });
}