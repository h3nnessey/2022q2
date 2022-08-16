function greeting(lang) {
    const greeting = document.querySelector('.greeting');
    const ruTimes = {
        ночь: 'Добрая',
        утро: 'Доброе',
        день: 'Добрый',
        вечер: 'Добрый',
    };

    function showGreeting() {
        const currentTime = getTimeOfDay();
        if (lang === 'ru') {
            greeting.textContent = `${ruTimes[currentTime]} ${currentTime},`;
        } else {
            greeting.textContent = `Good ${currentTime},`;
        }
    }
    showGreeting();

    function getTimeOfDay() {
        const time = new Date().getHours() / 6;
        if (time > 0 && time < 1) {
            return lang === 'ru' ? 'ночь' : 'night';
        }
        if (time > 1 && time < 2) {
            return lang === 'ru' ? 'утро' : 'morning';
        }
        if (time > 2 && time < 3) {
            return lang === 'ru' ? 'день' : 'afternoon';
        }
        return lang === 'ru' ? 'вечер' : 'evening';
    }
}

export default greeting;
