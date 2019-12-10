import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
    form.reset();
    }

    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    };
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
    .subscribe((data: any) => {
      if (data.Succeeded === true) {
      this.resetForm(form);
      }
    });
  }

}
