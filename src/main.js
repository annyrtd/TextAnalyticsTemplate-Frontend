//const Cf = require('./lib/base.js');

import Confirmit from './lib/base.js';

import Common from './commonFunctions.js';

import HierarchyTable from './aggregatedTable/hierarchyTable.js'
import FixedHeader from './aggregatedTable/FixedHeader.js';
import AggregatedTable from './aggregatedTable/aggregatedTable.js'

window.Reportal = {
  Confirmit,
  FixedHeader,
  Common,
  HierarchyTable,
  AggregatedTable
};
