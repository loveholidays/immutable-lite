import Map from './map';

export default class OrderedMap extends Map {
  constructor(options) {
    super(options);
    const val = options.args ? options.args[0] : options;
    this.value = {};
    Object.keys(val).sort().forEach((key) => {
      this.value[key] = val[key];
    });
  }

  static isOrderedMap(obj) {
    return obj instanceof OrderedMap;
  }
}
