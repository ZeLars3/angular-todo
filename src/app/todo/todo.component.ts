import { Component, Input, OnInit } from "@angular/core";
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { Todo } from "src/app/shared/models/todo";
import { TodosService } from "../shared/services/todos.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class ToDoComponent implements OnInit {
  ngUnsubscribe$ = new Subject<string>();
  todos: Todo[] = [];
  loading = false;
  error = "";
  form: FormGroup;
  searchValue: string;

  constructor(
    private todosService: TodosService,
    private parentForm: FormGroupDirective
  ) {}

  ngOnInit() {
    this.todosService.getTodos().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(todos => this.todos = todos);
    this.todosService.searchTerm$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((searchTerm: string) => this.searchValue = searchTerm);
  }

  deleteTodo(id: number) {
    event.preventDefault();
    event.stopPropagation();

    this.todosService.deleteTodo(id);
  }

  completeTodo(id: number) {
    event.preventDefault();
    event.stopPropagation();

   this.todosService.completeTodo(id);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next('');
    this.ngUnsubscribe$.complete();
  }
}
