'use strict';
import ls from './services/ls.js';

// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  nameElement = document.querySelector('.name'),
  focusElement = document.querySelector('.focus');

window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = 'http://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          // set DOM elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          // formula for celsius
          let celsius = (temperature - 32) * (5 / 9);
          // set Icon
          setIcons(icon, document.querySelector('.icon'));

          // Change to Celsius
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === ' °F') {
              temperatureSpan.textContent = ' °C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = ' °F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = 'hey this is not working';
  }
  function setIcons(icon, iconId) {
    const skycons = new Skycons({
      color: 'white',
    });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
  }
});

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = 'url(./images/morning.jpg)';
    document.body.style.backgroundSize = 'cover';
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = 'url(./images/afternoon.jpg)';
    document.body.style.backgroundSize = 'cover';
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage = 'url(./images/night-sky.jpg)';
    document.body.style.backgroundSize = 'cover';
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Input object
let data = { name: '', focus: '' };

const startApp = () => {
  if (ls.isValid()) {
    data = ls.get();
    nameElement.value = data.name;
    focusElement.value = data.focus;
  } else {
    ls.set(data);
  }
};

function handleInput(e) {
  const { name, value } = e.currentTarget;
  console.log(name);
  console.log(value);
  data[name] = value;
  console.log('data', data);
  if (e.type === 'keypress') {
    if (e.which === 13 || e.keyCode === 13) {
      ls.set(data);
    }
  }
}

// listeners

nameElement.addEventListener('keypress', handleInput);
nameElement.addEventListener('blur', handleInput);
focusElement.addEventListener('keypress', handleInput);
focusElement.addEventListener('blur', handleInput);

// Run

showTime();
setBgGreet();
startApp();
