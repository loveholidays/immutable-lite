import Base from './base';
import List from './list';
import Seq from './seq';
import { fromJS } from './common/common';

export default class Map extends Base {
  constructor(options) {
    super(options);
    this.value = options.args ? options.args[0] || {} : options || {};
  }

  static isMap(obj) {
    return obj instanceof Map;
  }

  filter(fnDecide) {
    const result = {};
    Object.keys(this.value).forEach(((key) => {
      if (fnDecide(this.value[key], key)) {
        result[key] = this.value[key];
      }
    }));
    return new Map(result);
  }

  forEach(sideEffect) {
    let stop = false;
    this.toArray().forEach((...args) => {
      if(!stop){
        stop = !sideEffect(...args);
      }
    })
  }

  keySeq(){
    return new Seq(this.toArray());
  }

  get(key, notSetValue = undefined) {
    if (typeof this.value[key] === 'undefined') {
      return notSetValue;
    }
    return this.value[key];
  }

  getIn(path) {
    let obj = this.mutate ? this.value : this.toJSON();
    path.forEach((key) => {
      obj = obj && obj[key];
    });
    return fromJS(obj);
  }

  isEmpty(){
    return Object.keys(this.value) === 0;
  }

  merge(obj = {}) {
    const result = this.mutate ? this.value : this.toJSON();
    const newObj = obj instanceof Base ? obj.toJSON() : obj;
    Object.keys(newObj).forEach((key) => {
      result[key] = newObj[key];
    });
    return fromJS(result);
  }

  mergeDeep(obj = {}) {
    const newObj = obj instanceof Base ? obj.toJSON() : obj;
    const result = { ...this.value };
    Object.keys(newObj).forEach((k) => {
      if( result[k] instanceof Base ) {
        result[k] = result[k].mergeDeep(newObj[k]);
      } else {
        result[k] = newObj[k];
      }
    });
    return fromJS(result);
  }

  mergeIn(...args) {
    const path = args[0];
    const items = args.slice(1);
    const json = this.mutate ? this.value : this.toJSON();
    let current = json;
    path.forEach((key, index) => {
      if(!current[key]){
        current[key] = {};
      }
      current = current[key];
      if (index === path.length - 1) {
        items.forEach((obj) => {
          const newObj = obj instanceof Base ? obj.toJSON() : obj;
          Object.keys(newObj).forEach((k) => {
            current[k] = newObj[k];
          });
        });
      }
    });
    return fromJS(json);
  }

  set(key, val) {
    const result = this.mutate ? this.value : { ...this.value };
    result[key] = val;
    return new Map(result);
  }

  setIn(path, obj) {
    const json = this.mutate ? this.value : this.toJSON();
    let current = json;
    path.forEach((key, index) => {
      if(!current[key]){
        current[key] = {};
      }
      current = current[key];
      if (index === path.length - 1) {
        const newObj = obj instanceof Base ? obj.toJSON() : obj;
        Object.keys(newObj).forEach((k) => {
          current[k] = newObj[k];
        });
      }
    });
    return fromJS(json);
  }

  toObject() {
    return { ...this.value };
  }


  delete(key) {
    const result = this.mutate ? this.value : { ...this.value };
    delete result[key];
    return new Map(result);
  }

  find(fn) {
    return this.toArray().find(fn);
  }

  map(mapper){
    const result = this.toArray().map(mapper)
    return new Map(result);
  }

  some(fn) {
    return this.toArray().some(fn);
  }

  toList() {
    const result = [];
    Object.keys(this.value).forEach(((key) => {
      result.push(this.value[key]);
    }));
    return new List(result);
  }

  update(...args) {
    const key = args.length > 1 && args[0];
    const notSetValue = args.length >= 3 && args[1];
    const updater = args.length === 1 ? args[0] : ( args.length === 2 ? args[1] : args[2] );
    const value = this.mutate ? this.value : { ...this.value };
    if (key) {
      if (!value[key]) {
        value[key] = notSetValue;
      } 
      if (value[key] instanceof Base) {
        value[key].setMutate(this.mutate);
      }
      value[key] = updater(value[key]);
    } else {
      Object.keys(value).forEach((key) => {
        if (value[key] instanceof Base) {
          value[key].setMutate(this.mutate);
        }
        value[key] = updater(value[key]);
      })
    }
    return this.mutate ? new Map(value) : this;
  }

  updateIn(...args) {
    const path = args[0];
    const notSetValue = args.length > 2 ? args[1] : undefined;
    const updater = args.length > 2 ? args[2] : args[1];
    const json = this.mutate ? this.value : this.toJSON();
    let current = json;
    path.forEach((key, index) => { // eslint-disable-line
      if (index === path.length - 1) {
        if (notSetValue && typeof current[key] === 'undefined') {
          current[key] = notSetValue;
        }
        current[key] = updater(current[key]);
      }
      current = current[key];
    });
    return fromJS(json);
  }

  valueSeq() {
    const result = [];
    Object.keys(this.value).forEach(((key) => {
      result.push(this.value[key]);
    }));
    return new List(result.sort());
  }

  withMutations(mutator){
    this.setMutate(true);
    mutator(this);
    this.setMutate(false);
    return fromJS(this.value);
  }
}
