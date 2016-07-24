function isAncestor(checks, depth, item) {
  for(var ci = 0; ci < depth; ci++) {
    if (checks[ci](item)) {
      return true
    }
  }
}

function nestler(get, size, check) {
  const _nestler = function(depth, pos) {
    return {
      [Symbol.iterator]() {
        return {
          next() {
            while (pos < size) {
              const item = get(pos)
              pos++;

              // check if its at our level
              if (check[depth](item)) {
                return {
                  value: {
                    parent: item,
                    children: _nestler(depth+1, pos)
                  },
                  done: false
                }
              }

              // check if it belongs to a parent
              // otherwise assume its an unwanted
              // child and we'll skip over it
              if (isAncestor(check, depth, item)) {
                break
              }
            }
            return { done: true }
          }
        }
      }
    }
  }
  return _nestler(0, 0) // start at depth 0, pos 0
}

module.exports = nestler
