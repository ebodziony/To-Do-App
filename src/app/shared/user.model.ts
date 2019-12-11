import { Todo } from './todo.model';

export class User {
    userName: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    toDo: Array<Todo>;
    id: number;
}
