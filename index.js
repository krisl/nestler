function nestler(list, size, check, checkpos = 0, state = {pos:0}) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          while (state.pos < size) {
            const item = list[state.pos]
            state.pos++;

            // check if its at our level
            if (check[checkpos](item)) {
              return {
                value: {
                  parent: item,
                  children: nestler(list, size, check, checkpos+1, state)
                },
                done: false
              }
            }

            // check if it belongs to a parent
            for(var ci = 0; ci < checkpos; ci++) {
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

module.exports = nestler
