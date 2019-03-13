import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { getNoImage } from '../../../assets/noimage';
import { Price } from '../../models/price-model';
import { PriceService } from '../../services/price.service';
import { ValidateService } from './../../services/validate.service';

@Component({
  selector: 'app-price-detail',
  templateUrl: './price-detail.component.html',
  styleUrls: ['./price-detail.component.css']
})
export class PriceDetailComponent implements OnInit {
  priceForm: FormGroup;
  price: Price;
  initImg: string;
  priceId: string;
  productLongNameProp: string;
  noImage = getNoImage();

  constructor(
    private fb: FormBuilder,
    private priceService: PriceService,
    private route: ActivatedRoute,
    private location: Location,
    private validateService: ValidateService
  ) { }

  ngOnInit(): void {
    this.priceForm = this.fb.group({
      '_id': [''],
      'purchasePrice': ['', Validators.required],
      'salePrice': ['', Validators.required],
      'stock': [''],
      'productCode': [{ value: '', disabled: true }],
      'productLongName': [{ value: '', disabled: true }],
      'provider': this.fb.group({
        '_id': [''],
        'name': ['']
      }),
      'productForm': this.fb.group({
        'product': this.fb.group({
          '_id': [''],
          'category': this.fb.group({
            '_id': [''],
            'name': ['']
          }),
          'brand': this.fb.group({
            '_id': [''],
            'name': ['']
          }),
          'name': [''],
          'fileImg': ['']
        })
      })
    });
    const idPrice = this.route.snapshot.paramMap.get('id');
    this.priceService.getPriceById(idPrice)
      .subscribe(res => {
        this.price = res;
        this.priceForm.get('purchasePrice').setValue(this.price.purchasePrice);
        this.priceForm.get('stock').setValue(this.price.stock);
        this.priceForm.get('salePrice').setValue(this.price.salePrice);
        this.priceForm.get('productCode').setValue(this.price.productCode);
        this.priceForm.get('productForm.product._id').setValue(this.price.productForm.product._id);
        this.priceForm.get('productForm.product.fileImg').setValue(this.price.productForm.product.fileImg);
        this.priceForm.get('productForm.product.name').setValue(this.price.productForm.product.name);
        this.priceForm.get('provider._id').setValue(this.price.provider._id);
        this.priceForm.get('provider.name').setValue(this.price.provider.name);
        this.initImg = this.priceForm.get('productForm.product.fileImg').value;
        this.priceForm.get('_id').setValue(this.price._id);
        this.priceForm.get('productForm.product.brand.name').setValue(this.price.productForm.product.brand.name);
        this.priceForm.get('productForm.product.category.name').setValue(this.price.productForm.product.category.name);
        this.productLongNameProp = this.priceForm.get('productForm.product.brand.name').value
          + ' - ' + this.priceForm.get('productForm.product.name').value
          + ' - ' + this.priceForm.get('productForm.product.category.name').value;
        this.priceForm.get('productLongName').setValue(this.productLongNameProp);
      });
  }

  getPrice(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.priceService.getPriceById(id)
      .subscribe(s => this.price = s);
  }

  save(): void {
    if (!this.validateService.validatePriceForm(this.priceForm)) {
      return;
    }

    this.priceService.updatePrice(this.priceForm.value)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
