import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  firstDelayEl: document.querySelector('input[name="delay"]'),
  delayStepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  formEl: document.querySelector('.form'),
};


refs.formEl.addEventListener('submit', onCreatePromisesClick);



function onCreatePromisesClick(e) {
  e.preventDefault();
  

  const firstDelay = Number.parseInt(refs.firstDelayEl.value);
  const delayStep = Number.parseInt(refs.delayStepEl.value);

 
  for (let i = 0; i < refs.amountEl.value; i+= 1) {
    createPromise(i + 1, firstDelay + delayStep * i)
      
      .then(({ position, firstDelay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${firstDelay}ms`);
      })
      .catch(({ position, firstDelay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${firstDelay}ms`);
      }).finally(() => {
        refs.firstDelayEl.value = ''
        refs.delayStepEl.value = ''
        refs.amountEl.value = ''
      })
  }
  
  
}



function createPromise(position, firstDelay) {

  return new Promise((resolve, reject) => {
    
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, firstDelay });
      }
      reject({ position, firstDelay });
    }, firstDelay);
  });
}

