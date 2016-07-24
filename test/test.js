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
  const result = nestler(list, list.length, [
    (item) => item.level === '1',
    (item) => item.level === '2',
    (item) => item.level === '3',
    () => false
  ])

  it('should be iterable', () => {
    expect(result).to.be.iterable
  })

  it('should iterate over parent level', () => {
    expect([...result]).to.eql([
      {parent: {level: '1', name: 'a'}, children: {}},
      {parent: {level: '1', name: 'b'}, children: {}}
    ])
  })
})

