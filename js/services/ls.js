// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

const get = (data) => {
  return localStorage.getItem(data);
};

const set = (data, evTarget, evKey, evType) => {
  if (evType === 'keypress') {
    if (evKey == 13) {
      localStorage.setItem(`${data}`, evTarget);
      data.blur();
    }
  } else {
    localStorage.setItem(`${data}`, evTarget.innerText);
  }
};

// const isValid = (data) => {
//   debugger;
//   const localStorageData = localStorage.getItem(`${data}`);
//   if (localStorageData === null) {
//     return (data.textContent = 'Enter name');
//   } else {
//     return (data.textContent = 'hola');
//   }
// };

export default {
  get,
  set,
  // isValid,
};

function sett() {
  //   if (e.type === 'keypress') {
  //     // Make sure enter is pressed
  //     if (ev.key == 13) {
  //       localStorage.setItem(`${data}`, e.target.innerText);
  //       data.blur();
  //     }
  //   } else {
  //     localStorage.setItem(`${data}`, e.target.innerText);
  //   }
}
