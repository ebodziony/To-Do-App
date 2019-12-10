import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from '@angular/httpclient';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { AuthorizeUser } from './authorizeUser.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'No-Auth': 'True'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) {
  }

  registerUser(user: User) {
    return this.http.post(environment.apiUrl + 'api/register', user, httpOptions);
  }

  // userAuthentication(userName, password) {
  //   const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
  //   const reqHeader = new HttpHeaders({'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True'});
  //   return this.http.post(environment.apiUrl + 'api/login', data, {headers: reqHeader});
  // }

  userAuthentication(command: AuthorizeUser) {
    return this.http.post(environment.apiUrl + 'api/user/login', command, httpOptions);
  }

  getUserClaims() {
    return this.http.get(environment.apiUrl + 'GetUserClaims');
  }
}
