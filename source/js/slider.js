'use strict';

import { setClass } from './utils/utils.js';
import sizes from './utils/sizes';

const createConfig = (sizes, nums) => {
  const res = {};
  Object.keys(nums).forEach(el => {
    if (sizes[el]) res[el] = { maxWidth: sizes[el], num: nums[el] };
  });
  return res;
};

function createSlider(className, nums) {
  const cards = document.querySelectorAll(`.${className}__card`);
  const prevBtn = document.querySelector(`.${className}__prev`);
  const nextBtn = document.querySelector(`.${className}__next`);

  const WINDOW_SIZE = createConfig(sizes, nums);
  let index = 0;

  function findMin(index, size) {
    return Math.floor(index / size) * size;
  }

  function getWindowSize() {
    for (let el of Object.values(WINDOW_SIZE).sort(
      (a, b) => a.maxWidth - b.maxWidth
    )) {
      if (window.innerWidth <= el.maxWidth) return el.num;
    }
  }

  function display(prefix) {
    const name = `${className}__card--hidden-${prefix}`;
    const min = findMin(index, WINDOW_SIZE[prefix].num);

    cards.forEach((card, i) => {
      setClass(card, name, i < min);
    });
  }

  function displayAll() {
    Object.keys(WINDOW_SIZE).forEach(size => {
      display(size);
    });
  }

  return {
    activate() {
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
  };
}

export default createSlider;
