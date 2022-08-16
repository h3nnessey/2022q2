import weather from './weather.js';
import quotes from './quotes.js';
import greeting from './greeting.js';
import date from './date.js';

function settings() {
    const showSett = document.querySelector('.settings-show');
    const settingsWrap = document.querySelector('.settings-wrapper');
    const settingsTitles = document.querySelectorAll('.settings-item__title');
    const langForm = document.querySelector('.lang');
    const langOptions = langForm.querySelectorAll('option');
    const quoteBtn = document.querySelector('.change-quote');
    const todoInp = document.querySelector('.todo-input');
    const nameInp = document.querySelector('.name');
    const cityInp = document.querySelector('.city');
    const widgetsControls = document.querySelector('.widgets-controls');
    const widgetsInput = document.querySelectorAll('.widgets-controls input');
    const widgets = document.querySelectorAll('.widget');
    const bgInput = document.querySelector('#bg-input');
    const checkboxTitles = document.querySelectorAll('.checkbox-title');
    const hideSettings = document.querySelector('.settings-close');
    const checkboxTranslation = {
        ru: ['Плеер', 'Список дел', 'Дата', 'Приветствие', 'Цитата дня', 'Погода', 'Время'],
        en: ['Player', 'ToDo', 'Date', 'Greeting', 'Quote', 'Weather', 'Time'],
    };
    let greetingTimer, dateTimer;
    const blocks = {
        'widgets-player': widgets[0],
        'widgets-weather': widgets[1],
        'widgets-time': widgets[2],
        'widgets-date': widgets[3],
        'widgets-greeting': widgets[4],
        'widgets-quotes': widgets[5],
        'widgets-todo': widgets[6],
    };
    const titles = {
        ru: ['Язык:', 'Источник фона:', 'Теги для фона:', 'Показать/скрыть виджеты:'],
        en: ['Language:', 'Background source:', 'Background tags:', 'Show/Hide widgets:'],
    };
    const weatherObj = {
        ru: {
            language: 'ru',
            wind: 'Скорость ветра',
            speed: 'м/c',
            humidity: 'Влажность',
        },
        en: {
            language: 'en',
            wind: 'Wind speed',
            speed: 'm/s',
            humidity: 'Humidity',
        },
    };
    const todoTranslation = {
        ru: 'Новая задача',
        en: 'New task',
    };
    const nameTranslation = {
        ru: 'Гость',
        en: 'Guest',
    };
    const cityTranslation = {
        ru: 'Минск',
        en: 'Minsk',
    };
    const optTranslation = {
        ru: ['Английский', 'Русский'],
        en: ['English', 'Russian'],
    };
    const bgTranslation = {
        ru: 'Введите теги через пробел',
        en: 'Enter the tags separated by a space',
    };

    langForm.addEventListener('change', (e) => {
        const currentLang = langForm.value;
        localStorage.setItem('lang', currentLang);
        clearInterval(greetingTimer);
        clearInterval(dateTimer);
        greeting(currentLang);
        date(currentLang);
        if (currentLang === 'en' && cityInp.value === 'Минск') {
            cityInp.value = cityTranslation[currentLang];
        } else if (currentLang === 'ru' && cityInp.value === 'Minsk') {
            cityInp.value = cityTranslation[currentLang];
        }
        weather(weatherObj[currentLang]);
        quotes(`assets/quotes_${currentLang}.json`);
        setSettingsLanguage(currentLang);
        todoInp.placeholder = todoTranslation[langForm.value];
        nameInp.placeholder = nameTranslation[langForm.value];
        greetingTimer = setInterval(() => {
            greeting(currentLang);
        }, 1000);
        dateTimer = setInterval(() => {
            date(currentLang);
        }, 1000);
    });

    widgetsControls.addEventListener('change', (e) => {
        widgetsInput.forEach((el) => {
            el.checked
                ? blocks[el.id].classList.remove('hide-item')
                : blocks[el.id].classList.add('hide-item');
        });
    });

    window.addEventListener('beforeunload', () => {
        setLocalStorage();
    });

    window.addEventListener('load', () => {
        hideLoader();
        if (localStorage.getItem('check')) {
            setChecked(localStorage.getItem('check'));
        }
        getLocalStorage();
        if (localStorage.getItem('lang')) {
            const selectedLang = localStorage.getItem('lang');
            clearInterval(greetingTimer);
            clearInterval(dateTimer);
            greeting(selectedLang);
            date(selectedLang);
            langForm.value = selectedLang;
            todoInp.placeholder = todoTranslation[selectedLang];
            nameInp.placeholder = nameTranslation[selectedLang];
            setSettingsLanguage(selectedLang);
            if (selectedLang === 'en' && cityInp.value === 'Минск') {
                cityInp.value = cityTranslation[selectedLang];
            } else if (selectedLang === 'ru' && cityInp.value === 'Minsk') {
                cityInp.value = cityTranslation[selectedLang];
            }
            weather(weatherObj[selectedLang]);
            quotes(`assets/quotes_${selectedLang}.json`);
            greetingTimer = setInterval(() => {
                greeting(selectedLang);
            }, 1000);
            dateTimer = setInterval(() => {
                date(selectedLang);
            }, 1000);
        } else {
            langForm.value = 'en';
            clearInterval(greetingTimer);
            clearInterval(dateTimer);
            greeting(langForm.value);
            date(langForm.value);
            todoInp.placeholder = todoTranslation[langForm.value];
            nameInp.placeholder = nameTranslation[langForm.value];
            cityInp.value = cityTranslation[langForm.value];
            setSettingsLanguage(langForm.value); // можно убрать
            weather(weatherObj[langForm.value]);
            quotes(`assets/quotes_${langForm.value}.json`);
            greetingTimer = setInterval(() => {
                greeting(langForm.value);
            }, 1000);
            dateTimer = setInterval(() => {
                date(langForm.value);
            }, 1000);
        }
    });

    showSett.addEventListener('click', () => {
        settingsWrap.classList.toggle('active');
    });

    hideSettings.addEventListener('click', () => {
        settingsWrap.classList.toggle('active')
    })

    settingsWrap.addEventListener('click', (e) => {
        if (e.target.classList.contains('settings-wrapper')) {
            settingsWrap.classList.toggle('active');
        }
    });

    function setSettingsLanguage(lang) {
        settingsTitles.forEach((el, idx) => {
            el.textContent = titles[lang][idx];
        });
        langOptions.forEach((el, idx) => {
            el.textContent = optTranslation[lang][idx];
        });
        bgInput.placeholder = bgTranslation[lang];
        checkboxTitles.forEach((title, idx) => {
            title.textContent = checkboxTranslation[lang][idx];
        });
    }

    function getChecked() {
        const result = [];
        widgetsInput.forEach((el) => {
            let temp = {};
            temp[el.id] = el.checked;
            result.push(temp);
        });
        return result;
    }

    function setChecked(str) {
        let checkedItems = JSON.parse(str);
        widgetsInput.forEach((el, idx) => {
            el.checked = checkedItems[idx][el.id];
            el.checked
                ? blocks[el.id].classList.remove('hide-item')
                : blocks[el.id].classList.add('hide-item');
        });
    }

    function hideLoader() {
        document.querySelector('.loader').style.transition = 'visibility 0.5s';
        document.querySelector('.loader').style.visibility = 'hidden';
    }

    function setLocalStorage() {
        localStorage.setItem('city', cityInp.value);
        localStorage.setItem('name', nameInp.value);
        localStorage.setItem('lang', langForm.value);
        localStorage.setItem('check', JSON.stringify(getChecked()));
    }

    function getLocalStorage() {
        const city = localStorage.getItem('city');
        const name = localStorage.getItem('name');
        if (city) {
            cityInp.value = city;
        }
        if (name) {
            nameInp.value = name;
        }
    }

    cityInp.addEventListener('change', () => {
        weather(weatherObj[langForm.value]);
    });
    quoteBtn.addEventListener('click', () => {
        quotes(`assets/quotes_${langForm.value}.json`);
    });
}

export default settings;
