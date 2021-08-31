import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Todo } from 'src/app/shared/models/todo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);
  searchTerm$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): void {
    this.todos$.next([
      ...this.todos$.value,
      {
        id: this.todos$.value.length + 1,
        ...todo,
      },
    ]);
  }

  deleteTodo(id: number): void {
    this.todos$.next(this.todos$.value.filter((todo) => todo.id !== id));
  }

  getTodos(): Observable<Todo[]> {
    return this.todos$.asObservable().pipe(
      switchMap((todos) => {
        if (todos.length) {
          return of(todos);
        }
        return this.fetchTodos();
      })
    );
  }

  updateTodo(todo: Todo): void {
    this.todos$.next(
      this.todos$.value.map((todoItem) =>
        todoItem.id === todo.id ? { ...todoItem, ...todo } : todoItem
      )
    );
  }

  getTodoById(todoId: number): Todo {
    return this.todos$.value.find(({ id }) => id === todoId);
  }

  getTodosByCategoryId(categoryId: number) {
    return this.todos$
      .asObservable()
      .pipe(
        map((todos) => todos.filter((todo) => todo.categoryId === categoryId))
      );
  }

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/todos`).pipe(
      tap((data) => {
        this.todos$.next(this.transformData(data));
      }),
      catchError((error) => {
        console.error(error);
        return throwError(error.message);
      })
    );
  }

  completeTodo(id: number): void {
    const result = this.todos$.value.reduce((acc: Todo[], val: Todo) => {
      if (val.id === id) {
        val.completed = !val.completed;
      }
      return [...acc, val];
    }, []);
    this.todos$.next(result);
  }

  setSearchTerm(term: string): void {
    this.searchTerm$.next(term.trim());
  }

  transformData(data: Todo[]): Todo[] {
    return data.map((value: Todo) => {
      return {
        ...value,
        description: '',
        categoryId: Math.floor(Math.random() * 5) + 1,
      };
    });
  }
}
