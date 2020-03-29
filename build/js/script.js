/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source/js/app.js":
/*!**************************!*\
  !*** ./source/js/app.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function activateTabs() {
  var tabs = document.querySelector('.abonement__months');
  var plans = document.querySelectorAll('.abonement__plans');
  tabs.addEventListener('change', function (e) {
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
    lg: {
      maxWidth: Infinity,
      num: 4
    },
    md: {
      maxWidth: 1365,
      num: 2
    },
    sm: {
      maxWidth: 767,
      num: 1
    }
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
      if (i < min) cards[i].classList.add(className);else cards[i].classList.remove(className);
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

  prevBtn.addEventListener('click', function () {
    var newIndex = index - getWindowSize();
    if (newIndex < 0) return;
    index = newIndex;
    displayAll();
  });
  nextBtn.addEventListener('click', function () {
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
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

docReady(app);

/***/ })

/******/ });
//# sourceMappingURL=script.js.map