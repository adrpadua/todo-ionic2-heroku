import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TodoService } from '../../providers/todo-service/todo-service';
import { Todo } from '../../todo.ts';

@Component({
  templateUrl: 'build/pages/todo-edit/todo-edit.html',
  providers: [TodoService]
})
export class TodoEditPage {

  public todo: Todo
  public todos: Todo[]
  public index: number

  constructor(private navCtrl: NavController, public navParams: NavParams, public todoService: TodoService) {
    this.todo = navParams.get('todo')
    this.todos = navParams.get('todos')
    this.index = navParams.get('index')
  }

  saveTodo(updatedDescription: string) {
    this.todo.description = updatedDescription
    this.todoService.update(this.todo).subscribe(response => {
      this.navCtrl.pop()
    })
  }

  deleteTodo() {
    this.todoService.delete(this.todo).subscribe(response => {
      this.todos.splice(this.index, 1)
      this.navCtrl.pop()
    })
  }

}
