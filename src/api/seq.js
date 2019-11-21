import List from './list';

export default class Seq extends List {
  constructor(options) {
    super(options);
    this.value = options.args ? options.args[0].sort() : options;
  }

  static isSeq(obj) {
    return obj instanceof Seq;
  }

  push(item) {
    const result = super.push(item).toJSON();
    return new Seq({
      args: [result],
    });
  }

  map(fn) {
    const result = super.map(fn).toJSON();
    return new Seq({
      args: [result],
    });
  }
}
