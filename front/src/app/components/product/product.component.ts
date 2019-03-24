import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product-model';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { getNoImage } from '../../../assets/noimage';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';
import { appLiterals } from '../../resources/appLiteral';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[];
  productForm: FormGroup;
  @ViewChild(UploadImageComponent)
  private uploadChild: UploadImageComponent;
  currentPage: Number = 1;
  noImage = getNoImage();
  productService: ProductService;
  appLiterals;
  loading: boolean;
  emptyProductList: boolean;

  constructor(fb: FormBuilder, productSrv: ProductService) {
    this.appLiterals = appLiterals;
    this.productService = productSrv;

    this.productForm = fb.group({
      'name': ['', Validators.required],
      'category': fb.group({
        '_id': ['', Validators.required],
        'name': ['']
      }),
      'brand': fb.group({
        '_id': ['', Validators.required],
        'name': ['']
      }),
      'photo': fb.group({
        'name': ['']
      }),
      'fileImg': [''],
      'description': ['']
    });
  }

  ngOnInit() {
    this.loading = true;
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProduct()
      .subscribe(res => {
        this.loading = false;
        this.products = res as Product[];
        this.emptyProductList = (typeof this.products === 'undefined' || this.products.length <= 0);
      });
  }

  manageImgShow() {
    this.uploadChild.showImgPrev();
  }

  displayProductImage(count) {
    this.productForm.get('fileImg').setValue(count);
  }

  addNewProduct() {
    const name = this.productForm.get('name').value;

    if (name.trim() === '') {
      alert('Dato no válido. Debe escribir un nombre de producto.');
      return;
    }

    const nameWhithOneSpace = RemoveWhiteSpaces(name);
    const id = 'noId';

    this.productService.getProductByName(nameWhithOneSpace, id)
      .subscribe(res => {
        if (res != null) {
          if (nameWhithOneSpace.toLowerCase() === res.name.toLowerCase()) {
            alert('El producto ya existe');
          }
        } else {
          this.productForm.get('name').setValue(nameWhithOneSpace);
          this.products = [];
          this.emptyProductList = false;
          this.loading = true;
          this.productService.postProduct(this.productForm.value)
            .subscribe(() => {
              this.productForm.reset();
              this.manageImgShow();
              this.getAllProducts();
            });
        }
      });
  }

  deleteProduct(_id: string) {
    if (confirm('Desea eliminar el producto?')) {
      this.products = [];
      this.loading = true;
      this.productService.deleteProduct(_id)
        .subscribe(() => {
          this.getAllProducts();
        });
    }
  }

  editProduct(product) {
    this.productService.selectedProduct = product;
  }
}
