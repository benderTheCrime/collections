# Collections

Helpful collections shamelessly copied from [Python](https://docs.python.org/2/library/collections.html#module-collections) and ported to JS.

## Installation

```sh
npm i @benderthecrime/collections
```

## Usage

### DefaultObject

```javascript
const collections = require('@benderthecrime/collections')
const {DefaultObject} = collections

const collector = DefaultObject(Number)
const values = ['a', 'b', 'c', 'd', 'a']

for (const value in values) {
    // No need to check to see if the value already exists in the collection.
    collector[value] += 1
}

// Works with scalar values too!
const defaulter = DefaultObject(null)

// And custom classes!
const defaulter = DefaultObject(Test, 'some argument', 'another argument')

// You can even make a DefaultObject inside a DefaultObject!
const collectoe = DefaultObject(DefaultObject, String)
```
