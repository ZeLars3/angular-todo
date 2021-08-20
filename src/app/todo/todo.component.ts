import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { Todo } from 'src/app/shared/models/todo';
import { TodosService } from '../shared/services/todos.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class ToDoComponent implements OnInit {
  ngUnsubscribe$ = new Subject<string>();
  todos$: Observable<Todo[]>;
  loading = false;
  error = '';
  form: FormGroup;
  searchValue: string;

  constructor(
    private todosService: TodosService,
    private parentForm: FormGroupDirective
  ) {}

  ngOnInit() {
    this.todos$ = this.todosService
      .getTodos()
      .pipe(takeUntil(this.ngUnsubscribe$));
    //
    this.todosService.searchTerm$
      .pipe(takeUntil(this.ngUnsubscribe$))
  }

  deleteTodo(id: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.todosService.deleteTodo(id);
  }

  completeTodo(id: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.todosService.completeTodo(id);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next('');
    this.ngUnsubscribe$.complete();
  }
}
