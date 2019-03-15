import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chartgraph',
  templateUrl: './chartgraph.component.html',
  styleUrls: ['./chartgraph.component.css']
})
export class ChartgraphComponent implements OnInit {
  barChartOptions;
  @Input('chartLabels') barChartLabels;
  barChartType;
  barChartData;
  barChartLegend;
  @Input('dataSell') dataSellData;

  constructor() {
    
  }

  ngOnInit() {
    this.generateLineGraph();
  }

  generateLineGraph() {
    this.barChartOptions = {
      legends: false,
      scales: {
        xAxes:[
          {display: true}
        ],
        yAxes:[
          {display: true}
        ]
      }
    }
    this.barChartData = [
      {data: this.dataSellData, label: 'Ventas $', borderColor: 'rgba(33, 232, 234, 1)', fill: false}
    ]
  
    this.barChartLabels = this.barChartLabels;
    this.barChartType = 'line';
  

  }

}
