import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category-model';
import { RemoveWhiteSpaces } from '../../helpers/customValidators';
import { ProductService } from '../../services/product.service';
import { appLiterals } from '../../resources/appLiteral';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category;
  currentPage: Number = 1;
  appLiterals;
  loading: boolean;
  emptyCategoryList: boolean;

  constructor(private categoryService: CategoryService, private productService: ProductService) {
    this.selectedCategory = new Category();
    this.appLiterals = appLiterals;
  }

  ngOnInit() {
    this.loading = true;
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories()
      .subscribe(cs => {
        this.loading = false;
        this.categories = cs as Category[];
        this.emptyCategoryList = (typeof this.categories === 'undefined' || this.categories.length <= 0);
      });
  }

  addCategory(categoryForm: NgForm) {
    if (categoryForm.controls.name.value.trim() === '') {
      alert(this.appLiterals.category.dataNotValidMsg);
      return;
    }

    let name = categoryForm.controls.name.value;
    const nameWithOneSpace = RemoveWhiteSpaces(name);
    const id = 'noId';

    this.categoryService.getCategoryByName(nameWithOneSpace, id)
      .subscribe(res => {
        if (res != null) {
          if (nameWithOneSpace.toLowerCase() === res.name.toLowerCase()) {
            alert(this.appLiterals.category.existingCategoryMsg);
          }
        } else {
          if (!nameWithOneSpace) { return; }
          name = nameWithOneSpace;
          this.categories = [];
          this.emptyCategoryList = false;
          this.loading = true;
          this.categoryService.postCategory({ name } as Category)
            .subscribe(() => {
              this.getCategories();
              this.selectedCategory.name = '';
              this.selectedCategory._id = '';
            });
        }
      });
  }

  editCategory(category: Category) {
    this.categoryService.selectedCategory = category;
  }

  deleteCategory(category: Category): void {
    this.productService.categoryHasProducts(category._id)
      .subscribe(res => {
        if (res !== null) {
          alert(this.appLiterals.category.cannotDeleteBCategoryMsg);
        } else {
          if (confirm(this.appLiterals.category.deleteCategoryMsg)) {
            this.categories = [];
            this.loading = true;
            this.categoryService.deleteCategory(category._id)
              .subscribe(() => {
                this.getCategories();
              });
          }
        }
      });
  }

}
