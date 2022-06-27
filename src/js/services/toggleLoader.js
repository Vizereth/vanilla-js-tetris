const toggleLoader = () => {
  const loader = document.querySelector('.loader');

  if (!loader) return;

  loader.classList.add('loader--inactive');
};

export { toggleLoader };
