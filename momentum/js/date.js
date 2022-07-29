(function () {
    const timeElement = document.querySelector('.time');
    const dateElement = document.querySelector('.date');
    const greeting = document.querySelector('.greeting');
    const nameInput = document.querySelector('.name');
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    function showTime() {
        const time = new Date();
        const currentTime = time.toLocaleTimeString();
        timeElement.textContent = currentTime;
        showDate();
        showGreeting();
        setTimeout(showTime, 1000);
    }
    showTime();

    function showDate() {
        const date = new Date();
        dateElement.textContent = `${days[date.getDay()]}, ${
            months[date.getMonth()]
        } ${date.getDate()}`;
    }

    function showGreeting() {
        const currentTime = getTimeOfDay();
        greeting.textContent = `Good ${currentTime},`;
    }

    function getTimeOfDay() {
        const time = new Date().getHours() / 6;
        if (time > 0 && time < 1) {
            return 'night';
        }
        if (time > 1 && time < 2) {
            return 'morning';
        }
        if (time > 2 && time < 3) {
            return 'afternoon';
        }
        return 'evening';
    }

    function setLocalStorage() {
        localStorage.setItem('name', nameInput.value);
    }

    function getLocalStorage() {
        const name = localStorage.getItem('name');
        if (name) {
            nameInput.value = name;
        }
    }

    window.addEventListener('beforeunload', setLocalStorage);
    window.addEventListener('load', getLocalStorage);
})();
