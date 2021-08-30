import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { Todo } from 'src/app/shared/models/todo';
import { TodosService } from '../shared/services/todos.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  ngUnsubscribe$ = new Subject<void>();
  todos$: Observable<Todo[]>;
  searchValue$: Observable<string>;
  loading = false;
  error = '';
  form: FormGroup;
  complete = false;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todos$ = this.todosService.getTodos();
    this.searchValue$ = this.todosService.searchTerm$;
  }

  deleteTodo(id: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.todosService.deleteTodo(id);
  }

  completeTodo(id: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.complete = !this.complete;
    this.todosService.completeTodo(id);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
