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

function getForecast(coordinates) {
  let apiKey = "da282525e55f95a4cb19896aa6f33352";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="70"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}??</span> |
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}??</span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
