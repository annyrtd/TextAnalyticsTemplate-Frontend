import Highcharts from '../lib/highcharts';
window.Highcharts = Highcharts;
require('../lib/exporting')(Highcharts);
require('../lib/highcharts-more')(Highcharts);

export default class CorrelationChart {
  constructor({container, table, palette}) {
    this.container = container;
    this.table = table;
    this.palette = palette;
    this.data = [];
    this.init();
  }

  init() {
    this.getDataFromTable();
    this.setupChart();

  }

  getDataFromTable() {
    let rows = [...this.table.querySelectorAll("tbody>tr")];

    rows.forEach((row, index) => {
      index === 0 ? this.xAxis = +this.GetCellValue(row, 1) : this.data.push(this.GetRowValues(row, index));
    })
  }

  setupChart(){
    let chartConfig = {

      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },

      legend: {
        enabled: false
      },

      title: {
        text: 'Correlation chart'
      },

      subtitle: {
        text: ''
      },

      xAxis: {
        gridLineWidth: 1,
        title: {
          text: 'Average Category Sentiment'
        },
        labels: {
          format: '{value}'
        },
        plotLines: [{
          color: 'black',
          dashStyle: 'dot',
          width: 2,
          value: this.xAxis,
          label: {
            rotation: 0,
            y: 15,
            style: {
              fontStyle: 'italic'
            },
            text: 'Average Overall Sentiment'
          },
          zIndex: 3
        }]
      },

      yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
          text: 'Correlation with NPS'
        },
        labels: {
          format: '{value}'
        },
        maxPadding: 0.2,
        plotLines: [{
          color: 'black',
          dashStyle: 'dot',
          width: 2,
          value: 0,
          label: {
            align: 'right',
            x: -10,
            style: {
              fontStyle: 'italic'
            },
            text: 'Zero correlation'
          },
          zIndex: 3
        }]
      },

      tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: `<tr><th colspan="2"><h3 onclick="{point.click}">{point.name}</h3></th></tr>
        <tr><th>Average Category Sentiment:</th><td>{point.x}</td></tr>
        <tr><th>Correlation with NPS:</th><td>{point.y}</td></tr>
        <tr><th>Answer Count:</th><td>{point.z}</td></tr>`,
        footerFormat: '</table>',
        followPointer: true
      },

      plotOptions: {
        bubble: {
          allowPointSelect: true,
          point: {
            events: {
              select: function(e){
                e.target.click();
              }
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            color: '#3F454C',
            style : {
              "color": "#3F454C",
              "fontFamily": '"Helvetica Neue", Roboto, sans-serif',
              "textOutline": 'none'
            }
          },
          marker: {
            enabled: true,
            states: {
              hover: {
                enabled: false,
                animation: false
              }
            }
          }
        }
      },

      series: [{
        type: "bubble",
        data: this.data,
        cursor: 'pointer',
        stickyTracking: false,
        states: {
          hover:{
            enabled: false,
            animation: false
          }
        }

      }]

    };

    Highcharts.chart(this.container, chartConfig, this.SetupChartAreas);
  }

  SetupChartAreas(chart){
    console.log(chart);
    let plotline = chart.xAxis[0].plotLinesAndBands[0];
    chart.renderer.label('lala', 0, 0, 'rect')
      .css({
        color: '#FFFFFF'
      })
      .attr({
        fill: 'rgba(0, 0, 0, 0.75)',
        padding: 8,
        r: 5,
        zIndex: 6
      })
      .add();


  }

  GetCellValue(row,index) {
    return row.children.item(index).innerText
  }

  CellClick(row){
    row.children.item(0).children.item(0).click()
  }

  GetRowValues(row, index) {
    const GetCurrentRowCellValue = (cellIndex) => this.GetCellValue(row, cellIndex);
    const paletteColorIndex = index >= this.palette.length ? (index - this.palette.length * parseInt(index/this.palette.length)) : index;
    const name = GetCurrentRowCellValue(0);
    const x = +GetCurrentRowCellValue(1);
    const y = +GetCurrentRowCellValue(2);
    const z = +(GetCurrentRowCellValue(3).replace(/,/g , ""));
    const color = this.palette[paletteColorIndex];
    const click = () => {this.CellClick(row)};

    return {x, y, z, name, color, click};
  }
}
