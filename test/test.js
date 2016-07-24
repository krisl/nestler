const expect = require ('chai').expect 
const nestler = require('../index')

const list = Object.freeze([
  {level: '1', name: 'a'},
  {level: '2', name: 'aa'},
  {level: '3', name: 'aaa'},
  {level: '2', name: 'ab'},
  {level: '3', name: 'aba'},
  {level: '3', name: 'abb'},
  {level: '2', name: 'ac'},
  {level: '2', name: 'ad'},
  {level: '3', name: 'ada'},
  {level: '1', name: 'b'},
  {level: '2', name: 'ba'}
])

describe('nestler', () => {
  let result
  beforeEach(() => {
    result = nestler(list, list.length, [
      (item) => item.level === '1',
      (item) => item.level === '2',
      (item) => item.level === '3',
      () => false
    ])
  })

  it('should be iterable', () => {
    expect(result).to.be.iterable
  })

  it('should iterate over parent level', () => {
    expect([...result]).to.eql([
      {parent: {level: '1', name: 'a'}, children: {}},
      {parent: {level: '1', name: 'b'}, children: {}}
    ])
  })

  it('should iterate over level 2', () => {
    for(var l1 of result) {
      if (l1.parent.name === 'a') {
        expect([...l1.children]).to.eql([
          {parent: {level: '2', name: 'aa'}, children: {}},
          {parent: {level: '2', name: 'ab'}, children: {}},
          {parent: {level: '2', name: 'ac'}, children: {}},
          {parent: {level: '2', name: 'ad'}, children: {}}
        ])
      } else if (l1.parent.name === 'b') {
        expect([...l1.children]).to.eql([
          {parent: {level: '2', name: 'ba'}, children: {}}
        ])
      }
    }
  })

  it('should iterate over level 3', () => {
    for(var l1 of result) {
      for(var l2 of l1.children) {
        if (l2.parent.name === 'aa') {
          expect([...l2.children]).to.eql([
            {parent: {level: '3', name: 'aaa'}, children: {}}
          ])
        } else if (l2.parent.name === 'ab') {
          expect([...l2.children]).to.eql([
            {parent: {level: '3', name: 'aba'}, children: {}},
            {parent: {level: '3', name: 'abb'}, children: {}}
          ])
        } else if (l2.parent.name === 'ac') {
          expect([...l2.children]).to.eql([])
        } else if (l2.parent.name === 'ad') {
          expect([...l2.children]).to.eql([
            {parent: {level: '3', name: 'ada'}, children: {}}
          ])
        }
      }
    }
  })
})

