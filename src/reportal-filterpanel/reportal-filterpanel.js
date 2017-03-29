class Filterpanel {
  constructor({source, target}){
    this.panel = target;
    this.elements = [...source.querySelectorAll(".reportal-filterpanel-element")];
    this.applyButton = source.querySelector(".reportal-filterpanel-apply-button");
    this.clearButton = source.querySelector(".reportal-filterpanel-clear-button");
    this.init();
  }

  init(){
    this.elements.forEach(element => {
      this.panel.appendChild(element);
    });
    this.panel.appendChild(this.applyButton);
  }
}

export default Filterpanel;
