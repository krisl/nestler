Nestler
========

Nestles a sorted flat list without parent references into a nested structure

## Installation

  `npm install nestler`

## Usage

Say you have a flat list thus:
```javascript
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
```

You can access child nodes recursively like:
```javascript
const result = nestler(
  (index) => list[index],         // fn to fetch item by position
  list.length,                    // length of set to check over
  [                               // array of fns for checking if
    (item) => item.level === '1', // children exist as each level
    (item) => item.level === '2',
    (item) => item.level === '3',
    () => false
  ]
)

Array.from(result).map((level1) =>
  <Level1 item={level1}>
    {Array.from(level1.children).map((level2) =>
      <Level2 item={level2}>
        {Array.from(level2.children).map((level3) =>
          <Level3 item={level3} />
        )}
      </Level2>
    )}
  </Level1>
)
```

nestler returns an iterable of node objects
```javascript
{
  parent: <original_object>,
  children: <iterable of nodes>
}
```


## Tests

  `npm test`
