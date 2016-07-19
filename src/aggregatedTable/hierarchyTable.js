class HierarchyTable{
  /**
   * @param {HTMLTableElement} source - source table that needs a cloned header
   * @param {Array} hierarchy - array of hierarchy objects from reportal
   * @param {Object}rowheaders - JSON object which contains all table rowheaders with category id and index of table row
   * @param {Boolean} hasListeners - if header cells have events on them
   * */
  constructor(source,hierarchy,rowheaders,hasListeners){
    this.source = source;
    this.hierarchy = hierarchy;
    this.rowheaders = rowheaders;
    this.hasListeners = hasListeners;
    this.data=null;
    this.init();
  }

  /**
   * Initializes the hierarchical structure for a table by creating new set of table rows with correct order and additional information in attributes
   * */
  init(){
    this.data = this.data || this.parseHierarchy();
    console.log(this.data);
    let tbody = this.source.querySelector("tbody");
    if(tbody.firstChild && tbody.firstChild.nodeType==3){
      tbody.removeChild(tbody.firstChild)
    }

    this.data.forEach((item,index)=>{tbody.appendChild(item.meta.row);});
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
      this.addCollapseButton(row);
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

  clearLink(row){
    var link = row.querySelector("a");
    if(link) {
      link.parentElement.textContent = link.textContent;
    }
  }

  /**
   * function to add button to the left of the rowheader
   * @param {Element} row
   */
  addCollapseButton(row){
    var collapseButton = document.createElement("div");
    collapseButton.classList.add("reportal-collapse-button");
    collapseButton.addEventListener('click', () => {this.toggleCollapsing(row)});
    row.children[0].insertBefore(collapseButton,row.children[0].firstChild);
  }


  /**
   * function to collapse and expand rows on button click
   * @param {Element} row
   */
  toggleCollapsing(row){
    this.toggleCollapsedClass(row);
    this.toggleHiddenRows(row);
  }

  /**
   * function to set class to the row itself and reflect collapsed state in `meta.collapsed`
   * @param {Element} row
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
   * @param row
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
      }else{
        if(row.classList.contains("reportal-uncollapsed-row")){
          item.classList.remove("reportal-hidden-row");
        }
      }
    });
  }

}

Array.prototype.slice.call(document.querySelectorAll('table.reportal-hierarchy-table:not(.fixed)')).forEach((table)=>{
  var hierarchyTable= new HierarchyTable(table,hierarchy,rowheaders);
});

export default HierarchyTable;
