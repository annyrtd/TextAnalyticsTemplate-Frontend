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

  createRow(row, index){
    const tr = document.createElement('tr');

    const order = document.createElement('td');
    order.innerText = index;

    const categoryCell = document.createElement('td');
    const categoryName = row.firstElementChild.firstElementChild.cloneNode(true);
    categoryCell.appendChild(categoryName);

    const counts = document.createElement('td');
    const countsDiv = document.createElement('div');
    const countsValue = row.children[3].innerText;
    countsDiv.innerText = countsValue;
    counts.appendChild(countsDiv);

    tr.appendChild(order);
    tr.appendChild(categoryCell);
    tr.appendChild(counts);

    return tr
  }

  init() {
    const rows = [...this.table.querySelectorAll("tbody>tr")]
    this.areas.forEach(area => {
      area.rows = rows.filter((row, index) => ( index > 0 && row.children[1].classList.contains(`cf_${area.id}`)))
      area.rows.forEach((row, index) => document.getElementById(area.id).firstElementChild.appendChild(this.createRow(row, index+1)))
    })
  }
}
