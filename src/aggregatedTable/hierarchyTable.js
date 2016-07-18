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
    this.init();
  }

  /**
   * Initializes the hierarchical structure for a table by creating new set of table rows with correct order and additional information in attributes
   * */
  init(){
    var changedTable = this.parseHierarchy();

    while(this.source.querySelectorAll("tbody")[0].firstChild){
      this.source.querySelectorAll("tbody")[0].removeChild(this.source.querySelectorAll("tbody")[0].firstChild)
    }

    changedTable.forEach((item,index)=>{this.source.querySelectorAll("tbody")[0].appendChild(item);});
  }

  /**
   * recursive function taking rows according to hierarchy object, adding information to that row and adding this row to the changedTable
   * @param {Array} hierarchy - array of hierarchy objects from reportal
   * @param {int} level - depth of the function
   * @param {Array} array - changedTable for children level
     */
  parseHierarchy(hierarchy=this.hierarchy,level=0,array=[]){
    return hierarchy.reduce((resultArray,item,array,index)=>{


      var row = this.source.querySelectorAll("tbody>tr")[this.rowheaders[item.id].index];


      row.setAttribute("self-id",item.id);
      row.classList.add("level"+level.toString());
      level > 0 ? row.classList.add("reportal-hidden-row") : null;
      level > 0 ? this.clearLink(row) : null;
      row.classList.add(item.children.length>0?"reportal-collapsed-row":"reportal-no-children");

      if(item.parent){
        row.setAttribute("parent",item.parent);
      }

      this.addCollapseButton(row);
      resultArray.push(row);

      level < 2 ? resultArray = this.parseHierarchy(item.children, level + 1,resultArray) : null;
      return resultArray
    },array);
  }

  clearLink(row){
    var link = row.querySelectorAll("a")[0];
    if(link) {
      var text = link.innerText;
      var parentCell = link.parentElement;
      parentCell.removeChild(link);
      parentCell.innerText = text;
    }
  }

  /**
   * function to add button to the left of the rowheader
   * @param {Element} row
     */
  addCollapseButton(row){
    var collapseButton = document.createElement("div");
    var collapseButtonImage = document.createElement("div");
    collapseButton.appendChild(collapseButtonImage);

    collapseButton.classList.add("reportal-collapse-button");

    collapseButton.onclick = e => {this.toggleCollapsing(row)};

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
   * function to set class to the row itself
   * @param {Element} row
     */
  toggleCollapsedClass(row){
    if(row.classList.contains("reportal-collapsed-row") || row.classList.contains("reportal-uncollapsed-row")){
      row.classList.toggle("reportal-collapsed-row");
      row.classList.toggle("reportal-uncollapsed-row");
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
