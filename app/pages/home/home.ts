import {Component} from '@angular/core';
import {NavController, ItemSliding, Item} from 'ionic-angular';

import {TodoEditPage} from '../todo-edit/todo-edit'
import {TodoService} from '../../providers/todo-service/todo-service'
import {Todo} from '../../todo'

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [TodoService]
})
export class HomePage {
  public todos: Todo[]

  constructor(public navCtrl: NavController, public todoService: TodoService) {
    this.navCtrl = navCtrl
    this.loadTodos()
  }

  loadTodos() {
    this.todoService.load().subscribe(data => {
      this.todos = data
    })
  }

  addTodo(todo:string) {
    this.todoService.add(todo).subscribe(data => {
      this.todos.push(data)
    })
  }

  toggleComplete(todo:Todo) {
    todo.isComplete = !todo.isComplete
    this.todoService.update(todo).subscribe(data => {
      todo = data
    })
  }

  deleteTodo(todo:Todo, index:number) {
    this.todoService.delete(todo).subscribe(response => {
      this.todos.splice(index, 1)
    })
  }

  navToEdit(todo: Todo, index: number) {
    this.navCtrl.push(TodoEditPage, {
      todo: todo,
      todos: this.todos,
      index: index
    })
  }
}
