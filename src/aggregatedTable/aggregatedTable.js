/**
 * Created by IvanP on 04.07.2016.
 */

import HierarchyTable from './hierarchyTable.js';
import FixedHeader from './FixedHeader.js';

class AggregatedTable {
  /**
   * A class that unifies work with Aggregated tables. Enabling a fixed header, search functionality, sorting, hierarchy etc can be done here.
   * @param {HTMLTableElement} table - table on which the action is to be performed
   * @param {Object} hierarchy - config for {@link HierarchyTable}. See {@link HierarchyTable} docs for available object properties. If hierarchy.source is not defined, it will automatically receive value from `table`
   * @param {Object} fixedHeader - config for {@link FixedHeader}. See {@link FixedHeader} docs for available object properties. If hierarchy.source is not defined, it will automatically receive value from `table`
   * */
  constructor({table, hierarchy, fixedHeader}={}){
    this.hierarchy=null;
    if(hierarchy && typeof hierarchy == 'object'){
      hierarchy.source = hierarchy.source||table;
      this.hierarchy = new HierarchyTable(hierarchy);
      this.data = this.hierarchy.data;
    }
    if(fixedHeader && typeof fixedHeader == 'object'){
      fixedHeader.source = fixedHeader.source||table;
      this.fixedHeader = new FixedHeader(fixedHeader);
    }
    this.source=table;
    this.init();

  }

  /**
   * Initializes the app
   * */
  init(){
    // for collapsable hierarchy we want to update cells in the fixed(floating) header.
    ['collapsed','uncollapsed','tree-view','flat-view'].forEach((eventNameChunk)=>{this.source.addEventListener(`reportal-table-hierarchy-${eventNameChunk}`,()=>{this.fixedHeader.resizeFixed()});})
  }
}
export default AggregatedTable;
