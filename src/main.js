var styleBundle = require('./main.css');
import TAhierarchy from 'r-table-hierarchy';
import TableFloatingHeader from 'r-table-floating-header';
import AggregatedTable from 'r-aggregated-table';
import ReportalBase from 'r-reporal-base'

import Hitlist from './hitlist/hitlist.js';

window.Reportal = window.Reportal || {};
ReportalBase.mixin(window.Reportal,{
  Hitlist,
  DefaultConfig
});

export default Reportal
