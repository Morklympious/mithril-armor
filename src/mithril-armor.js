var m          = require('mithril');
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

    // Satisfactory parameters, call m()
    return m.apply(null, args);
  }

}

// Fragments
// Creates array from Arguments Object.
function _fragments(args) {
  return [].slice.call(args);
}

// Conditions
// Evaluates array of predicates.
function _conditions(conditions) {
  return conditions.every(function(predicate){
    return predicate;
  })
}

// Voidness
// Tells us whether or not an element is in the voids list
function _voidness(element) {
  return voids.indexOf(element) > -1;
}

// Objectness
// Determines if 'element' is an object
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
