let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}let year = now.getFullYear();


let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];

h2.innerHTML = `${month} ${date}, ${year} - ${day} - ${hours}h${minutes}`;

function getApi(city) {
  let apiKey = `6e4ob6303315b8eaafdbf6438bfe2aft`;
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  return apiURL;
}

function showMyCity(event) {
  event.preventDefault();
  let myCityInfo = document.querySelector("#myCityInput");

  let apiURL = getApi(myCityInfo.value);
  axios.get(apiURL).then(displayMyTemperature)  
} 

function showBaesCity(event) {
  event.preventDefault();
  let baesCityInfo = document.querySelector("#baesCityInput");

  let apiURL = getApi(baesCityInfo.value);
  axios.get(apiURL).then(displayBaesTemperature)  
} 

let myForm = document.querySelector("#myCity")
myForm.addEventListener("submit", showMyCity)

let baesForm = document.querySelector("#baesCity")
baesForm.addEventListener("submit", showBaesCity)

function displayMyTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);

  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.city

  let h4_1 = document.querySelector("#h4-1")
  h4_1.className = ""

  let myTemperature = document.querySelector("#myTemperature");
  myTemperature.innerHTML = temperature + "ºC"

  let myCondition = document.querySelector("#myCondition");
  myCondition.innerHTML = response.data.condition.description

  let myHumidity = document.querySelector("#myHumidity");
  myHumidity.innerHTML = "Humidity: " + response.data.temperature.humidity + "%"

  let myWind = document.querySelector("#myWind");
  myWind.innerHTML = "Wind: " + response.data.wind.speed + " km/h"

  let myIcon = document.querySelector("#myIcon");
  myIcon.src = response.data.condition.icon_url

  let ul = document.querySelector("#ul1")
  ul.className = ""

  getMyForecast(response.data.city);
}

function getMyForecast(city) {
  let apiKey = `6e4ob6303315b8eaafdbf6438bfe2aft`;
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayMyForecast);
}

function formatMyDay (timestamp) {
  let date = new Date (timestamp * 1000);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[date.getDay()];
}

function displayMyForecast(response) {
  let myForecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    myForecastHTML = myForecastHTML + 
      `<div id="myForecast">
        <div class="forecastDay">${formatMyDay(day.time)}
        <img src="${day.condition.icon_url}" class="forecastIcon" id="forecast-myIcon" /></div>
        <div class="forecastTemperature">
        <span class="min-temp"> ${Math.round(day.temperature.minimum)}ºC</span> -
        <span class ="max-temp"> ${Math.round(day.temperature.maximum)}ºC</span>
        </div>
      </div>`
  }
    });

  let myForecast = document.querySelector("#myForecast");
  myForecast.innerHTML = myForecastHTML;
}

function displayBaesTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  
  let h5 = document.querySelector("h5");
  h5.innerHTML = response.data.city

  let baesTemperature = document.querySelector("#baesTemperature");
  baesTemperature.innerHTML = temperature + "ºC"

  let h4_2 = document.querySelector("#h4-2")
  h4_2.className = ""

  let baesCondition = document.querySelector("#baesCondition");
  baesCondition.innerHTML = response.data.condition.description
  
  let baesHumidity = document.querySelector("#baesHumidity");
  baesHumidity.innerHTML = "Humidity: " + response.data.temperature.humidity + "%"

  let baesWind = document.querySelector("#baesWind");
  baesWind.innerHTML = "Wind: " + response.data.wind.speed + " km/h"

  let baesIcon = document.querySelector("#baesIcon");
  baesIcon.src = response.data.condition.icon_url

  let ul = document.querySelector("#ul2")
  ul.className = ""

  getBaesForecast(response.data.city);
}

function getBaesForecast(city) {
  let apiKey = `6e4ob6303315b8eaafdbf6438bfe2aft`;
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayBaesForecast);
}

function formatBaesDay (timestamp) {
  let date = new Date (timestamp * 1000);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[date.getDay()];
}

function displayBaesForecast(response) {
  let baesForecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
    baesForecastHTML = baesForecastHTML + 
      `<div id="baesForecast">
        <div class="forecastDay">${formatMyDay(day.time)}
        <img src="${day.condition.icon_url}" class="forecastIcon" /></div>
        <div class="forecastTemperature">
        <span class="min-temp"> ${Math.round(day.temperature.minimum)}ºC</span> -
        <span class ="max-temp"> ${Math.round(day.temperature.maximum)}ºC</span>
        </div>
      </div>`
  }
    });

  let baesForecast = document.querySelector("#baesForecast");
  baesForecast.innerHTML = baesForecastHTML;
}

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  
  heart.innerText = '💗';
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
  heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);