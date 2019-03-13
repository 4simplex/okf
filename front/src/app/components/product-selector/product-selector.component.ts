import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product-model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.css']
})
export class ProductSelectorComponent implements OnInit {
  @Input('parentForm')
  public parentForm: FormGroup;
  @Output() productChange = new EventEmitter();
  initProds = [{name: ""}];
  selectedProduct = this.initProds[1];
  productService: ProductService

  constructor(private productSrv: ProductService) { 
    this.productService = productSrv;
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProduct()
      .subscribe(res => {
        this.productService.products = res as Product[];
      });
  }
  
  onChange(product) {
    this.selectedProduct = product;
    this.productChange.emit(this.selectedProduct);
  }

}
