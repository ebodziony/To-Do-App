import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Todo } from '../shared/todo.model';
import { NgForm } from '@angular/forms';
import { ToDoService } from '../shared/todo.service';
import { CreateToDoCommand } from '../shared/commands/createToDoCommand';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule, MatList } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmToDoCommand } from '../shared/commands/confirmToDoCommand';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../shared/modals/dialog.component';
import { Subscription } from 'rxjs';
import { EditToDoCommand } from '../shared/commands/editToDoCommand';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  user: User;
  toDoListArray: Array<Todo>;
  newToDo: Todo;
  editToDoCommand: EditToDoCommand;
  removeDialog: MatDialogRef<ConfirmDialogComponent>;
  closeDialogSubscription: Subscription;

  constructor(public dialog: MatDialog, private router: Router, private userService: UserService, public toDoService: ToDoService) {
    this.user = this.userService.getCurrentUserWithToken();
  }

  ngOnInit() {
    this.refreshList();
    this.resetForm();
  }

  ngOnDestroy(): void {
    if (this.closeDialogSubscription) {
      this.closeDialogSubscription.unsubscribe();
    }
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
    const command = new CreateToDoCommand();
    command.note = form.value.Note;
    command.title = form.value.Title;
    command.userId = this.user.id;
    this.toDoService.create(command).subscribe(data => {
      console.log(data);
      this.resetForm(form);
      this.refreshList();
    });
  }

  refreshList() {
    this.toDoService.getAllToDoForUser(this.user.id).subscribe(data => {
      this.toDoListArray = data;
    });
  }

  onRemove(toDoId: number) {
    this.removeDialog = this.dialog.open(ConfirmDialogComponent, {
      hasBackdrop: true,
      data: { title: 'Are you sure to delete?' }
    });

    this.closeDialogSubscription = this.removeDialog.afterClosed().subscribe(result => {
      if (result !== undefined && result.result === true) {
        this.toDoService.remove(toDoId).subscribe(data => {
          this.refreshList();
        });
      }

      if (this.closeDialogSubscription) {
        this.closeDialogSubscription.unsubscribe();
      }
    });
  }

  onCheck(toDoId: number) {
    this.toDoService.confirm(new ConfirmToDoCommand(toDoId)).subscribe(data => {
      this.refreshElement(data);
    });
  }

  onEdit(toDoElement: Todo) {
    this.editToDoCommand = new EditToDoCommand();
    this.editToDoCommand.note = toDoElement.note;
    this.editToDoCommand.title = toDoElement.title;

    toDoElement.isEdited = true;
    for (let i = 0; i < this.toDoListArray.length; i++) {
      if (this.toDoListArray[i].isEdited === true && this.toDoListArray[i].id !== toDoElement.id) {
        this.toDoListArray[i].isEdited = false;
      }
    }
  }

  saveEdit(toDoElement: Todo) {
    this.editToDoCommand.id = toDoElement.id;
    this.editToDoCommand.userId = toDoElement.userId;
    this.toDoService.edit(this.editToDoCommand).subscribe(data => {
      this.refreshElement(data);
    });
  }

  refreshElement(toDo: Todo) {
    for (let i = 0; i < this.toDoListArray.length; i++) {
      if (this.toDoListArray[i].id === toDo.id) {
        this.toDoListArray[i] = toDo;
      }
    }
  }

}

