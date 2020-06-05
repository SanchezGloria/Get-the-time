'use strict';
import ls from './services/ls.js';

// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

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
    document.body.style.backgroundImage = "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = 'url(../images/afternoon.jpg)';
    document.body.style.backgroundSize = 'cover';
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage = 'url(../images/night-sky.jpg)';
    document.body.style.backgroundSize = 'cover';
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') !== null) {
    name.value = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.currentTarget.value);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.currentTarget.value);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') !== null) {
    focus.value = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  console.log(e.currentTarget);
  console.log(e.target.value);

  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.currentTarget.value);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.currentTarget.value);
  }
}

// const setFocusInLocalStorage = (ev) => {
//   console.log(ev.currentTarget.value);

//   localStorage.setItem('focus', ev.currentTarget.value);
// };

// getFromLocalStorage();

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
// startApp();
