function isAncestor(checks, depth, item) {
  for(var ci = 0; ci < depth; ci++) {
    if (checks[ci](item)) {
      return true
    }
  }
}

function nestler(get, size, check) {
  const state = {pos: 0}
  const _nestler = function(depth) {
    return {
      [Symbol.iterator]() {
        return {
          next() {
            while (state.pos < size) {
              const item = get(state.pos)
              state.pos++;

              // check if its at our level
              if (check[depth](item)) {
                return {
                  value: {
                    parent: item,
                    children: _nestler(depth+1)
                  },
                  done: false
                }
              }

              // check if it belongs to a parent
              if (isAncestor(check, depth, item)) {
                state.pos--;
                break
              }
            }
            return { done: true }
          }
        }
      }
    }
  }
  return _nestler(0) // start at depth 0
}

module.exports = nestler
