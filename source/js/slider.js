'use strict';

import { setClass } from './utils/utils.js';

function activateSlider() {
  const WINDOW_SIZE = {
    lg: { maxWidth: Infinity, num: 4 },
    md: { maxWidth: 1365, num: 2 },
    sm: { maxWidth: 767, num: 1 }
  };

  let index = 0;
  function findMin(index, size) {
    return Math.floor(index / size) * size;
  }

  const cards = document.querySelectorAll('.trainers__card');

  function display(prefix) {
    const className = 'trainers__card--hidden-' + prefix;
    const min = findMin(index, WINDOW_SIZE[prefix].num);

    cards.forEach((card, i) => {
      setClass(card, className, i < min);
    });
  }

  function displayAll() {
    Object.keys(WINDOW_SIZE).forEach(size => {
      display(size);
    });
  }

  displayAll();

  const prevBtn = document.querySelector('.trainers__prev');
  const nextBtn = document.querySelector('.trainers__next');

  function getWindowSize() {
    for (let el of Object.values(WINDOW_SIZE).sort(
      (a, b) => a.maxWidth - b.maxWidth
    )) {
      if (window.innerWidth <= el.maxWidth) return el.num;
    }
  }

  prevBtn.addEventListener('click', function() {
    const newIndex = index - getWindowSize();

    if (newIndex < 0) return;

    index = newIndex;
    displayAll();
  });

  nextBtn.addEventListener('click', function() {
    const size = getWindowSize();
    const newIndex = findMin(index + size, size);

    if (newIndex >= cards.length) return;

    index = newIndex;
    displayAll();
  });
}

export default activateSlider;
