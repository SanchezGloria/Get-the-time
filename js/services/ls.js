const get = () => {
  const localStorageData = localStorage.getItem('data');
  return JSON.parse(localStorageData);
};

const set = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
};

const isValid = () => {
  const localStorageData = localStorage.getItem('data');
  if (localStorageData === null) {
    return false;
  } else {
    return true;
  }
};

export default {
  get,
  set,
  isValid,
};
