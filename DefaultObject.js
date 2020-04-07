module.exports = {
  DefaultObject,
}

function DefaultObject(ctor, ...args) {
  // NOTE: Constructed keys allow us to keep track of values
  // with expressly setting them on the object.
  let constructedKeys = {}

  return new Proxy({}, {get: getter})

  function getter(obj, prop) {
    if (obj.hasOwnProperty(prop)) return obj[prop]
    if (constructedKeys.hasOwnProperty(prop)) return (obj[prop] = constructedKeys[prop])

    if (typeof ctor === 'function') {
      // NOTE: Symbols are a special case in that they have
      // an internal constructor function and cannot be called
      // with new.
      if (ctor === Symbol) {
        constructedKeys[prop] = Symbol()

      // NOTE: Boolean supports being called with new and
      // it returns a wrapped value when you do!
      } else {
        try {
          constructedKeys[prop] = ctor(...args)
        } catch {
          constructedKeys[prop] = Reflect.construct(ctor, [...args])
        }
      }
    } else if (typeof ctor === 'object') {
      // NOTE: Cheap object cloning.
      try {
        constructedKeys[prop] = JSON.parse(JSON.stringify(ctor))
      } catch (e) {
        throw e // NOTE: Raises on self-referential objects.
      }
    } else {
      constructedKeys[prop] = ctor
    }

    return constructedKeys[prop]
  }
}