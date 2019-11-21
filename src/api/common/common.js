import Base from '../base';
import List from '../list'; // eslint-disable-line
import Map from '../map'; // eslint-disable-line

export const fromJS = (options, depth = 0) => { // eslint-disable-line
  const data = (options && options.args)
    ? options.args[0]
    : options;
  if (typeof data !== 'object' || data instanceof Base) {
    return data;
  }
  if (++depth > 20) {
    throw Error('Maximum depth for data', data);
    return data;
  }
  if (data instanceof Array) {
    const result = [];
    data.forEach((item) => {
      result.push(fromJS(item, depth));
    });
    return new List({
      args: [result],
      depth,
    });
  }
  if (data instanceof Object) {
    const result = {};
    Object.keys(data).forEach((key) => {
      result[key] = fromJS(data[key], depth);
    });
    return new Map({
      args: [result],
      depth,
    });
  }
  return data;
};
