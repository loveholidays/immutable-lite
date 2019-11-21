import ShimmedAPIs from './api';
import Immutable from 'immutable';

const IS_DEV = process.env.NODE_ENV === 'development';
const ImmutableLite = {}
ImmutableLite.__lite = true;

console.log(IS_DEV)

Object.keys(ShimmedAPIs).forEach((key) => {
  const API = ShimmedAPIs[key];

  // sets up non-static methods and prototypally inherited methods
  const APIWrapper = (...args) => new API({ args, path: [key] });

  // sets up static methods
  APIWrapper.__proto__ = Object.create(API); // eslint-disable-line

  ImmutableLite[key] = APIWrapper;
});

if (typeof window != 'undefined') {
  ImmutableLite.fromJS = ShimmedAPIs.fromJS;
  window.ImmutableLite = ImmutableLite;
  window.Immutable = Immutable;
}

export const isImmutableLite = true;

export const {
  Iterable,
  Seq,
  Collection,
  Map,
  OrderedMap,
  List,
  Stack,
  Set,
  OrderedSet,
  Record,
  Range,
  Repeat,
  is,
  fromJS, // eslint-disable-line
} = ImmutableLite;

export default ImmutableLite;
