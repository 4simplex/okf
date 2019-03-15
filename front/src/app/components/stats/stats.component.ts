import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../services/sale.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  loading;
  purchaseTotal;
  salesTotal;
  earningsTotal;
  bsConfig;
  bsRangeValue;
  secondDay = new Date();
  firstDay;
  sells;
  chartLabels: any[];
  dataSell;
  actualPage: Number = 1;

  constructor(private saleService: SaleService) { }

  ngOnInit() {
    this.loading = true;
    this.initialValues();
   
  }

  initialValues() {
    this.secondDay = new Date();
    this.firstDay = this.calculateFirstDayMonth(this.secondDay);
    this.saleService.getSales(this.firstDay.toISOString(), this.secondDay.toISOString())
    .subscribe(res => {
      this.loading = false;
      this.purchaseTotal = this.sumPurchaseTotal(res);
      this.salesTotal = this.sumSellTotal(res);
      this.earningsTotal = this.salesTotal - this.purchaseTotal;
      this.sells = this.convertDateTime(res);
      const results = this.getDataForDates(this.sells);

      this.dataSell = results.dataSales;

      this.chartLabels = results.dataDates;
    })
  }

  changeDatePeriod(event) {
    if(event !== null) {
      let firstDate = event[0];
      firstDate.setHours(0);
      firstDate.setMinutes(0);
      firstDate.setSeconds(0);

      let secondDate = event[1];
      secondDate.setHours(20);
      secondDate.setMinutes(59);
      secondDate.setSeconds(59);

      this.saleService.getSales(firstDate.toISOString(), secondDate.toISOString())
      .subscribe(res => {
        this.loading = false;
        this.purchaseTotal = this.sumPurchaseTotal(res);
        this.salesTotal = this.sumSellTotal(res);
        this.earningsTotal = this.salesTotal - this.purchaseTotal;
        this.sells = this.convertDateTime(res);
        const results = this.getDataForDates(this.sells);
        this.dataSell = results.dataSales;
        this.chartLabels = results.dataDates;
      })

      this.secondDay = event[1];
      this.firstDay = event[0];
    }
  }

  convertDateTime(res) {
    for (let i=0; i < res.length; i++) {
      let currentDate = new Date(res[i].saleDate);
      res[i].saleDate = new Date(currentDate.getTime() + Math.abs(currentDate.getTimezoneOffset()*60000) );
    }

    return res
  }

  convertDateTimeToString(res) {
    for (let i=0; i < res.length; i++) {
      let year = res[i].saleDate.getFullYear();
      let month = res[i].saleDate.getMonth()+1;
      let dt = res[i].saleDate.getDate();

      if (dt < 10) {
        dt = 0 + dt;
      }
      if (month < 10) {
        month = 0 + month;
      }

      res[i].saleDate = dt + '/' + month + '/' + year;
    }

    return res
  }

  getDataForDates(sells) {
    let filterDates = this.filterDates(sells);
    let convertedDates = this.getSimpleDate([...filterDates]);
    let convertedObjectsDates = this.convertDateTimeToString(filterDates);

    const dataSales = [];
    const dataDates = [];

    for (let i=0; i < convertedObjectsDates.length; i++){
      let existingDate = dataDates.includes(convertedDates[i]);

      if (!existingDate) {
        let sumData;
        sumData = convertedObjectsDates.filter(item => item.saleDate ===  convertedDates[i])
        .reduce((acc, product) => {
          return acc + product.saleTotal
        }, 0);

        let collectDates = convertedDates[i];

        dataDates.push(collectDates);
        dataSales.push(sumData);
      }
    }

    return {dataSales: dataSales, dataDates: dataDates}
  }

  filterDates(allDates){
    return allDates.filter((v,i) => allDates.indexOf(v) === i);
  }

  getSimpleDate(tempDates) {
    const allDates = tempDates.map(sale => {
      let year = sale.saleDate.getFullYear();
      let month = sale.saleDate.getMonth()+1;
      let dt = sale.saleDate.getDate();
      if (dt < 10) {
        dt = 0 + dt;
      }
      if (month < 10) {
        month = 0 + month;
      }


      return dt + '/' + month + '/' + year 
    });

    return allDates
  }

  calculateFirstDayMonth(today) {
    const month = today.getMonth();
    const year = today.getFullYear();

    return new Date(year, month, 1);
  }

  sumPurchaseTotal (res) {
    const total = res.reduce((acc, item) => {
      return acc + item.purchasePriceTotal;
    }, 0)

    return total;
  }

  sumSellTotal (res) {
    const total = res.reduce((acc, item) => {
      return acc + item.saleTotal;
    }, 0)

    return total;
  }

  getFormattedPrice(price: number) {
    let currencyPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    return currencyPrice;
  }
}
