let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;
let pauseStart;
let totalPausedTime = 0;
let lapsArray = [];

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const display = document.getElementById('display');
const lapsList = document.getElementById('lapsList');

function start() {
    if (!running) {
        if (paused) {
            totalPausedTime += new Date().getTime() - pauseStart;
        } else {
            startTime = new Date().getTime();
        }
        tInterval = setInterval(getShowTime, 1);
        running = true;
        paused = false;
    }
}

function stop() {
    clearInterval(tInterval);
    running = false;
    paused = false;
}

function pause() {
    if (running && !paused) {
        clearInterval(tInterval);
        pauseStart = new Date().getTime();
        paused = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    totalPausedTime = 0;
    display.innerHTML = "00:00:00.000";
    lapsList.innerHTML = "";
    lapsArray = [];
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime - totalPausedTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 1);

    display.innerHTML = (hours < 10 ? "0" : "") + hours + ":" +
                        (minutes < 10 ? "0" : "") + minutes + ":" +
                        (seconds < 10 ? "0" : "") + seconds + "." +
                        (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds;
}

function recordLap() {
    if (running) {
        let lapTime = display.innerHTML;
        lapsArray.push(lapTime);
        let lapItem = document.createElement('li');
        lapItem.innerHTML = lapTime;
        lapsList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
