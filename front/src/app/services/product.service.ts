import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product-model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];
  selectedProduct: Product;

  constructor(private productService: HttpClient) { }

  getProduct() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    return this.productService.get(`${environment.productUrl}/user/${userId}`);
  }

  postProduct(product) {
    const user = JSON.parse(localStorage.getItem('user'));
    product.user = user.id;

    return this.productService.post(environment.productUrl, product);
  }

  deleteProduct(_id: string) {
    return this.productService.delete(environment.productUrl + `/${_id}`);
  }

  getProductById(id): Observable<Product> {
    return this.productService.get<Product>(environment.productUrl + `/${id}`);
  }

  getProductByName(name, id): Observable<Product> {
    return this.productService.get<Product>(environment.productUrl + `/${id}` + `/${name}`);
  }

  updateProduct(product) {
    return this.productService.put(environment.productUrl + `/${product._id}`, product);
  }

  brandHasProducts(id): Observable<Product> {
    return this.productService.get<Product>(environment.productUrl + `/brand/${id}`);
  }

  categoryHasProducts(id): Observable<Product> {
    return this.productService.get<Product>(environment.productUrl + `/category/${id}`);
  }

  searchProductByName(character): Observable<Product> {
    return this.productService.get<Product>(environment.productUrl + `/get/products/${character}`);
  }
}
