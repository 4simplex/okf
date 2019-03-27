import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Price } from '../models/price-model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  selectedPrice: Price;
  prices: Price[];

  constructor(private http: HttpClient) {
    this.selectedPrice = new Price();
  }

  getPriceLst() {
    const userId = JSON.parse(localStorage.getItem('user')).id;

    return this.http.get(`${environment.priceUrl}/user/${userId}`);
  }

  getPriceById(id: string): Observable<Price> {
    const url = `${environment.priceUrl}/${id}`;
    return this.http.get<Price>(url).pipe(
      // tap(_ => console.info(`Fetched price id=${id}`)),
      catchError(this.handleError<Price>(`getPrice id=${id}`))
    );
  }

  postPrice(price: Price) {
    const user = JSON.parse(localStorage.getItem('user'));
    price.user = user.id;

    return this.http.post(environment.priceUrl, price);
  }

  /** PUT: update the price on the server */
  updatePrice(price: Price): Observable<any> {
    return this.http.put(environment.priceUrl + `/${price._id}`, price, httpOptions).pipe(
      // tap(_ => console.info(`Updated brand id=${brand._id}`)),
      catchError(this.handleError<any>('updateBrand'))
    );
  }

  deletePrice(price: Price | string) {
    const id = typeof price === 'string' ? price : price._id;
    const url = `${environment.priceUrl}/${id}`;

    return this.http.delete<Price>(url, httpOptions).pipe(
      // tap(_ => console.info(`Deleted price id=${id}`)),
      catchError(this.handleError<Price>('deletePrice'))
    );
  }

  getPriceByName(name): Observable<Price> {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    return this.http.get<Price>(environment.priceUrl + `/getprice/${userId}` + `/${name}`);
  }

  getPriceByProvider(providerId): Observable<Price> {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    return this.http.get<Price>(environment.priceUrl + `/getProvider/${userId}/${providerId}`);
  }

  getPriceByProduct(productId): Observable<Price> {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    return this.http.get<Price>(environment.priceUrl + `/getProduct/${userId}/${productId}`);
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
