import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt/';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/api/register', user, {headers: headers}) // DEV
    return this.http.post('api/register', user, {headers: headers}) // PROD
      .pipe(map(res => res.json()));
  }

  authenticateUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // return this.http.post('http://localhost:3000/api/authenticate', user, {headers: headers}) // DEV
    return this.http.post('api/authenticate', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    // return this.http.get('http://localhost:3000/api/profile', {headers: headers})
    return this.http.get('api/profile', {headers: headers})
      .pipe(map(res => res.json()));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    const foo = tokenNotExpired('id_token');
    return foo;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
