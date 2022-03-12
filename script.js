let weather = {
  apiKey: "9aa0da18145062a35dce28fcf57febb6",

  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector(
      ".weather-message"
    ).textContent = `Weather in ${name}`;
    document.querySelector(".temp").textContent = `${temp}°C`;
    document.querySelector(
      ".weather-icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(
      ".weather-desciption"
    ).textContent = `${description}`;
    document.querySelector(".humidity-count").textContent = `${humidity}`;
    document.querySelector(".wind-count").textContent = `${speed}km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url(https://source.unsplash.com/1940x953/?${name})`;
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-input").value);
  },
};

const input = document.querySelector(".search-input");
const searchButton = document.querySelector(".button");

searchButton.addEventListener("click", function () {
  weather.search();
});

input.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Ljubljana");
