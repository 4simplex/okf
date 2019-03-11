import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Brand } from '../../models/brand-model';
import { BrandService } from '../../services/brand.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';
import { appLiterals } from '../../resources/appLiteral';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {
  @Input() brand: Brand;
  appLiterals;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandService,
    private location: Location
  ) {
    this.appLiterals = appLiterals;
  }

  ngOnInit(): void {
    this.getBrand();
  }

  getBrand(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.brandService.getBrand(id)
      .subscribe(b => this.brand = b);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const name = this.brand.name;

    if (name.trim() === '') {
      alert(this.appLiterals.brands.dataNotValidMsg);
      return;
    }

    const nameWithOneSpace = RemoveWhiteSpaces(name);
    this.brand.name = nameWithOneSpace;

    const localId = this.route.snapshot.paramMap.get('id');

    this.brandService.getBrandByName(nameWithOneSpace, localId)
      .subscribe(res => {
        if (res != null) {
          if (localId === res._id) {
            this.brandService.updateBrand(this.brand)
              .subscribe(() => this.goBack());
          } else {
            alert(this.appLiterals.brands.existingBrandMsg);
          }
        }

        if (res == null) {
          this.brandService.updateBrand(this.brand)
            .subscribe(() => this.goBack());
        }
      });
  }
}
