import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Brand } from '../../models/brand-model';
import { BrandService } from '../../services/brand.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';
import { ProductService } from '../../services/product.service';
import { appLiterals } from '../../resources/appLiteral';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: Brand[];
  selectedBrand: Brand;
  currentPage: Number = 1;
  appLiterals;
  loading: boolean;
  emptyBrandList: boolean;

  constructor(private brandService: BrandService, private productService: ProductService) {
    this.selectedBrand = new Brand();
    this.appLiterals = appLiterals;
  }

  ngOnInit() {
    this.loading = true;
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getBrands()
      .subscribe(bs => {
        this.loading = false;
        this.brands = bs as Brand[];
        this.emptyBrandList = (typeof this.brands === 'undefined' || this.brands.length <= 0);
      });
  }

  addBrand(brandForm: NgForm): void {
    if (brandForm.controls.name.value.trim() === '') {
      alert(this.appLiterals.brands.dataNotValidMsg);
      return;
    }
    let name = brandForm.controls.name.value;
    const nameWithOneSpace = RemoveWhiteSpaces(name);
    const id = 'noId';

    this.brandService.getBrandByName(nameWithOneSpace, id)
      .subscribe(res => {
        if (res != null) {
          if (nameWithOneSpace.toLowerCase() === res.name.toLowerCase()) {
            alert(this.appLiterals.brands.existingBrandMsg);
          }
        } else {
          if (!nameWithOneSpace) { return; }
          name = nameWithOneSpace;
          this.brands = [];
          this.emptyBrandList = false;
          this.loading = true;
          this.brandService.addBrand({ name } as Brand)
            .subscribe(() => {
              this.getBrands();
              this.selectedBrand.name = '';
              this.selectedBrand._id = '';
            });
        }
      });
  }

  delete(brand: Brand): void {
    this.productService.brandHasProducts(brand._id)
      .subscribe(res => {
        if (res !== null) {
          alert(this.appLiterals.brands.cannotDeleteBrandMsg);
        } else {
          if (confirm(this.appLiterals.brands.deleteBrandMsg)) {
            this.brands = [];
            this.loading = true;
            this.brandService.deleteBrand(brand)
              .subscribe(() => {
                this.getBrands();
              });
          }
        }
      });
  }

}
