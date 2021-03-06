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
    this.todoService.load().subscribe(todoList => {
      this.todos = todoList
    })
  }

  addTodo(todo:string) {
    this.todoService.add(todo).subscribe(newTodo => {
      this.todos.push(newTodo)
    })
  }

  toggleComplete(todo:Todo) {
    todo.isComplete = !todo.isComplete
    this.todoService.update(todo).subscribe(updatedTodo => {
      todo = updatedTodo
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
