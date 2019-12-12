import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from '@angular/httpclient';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { AuthorizeUser } from './authorizeUser.model';
import { CreateToDoCommand } from './commands/createToDoCommand';
import { Todo } from './todo.model';
import { ConfirmToDoCommand } from './commands/confirmToDoCommand';
import { EditToDoCommand } from './commands/editToDoCommand';

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
export class ToDoService {

  constructor(public http: HttpClient) {
  }

  create(command: CreateToDoCommand) {
    return this.http.post(environment.apiUrl + 'todo', command, httpOptions);
  }

  edit(command: EditToDoCommand): Observable<Todo> {
    return this.http.put<Todo>(environment.apiUrl + 'todo/' + command.id, command, httpOptions);
  }

  remove(toDoId: number) {
    return this.http.delete(environment.apiUrl + 'todo/' + toDoId, httpOptions);
  }

  confirm(toDoId: number): Observable<Todo> {
    return this.http.put<Todo>(environment.apiUrl + `todo/confirm/${toDoId}`, httpOptions);
  }

  unconfirm(toDoId: number): Observable<Todo> {
    return this.http.put<Todo>(environment.apiUrl + `todo/unconfirm/${toDoId}`, httpOptions);
  }

  getAllToDoForUser(userId: number): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>(environment.apiUrl + 'todo/' + userId, httpOptions);
  }
}
