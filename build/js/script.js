'use strict';

function activateTabs() {
  var tabs = document.querySelector('.abonement__months');
  var plans = document.querySelectorAll('.abonement__plans');

  tabs.addEventListener('change', function(e) {
    var id = event.target.value;
    if (!plans[id]) return;

    plans.forEach(function(plan) {
      plan.classList.add('visually-hidden');
    });

    plans[id].classList.remove('visually-hidden');
  });
}

function app() {
  activateTabs();
}

window.addEventListener('DOMContentLoaded', app);
