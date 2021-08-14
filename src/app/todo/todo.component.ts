import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Todo } from "src/app/interfaces/todo";
import { TodoValidator } from "../todo-validator";
import { TodosService } from "../../services/todos.service";


@Component({
  selector: 'app-home',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class ToDoComponent implements OnInit {
  todos: Todo[] = [];
  todoTitle = "";
  loading = false;
  error = "";
  form: FormGroup;

  constructor(private todosService: TodosService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.todos = data.todo;
    });
    console.log(this.route.data)
    this.form = new FormGroup({
      todoTitle: new FormControl("", [Validators.required, TodoValidator.validateSymbol, Validators.pattern("[a-zA-Z0-9]*")]),
    });
    //FormBuilder
    
    // this.form = this.formBuilder.group({
    //   "todoTitle": ["Название", [Validators.required, TodoValidator.validateSymbol]],
    // });
  }

  addTodo() {
  const todo = {
    title: this.form.value.todoTitle,
    completed: false
  }

  this.todosService.addTodo(todo).subscribe((todo) => {
    this.todos.push(todo);
    this.form.reset();
    console.log(todo);
  })
}

  fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodos().subscribe(
      (data) => {
        this.todos = data;
        this.loading = false;
      },
      (error) => {
        this.error = error.message;
        this.loading = false;
      },
      () => {
        console.log("Completed");
      }
    );
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }

  completeTodo(id: number) {
    this.todosService.completeTodo(id).subscribe(() => {
      this.todos.find((todo) => todo.id === id).completed = true;
    });
  }
}

