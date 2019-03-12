import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category-model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css'],
})
export class CategorySelectorComponent implements OnInit {
  @Input('parentForm')
  httpCategory: CategoryService
  public parentForm: FormGroup;

  constructor(private http: CategoryService) { 
    this.httpCategory = http;
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.httpCategory.getCategories()
      .subscribe(res => {
        this.httpCategory.categories = res as Category[];

      });
  }

  setId(event) {
    this.parentForm.get('_id').setValue(event.srcElement.selectedOptions[0].id);
  }

}
