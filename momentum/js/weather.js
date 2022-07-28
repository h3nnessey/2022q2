const API_KEY = "58fa19d4df4d1d9234ec77d0756c43f3";
const weatherIco = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDesc = document.querySelector(".weather-description");
const cityInput = document.querySelector(".city");

const getWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=en&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weatherIco.className = "weather-icon owf";
      weatherIco.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${data.main.temp}°C`;
      weatherDesc.textContent = data.weather[0].description;
    });
};
getWeather();

cityInput.addEventListener("change", () => {
  getWeather();
});
