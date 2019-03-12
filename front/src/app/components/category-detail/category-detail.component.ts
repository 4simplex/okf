import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Category } from '../../models/category-model';
import { CategoryService } from '../../services/category.service';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  @Input() category: Category;

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(id)
      .subscribe(b => this.category = b);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const name = this.category.name;
    if (name.trim() === '') {
      alert('Dato no válido. Debe escribir una categoría');
      return;
    }
    const nameWithOneSpace = RemoveWhiteSpaces(name);
    this.category.name = nameWithOneSpace;

    const localId = this.route.snapshot.paramMap.get('id');

    this.categoryService.getCategoryByName(this.category.name, localId)
      .subscribe(res => {
        if (res != null) {
          if (localId === res._id) {
            this.categoryService.putCategory(this.category)
              .subscribe(() => this.goBack());
          } else {
            alert('El producto ya existe');
          }
        }

        if (res == null) {
          this.categoryService.putCategory(this.category)
            .subscribe(() => this.goBack());
        }
      });
  }
}
