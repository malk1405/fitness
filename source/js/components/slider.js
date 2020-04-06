'use strict';

import { setClass } from '../utils/utils.js';
import { matches } from '../utils/media';
import sizes from '../utils/sizes';

const createConfig = (sizes, nums) => {
  const res = {};
  Object.keys(nums).forEach((el) => {
    if (sizes[el]) res[el] = { maxWidth: sizes[el], num: nums[el] };
  });
  return res;
};

function findMin(index, size) {
  return Math.floor(index / size) * size;
}

function createSlider(className, nums) {
  const cards = document.querySelectorAll(`.${className}__card`);
  const prevBtn = document.querySelector(`.${className}__prev`);
  const nextBtn = document.querySelector(`.${className}__next`);

  if (!cards || !prevBtn || !nextBtn) return { activate() {} };

  const WINDOW_SIZE = createConfig(sizes, nums);
  let index = 0;

  function getNum() {
    for (let el of Object.values(WINDOW_SIZE).sort(
      (a, b) => a.maxWidth - b.maxWidth
    )) {
      if (matches(el.maxWidth)) return el.num;
    }
  }

  let currentNum;

  const display = () => {
    const name = `${className}__card--hidden`;
    const min = findMin(index, currentNum);

    cards.forEach((card, i) => {
      setClass(card, name, i < min);
    });

    prevBtn.disabled = index < currentNum;
    nextBtn.disabled = index + currentNum >= cards.length;
  };

  const refresh = () => {
    const newNum = getNum();
    if (newNum === currentNum) return;

    currentNum = newNum;
    display();
  };

  refresh();
  window.addEventListener('resize', refresh);

  return {
    activate() {
      prevBtn.addEventListener('click', function () {
        const newIndex = index - currentNum;

        if (newIndex < 0) return;

        index = newIndex;
        display();
      });

      nextBtn.addEventListener('click', function () {
        const newIndex = findMin(index + currentNum, currentNum);

        if (newIndex >= cards.length) return;

        index = newIndex;
        display();
      });
    },
  };
}

export default createSlider;
