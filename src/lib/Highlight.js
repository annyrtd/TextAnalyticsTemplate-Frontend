/**
 * Created by IvanP on 25.07.2016.
 */

class Highlight {
  /**
   * Highlights text in an `element` by wrapping the matched string passed via {@link Highlight#apply} method into a `tag`.
   * @param {HTMLElement} element=document.body - Element in which the search and highlighting will happen. A valid Array (`!NodeList`) of nodes can be passed here.
   * @param {String} tag=EM - The tag used by default to apply highlighting to matched words is the  EM (emphasis) tag. We can change that if we want by passing a second parameter with a different tag name. You can use any tag that renders inline - so not a DIV or similar block element which would break the layout.
   * @param {String} type=left+right - Type of match. `open` will look at all occurences, `left` - at the left word boundary, `right` - at the right word boundary, by default it must match the whole word.
   * */
  constructor({element = document.body, tag = 'EM', type}={}){
    this.targetNode = element;
    this.isArray = Array.isArray(this.targetNode);
    this.highlightTag = tag;
    this.skipTags = new RegExp("^(?:" + this.highlightTag + "|SCRIPT|FORM|SPAN)$");
    this.colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
    this.wordColor = [];
    this.colorIdx = 0;
    this.setMatchType(type);
    this.matchRegex = "";
  }

  setMatchType(type){
    switch(type)
    {
      case "left":
        this.openLeft = false;
        this.openRight = true;
        break;
      case "right":
        this.openLeft = true;
        this.openRight = false;
        break;
      case "open":
        this.openLeft = this.openRight = true;
        break;
      default:
        this.openLeft = this.openRight = false;
    }
  }

  /**
   * Creates a regular expression
   * @param {String} input - a search query
   * @return {Boolean} - whether the regex has been successfully set
   * */
  setRegex(input){
    input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|");
    input = input.replace(/^\||\|$/g, "");
    if(input){
      var re = "(" + input + ")";
      if(!this.openLeft) re = "\\b" + re;
      if(!this.openRight) re = re + "\\b";
      this.matchRegex = new RegExp(re, "i");
      return true;
    }
    return false;
  }

  /**
   * Decompose a RegExp
   * */
  getRegex (){
    var retval = this.matchRegex.toString();
    retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;
  };

  /***
   * Recursively highlight words. When a match is found, the text node in question is split up and a tag with style settings applied to the matching words.
   * Each word is assigned a colour from the array supplied in the script which is then used throughout the document for that word.
   * @param {HTMLElement} node - a node on which highlighting will be performed
   */
  highlightWords(node) {
    console.log(node);
    if(node === undefined || !node) return;
    if(!this.matchRegex) return;
    if(this.skipTags.test(node.nodeName)) return;
    if(node.hasChildNodes()) {
      for(var i=0; i < node.childNodes.length; i++)
        this.highlightWords(node.childNodes[i]);
    }
    if(node.nodeType == 3) { // NODE_TEXT
      let nv= node.nodeValue,regs= this.matchRegex.exec(nv);
      console.log(this.matchRegex,nv, regs);

      if(nv && regs) {
        if(!this.wordColor[regs[0].toLowerCase()]) {
          this.wordColor[regs[0].toLowerCase()] = this.colors[this.colorIdx++ % this.colors.length];
        }

        var match = document.createElement(this.highlightTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = this.wordColor[regs[0].toLowerCase()];
        match.style.fontStyle = "inherit";
        match.style.color = "#000";

        var after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
      }
    }
  }

  /**
   * Removes highlighting
   * @param {HTMLElement} [node] - an node (if not passed then calculated) that might have highlighting that needs to be removed
   * */
  remove(node){
    if(!node){ // if no node is passed we want to run remove on an array or single target node
      return this.isArray? this.targetNode.forEach(cell=>this.remove(cell)) : this.remove(this.targetNode);
    }

    var arr = node.getElementsByTagName(this.highlightTag) || this.targetNode.getElementsByTagName(this.highlightTag);
    let el;
    while(arr.length && (el = arr[0])) {
      let parent = el.parentNode;
      parent.replaceChild(el.firstChild, el);
      parent.normalize();
    }
  }

  /**
   * Calling this method passes the words to be highlighted to the just instantiated object which traverses the DOM inside the selected node looking for text that matches any of the keywords.
   * @param {String} input - query string
   * */
  apply(input){
    this.remove();
    if(input === undefined || !input) return;
    if(this.setRegex(input)) {
      if(this.isArray){ // if we pass an array of nodes
        this.targetNode.forEach(cell=>this.highlightWords(cell));
      } else {     // if it's a single node
        this.highlightWords(this.targetNode);
      }
    }
  }

}

export default Highlight;
