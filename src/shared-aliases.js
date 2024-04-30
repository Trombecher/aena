export let
    isInstanceOf = (test, prototype) => test instanceof prototype,
    forEachString = "forEach",
    _Object = Object,
    isArray = x => isInstanceOf(x, Array),
    objectEntries = _Object.entries;