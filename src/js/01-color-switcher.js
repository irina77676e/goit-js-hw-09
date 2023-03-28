const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

 let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
 timerId = setInterval(getRandomHexColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  
})

function getRandomHexColor() {
  return document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    stopBtn.disabled = true;
  startBtn.disabled = false;
})
