'use strict';

import createSlider from './slider';
import activateTabs from './tabs';

function app() {
  const trainersSlider = createSlider('trainers', { lg: 4, md: 2, sm: 1 });

  activateTabs();
  trainersSlider.activate();
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
