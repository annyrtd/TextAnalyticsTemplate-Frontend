var styleBundle = require('./main.css');
import TAHierarchyTable from './aggregatedTable/TAHierarchyTable.js'
import FixedHeader from './aggregatedTable/FixedHeader.js';
import AggregatedTable from './aggregatedTable/AggregatedTable.js';
import LazyHierarchyFetch from './aggregatedTable/LazyHierarchyFetch.js'
import HierarchyBase from './aggregatedTable/HierarchyBase.js'
import SortModule from '../node_modules/r-sort-table'
import ReportalBase from '../node_modules/r-reporal-base'

import DefaultConfig from './hitlist/hitlist.js';
import Hitlist from './hitlist/hitlist.js';

window.Reportal = window.Reportal || {};
ReportalBase.mixin(window.Reportal,{
  FixedHeader,
  TAHierarchyTable,
  AggregatedTable,
  LazyHierarchyFetch,
  Hitlist,
  HierarchyBase,
  SortModule
});
