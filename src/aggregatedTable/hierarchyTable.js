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
    //creating new array of rows
    var changedTable = this.parseHierarchy();

    //remove all old rows
    while(this.source.querySelectorAll("tbody")[0].firstChild){
      this.source.querySelectorAll("tbody")[0].removeChild(this.source.querySelectorAll("tbody")[0].firstChild)
    }

    //append new rows
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

      //finding correct row of the table
      var row = this.source.querySelectorAll("tbody>tr")[this.rowheaders[item.id].index];

      //adding some useful classes
      row.setAttribute("self-id",item.id);
      row.classList.add("level"+level.toString());
      level>0?row.classList.add("reportal-hidden-row"):null;
      row.classList.add(item.children.length>0?"reportal-collapsed-row":"reportal-no-children");

      if(item.parent){
        row.setAttribute("parent",item.parent);
      }

      //adding button to the left of the rowheader
      this.addCollapseButton(row);

      //adding row to the new table
      resultArray.push(row);

      //run function for child elements

      level<2?resultArray = this.parseHierarchy(item.children, level + 1,resultArray):null;
      return resultArray
    },array);
  }

  /**
   * function to add button to the left of the rowheader
   * @param {Element} row
     */
  addCollapseButton(row){
    //creating button itself
    var collapseButton = document.createElement("div");

    //creating element for triangle or circle image
    var collapseButtonImage = document.createElement("div");
    collapseButton.appendChild(collapseButtonImage);

    collapseButton.classList.add("reportal-collapse-button");

    //set funnction to collapse rows oncklick
    collapseButton.onclick = e => {this.toggleCollapsing(row)};

    //adding button to the rowheader
    row.children[0].insertBefore(collapseButton,row.children[0].firstChild);
  }

  /**
   * function to collapse and uncollapse rows on button click
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

    //finding all children of the row
    [].slice.call(this.source.querySelectorAll("[parent="+id+"]")).forEach((item,index)=>{

      //checking parent state
      if(row.classList.contains("reportal-collapsed-row")){

        //hide children rows
        item.classList.add("reportal-hidden-row");
        if(item.classList.contains("reportal-uncollapsed-row")){
          this.toggleCollapsedClass(item);
        }
        //hide children of children
        this.toggleHiddenRows(item);
      }else{
        if(row.classList.contains("reportal-uncollapsed-row")){
          //show only direct chilrens
          item.classList.remove("reportal-hidden-row");
        }
      }
    });
  }

}

[].slice.call(document.querySelectorAll('table.reportal-hierarchy-table:not(.fixed)')).forEach((table)=>{
  var hierarchyTable= new HierarchyTable(table,hierarchy,rowheaders);
});

export default HierarchyTable;
