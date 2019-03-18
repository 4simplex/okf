import { Component, OnInit } from '@angular/core';
import { PriceService } from '../../services/price.service';
import { SaleService } from '../../services/sale.service';
import { Price } from 'src/app/models/price-model';
import { Sale } from 'src/app/models/sale-model';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';
import { appLiterals } from '../../resources/appLiteral';
import { getNoImage } from '../../../assets/noimage';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  units = 1;
  products = [];
  total;
  sale: Sale;
  prices;
  priceFound;
  loading = false;
  appLiterals;
  purchasePriceTotal;
  noImage = getNoImage();

  constructor(
    private priceService: PriceService,
    private saleService: SaleService) {
      this.appLiterals = appLiterals;
    }

  ngOnInit() {
  }

  searchProduct(event) {
    const searchValue = event.target.value;
    if (searchValue !== '') {
      if (searchValue.trim() === '') {
        alert(this.appLiterals.sales.dataNotValidMsg);
        this.prices = '';
        return;
      }

      this.loading = true;

      const searchWhithOneSpace = RemoveWhiteSpaces(searchValue);
      this.priceService.getPriceByName(searchWhithOneSpace)
        .subscribe(res => {
          this.loading = false;
          this.prices = res;
          this.units = 1;
        });
    }
  }

  addSearchResult(price, event) {
    event.preventDefault();
    const priceId = price._id;
    if (this.priceFound) {
      if (this.priceFound._id === priceId) {
        alert(this.appLiterals.sales.alreadyInScreen);
        return;
      }
    }

    if (this.products.length > 0) {
      const isExistingProduct = this.products.find(product => product._id === priceId);
      if (isExistingProduct) {
        alert(this.appLiterals.sales.alreadyInScreen);
        return;
      }
    }

    this.priceFound = price as Price[];
    this.prices = '';
  }

  addProduct(product) {
    if (this.units < 1) {
      alert(this.appLiterals.sales.zeroStockMsg);
      return;
    }
    const productData = { ...product };
    const totalPriceByUnits = this.calculatePriceByUnits(productData.salePrice);

    productData.units = this.units;
    productData.priceForUnits = totalPriceByUnits;

    this.products.push(productData);
    this.totalAmount();
    this.totalPurchasePrice();
    this.priceFound = '';
  }

  calculatePriceByUnits(price) {
    return price * this.units;
  }

  changeUnits(stock) {
    if (this.units > stock) {
      alert(this.appLiterals.sales.insuficientStockMsg);
      this.units = 1;
    }
  }

  modifyProduct(product, event) {
    const currentProduct = this.products.find(item => item._id === product._id);

    if (event.target.value == "0") {
      currentProduct.units = 1;
      currentProduct.priceForUnits = currentProduct.salePrice * currentProduct.units;
      this.totalAmount();
      this.totalPurchasePrice();
      return;
    }else if (event.target.value > product.stock) {
      const currentProduct = this.products.find(item => item._id === product._id);
      alert(this.appLiterals.sales.insuficientStockMsg);
      currentProduct.units = 1;
      currentProduct.priceForUnits = currentProduct.salePrice * currentProduct.units;
      this.totalAmount();
      this.totalPurchasePrice();
      return;
    }else{
      const currentProduct = this.products.find(item => item._id === product._id);
      currentProduct.units = event.target.value;
    currentProduct.priceForUnits = currentProduct.salePrice * currentProduct.units;
    this.totalAmount();
    this.totalPurchasePrice();
    }
  }

  totalAmount() {
    const total =
      this.products.map(item => item.priceForUnits)
        .reduce((acc, currentValue) => {
          return acc + currentValue;
        }, 0);
    this.total = total;
  }

  totalPurchasePrice() {
    const total =
      this.products.map(item => item)
        .reduce((acc, currentValue) => {
          return acc + (currentValue.purchasePrice * currentValue.units);
        }, 0);
    this.purchasePriceTotal = total;
  }

  deleteProduct(prod) {
    this.products = this.products.filter(item => item !== prod);
    this.totalAmount();
    this.totalPurchasePrice();
  }

  sell() {
    if (confirm(this.appLiterals.sales.finalizeSellMsg)) {
      this.sale = new Sale();
      this.sale.saleDate =  new Date().toISOString();
      this.sale.saleTotal = this.total;
      this.sale.purchasePriceTotal = this.purchasePriceTotal;
      this.sale.productsGroup = this.products.map(product => {
        product.stock = product.stock - product.units;
        return product;
      });

      this.saleService.postSale(this.sale).subscribe(res => {
        alert(this.appLiterals.sales.soldMsg);
        this.products = [];
      });

      this.products.map(product => {
        this.priceService.updatePrice(product).subscribe();
      });
    }
  }

  cancelSell() {
    if (confirm(this.appLiterals.sales.cancelSellMsg)) {
      this.products = [];
    }
  }

  getFormattedPrice(price: number) {
    let currencyPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    return currencyPrice;
  }

}
