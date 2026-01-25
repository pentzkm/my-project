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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature).catch(showError);
}

function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let tempElement = document.querySelector(".current-temperature-value");
  tempElement.innerHTML = temperature;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
