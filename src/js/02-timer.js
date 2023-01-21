import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  daysRef: document.querySelector('span[data-days]'),
  hoursRef: document.querySelector('span[data-hours]'),
  minutesRef: document.querySelector('span[data-minutes]'),
  secondsRef: document.querySelector('span[data-seconds]'),
};

refs.btnStart.addEventListener('click', onStart);
refs.btnStart.disabled = true;

let counter = {};
let timerID = 0;
let selectedDate = [];

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    getDateDifference();
    clearInterval(timerID);
  },
});

function onStart() {
  timerID = setInterval(updateInterface, 1000);
}

function getDateDifference() {
  const currentDate = new Date().getTime();
  const difference = selectedDate - currentDate;

  if (difference > 0) {
    refs.btnStart.disabled = false;
    counter = convertMs(difference);
  } else {
    refs.btnStart.disabled = true;
    window.alert('Please choose a date in the future');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateInterface() {
  getDateDifference();
  refs.daysRef.textContent = addLeadingZero(counter.days);
  refs.hoursRef.textContent = addLeadingZero(counter.hours);
  refs.minutesRef.textContent = addLeadingZero(counter.minutes);
  refs.secondsRef.textContent = addLeadingZero(counter.seconds);
  refs.btnStart.disabled = true;
}
