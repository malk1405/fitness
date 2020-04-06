'use strict';

import createSlider from './components/slider';
import activateTabs from './components/tabs';
import activateForm from './components/form';
import activateTimetable from './components/timetable';

(function app() {
  const trainersSlider = createSlider('trainers', { lg: 4, md: 2, sm: 1 });
  const reviewsSlider = createSlider('reviews', { lg: 1 });

  activateTabs();
  trainersSlider.activate();
  reviewsSlider.activate();
  activateForm();
  activateTimetable();
})();
