export default class CorrelationTable {
  constructor({container, table, palette, translations}) {
    this.table = table;
    this.palette = palette;
    this.translations = translations;
    this.areas = [
      {
        id: "issues",
        text: translations["Priority Issues"],
        rows: []
      },
      {
        id: "strength",
        text: translations["Strength"],
        rows: []
      },
      {
        id: "monitor",
        text: translations["Monitor and Improve"],
        rows: []
      },
      {
        id: "maintain",
        text: translations["Maintain"],
        rows: []
      }
    ];
    this.monitor = [];
    this.strength = [];
    this.init();
  }

  init() {
    const rows = [...this.table.querySelectorAll("tbody>tr")]
    this.areas.forEach(area => {
      area.rows = rows.filter((row, index) => ( index > 0 && row.children[1].classList.contains(`cf_${area.id}`)))
      area.rows.forEach(row => document.getElementById(area.id).firstElementChild.appendChild(row))
    })
  }
}
