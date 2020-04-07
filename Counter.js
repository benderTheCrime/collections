const {DefaultObject} = require('./DefaultObject')

module.exports = {
  Counter,
}

function Counter(...args) {
  const keys = new Set()
  const manyArgs = args.length > 1
  const firstArg = args[0]
  const firstArgType = typeof firstArg
  const defaultTypes = {
    array: Array,
    boolean: Boolean,
    number: Number,
    object: Object,
    string: String,
  }

  if (!defaultTypes[firstArgType]) throw new Error('Incompatible argument type.')

  const counts = DefaultObject(defaultTypes[firstArgType])
  const parsers = {
    array: null,
    boolean(...args) {
      for (const arg of args) {
        if (arg === true || !!arg) {
          keys.add(true)
          counts[true] += 1
        } else {
          keys.add(false)
          counts[false] += 1
        }
      }
    },
    object: null,
    string(...args) {
      if (manyArgs) {
        for (const arg of args) {
          counts[arg] += 1
        }
      } else {
        for (const char of firstArg) {
          counts[char] += 1
        }
      }
    },
    number: null,
  }
  const parser = parsers[firstArgType]
  const methods = {
    subtract() {

    }
  }

  parser(...args)

  // console.log(args.length)

  // Keep a sorted key structure in the counter

  // Return the available methods on the structure.
  return new Proxy({}, {
    get(_, key) {
      if (methods.hasOwnProperty(key)) {
        return method
      }

      return counts[key]
    },
    keys() {
      return keys
    },
    set(_, key, value) {
      if (methods.hasOwnProperty(key)) {
        // Sure, why not?
        methods[key] = value
      }

      keys.add(key)
      counts[key] = value
    }
    // subtract
    // topN
    // mostCommon
    // elements
    // update
    // items
    // valueOf
    // addition behavior
    // other proxy props
    // += q
  })
}

// fromKeys