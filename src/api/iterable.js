/* eslint-disable class-methods-use-this */
import Base from './base';

export default class Iterable extends Base {
  constructor(options) {
    super(options);
    this.value = options.args ? options.args[0] || [] : options || [];
  }

  static isIterable(obj) {
    return obj instanceof Iterable;
  }

  inspect(){
    return this;
  }

  indexOf(item) {
    return this.value.indexOf(item);
  }

  first() {
    return this.value[0];
  }

  filter(fn) {
    const result = this.value.filter(fn);
    return new Iterable(result);
  }

  find(fn) {
    return this.value.find(fn);
  }

  map(mapper) {
    const result = this.value.map(mapper);
    return new Iterable(result);
  }

  some(fn) {
    return this.value.some(fn);
  }
}
