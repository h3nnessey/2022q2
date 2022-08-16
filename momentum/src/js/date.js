function date(lang) {
    const timeElement = document.querySelector('.time');
    const dateElement = document.querySelector('.date');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

    const daysRu = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ];
    const monthsRu = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентебря',
        'Октября',
        'Ноября',
        'Декабря',
    ];

    function showTime() {
        const time = new Date();
        const currentTime = time.toLocaleTimeString();
        timeElement.textContent = currentTime;
        showDate();
    }
    showTime();

    function showDate() {
        const date = new Date();
        if (lang === 'ru') {
            dateElement.textContent = `${daysRu[date.getDay()]}, ${date.getDate()} ${monthsRu[date.getMonth()]}`;
        } else {
            dateElement.textContent = `${days[date.getDay()]}, ${
                months[date.getMonth()]
            } ${date.getDate()}`;
        }
    }
}

export default date;
