import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product-model';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productForm: FormGroup;
  @ViewChild(UploadImageComponent)
  private uploadChild: UploadImageComponent;
  Product: Product;
  initImg: string;
  productId;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      '_id': [''],
      'name': ['', Validators.required],
      'category': this.fb.group({
        '_id': ['', Validators.required],
        'name': ['']
      }),
      'brand': this.fb.group({
        '_id': ['', Validators.required],
        'name': ['']
      }),
      'photo': this.fb.group({
        'name': ['']
      }),
      'fileImg': [''],
      'description': ['']
    });
    const idProduct = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(idProduct)
      .subscribe(res => {
        this.Product = res;
        this.productForm.get('name').setValue(this.Product.name);
        this.productForm.get('description').setValue(this.Product.description);
        this.productForm.get('fileImg').setValue(this.Product.fileImg);
        this.productForm.get('brand._id').setValue(this.Product.brand._id);
        this.productForm.get('brand.name').setValue(this.Product.brand.name);
        this.productForm.get('category._id').setValue(this.Product.category._id);
        this.productForm.get('category.name').setValue(this.Product.category.name);
        this.initImg = this.productForm.get('fileImg').value;
        this.productForm.get('_id').setValue(this.Product._id);
      });
  }

  manageImgShow() {
    this.uploadChild.showImgPrev();
  }

  manageImgInit() {
    this.uploadChild.showImgPrev();
  }

  displayCounter(count) {
    this.productForm.get('fileImg').setValue(count);
  }

  deletePrevImg() {
    this.initImg = null;
    this.productForm.get('fileImg').setValue('');
  }

  modifyProduct() {
    const name = this.productForm.get('name').value;
    if (name.trim() === '') {
      alert('Dato no válido. Debe escribir un nombre de producto.');
      return;
    }
    const nameWhithOneSpace = RemoveWhiteSpaces(name);
    const localId = this.productForm.get('_id').value;

    this.productService.getProductByName(nameWhithOneSpace, localId)
      .subscribe(res => {
        if (res != null) {
          if (localId === res._id) {
            this.productForm.get('name').setValue(nameWhithOneSpace);

            this.productService.updateProduct(this.productForm.value)
              .subscribe(response => {
                this.goBack();
              });
          } else {
            alert('El producto ya existe');
          }
        }

        if (res == null) {
          this.productService.updateProduct(this.productForm.value)
            .subscribe(response => {
              this.goBack();
            });
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

}
