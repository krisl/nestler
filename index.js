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
              for(var ci = 0; ci < depth; ci++) {
                if (check[ci](item)) {
                  state.pos--
                  return { done: true };
                }
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
