'use strict';

function activateTabs() {
  var tabs = document.querySelector('.abonement__months');
  var plans = document.querySelectorAll('.abonement__plans');

  tabs.addEventListener('change', function(e) {
    var id = +event.target.value;
    if (!plans[id]) return;

    for (var i = 0; i < plans.length; i++) {
      if (i !== id) {
        plans[i].classList.add('visually-hidden');
      } else {
        plans[i].classList.remove('visually-hidden');
      }
    }
  });
}

function activateSlider() {
  var WINDOW_SIZE = {
    lg: { maxWidth: Infinity, num: 4 },
    md: { maxWidth: 1365, num: 2 },
    sm: { maxWidth: 767, num: 1 }
  };

  var index = 0;
  function findMin(index, size) {
    return Math.floor(index / size) * size;
  }

  var cards = document.querySelectorAll('.trainers__card');

  function display(prefix) {
    var className = 'trainers__card--hidden-' + prefix;
    var min = findMin(index, WINDOW_SIZE[prefix].num);
    for (var i = 0; i < cards.length; i++) {
      if (i < min) cards[i].classList.add(className);
      else cards[i].classList.remove(className);
    }
  }

  function displayAll() {
    display('lg');
    display('md');
    display('sm');
  }

  displayAll();

  var prevBtn = document.querySelector('.trainers__prev');
  var nextBtn = document.querySelector('.trainers__next');

  function getWindowSize() {
    if (window.innerWidth < WINDOW_SIZE.sm.maxWidth) return WINDOW_SIZE.sm.num;
    if (window.innerWidth < WINDOW_SIZE.md.maxWidth) return WINDOW_SIZE.md.num;
    return WINDOW_SIZE.lg.num;
  }

  prevBtn.addEventListener('click', function() {
    var newIndex = index - getWindowSize();

    if (newIndex < 0) return;

    index = newIndex;
    displayAll();
  });

  nextBtn.addEventListener('click', function() {
    var size = getWindowSize();
    var newIndex = findMin(index + size, size);

    if (newIndex >= cards.length) return;

    index = newIndex;
    displayAll();
  });
}

function app() {
  activateTabs();
  activateSlider();
}

function docReady(fn) {
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

docReady(app);
