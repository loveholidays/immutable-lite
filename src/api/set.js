/* eslint-disable class-methods-use-this */
import List from './list';

export default class Set extends List {
  constructor(options) {
    super(options);
    this.value = options.args ? options.args[0] : options;
  }

  static of(...items) {
    const result = [...items];
    return new Set({
      args: [result],
    });
  }

  static isSet(obj) {
    return obj instanceof Set;
  }

  push(item) {
    const result = super.push(item).toJSON();
    return new List({
      args: [result],
    });
  }
}
