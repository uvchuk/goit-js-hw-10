const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

refs.btnStart.addEventListener('click', onBtnStartClick);

refs.btnStop.addEventListener('click', onBtnStopClick);

let timerID = 0;

function onBtnStartClick() {
  timerID = setInterval(changeBodyColor, 1000);
  refs.btnStart.disabled = true;
}

function onBtnStopClick() {
  clearInterval(timerID);
  refs.btnStart.disabled = false;
}

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
