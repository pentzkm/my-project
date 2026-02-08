let fahrenheitTemperature = null;

function handleSearch(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city.length === 0) {
    alert("Please enter a city");
    return;
  }

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  let apiKey = "63d87667o9c670bt316413323c2af6f9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature).catch(showError);
}

function displayTemperature(response) {
  fahrenheitTemperature = Math.round(response.data.temperature.current);

  let tempElement = document.querySelector(".current-temperature-value");
  tempElement.innerHTML = fahrenheitTemperature;

  getForecast(response.data.coordinates);
}

function showError() {
  let input = document.querySelector("#search-input").value;
  alert(
    `Sorry, we don't know the weather for this city. Try searching: https://www.google.com/search?q=weather+${input}`,
  );
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" alt="${day.condition.description}" width="42" />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastHTML += `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(coordinates) {
  let apiKey = "63d87667o9c670bt316413323c2af6f9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayCelsius(event) {
  event.preventDefault();
  if (fahrenheitTemperature === null) return;

  let tempElement = document.querySelector(".current-temperature-value");
  let celsius = ((fahrenheitTemperature - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celsius);

  document.querySelector("#fahrenheit-link").classList.remove("active");
  document.querySelector("#celsius-link").classList.add("active");
}

function displayFahrenheit(event) {
  event.preventDefault();
  if (fahrenheitTemperature === null) return;

  let tempElement = document.querySelector(".current-temperature-value");
  tempElement.innerHTML = fahrenheitTemperature;

  document.querySelector("#celsius-link").classList.remove("active");
  document.querySelector("#fahrenheit-link").classList.add("active");
}

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

celsiusLink.addEventListener("click", displayCelsius);
fahrenheitLink.addEventListener("click", displayFahrenheit);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

console.log("Forecast + toggle fix deployed");
