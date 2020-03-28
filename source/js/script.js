'use strict';
// Источник: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
(function() {
  // helpers
  var regExp = function(name) {
    return new RegExp('(^| )' + name + '( |$)');
  };
  var forEach = function(list, fn, scope) {
    for (var i = 0; i < list.length; i++) {
      fn.call(scope, list[i]);
    }
  };

  // class list object with basic methods
  function ClassList(element) {
    this.element = element;
  }

  ClassList.prototype = {
    add: function() {
      forEach(
        arguments,
        function(name) {
          if (!this.contains(name)) {
            this.element.className += ' ' + name;
          }
        },
        this
      );
    },
    remove: function() {
      forEach(
        arguments,
        function(name) {
          this.element.className = this.element.className.replace(
            regExp(name),
            ''
          );
        },
        this
      );
    },
    toggle: function(name) {
      return this.contains(name)
        ? (this.remove(name), false)
        : (this.add(name), true);
    },
    contains: function(name) {
      return regExp(name).test(this.element.className);
    },
    // bonus..
    replace: function(oldName, newName) {
      this.remove(oldName), this.add(newName);
    }
  };

  // IE8/9, Safari
  if (!('classList' in Element.prototype)) {
    Object.defineProperty(Element.prototype, 'classList', {
      get: function() {
        return new ClassList(this);
      }
    });
  }

  // replace() support for others
  if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
    DOMTokenList.prototype.replace = ClassList.prototype.replace;
  }
})();

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
