import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

const notifyOptions = {
  cssAnimationStyle: 'from-top',
  clickToClose: true,
  timeout: 5000,
  showOnlyTheLastOne: false,
};

refs.form.addEventListener('submit', onSubmitBtn);

function onSubmitBtn(event) {
  event.preventDefault();
  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  const amount = Number(refs.amount.value);

  for (let position = 1; position <= amount; position ++) {
    createPromise(position, delay)
    // .then(({ position, delay }) => {
    //   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    // })
    // .catch(({ position, delay }) => {
    //   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    // });
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,)})
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,)})
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
  setTimeout(() => {
    if(shouldResolve) {
      resolve({position, delay})
    } else {
      reject({position, delay});
    }
  }, delay);
 }); 
};
