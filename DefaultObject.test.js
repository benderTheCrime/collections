const {expect} = require('chai')

const {DefaultObject} = require('./DefaultObject')

describe('DefaultObject', () => {
  it('should be callable', () => {
    expect(DefaultObject()).to.be.an.instanceof(Object)
  })
  it('should be callable with new', () => {
    expect(new DefaultObject()).to.be.an.instanceof(Object)
  })
  it('should support null', () => {
    const defaultObject = DefaultObject(undefined)

    expect(defaultObject['_']).to.equal(undefined)
  })
  it('should support null', () => {
    const defaultObject = DefaultObject(null)

    expect(defaultObject['_']).to.equal(null)
  })
  // NOTE: I'm not sure why you would want to use symbols with
  // this collection. There is a special case with constructing 
  // Symbols.
  it('should support symbols', () => {
    const defaultObject = DefaultObject(Symbol)

    expect(defaultObject['_']).to.be.a('symbol')
  })
  describe('should support scalars', () => {
    it('should support array scalars', () => {
      const defaultObject = DefaultObject([1, 2, 3])

      expect(defaultObject['_']).to.deep.equal([1, 2, 3])

      defaultObject['_'].push(4, 5, 6)

      expect(defaultObject['_']).to.deep.equal([1, 2, 3, 4, 5, 6])

      expect(defaultObject['__']).to.deep.equal([1, 2, 3])
    })
    it('should support object scalars', () => {
      const defaultObject = DefaultObject({_: 1})

      expect(defaultObject['_']).to.deep.equal({_: 1})

      defaultObject['_']['__'] = 2

      expect(defaultObject['_']).to.deep.equal({_: 1, __: 2})

      expect(defaultObject['__']).to.deep.equal({_: 1})
    })
    it('should support boolean scalars', () => {
      const defaultObject = DefaultObject(Boolean)

      expect(defaultObject['_']).to.equal(false)

      defaultObject['_'] = true

      expect(defaultObject['_']).to.equal(true)
    }) 
    it('should support string scalars', () => {
      const defaultObject = DefaultObject('abc')

      expect(defaultObject['_']).to.equal('abc')

      defaultObject['_'] += 'def'

      expect(defaultObject['_']).to.equal('abcdef')
    }) 
    it('should support number scalars', () => {
      const defaultObject = DefaultObject(1)

      expect(defaultObject['_']).to.equal(1)

      defaultObject['_'] += 1

      expect(defaultObject['_']).to.equal(2)
    }) 
  })
  describe('should support array methods', () => {
    it('should set a default value', () => {
      const defaultObject = DefaultObject(Array)

      expect(defaultObject['_']).to.deep.equal([])
    })
    it('should support push', () => {
      const defaultObject = DefaultObject(Array)

      defaultObject['_'].push(1, 2, 3)
      expect(defaultObject['_']).to.deep.equal([1, 2, 3])
    })
    it('should support concat', () => {
      const defaultObject = DefaultObject(Array)

      defaultObject['_'].concat([1, 2, 3])
      expect(defaultObject['_']).to.deep.equal([])
    })
  })
  describe('should support object operations', () => {
    it('should set a default value', () => {
      const defaultObject = DefaultObject(Object)

      expect(defaultObject['_']).to.deep.equal({})
    })
    it('should support deep setting objects', () => {
      const defaultObject = DefaultObject(Object)

      defaultObject['_']['_'] = 1

      expect(defaultObject['_']['_']).to.equal(1)
    })
  })
  describe('should support string operations', () => {
    it('should set a default value', () => {
      const defaultObject = DefaultObject(String)

      expect(defaultObject['_']).to.equal('')
    })
    it('should support string addition', () => {
      const defaultObject = DefaultObject(String)

      expect(defaultObject['_']).to.equal('')

      defaultObject['_'] += 'abc'

      expect(defaultObject['_']).to.equal('abc')
    })
    it('should not support repeat', () => {
      const defaultObject = DefaultObject(String)
    
      defaultObject['_'] += 'abc'
      defaultObject['_'].repeat(30)
    
      expect(defaultObject['_']).to.deep.equal('abc')
    })
  })
  describe('should support number operations', () => {
    it('should set a default value', () => {
      const defaultObject = DefaultObject(Number)

      expect(defaultObject['_']).to.equal(0)
    })
    it('should support number addition', () => {
      const defaultObject = DefaultObject(Number)

      defaultObject['_'] += 1

      expect(defaultObject['_']).to.equal(1)
    })
    it('should not support floor', () => {
      const defaultObject = DefaultObject(Number)
    
      defaultObject['_'] += 1
      Math.floor(defaultObject['_'])
    
      expect(defaultObject['_']).to.equal(1)
    })
  })
  describe('should support custom classes', () => {
    it('should support custom ctor class', () => {
      class Test {}

      const defaultObject = DefaultObject(Test)

      expect(defaultObject['_']).to.be.an.instanceOf(Test)
    })
    it('should support custom ctor with arguments', () => {
      class Test {
        constructor(...args) {
          expect(args).to.deep.equal([1, 2, 3])
        }
      }

      const defaultObject = DefaultObject(Test, 1, 2, 3)

      expect(defaultObject['_']).to.be.an.instanceOf(Test)
    })
    it('should support custom class with getter', () => {
      class Test {
        get foo() {
          return 'bar'
        }
      }

      const defaultObject = DefaultObject(Test, {arguments: [1, 2, 3]})

      expect(defaultObject['_']).to.be.an.instanceOf(Test)
      expect(defaultObject['_']['foo']).to.equal('bar')
    })
    it('should support recursive defaultString', () => {
      const defaultObject = DefaultObject(DefaultObject, String)

      expect(defaultObject['_']['__']).to.equal('')
    })
  })
})