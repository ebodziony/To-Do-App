import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthorizeUser } from 'src/app/shared/authorizeUser.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  command: AuthorizeUser;
  isLoginError = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmit(userName, password) {

    this.command = new AuthorizeUser();
    this.command.UserName = userName;
    this.command.Password = password;

    this.userService.userAuthentication(this.command).subscribe((data: any) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.router.navigate(['/home']);
    },
    (err) => {
      this.isLoginError = true;
    });
  }
}
