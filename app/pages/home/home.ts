import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TodoService} from '../../providers/todo-service/todo-service'
import {Todo} from '../../todo'

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [TodoService]
})
export class HomePage {
  public todos: Todo[]

  constructor(public todoService: TodoService) {
    this.loadTodos()
  }

  loadTodos() {
    this.todoService.load().subscribe(data => {
      this.todos = data
    })
  }
}
