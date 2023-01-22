import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  delayIn: document.querySelector('input[name="delay"]'),
  stepIn: document.querySelector('input[name="step"]'),
  amountIn: document.querySelector('input[name="amount"]'),
  createBtn: document.querySelector('button[type="submit"]'),
};

refs.createBtn.addEventListener('click', onSubmit);
let position = 0;
let delayInValue = 0;

function onSubmit(evt) {
  evt.preventDefault();
  delayInValue = refs.delayIn.value;
  refs.createBtn.disabled = true;
  setTimeout(showPromise, delayInValue);
}

function showPromise() {
  const stepInValue = refs.stepIn.value;
  const amountInValue = refs.amountIn.value;
  let summaryDelay = +delayInValue;
  const promise = setInterval(() => {
    position += 1;
    if (position <= amountInValue) {
      createPromise(position, summaryDelay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
        });
      summaryDelay += +stepInValue;
    } else {
      clearInterval(promise);
      position = 0;
      refs.createBtn.disabled = false;
    }
  }, stepInValue);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve({
        position,
        delay,
      });
    } else {
      // Reject
      reject({
        position,
        delay,
      });
    }
  });
}
