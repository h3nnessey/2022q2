function weather() {
    const API_KEY = '58fa19d4df4d1d9234ec77d0756c43f3';
    const weatherIco = document.querySelector('.weather-icon');
    const temperature = document.querySelector('.temperature');
    const weatherDesc = document.querySelector('.weather-description');
    const cityInput = document.querySelector('.city');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const weatherError = document.querySelector('.weather-error');

    const getWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=en&appid=${API_KEY}&units=metric`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                weatherError.textContent = '';
                weatherIco.className = 'weather-icon owf';
                weatherIco.classList.add(`owf-${data.weather[0].id}`);
                temperature.textContent = `${Math.floor(data.main.temp)}°C`;
                weatherDesc.textContent = capitalize(data.weather[0].description);
                wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
                humidity.textContent = `Humidity: ${Math.floor(data.main.humidity)}%`;
            })
            .catch(catchErr);
    };

    function catchErr() {
        weatherError.textContent = `Error! Cannot find weather for ${cityInput.value}.`;
        weatherIco.className = '';
        temperature.textContent = '';
        weatherDesc.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    }

    function capitalize(word) {
        return word
            .split(' ')
            .map((word) => {
                return word[0].toUpperCase() + word.slice(1);
            })
            .join(' ');
    }

    function setLocalStorage() {
        localStorage.setItem('city', cityInput.value);
    }

    function getLocalStorage() {
        const city = localStorage.getItem('city');
        if (city) {
            cityInput.value = city;
        }
    }

    cityInput.addEventListener('change', getWeather);
    window.addEventListener('beforeunload', setLocalStorage);
    window.addEventListener('load', () => {
        getLocalStorage();
        getWeather();
    });
}

export default weather;
