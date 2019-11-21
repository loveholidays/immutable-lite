/* eslint-disable class-methods-use-this */
import Iterable from './iterable';

export default class List extends Iterable {
  constructor(options) {
    super(options);
    this.value = options.args ? options.args[0] || [] : options || [];
  }

  static isList(obj) {
    return obj instanceof List;
  }

  forEach(sideEffect) {
    let stop = false;
    this.value.forEach((...args) => {
      if(!stop){
        stop = !sideEffect(...args);
      }
    })
  }

  flatMap(mapper) {
    const result = [];
    this.value.forEach((...args) => {
      const val = mapper(...args);
      result.push(...val)
    })
    return new List(result);
  }

  push(item) {
    const result = [...this.value];
    result.push(item);
    return new List(result);
  }

  map(fnMapper) {
    const result = this.value.map(fnMapper);
    return new List(result);
  }

  sort() {
    const result = this.value.sort();
    return new List(result);
  }
}
