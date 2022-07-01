let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekDay = days[now.getDay()];
let weekDayNow = document.querySelector("span.presentDay");
weekDayNow.innerHTML = weekDay;

let hoursNow = now.getHours();
let hours = document.querySelector("span.presentHours");
hours.innerHTML = hoursNow;

function minutesKur(MinutesNow) {
  if (MinutesNow < 10) {
    MinutesNow = `0${MinutesNow}`;
  }
  return MinutesNow;
}
let MinutesNow = now.getMinutes();
let minutes = document.querySelector("span.presentMinutes");
minutes.innerHTML = `${minutesKur(MinutesNow)}`;

// Task#Week 5

let city = document.querySelector("h1").textContent;
let apiKey = "905addfdd47350a84b1fff2eb7da7fbb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=`;
let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?q=`;

function showTemt(response) {
  let curTemt = Math.round(response.data.main.temp);

  let tempetatureCur = document.querySelector("#temperatureNow");
  tempetatureCur.innerHTML = curTemt;

  let cityCur = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityCur;

  let weatherSkyCur = response.data.weather[0].main;
  let sky = document.querySelector("#weatherSky");
  sky.innerHTML = weatherSkyCur;

  let humidityCur = response.data.main.humidity;
  let humidity = document.querySelector("span.humidity");
  humidity.innerHTML = humidityCur;

  let windCur = Math.round(response.data.wind.speed);
  let wind = document.querySelector("span.wind");
  wind.innerHTML = windCur;

  // For fahrenheit

  function temperature(event) {
    event.preventDefault();
    let fahrenheit = Math.round((9 / 5) * temperaturDay + 32);
    let temperaturFahrenheit = document.querySelector("#temperatureNow");
    temperaturFahrenheit.innerHTML = fahrenheit;
  }
  let temperaturDay = curTemt;
  let temperaturOnHtml = document.querySelector("#temperatureNow");
  temperaturOnHtml.innerHTML = temperaturDay;
  let tempfahrenheit = document.querySelector("a.fahrenheit");
  tempfahrenheit.addEventListener("click", temperature);
  
  function temperatureCelsius(event) {
    event.preventDefault();
    let temperatureCelsiusNow = document.querySelector("#temperatureNow");
    temperatureCelsiusNow.innerHTML = temperaturDay;
  }
  
  let tempcelsius = document.querySelector("a.celsius");
  tempcelsius.addEventListener("click", temperatureCelsius);
}

function formSubmit(event) {
  event.preventDefault();
  let input = document.querySelector("#formInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = input.value;
  axios
    .get(`${apiUrl2}${input.value}&appid=${apiKey}&&units=metric`)
    .then(showTemt);
}

axios.get(`${apiUrl}${apiKey}&&units=metric`).then(showTemt);

let form = document.querySelector("#formSearch");
form.addEventListener("submit", formSubmit);

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`
    )
    .then(showTemt);
}
function buttonClick(specialButtonClick) {
  specialButtonClick = document.querySelector("button");

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", buttonClick);