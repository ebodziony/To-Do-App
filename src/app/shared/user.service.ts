import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from '@angular/httpclient';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { AuthorizeUser } from './authorizeUser.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'No-Auth': 'True'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;

  constructor(public http: HttpClient) {
  }

  getCurrentUserWithToken(): User {
    let user: User = JSON.parse(localStorage.getItem('user'));
    this.currentUser = user;
    return this.currentUser;
  }

  isUserAuthenticated(): boolean {
    let user = this.getCurrentUserWithToken();
    if (user != null && user !== undefined) {
      return true;
    } else {
    return false;
    }
  }

  registerUser(user: User) {
    return this.http.post(environment.apiUrl + 'user/registry', user, httpOptions);
  }

  userAuthentication(command: AuthorizeUser) {
    return this.http.post(environment.apiUrl + 'user/login', command, httpOptions);
  }

  getUserClaims() {
    return this.http.get(environment.apiUrl + 'GetUserClaims');
  }
}
