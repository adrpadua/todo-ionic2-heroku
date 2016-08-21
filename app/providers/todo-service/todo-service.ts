
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Todo} from '../../todo.ts';

@Injectable()
export class TodoService {
  todosUrl = "/api/todos"

  constructor(public http: Http) {}

  // Get all todos
  load(): Observable<Todo[]> {
    return this.http.get(this.todosUrl)
               .map(res => res.json())
               .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
