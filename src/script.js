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
  h1.innerHTML = `${response.data.name}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  number.innerHTML = `${temperature}`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  blow.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  dateClock.innerHTML = formatDate(response.data.dt * 1000);
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

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", getCurrentLocation);
