function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

let searchedCity = document.querySelector("#weather-search");
searchedCity.addEventListener("submit", search);

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let number = document.querySelector(".temp");
  let description = document.querySelector("#mood");
  let humidity = document.querySelector(".humid");
  let blow = document.querySelector(".blow");
  let dateClock = document.querySelector(".date-clock");
  let image = document.querySelector("#weather-image");

  celsiusTemperature = response.data.main.temp;

  h1.innerHTML = `${response.data.name}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  number.innerHTML = `${temperature}`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  blow.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  dateClock.innerHTML = formatDate(response.data.dt * 1000);
  image.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  image.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "da282525e55f95a4cb19896aa6f33352";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Hong Kong&appid=${apiKey}&units=metric `;
axios.get(apiUrl).then(showWeather);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  let apiKey = "da282525e55f95a4cb19896aa6f33352";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(showWeather);
}

function searchLocation(position) {
  let apiKey = "da282525e55f95a4cb19896aa6f33352";
  let latit = position.coords.latitude;
  let longit = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latit}&lon=${longit}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">18°</span>
          <span class="weather-forecast-temperature-min">12°</span>
        </div>
      </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
