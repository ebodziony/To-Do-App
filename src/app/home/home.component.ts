import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private router: Router, private userService: UserService) {
    this.user = this.userService.getCurrentUserWithToken();
  }

  ngOnInit() {

    //this.user = this.userService.currentUser;

    // this.userService.getUserClaims().subscribe((data: any) => {
    //   this.userClaims = data;
    // });
  }

  Logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
