(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var m          = global.m;
var voids      = require('../util/void-elements');

// Mithril Armor
function armor() {
  var base   = _fragments(arguments),
      arglen = base.length;

  if (_shouldCallMithril(base)) {
    return m.apply(null, base);
  }

  return function armored() {

    var extension = _fragments(arguments),
        args      = base.concat(extension),
        tag       = args[0],
        attrs     = args[1],
        children  = args[2],
        arglen    = args.length;


    var predicates = [
      (arglen <= 2),                // has two or more args
      (_objectness(attrs)),          // Second param is an object
      !(voids.indexOf(tag) > -1)    // It's not a void element
    ];

    if(_conditions(predicates)) {
      return armor.apply(null, args);
    }

    // Reached only if there are satisfactory parameters
    return m.apply(null, args);
  }

}

// Fragments
// Used to keep messy calls out of main function
function _fragments(args) {
  return [].slice.call(args);
}

// Conditions
// Used to keep messy calls out of main function
function _conditions(conditions) {
  return conditions.every(function(predicate){
    return predicate;
  })
}

// Voidness
//  Used to keep messy calls out of main function
function _voidness(element) {
  return voids.indexOf(element) > -1;
}

// Objectness
//  Used to keep messy calls out of main function
function _objectness(element) {
  return {}.toString.call(element) === '[object Object]'
}


function _shouldCallMithril(base) {

  // Return true if:
  //  - It's a non-void element with 3 arguments
  //  - It's a void element with two arguments.

  var arglen = base.length;
  var shouldCall = ((arglen === 2 && _voidness(base[0])) || arglen === 3)

  if(shouldCall) {
    return true;
  }
}

// Attach to global object.
global.a     = global.a     || armor;
global.armor = global.armor || armor;

module.exports = armor;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util/void-elements":2}],2:[function(require,module,exports){
// Sourced from Mithril's 'voidElements'
var voids = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];


module.exports = voids;

},{}]},{},[1]);
