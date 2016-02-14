var       m  = global.m,
      voids  = require('../util/void-elements'),
 predicates  = require('../util/predicates'),
   _isEqual  = predicates.isEqual,
  _isObject  = predicates.isObject,
  _predicate = predicates.predicate;

// Mithril Armor
function armor() {
  var base = _fragments(arguments);

  return function armored() {

    var extension = _fragments(arguments),
        args      = base.concat(extension),
        arglen    = args.length;

    var incomplete = [
      _isEqual(arglen, 2),
      _isObject(args[1]),
      voids.indexOf(args[0]) < 0
    ]

    if(incomplete.every(_predicate)) {
      // Need one more parameter before m()
      return armor.apply(null, args);
    }

    // Satisfactory parameters, call m()
    return m.apply(null, base.concat(extension));
  }
}



// Fragments
// Creates array from Arguments Object.
function _fragments(args) {
  return [].slice.call(args);
}


global.a = global.a || armor;
module.exports = armor;
