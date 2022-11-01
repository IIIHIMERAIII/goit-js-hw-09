import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const inputRef = document.querySelector("#datetime-picker")
const btnStartRef = document.querySelector("[data-start]")
const daysOutRef = document.querySelector("[data-days]");
const hoursOutRef = document.querySelector("[data-hours]");
const minutesOutRef = document.querySelector("[data-minutes]");
const secondsOutRef = document.querySelector("[data-seconds]");
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        let currentDate = Date.now();
        let storageDate = selectedDates[0] - currentDate;
        if (storageDate < 0) {
            btnStartRef.disable = true;
            window.alert("Please choose a future date");
        }
        else {
            btnStartRef.disabel = false;
        }

        function runTimer() {
            btnStartRef.disabled = true;
            inputRef.disabled = true;
            getTime(selectedDates);
            intervalId = setInterval(() => {
                getTime(selectedDates);
            }, 1000);
        }
        
        btnStartRef.addEventListener("click", runTimer);
    }
};


function getTime(selectedDates) {
    let currentDate = Date.now();
    let storageDate = selectedDates[0] - currentDate;

    if (storageDate <= 1000)
    {
        clearInterval(intervalId);
    }
    else {
        updateTime(storageDate);
    }
}

function updateTime(storageDate) {
    const { days, hours, minutes, seconds } = convertMs(storageDate);
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

flatpickr(inputRef, options )