import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { UserService } from '../shared/user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public userService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (this.userService.isUserAuthenticated()) {
        //     request = request.clone({
        //         headers: request.headers.set('Authorization', this.getToken())
        //     });
        // }
        return next.handle(request);
    }

    getToken() {
        let user: User = this.userService.getCurrentUserWithToken();
        if (user) {
            return 'Bearer ' + user.token;
        }
    }

}
