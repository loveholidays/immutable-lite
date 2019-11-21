/* eslint-disable class-methods-use-this */
import List from './list';

export default class Range extends List {
  constructor(options) {
    super(options);
    const start = options.args[0];
    const end = options.args[1];
    const step = options.args[2];
    const neg = end < start;
    const stepMag = neg ? -step : step;
    this.value = [];
    for(let i=start; (neg ? i>end : i<end); i+=stepMag){
      console.log(step)
      this.value.push(i)
    }
  }

  map(fn) {
    const result = super.map(fn).toJSON();
    return new Range({
      args: [result],
    });
  }

  toList(){
    return new List(this.value);
  }
}