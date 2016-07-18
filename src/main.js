//const Cf = require('./lib/base.js');

import Confirmit from './lib/base.js';

import poll from './commonFunctions.js';

import HierarchyTable from './aggregatedTable/hierarchyTable.js'

import FixedHeader from './aggregatedTable/FixedHeader.js';



window.Reportal = {
  Confirmit:Confirmit,
  FixedHeader:FixedHeader,
  poll:poll,
  HierarchyTable: HierarchyTable
};
