
class Hitlist {

  constructor({ hitlist, headers, hitlistData, sentimentConfig =
    [
      {
        sentiment: "positive",
        icon:  `<div class="icon">
        <svg fill="#7cc700" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15.5" cy="9.5" r="1.5"></circle>
        <circle cx="8.5" cy="9.5" r="1.5"></circle>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-4c-1.48 0-2.75-.81-3.45-2H6.88c.8 2.05 2.79 3.5 5.12 3.5s4.32-1.45 5.12-3.5h-1.67c-.7 1.19-1.97 2-3.45 2z"></path>
        </svg>
        </div>`,
        range: {min: 2, max: 5}
      },
      {
        sentiment: "neutral",
        icon:  `<div class="icon">
                        <svg fill="#a4a7ac" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 14h6v1.5H9z"></path>
                          <circle cx="15.5" cy="9.5" r="1.5"></circle>
                          <circle cx="8.5" cy="9.5" r="1.5"></circle>
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                        </svg>
                 </div>`,
        range: {min: -1, max: 1}
      },

      {
        sentiment: "negative",
        icon:  `<div class="icon">
                      <svg fill="#fd9900" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15.5" cy="9.5" r="1.5"></circle>
                        <circle cx="8.5" cy="9.5" r="1.5"></circle>
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-2.33 0-4.32 1.45-5.12 3.5h1.67c.69-1.19 1.97-2 3.45-2s2.75.81 3.45 2h1.67c-.8-2.05-2.79-3.5-5.12-3.5z"></path>
                      </svg>
                </div>`,
        range: {min: -5, max: -2}
      }
    ]}={}) {
    this.source = hitlist;
    this.headers = headers;
    this.hitlistData = hitlistData;
    this.sentimentConfig = sentimentConfig;
    this.init();
  }

  init() {
    this.addClassesToHitlist();
    this.clearCommentsHeader();
    this.movePaginationToTheCommentsHeader();
    this.addDateSorting();
    this.processDates();
    this.processComments();
    this.addIconsForSentiment();
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

  addDateSorting(){
    var dateSortingElement = document.createElement("span");
    dateSortingElement.innerText = "Date";
    dateSortingElement.classList.add("sortable");
    dateSortingElement.classList.remove("waiting");
    this.toggleSorting(dateSortingElement, this.source.querySelector(".yui3-datatable-header.reportal-hitlist-date"));
    this.source.querySelector(".yui3-datatable-header.reportal-hitlist-date").innerHTML = "";
    this.source.querySelector(".yui3-datatable-header.reportal-hitlist-date").appendChild(dateSortingElement);
    dateSortingElement.addEventListener("click",(event)=>{
      dateSortingElement.classList.add("waiting");
      dateSortingElement.classList.remove("sorted");
      //this.source.querySelector(".yui3-datatable-header.reportal-hitlist-date").click();
    });
  }

  toggleSorting(targetElement,sourceElement = targetElement){
    if(sourceElement.classList.contains("yui3-datatable-sortable-column") && sourceElement.classList.contains("yui3-datatable-sorted")){
      targetElement.classList.add("sorted");
      if( sourceElement.getAttribute("aria-sort") == "ascending" ){
        targetElement.classList.add("asc");
        targetElement.classList.remove("desc");
      }else{
        targetElement.classList.add("desc");
        targetElement.classList.remove("asc");
      }
    }
  }

  addIconsForSentiment(){
    this.source.querySelectorAll(".yui3-datatable-cell.reportal-hitlist-sentiment").forEach(cell=>this.addIconForSentiment(cell))
  }

  addIconForSentiment(cell){
    var value = parseInt(cell.innerText);
    for(var i = 0; i < this.sentimentConfig.length; i++){
      if(value <= this.sentimentConfig[i].range.max && value >= this.sentimentConfig[i].range.min){
        cell.innerHTML = this.sentimentConfig[i].icon;
      }
    }
  }

  processComments(){
    this.source.querySelectorAll(".yui3-datatable-cell.reportal-hitlist-verbatim").forEach((cell, index)=>{
      this.wrapComment(cell);
      //this.addDateToComment(cell, index);
      this.addCategoriesToComment(cell,index);
    });
  }

  processDates(){
    this.source.querySelectorAll(".yui3-datatable-cell.reportal-hitlist-date").forEach((cell, index)=>{
      this.addDateToComment(cell, index);
    });
  }

  wrapComment(cell){
    var comment = document.createElement("div");
    comment.innerText = cell.innerText;
    cell.innerHTML = "";
    cell.appendChild(comment)
  }

  addDateToComment(cell, index){
    var date = this.source.querySelectorAll(".yui3-datatable-cell.reportal-hitlist-date")[index].innerText;
    this.source.querySelectorAll(".yui3-datatable-cell.reportal-hitlist-date")[index].innerHTML = "";
    var dateElement = document.createElement("div");
    dateElement.innerText = date;
    dateElement.classList.add("hitlist-date-info");
    cell.insertBefore(dateElement,cell.firstChild);
  }

  addCategoriesToComment(cell, index){
    var categories = this.source.querySelectorAll(".yui3-datatable-cell.reportal-hitlist-categories")[index].innerText.split(", ");
    var categoriesContainer = document.createElement("div");
    categories.forEach(category=>{
      categoriesContainer.appendChild(this.createCategoryCard(category));
    });
    categoriesContainer.classList.add("hitlist-tags-container");
    cell.appendChild(categoriesContainer);
  }

  createCategoryCard(category){
    var categoryCard = document.createElement("span");
    categoryCard.innerText = category;
    categoryCard.classList.add("hitlist-tag");
    return categoryCard
  }
}



export default Hitlist;
