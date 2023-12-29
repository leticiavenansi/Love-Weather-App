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


let days = [
  "Sunday", 
  "Monday", 
  "Tuesday", 
  "Wednesday", 
  "Thursday", 
  "Friday", 
  "Saturday"];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
  ];
let month = months[now.getMonth()];

h2.innerHTML = `${month} ${date}, ${year} - ${day} - ${hours}h${minutes}`;

const h4_1 = document.getElementById("h4-1");
const h4_2 = document.getElementById("h4-2");

function getApi(city) {
  let apiKey = `6e4ob6303315b8eaafdbf6438bfe2aft`;
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  return apiURL;
}

function displayMyTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  
  let h3 = document.querySelector("h3");
  h3.innerHTML = response.data.city

  let h4_1 = document.querySelector("#h4-1");
  h4_1.innerHTML = temperature + "ºC"
}

function displayBaesTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);

  let h6 = document.querySelector("h6");
  h6.innerHTML = response.data.city

  let h4_2 = document.querySelector("#h4-2");
  h4_2.innerHTML = temperature + "ºC"
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