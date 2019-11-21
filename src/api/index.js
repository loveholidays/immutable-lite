/* eslint-disable lvh/mandatory-practices */
/* eslint-disable lvh/sort-keys */
import Iterable from './iterable';
import List from './list';
import Seq from './seq';
import Set from './set';
import OrderedSet from './orderedSet';
import Stack from './stack';
import Map from './map';
import OrderedMap from './orderedMap';
import Range from './range';
import { fromJS } from './common/common';

const ShimmedAPIs = {
  Iterable,
  List,
  Seq,
  Set,
  OrderedSet,
  Stack,
  Map,
  OrderedMap,
  Range,
  fromJS,
};

export default ShimmedAPIs;
