/* eslint-disable class-methods-use-this */
import List from './list';

export default class Stack extends List {
  constructor(options) {
    super(options);
    this.value = options.args ? options.args[0] : options;
  }

  static isStack(obj) {
    return obj instanceof Stack;
  }

  push(item) {
    const result = super.push(item).toJSON();
    return new List({
      args: [result],
    });
  }
}
