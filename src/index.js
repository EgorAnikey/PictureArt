 /*jshint esversion: 8 */
 require('formdata-polyfill');
 window.addEventListener('DOMContentLoaded', function () {

   'use strict';

   let mainSlider = require('./parts/mainSlider.js'),
     burgerMenu = require('./parts/burgerMenu.js'),
     feedbackSlider = require('./parts/feedbackSlider.js'),
     showMoreStyles = require('./parts/showMoreStyles.js'),
     hoverImg = require('./parts/hoverImg.js'),
     filter = require('./parts/filter.js'),
     modalPresent = require('./parts/modalPresent.js'),
     calc = require('./parts/calc.js');
   mainSlider();
   burgerMenu();
   feedbackSlider();
   showMoreStyles();
   hoverImg();
   filter('#portfolio .container', '.portfolio-menu li', '.portfolio-block');
   modalPresent();
   calc();


 });
 if ('NodeList' in window && !NodeList.prototype.forEach) {
   console.info('polyfill for IE11');
   NodeList.prototype.forEach = function (callback, thisArg) {
     thisArg = thisArg || window;
     for (var i = 0; i < this.length; i++) {
       callback.call(thisArg, this[i], i, this);
     }
   };
 }