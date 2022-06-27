import { initApp } from '../services/initApp.js';
import { toggleLoader } from '../services/toggleLoader.js';

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    toggleLoader();
    initApp();
  }, 3000);
});
