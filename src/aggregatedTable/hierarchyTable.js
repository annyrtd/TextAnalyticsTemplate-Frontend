class HierarchyTable{
  /**
   * Converts flat view rowheaders into a tree-view rowheaders with ability to switch between views.
   * After hierarchy is initialized, `HierarchyTable.data` array will reflect the rows of the table in their visible order and contain `meta` for each row in the array.
   * When a row is collapsed, a `reportal-table-hierarchy-collapsed` Event is fired.
   * When a row is uncollapsed, a `reportal-table-hierarchy-uncollapsed` Event is fired.
   * When a row is switched to flat-view, a `reportal-table-hierarchy-flat-view` Event is fired.
   * When a row is switched to tree-view, a `reportal-table-hierarchy-tree-view` Event is fired.
   * @param {HTMLTableElement} source - source table that needs a cloned header
   * @param {Array} hierarchy - array of hierarchy objects from reportal
   * @param {Object} rowheaders - JSON object which contains all table rowheaders with category id and index of table row
   * @param {Number} [hierColumn=0] - index of column in the table that contains hierarchy (increments from `0`)
   * @param {Boolean} [flat=false] - Should hierarchy be rendered flatly(`true`), or in a tree-fashion (`false`).
   * */
  constructor({source,hierarchy,rowheaders,hierColumn = 0,flat = false} = {}){
    this.source = source;
    this.hierarchy = hierarchy;
    this.rowheaders = rowheaders;
    this.data=null;
    this.column = hierColumn;
    this._collapseEvent = this.constructor.newEvent('reportal-table-hierarchy-collapsed');
    this._uncollapseEvent = this.constructor.newEvent('reportal-table-hierarchy-uncollapsed');
    this._flatEvent = this.constructor.newEvent('reportal-table-hierarchy-flat-view');
    this._treeEvent = this.constructor.newEvent('reportal-table-hierarchy-tree-view');
    this.flat = flat;
    this.init();
  }

  /**
   * Initializes the hierarchical structure for a table by creating new set of table rows with correct order and additional information in attributes
   * */
  init(){
    this.data = this.data || this.parseHierarchy();
    let tbody = this.source.querySelector("tbody");
    if(tbody.firstChild && tbody.firstChild.nodeType==3){
      tbody.removeChild(tbody.firstChild)
    }
    this.data.forEach((item)=>{tbody.appendChild(item.meta.row);});

  }


  /**
   * Sets `this.flat`, adds/removes `.reportal-heirarchy-flat-view` to the table and updates labels for hierarchy column to flat/hierarchical view
   * */
  set flat(flat){
    this._flat=flat;
    flat?this.source.classList.add('reportal-heirarchy-flat-view'):this.source.classList.remove('reportal-heirarchy-flat-view');
    if(this.data){
      this.data.forEach((row)=> {
        this.updateCategoryLabel(row);
      });
    }
    flat?this.source.dispatchEvent(this._flatEvent):this.source.dispatchEvent(this._treeEvent)
  }
  /**
   * getter for `flat`
   * @return {Boolean}
   * */
  get flat(){
    return this._flat;
  }

  /**
   * Replaces category label in the array in the hierarchical column position and in the html row through meta. Replacing it in the array is important for sorting by category.
   * @param {Array} row - an item in the `this.data` Array
   * */
  updateCategoryLabel(row){
      let cell = row.meta.row.children.item(this.column);
      row[this.column] = cell.childNodes.item(cell.childNodes.length-1).nodeValue = this.flat? row.meta.flatName: row.meta.name;
  }

  /**
   * Recursive function taking rows according to `hierarchy` object, adding information to that row, retrieving data from the row, and adding this array to `this.data`
   * Each item in the array has a `meta {Object}` property that has the following structure:
   *
   * ``` javascript
   * {
   *    collapsed: Boolean, // if true, the row is collapsed, defined if `hasChildren`
   *    hasChildren: Boolean, // if true, it has children
   *    flatName: String, // label for flat view ('/'-separated)
   *    name: String, // label for the current level (single-label without parent prefixes)
   *    id: String, // item id from Reportal table
   *    level: Number, // hierarchy level
   *    parent: String, // parent id of the nested level
   *    row: HTMLTableRowElement // reference to the `tr` element in the table
   * }
   * ```
   *
   * @param {Array} hierarchy - array of hierarchy objects from reportal
   * @param {int} level - depth of the function
   * @param {Array} array - changedTable for children level
   * @return {Array}
   */
  parseHierarchy(hierarchy=this.hierarchy,level=0,array=[]){
    return hierarchy.reduce((resultArray,item,index,array)=>{
      var row = this.source.querySelectorAll("tbody>tr")[this.rowheaders[item.id].index];
      row.setAttribute("self-id",item.id);

      row.classList.add("level"+level.toString());
      level > 0 ? row.classList.add("reportal-hidden-row") : null;
      level > 0 ? this.clearLink(row) : null;
      row.classList.add(item.children.length>0?"reportal-collapsed-row":"reportal-no-children");

      if(item.parent){
        row.setAttribute("parent",item.parent);
      }
      //we need to push to the array before we add arrows/circles to labels so that we have clean labels in array and may sort them as strings
      resultArray.push([].slice.call(row.children).map((td)=>{
          return td.children.length==0?this._isNumber(td.textContent.trim()):td.innerHTML
        }));

      resultArray[resultArray.length-1].meta={
        row:row,
        id:item.id,
        flatName: item.name,
        name: item.name.split('/').reverse()[0].trim(),
        parent:item.parent,
        level:level,
        collapsed:item.children.length>0?true:undefined,
        hasChildren:item.children.length>0
      };
      // adds a toggle button
      this.addCollapseButton(row);
      // initializes row headers according to `this.flat`
      this.updateCategoryLabel(resultArray[resultArray.length-1]);
      level < 2 ? resultArray = this.parseHierarchy(item.children, level + 1,resultArray) : null;
      return resultArray
    },array);
  }

  /**
   * Inspects if the current string might be converted to number and renders it as number. If string length is 0, returns `null`. If none applies returns the string as is.
   * @param {String} str - value of the cell if not HTML contents
   * @return {Number|null|String}
   * */
  _isNumber(str){
    if(!isNaN(parseFloat(str)) && parseFloat(str).toString().length ==str.length){
      return parseFloat(str)
    } else if(str.length==0){return null} else {return str}
  }

  /**
   * Removes a drilldown link from elements that are the lowest level of hierarchy and don't need it
   * @param {HTMLTableRowElement} row - row element in the table
   * */
  clearLink(row){
    var link = row.querySelector("a");
    if(link) {
      link.parentElement.textContent = link.textContent;
    }
  }

  /**
   * function to add button to the left of the rowheader
   * @param {HTMLTableRowElement} row - row element in the table
   */
  addCollapseButton(row){
    var collapseButton = document.createElement("div");
    collapseButton.classList.add("reportal-collapse-button");
    collapseButton.addEventListener('click', () => this.toggleCollapsing(row));
    row.children[this.column].insertBefore(collapseButton,row.children[this.column].firstChild);
    row.children[this.column].classList.add('reportal-hierarchical-cell');
  }


  /**
   * function to collapse and expand rows on button click
   * @param {HTMLTableRowElement} row - row element in the table
   */
  toggleCollapsing(row){
    this.toggleCollapsedClass(row);
    this.toggleHiddenRows(row);
    this.data[row.rowIndex-1].meta.collapsed?row.dispatchEvent(this._collapseEvent):row.dispatchEvent(this._uncollapseEvent);
  }


  static newEvent(name){
    //TODO: refactor this code when event library is added
    var event = document.createEvent('Event');
    // Define that the event name is `name`.
    event.initEvent(name, true, true);
    return event;
  }

  /**
   * function to set class to the row itself and reflect collapsed state in `meta.collapsed`
   * @param {HTMLTableRowElement} row - row element in the table
   */
  toggleCollapsedClass(row){
    if(row.classList.contains("reportal-collapsed-row") || row.classList.contains("reportal-uncollapsed-row")){
      row.classList.toggle("reportal-collapsed-row");
      row.classList.toggle("reportal-uncollapsed-row");
      this.data[row.rowIndex-1].meta.collapsed = !this.data[row.rowIndex-1].meta.collapsed;
    }
  }

  /**
   * function to hide or show child rows
   * @param {HTMLTableRowElement} row - row element in the table
   */
  toggleHiddenRows(row){
    var id = row.getAttribute("self-id");

    Array.prototype.slice.call(this.source.querySelectorAll("[parent="+id+"]")).forEach((item,index)=>{
      if(row.classList.contains("reportal-collapsed-row")){
        item.classList.add("reportal-hidden-row");
        if(item.classList.contains("reportal-uncollapsed-row")){
          this.toggleCollapsedClass(item);
        }
        this.toggleHiddenRows(item);
      } else{
        if(row.classList.contains("reportal-uncollapsed-row")){
          item.classList.remove("reportal-hidden-row");
        }
      }
    });
  }

}

/*Array.prototype.slice.call(document.querySelectorAll('table.reportal-hierarchy-table:not(.fixed)')).forEach((table)=>{
  var hierarchyTable= new HierarchyTable({source:table,hierarchy:hierarchy,rowheaders:rowheaders,flat:true});
});*/

export default HierarchyTable;
