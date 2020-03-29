'use strict';

import { setClass } from './utils/utils.js';

function activateTabs() {
  const tabs = document.querySelector('.abonement__months');
  const plans = document.querySelectorAll('.abonement__plans');

  tabs.addEventListener('change', function(event) {
    const id = +event.target.value;
    if (!plans[id]) return;

    plans.forEach((plan, i) => {
      setClass(plan, 'visually-hidden', i !== id);
    });
  });
}

export default activateTabs;
