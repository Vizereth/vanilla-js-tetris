function qsa(selector, parent = document) {
  return parent.querySelector(selector);
}

function qs(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

function addGlobalEventListener(
  type,
  selector,
  callback,
  options,
  parent = document
) {
  parent.addEventListener(
    type,
    (e) => {
      if (e.target.matches(selector)) callback(e);
    },
    options
  );
}

function createElement(type, options = {}) {
  const element = document.createElement(type);

  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      element.classList.add(value);
      return;
    }

    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
      return;
    }

    if (key === "text") {
      element.textContent = value;
    }

    element.setAttribute(key, value);
  });

  return element;
}

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function memoize(cb) {
  const cache = new Map();

  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = cb(...args);
    cache.set(key, result);
    return result;
  };
}

function firstElement(array, n = 1) {
  if (n === 1) return array[0];

  return array.filter((_, index) => index < n);
}

function lastElement(array, n = 1) {
  if (n === 1) return array[array.length - 1];
  return array.filter((_, index) => array.length - index <= n);
}

function randomArrElement(array) {
  return array[randomInt(0, array.length - 1)];
}

function pluck(array, key) {
  return array.map((item) => item[key]);
}

function groupKeys(array, key) {
  return array.reduce((group, element) => {
    const value = element[key];
    return { ...group, [value]: [...(group[value] ?? []), element] };
  }, {});
}


