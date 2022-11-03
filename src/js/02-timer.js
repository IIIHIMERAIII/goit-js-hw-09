import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const inputRef = document.querySelector("#datetime-picker")
const btnStartRef = document.querySelector("[data-start]")
const daysOutRef = document.querySelector("[data-days]");
const hoursOutRef = document.querySelector("[data-hours]");
const minutesOutRef = document.querySelector("[data-minutes]");
const secondsOutRef = document.querySelector("[data-seconds]");
let intervalId = null;
let selectTimeTagret = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedTime) {
        let currentDate = Date.now();
        let selectedDate = selectedTime[0].getTime();
        if (selectedDate <= currentDate) {
            btnStartRef.disable = true;
            window.alert("Please choose a future date");
        }
        else {
            btnStartRef.disabel = false;
            selectTimeTagret = selectedDate
        }
    },
};

btnStartRef.addEventListener("click", runTimer)

function runTimer() {
    getTime();
    btnStartRef.disabled = true;
    inputRef.disabled = true;
    const intervalId = setInterval(() => {
        getTime(intervalId);
    }, 1000)
};

function getTime(intervalId) {
    const deltatime = selectTimeTagret - Date.now();
    if (deltatime < 0) {
        clearInterval(intervalId);
    }
    else {
        const time = convertMs(deltatime);
        updateTime(time)
    }
}

function updateTime({days, hours, minutes, seconds}) {;
    daysOutRef.textContent = days;
    hoursOutRef.textContent = hours;
    minutesOutRef.textContent = minutes;
    secondsOutRef.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)
  );

    return { days, hours, minutes, seconds };
    
    function addLeadingZero(num) {
    return String(num).padStart(2, '0');
}
}

flatpickr(inputRef, options)

