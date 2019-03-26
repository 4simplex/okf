import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { getNoImage } from '../../../assets/noimage';
import { PriceService } from '../../services/price.service';
import { Price } from 'src/app/models/price-model';
import { ValidateService } from './../../services/validate.service';
import { ProductService } from '../../services/product.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';
import { appLiterals } from '../../resources/appLiteral';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {
  priceService: PriceService;
  priceForm: FormGroup;
  noImage = getNoImage();
  prodCode: string;
  currentPage: Number = 1;
  productFileImage = '';
  searchResult;
  inputSearch = '';
  btnCreateDisabled = false;
  inputSearchReadOnly = false;
  btnResetFormDisabled = true;
  appLiterals;
  loading: boolean;
  loadingSearch: boolean;
  emptyPriceList: boolean;

  constructor(
    private fb: FormBuilder,
    private priceSrv: PriceService,
    private validateService: ValidateService,
    private productService: ProductService
  ) {
    this.priceService = priceSrv;
    this.appLiterals = appLiterals;

    this.priceForm = fb.group({
      'productForm': fb.group({
        'product': ['']
      }),
      'provider': fb.group({
        '_id': [''],
        'name': ['']
      }),
      'purchasePrice': ['', Validators.required],
      'salePrice': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loading = true;
    this.getAllPriceItems();
  }

  addSearchResult(product, event) {
    event.preventDefault();
    this.priceForm.get('productForm.product').setValue('');
    this.priceForm.get('productForm.product').setValue(product);
    this.displayProductImage(product);
    this.inputSearch = product.brand.name + ' - ' + product.name;
    this.searchResult = '';
  }

  addPrice() {
    if (!this.validateService.validatePriceForm(this.priceForm)) {
      return;
    }

    this.priceService.prices = [];
    this.emptyPriceList = false;
    this.loading = true;
    this.priceService.postPrice(this.priceForm.value)
      .subscribe(res => {
        const price = res as Price;
        this.prodCode = price.productCode;
        this.priceForm.disable();
        this.btnCreateDisabled = true;
        this.inputSearchReadOnly = true;
        this.btnResetFormDisabled = false;
        this.getAllPriceItems();
      });
  }

  resetForm() {
    this.priceForm.reset();
    this.priceForm.enable();
    this.inputSearchReadOnly = false;
    this.inputSearch = '';
    this.prodCode = '';
    this.btnCreateDisabled = false;
    this.productFileImage = '';
    this.btnResetFormDisabled = true;
  }

  getAllPriceItems() {
    this.priceService.getPriceLst()
      .subscribe(res => {
        this.loading = false;
        this.priceService.prices = res as Price[];
        this.emptyPriceList = (typeof this.priceService.prices === 'undefined' || this.priceService.prices.length <= 0);
      });
  }

  displayProductImage(product) {
    if (product) {
      this.productFileImage = product.fileImg;
    }
  }

  deletePrice(price: Price): void {
    if (confirm('Desea eliminar este item de Precios?')) {
      this.priceService.prices = this.priceService.prices.filter(s => s !== price);
      this.priceService.deletePrice(price)
        .subscribe(() => {
          this.getAllPriceItems();
        });
    }
  }

  getFormattedPrice(price: number) {
    const currencyPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
    return currencyPrice;
  }

  searchProduct(event) {
    const searchValue = event.target.value;

    if (searchValue !== '') {
      if (searchValue.trim() === '') {
        alert('dato no valido');
        this.searchResult = '';
        return;
      }

      const searchWhithOneSpace = RemoveWhiteSpaces(searchValue);
      this.loadingSearch = true;
      this.productService.searchProductByName(searchWhithOneSpace)
        .subscribe(res => {
          this.loadingSearch = false;
          this.searchResult = res;
        });
    }
  }

}
