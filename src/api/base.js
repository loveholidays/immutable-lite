/* eslint-disable class-methods-use-this */
import UndefinedAPI from '../undefined';

const IS_DEV = process.env.NODE_ENV === 'development';

export default class Base {
  constructor(options = {}) {
    if(IS_DEV){
      // import(/* webpackChunkName: "jsonProps" */ './../api.json').then((props) => {
      //   console.log(props);
      //   this.wrap(options.path, options.args, props);
      // })
    }
    this.mutate = false;
  }

  static handleMissingProps (obj = {}, properties = props, path = [], args) {
    Object.keys(properties).forEach((key) => {
      const newPath = [...path, key];
      if (!obj[key]) {
        obj[key] = (...fnArgs) => new UndefinedAPI({ // eslint-disable-line
          path: newPath,
          throwError: true,
          args,
          fnArgs,
        });
      }
      if (properties[key]) {
        handleMissingProps(obj, properties[key], newPath);
      }
    });
    return obj;
  };

  setMutate(state){
    this.mutate = state;
  }

  inspect(){
    return this;
  }

  wrap(path = [], args = {}, props = {}) {
    let prop = props;
    path.forEach((key) => {
      prop = prop && prop[key];
    });
    return handleMissingProps(this, prop, path, args);
  }

  equals(item) {
    return (
      item instanceof Base &&
      JSON.stringify(this.toJSON()) === JSON.stringify(item.toJSON())
    );
  }

  has(item) {
    return !!this.value[item];
  }

  toJS() { // eslint-disable-line
    return this.toJSON();
  }

  toJSON() {
    if (this.value instanceof Array) {
      const result = [];
      this.value.forEach((item) => {
        if (item instanceof Base) {
          result.push(item.toJSON());
        } else {
          result.push(item);
        }
      });
      return result;
    }
    if (this.value instanceof Object) {
      const result = {};
      Object.keys(this.value).forEach((key) => {
        if (this.value[key] instanceof Base) {
          result[key] = this.value[key].toJSON();
        } else {
          result[key] = this.value[key];
        }
      });
      return result;
    }
    return this.value;
  }

  toArray() {
    const obj = { ...this.value };
    const result = [];
    Object.keys(obj).forEach((key) => {
      result.push(obj[key]);
    });
    return result;
  }
}
