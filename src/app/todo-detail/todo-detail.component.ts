import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
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
  editMode = false;
  todoData: Todo;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.todoData = this.todosService.getTodoById(+params.id);
      }
    });
    this.form = this.formBuilder.group({
      todoTitle: [
        this.editMode ? this.todoData.title : '',
        [Validators.required, TodoValidator.validateSymbol],
      ],
      todoDescription: [
        this.editMode ? this.todoData.description : '', 
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  OnSubmit() {
    event.preventDefault();
    event.stopPropagation();

  //   const todo: Todo = {
  //     title: this.form.value.todoTitle,
  //     description: this.form.value.todoDescription,
  //     completed: false,
  //     category: "general",
  //   };

  //   if (this.formMode === "add") {
  //     this.todos.push(todo);
  //   }
  //   if (this.formMode === "edit") {
  //     this.todos[this.form.value.todoId] = todo;
  //   }
    
  //   this.todosService.addTodo(todo);
  //   this.form.reset();
    console.log(this.editMode);
  }

  updateTodo() {
    event.preventDefault();
    event.stopPropagation();

    this.todosService.updateTodo({
      id: this.todos.length + 1,
      title: this.form.value.todoTitle,
      description: this.form.value.todoDescription,
    });
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
