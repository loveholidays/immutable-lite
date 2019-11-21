/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
// import Immutable from 'immutable';

export default class UndefinedAPI {
  constructor(options = { throwError: true }) {
    if (options.throwError) {
      this.throwError(options.path);
    }
    // return this.valueFromImmutable(options.path, options.args, options.fnArgs);
  }

  valueFromImmutable(path = [], args = [], fnArgs = []) {
    const api = Immutable[path[0]];
    const apiInstance = api(...args);
    const errorMessage = `For ${path.join('->')}(${JSON.stringify(fnArgs, null, ' ')}), using value returned from the real Immutable: `;
    if (path.length === 2) {
      const val = apiInstance[path[1]](...fnArgs);
      console.log(errorMessage, val && val.toJS && val.toJS() || val); // eslint-disable-line
      return val;
    }
    console.log(errorMessage, apiInstance);
    return apiInstance;
  }

  throwError(path = []) {
    throw Error(`Unhandled Immutable property "${path.join('->')}"`);
    // TODO: send error to Sentry
  }
}
