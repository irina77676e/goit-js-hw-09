import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";



const refs = {
  input: document.querySelector('input#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
  hours: document.querySelector('[data-hours]'),
  days: document.querySelector('[data-days]'),
}
console.dir()

let resoultTimeMs = 0;6

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    const currentData = selectedDates[0].getTime();
    const calculateData = currentData - options.defaultDate;

    if (options.defaultDate < currentData) {
 
      refs.btnStart.disabled = false;
     refs.btnStart.addEventListener('click', clickBtn);
      resoultTimeMs = calculateData;
    } else {
      window.alert('Please choose a date in the future')
    };
  },
};

function clickBtn(porno) {
  console.log(porno)
  if (porno.target.nodeName === "BUTTON") {
    calculateTime(resoultTimeMs);
    console.log(resoultTimeMs)
  }
}

function calculateTime(resoultTimeMs) {
  setInterval(() => {
    convertMs(resoultTimeMs -= 1000);
  }, 1000);
}

flatpickr(refs.input, options);

function padStart(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = padStart(Math.floor(ms / day));
  
  const hours = padStart(Math.floor((ms % day) / hour));
  
  const minutes =padStart(Math.floor(((ms % day) % hour) / minute));
 
  const seconds = padStart(Math.floor((((ms % day) % hour) % minute) / second));
  console.log({ days, hours, minutes, seconds })
  
  if (seconds >= 0 && days >= 0 && hours >= 0 && minutes >= 0) {
    return makeTime({ days, hours, minutes, seconds })
  }

function makeTime ({ days, hours, minutes, seconds }) {
  refs.seconds.textContent = seconds;
  refs.minutes.textContent = minutes;
  refs.hours.textContent = hours;
  refs.days.textContent = days;

};
