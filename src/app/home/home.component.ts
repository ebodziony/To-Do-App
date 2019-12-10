import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Todo } from '../shared/todo.model';
import { NgForm } from '@angular/forms';
import { ToDoService } from '../shared/todo.service';
import { CreateToDoCommand } from '../shared/commands/createToDoCommand';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  user: User;
  toDoListArray: Array<Todo>;
  newToDo: Todo;

  constructor(private router: Router, private userService: UserService, public toDoService: ToDoService) {
    this.user = this.userService.getCurrentUserWithToken();
  }

  ngOnInit() {
    this.toDoListArray = this.user.toDo;
    this.resetForm();
  }

  Logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.newToDo = new Todo();

  }

  onAdd(form: NgForm) {
    let command = new CreateToDoCommand();
    command.note = form.value.Note;
    command.title = form.value.Title;
    command.userId = this.user.Id;
    this.toDoService.create(command).subscribe(data => {
      console.log(data);
      this.resetForm(form);
    });
  }

}
