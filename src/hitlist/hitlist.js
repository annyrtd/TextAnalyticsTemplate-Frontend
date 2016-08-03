class Hitlist {
  constructor({ hitlist, headers, hitlistData }={}) {
    this.source = hitlist;
    this.headers = headers;
    this.hitlistData = hitlistData;
    this.init();
  }

  init() {
    this.addClassesToHitlist();
    this.clearCommentsHeader();
    this.movePaginationToTheCommentsHeader();
    this.addDateSortingToTheCommentsHeader();
  }

  addClassesToHitlist() {

    const types = [
      {type: "verbatim", postfix: "verbatim"},
      {type: "overallSentiment", postfix: "sentiment"},
      {type: "categories", postfix: "categories"},
      {type: "categorySentiment", postfix: "sentiment"},
      {type: "date", postfix: "date"}
    ];

    types.forEach(type=>(
      this.headers[type.type] ? this.source.querySelectorAll(".yui3-datatable-col-" + this.headers[type.type]).forEach(item=>item.classList.add("reportal-hitlist-" + type.postfix)) : null
    ));
  }

  clearCommentsHeader(){
    this.source.querySelector(".yui3-datatable-header.reportal-hitlist-verbatim").innerHTML="";
  }

  movePaginationToTheCommentsHeader(){

      var paginationText ="Comments "+this.source.getElementsByClassName("hitlist-pagination-count")[0].innerText.replace("(","of ").slice(0,-1);
      var paginationElement = document.createElement("span");
      paginationElement.innerText = paginationText;
    this.source.querySelector(".yui3-datatable-header.reportal-hitlist-verbatim").appendChild(paginationElement);
  }

  addDateSortingToTheCommentsHeader(){
    var dateSortingElement = document.createElement("span");
    dateSortingElement.innerText = "Date";
    dateSortingElement.classList.add("sortable","sorted","desc");
    this.source.querySelector(".yui3-datatable-header.reportal-hitlist-verbatim").appendChild(dateSortingElement);
  }

}



export default Hitlist;
