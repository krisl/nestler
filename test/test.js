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
    result = nestler((index) => list[index] , list.length, [
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
      switch (l1.parent.name) {
        case 'a':
          expect([...l1.children]).to.eql([
            {parent: {level: '2', name: 'aa'}, children: {}},
            {parent: {level: '2', name: 'ab'}, children: {}},
            {parent: {level: '2', name: 'ac'}, children: {}},
            {parent: {level: '2', name: 'ad'}, children: {}}
          ])
          break;
        case 'b':
          expect([...l1.children]).to.eql([
            {parent: {level: '2', name: 'ba'}, children: {}}
          ])
          break;

        default:
          expect(l2.parent.name).to.equal('!@#$')
      }
    }
  })

  it('should iterate over level 3', () => {
    for(var l1 of result) {
      for(var l2 of l1.children) {
        switch (l2.parent.name) {
          case 'aa':
            expect([...l2.children]).to.eql([
              {parent: {level: '3', name: 'aaa'}, children: {}}
            ])
            break;

          case 'ab':
            expect([...l2.children]).to.eql([
              {parent: {level: '3', name: 'aba'}, children: {}},
              {parent: {level: '3', name: 'abb'}, children: {}}
            ])
            break;

          case 'ac':
            expect([...l2.children]).to.eql([])
            break;

          case 'ad':
            expect([...l2.children]).to.eql([
              {parent: {level: '3', name: 'ada'}, children: {}}
            ])
            break;

          case 'ba':
            expect([...l2.children]).to.eql([])
            break;

          default:
            expect(l2.parent.name).to.equal('!@#$')
        }
      }
    }
  })
})

