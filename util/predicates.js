function isEqual(a, b) {
  return a === b;
}

function isObject(obj) {
  return {}.toString.call(obj) === '[object Object]';
}

function predicate(predicate, index, collection) {
  return predicate;
}

module.exports = {
  isEqual: isEqual,
  isObject: isObject,
  predicate: predicate
}
