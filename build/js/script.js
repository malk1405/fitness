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

function app() {
  activateTabs();
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
