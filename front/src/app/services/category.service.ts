import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Category } from '../models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[];
  selectedCategory: Category;

  constructor(private http: HttpClient) {
    this.selectedCategory = new Category();
  }

  getCategories() {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    return this.http.get(`${environment.categoryUrl}/user/${userId}`);
  }

  getCategory(id: string): Observable<Category> {
    const url = `${environment.categoryUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      // tap(_ => console.info(`Fetched brand id=${id}`)),
      catchError(this.handleError<Category>(`getBrand id=${id}`))
    );
  }

  getCategoryByName(name, id): Observable<Category> {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    return this.http.get<Category>(`${environment.categoryUrl}/${userId}/${id}/${name}`);
  }

  postCategory(category: Category): Observable<Category> {
    const user = JSON.parse(localStorage.getItem('user'));
    category.user = user.id;
    return this.http.post<Category>(environment.categoryUrl, category);
  }

  putCategory(category: Category) {
    return this.http.put(environment.categoryUrl + `/${category._id}`, category);
  }

  deleteCategory(_id: string) {
    return this.http.delete(environment.categoryUrl + `/${_id}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.info('LOG ERROR BEGIN');
      console.error(`${operation} failed: ${error.message}`);
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.info('LOG ERROR END');

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
