/* eslint-disable class-methods-use-this */
import Set from './set';

export default class OrderedSet extends Set {
  constructor(options) {
    super(options);
    this.value = options.args ? options.args[0] : options;
  }

  static of(...items) {
    const result = super.of(...items);
    return new OrderedSet({
      args: [result.toJS().sort()], // eslint-disable-line
    });
  }

  static isOrderedSet(obj) {
    return obj instanceof OrderedSet;
  }

  push(item) {
    const result = super.push(item).toJSON();
    return new Set({
      args: [result],
    });
  }
}
