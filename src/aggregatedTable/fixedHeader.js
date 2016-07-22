/**
 * FixedHeader class enables a fixed header appear on tables that have `.reportal-fixed-header` class when the table header is scrolled under address bar.
 */
class FixedHeader {
  /**
   * @param {HTMLTableElement} source - source table that needs a cloned header
   * @param {Boolean} [hasListeners=false] - if header cells have events on them //TODO: add hasListeners functionality
   * @param {Boolean} [visible=false] - if the header is visible on init
   * */
  constructor({source,hasListeners=false, visible=false}={}){
    this._visible = false;
    this.source = source;
    this.hasListeners = hasListeners;
    this.init();
    this.visible = visible;
  }
  get visible(){return this._visible}
  set visible(val){
    this._visible=val;
    val?this.clonedHeader.style.display='table':this.clonedHeader.style.display='none';
  }

  /**
   * Initializes the fixed header for a table by wrapping it into a `div.aggregatedTableContainer`, cloning the header and calculating its position and width.
   * Besides it sets up listeners for a `scroll` event (to display the cloned header) and for a debounced `resize` event (to recalculate the header columns widths)
   * */
  init(){
    this.wrapTable();
    this.cloneHeader();
    this.resizeFixed();
    this.scrollFixed();
    window.addEventListener("resize", this.resizeThrottler.bind(this), false); // attach a resize listener to resize the header
    window.addEventListener("scroll", this.scrollFixed.bind(this), false); // attach a resize listener to resize the header
  }


  /**
   * wraps a `this.source` table into a `div.aggregatedTableContainer`
   * */
  wrapTable(){
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('aggregatedTableContainer');
    this.source.parentNode.appendChild(this.wrapper);
    this.wrapper.appendChild(this.source);
  }

  /**
   * clones header of `this.source` table and appends to `this.wrapper`
   * */
  cloneHeader(){
    this.clonedHeader = this.source.cloneNode(true);
    this.clonedHeader.removeChild(this.clonedHeader.querySelector('tbody'));
    this.clonedHeader.classList.add('fixed');
    this.wrapper.appendChild(this.clonedHeader);
  }

  /**
   * Calculates widths for all columns in the fixed header based on the `this.source`
   * */
  resizeFixed(){
    var initialHeader = this.source.querySelectorAll('thead>tr>*');
    var clonedHeader = this.clonedHeader.querySelectorAll('thead>tr>*');
    [].slice.call(clonedHeader).forEach((el,index) => {
      el.style.width=initialHeader[index].offsetWidth+'px';
    });
    this.clonedHeader.style.width = this.source.offsetWidth+'px';
  }


  /**
   * Displays a fixed header when the table header is scrolled off the screen
   * */
  scrollFixed() {
    var offset = window.pageYOffset,
      tableOffsetTop = this.source.parentNode.offsetTop,
      tableOffsetBottom = tableOffsetTop + this.source.offsetHeight - this.source.querySelector('thead').offsetHeight;
    //console.log(offset,tableOffsetTop, tableOffsetBottom);
    if(offset < tableOffsetTop || offset > tableOffsetBottom){
      this.visible=false;
    }
    else if(offset >= tableOffsetTop && offset <= tableOffsetBottom){
      this.visible=true;
      this.clonedHeader.style.top=offset-tableOffsetTop+'px';
    }
  }

  /**
   * a debouncing function to make resize not so expensive, calls `resizeFixed` @ 15fps
   * */
  resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    var resizeTimeout = setTimeout(()=>{
        resizeTimeout = null;
        this.resizeFixed();
        // The resizeFixed will execute at a rate of 15fps
      }, 66);
  }
}

// init this feature for all tables
/*[].slice.call(document.querySelectorAll('table.reportal-fixed-header')).forEach((table)=>{
  var table= new FixedHeader({source:table});
});*/

export default FixedHeader;


