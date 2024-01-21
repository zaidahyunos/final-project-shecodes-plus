function updateWeatherInfo(response) {
  let temperatureElement = document.querySelector("#temperature-value");
  let temperatureUpdate = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#day");
  let date = new Date();
  let iconElement = document.querySelector("#temperature-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperatureUpdate);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" />`;

  console.log(response);
}

function formatDate(date) {
  return `${date}`;
}

function searchCity(city) {
  let apiKey = "a8c4f4faa8db0498d2codf9b3t8812a2";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#city");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="forecast-days">
    <div class="day-1">${day}</div>
    <div class="weather-forecast-icon">☀️</div>
    <div class="weather-forecast-temperature">
      <div class="max-temp">18°C  </div> <div class="min-temp">15°C</div>
      
    </div>
  </div>
`;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Kuala Lumpur");
displayForecast();
