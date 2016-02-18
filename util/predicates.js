function equal(a, b) {
  return a === b;
}

function object(obj) {
  var type = typeof obj;
  return !!obj && (type === 'object' || type === 'function') ;
}

function predicate(predicate, index, collection) {
  return predicate;
}

module.exports = {
  equal: equal,
  object: object,
  predicate: predicate
}
