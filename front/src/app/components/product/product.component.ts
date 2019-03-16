import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/customValidators';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product-model';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { getNoImage } from '../../../assets/noimage';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  @ViewChild(UploadImageComponent)
  private uploadChild: UploadImageComponent;
  currentPage: Number = 1;
  noImage = getNoImage();
  productService: ProductService;

  constructor(private fb: FormBuilder, private productSrv: ProductService) {
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
    this.getAllProducts();
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

          this.productService.postProduct(this.productForm.value)
            .subscribe(response => {
              this.productForm.reset();
              this.manageImgShow();
              this.getAllProducts();
            });
        }
      });
  }

  getAllProducts() {
    this.productService.getProduct()
      .subscribe(res => {
        this.productService.products = res as Product[];
      });
  }

  deleteProduct(_id: string) {
    if (confirm('Desea eliminar el producto?')) {
      this.productService.deleteProduct(_id)
        .subscribe(res => {
          this.getAllProducts();
        });
    }
  }

  editProduct(product) {
    this.productService.selectedProduct = product;
  }
}
