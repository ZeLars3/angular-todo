import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Todo } from '../interfaces/todo';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss']
})
export class TodoSearchComponent implements OnInit {
  todos$!: Observable<Todo[]>
  private searchTerm = new Subject<string>();
  search: string = '';

  constructor(private todoService: TodosService) { }

  ngOnInit(): void {
  //   this.todos$ = this.searchTerm
  //     .pipe(
  //       debounceTime(400),
  //       distinctUntilChanged(),
  //       switchMap(term => this.todoService.searchTodo(term))
  //     );
  // }

  // search(term: string): void {
  //   this.searchTerm.next(term);
  // }
  }
}
