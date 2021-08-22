import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  ngUnsubscribe$ = new Subject<void>();
  @Input() todos$: Observable<Todo[]>
  @Input() searchTerm$: Observable<string>;
  loading = false;
  error = '';
  form: FormGroup;
  searchValue: string;

  constructor(
    private todosService: TodosService,
    private parentForm: FormGroupDirective,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.todos$ = this.todosService
      .getTodos()
      .pipe(takeUntil(this.ngUnsubscribe$));
    this.changeDetectorRef.detectChanges();

    this.todosService.searchTerm$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(searchTerm => {
        this.searchValue = searchTerm;
        this.changeDetectorRef.detectChanges();
      }
    );
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
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
