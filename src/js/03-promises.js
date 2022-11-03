import Notiflix from "notiflix";
const formRef = document.querySelector(".form");

formRef.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let delayInput = Number(formRef.elements.delay.value);
  let stepInput = Number(formRef.elements.step.value);
  
  for (let amount = 0; amount < Number(formRef.elements.amount.value); amount++) {
    createPromise(amount + 1, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delayInput += stepInput;
  }
};

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay );
    });
  }






