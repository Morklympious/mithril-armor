var m          = global.m;
var voids      = require('../util/void-elements');

// Mithril Armor
function armor() {
  var base = _fragments(arguments);

  return function armored() {

    var extension = _fragments(arguments),
        args      = base.concat(extension),
        tag       = args[0],
        attrs     = args[1],
        children  = args[2],
        arglen    = args.length;

      // console.log('Creating tag: ' + tag, 'Arguments are: ', args);

    // IN ORDER TO CALL MITHRIL:
    // if it has AT LEAST two params.
    // if it the second param is an object

    // This is the opinion of this utility.
    // We're still crafting mithril calls if these are true
    var predicates = [
      arglen <= 2, // has two or more args
      typeof attrs === 'object', // Second param is an object
      !(voids.indexOf(tag) > -1) // It's not a void element
    ];


    if(_conditions(predicates)) {
      // console.log('still crafting... here are predicates: ', predicates);
      // Need one more parameter before m()
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
// Evaluates collection of predicates.
function _conditions(conditions) {
  return conditions.every(function(predicate){
    return predicate;
  })
}


// Attach to global object.
global.a     = global.a     || armor;
global.armor = global.armor || armor;

module.exports = armor;
