import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Todo } from "../shared/models/todo";
import { TodosService } from "../shared/services/todos.service";
import { TodoValidator } from "../todo/todo-validator";

@Component({
  selector: "app-todo-detail",
  templateUrl: "./todo-detail.component.html",
  styleUrls: ["./todo-detail.component.scss"],
})
export class TodoDetailComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  error = "";
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (id) {
        this.form = this.buildForm();
      } else {
        this.form = this.buildForm();
      }
    });

    this.form = new FormGroup({
      todoTitle: new FormControl("", [
        Validators.required,
        TodoValidator.validateSymbol,
        Validators.pattern("[a-zA-Z0-9]*"),
      ]),
      todoDescription: new FormControl("", [
        Validators.maxLength(300),
        TodoValidator.validateSymbol,
        Validators.pattern("[a-zA-Z0-9]*"),
      ]),
    });
  }

  buildForm(): FormGroup {
    return new FormGroup({
      todoTitle: new FormControl("", [
        Validators.required,
        TodoValidator.validateSymbol,
        Validators.pattern("[a-zA-Z0-9]*"),
      ]),
      todoDescription: new FormControl("", [
        Validators.maxLength(300),
        TodoValidator.validateSymbol,
        Validators.pattern("[a-zA-Z0-9]*"),
      ]),
    });
  }

  addTodo() {
    event.preventDefault();
    event.stopPropagation();

    const todo: Todo = {
      title: this.form.value.todoTitle,
      description: this.form.value.todoDescription,
      completed: false,
    };

    this.todosService.addTodo(todo);
    this.form.reset();
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
}
