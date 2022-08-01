import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
    piecker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    mins: document.querySelector('span[data-minutes]'),
    secs: document.querySelector('span[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
};

function onClose(selectedDates) {
    const currentTime = Date.now();
    const ms = selectedDates[0] - currentTime;
    if (ms < 0) {
        Notiflix.Notify.failure('Будь ласка оберіть майбутню дату');
    } else {
        refs.startBtn.removeAttribute('disabled', 'true');
    }
}

flatpickr(refs.piecker, options);

refs.startBtn.addEventListener('click', getTime);
refs.startBtn.setAttribute('disabled', 'true');

function getTime() {
    timer();
    refs.startBtn.setAttribute('disabled', false);
    refs.piecker.setAttribute('disabled', false);
};

function timer() {
    refs.startBtn.setAttribute('disabled', 'true');
    const selectedDate = new Date(refs.piecker.value);
    const selectedTimeMs = selectedDate.getTime();
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const delta = selectedTimeMs - currentTime;

        if (delta < 0) {
            clearInterval(intervalId);
            refs.startBtn.removeAttribute('disabled', 'true');
        } else {
            updateTimerTime(convertMs(delta));
        }
    }, 1000);
};

function updateTimerTime({ days, hours, minutes, seconds }) {
    refs.days.innerHTML = days;
    refs.hours.innerHTML = hours;
    refs.mins.innerHTML = minutes;
    refs.secs.innerHTML = seconds;
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = padDays(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

    const getTime =  { days, hours, minutes, seconds };
    return getTime;
}

function pad(value) {
    return String(value).padStart(2, '0');
};

function padDays(value) {
    if (value < 100) {
        return String(value).padStart(2, '0');
    } else if (value < 1000) {
        return String(value).padStart(4, '0');
    } return String(value).padStart(3, '0');
};


