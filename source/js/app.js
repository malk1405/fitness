'use strict';

import createSlider from './slider';
import activateTabs from './tabs';
import activateForm from './form';

function app() {
  const trainersSlider = createSlider('trainers', { lg: 4, md: 2, sm: 1 });
  const reviewsSlider = createSlider('reviews', { lg: 1 });

  activateTabs();
  trainersSlider.activate();
  reviewsSlider.activate();
  activateForm();
}

function docReady(fn) {
  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

docReady(app);
