const timerDOM = document.getElementById("timer");

let timer;

let start = false;
let hours = 0;
let minutes = `0${0}`;
let seconds = `0${0}`;
let totalPoints = 9999; // almost 3 hours to solve the sudoku

const resetTimer = () => {
  minutes = `0${0}`;
  seconds = `0${0}`;
  hours = 0;
  timer = `${hours}:${minutes}:${seconds}`;
  timerDOM.innerText = timer;
};

const stopTimer = () => (start = false);
const startTimer = () => (start = true);

setInterval(() => {
  if (start) {
    seconds++;
    seconds < 10 ? (seconds = `0${seconds}`) : (seconds = seconds);
    if (seconds == 60) {
      minutes++;
      seconds = `0${0}`;
      seconds = seconds;
      minutes < 10 ? (minutes = `0${minutes}`) : (minutes = minutes);
    }
    if (minutes == 60) {
      hours++;
      minutes == 60 ? (minutes = `0${0}`) : (minutes = minutes);
    }
    timer = `${hours}:${minutes}:${seconds}`;
    timerDOM.innerText = timer;
    totalPoints--;
  }
}, 1000);

function calculateFinalPoints(level) {
  return totalPoints + level * 100;
}

export { stopTimer, startTimer, resetTimer, timer, calculateFinalPoints };
