import { Todo } from './todo.model';

export class User {
    UserName: string;
    Password: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Token: string;
    toDo: Array<Todo>;
    Id: number;
}
