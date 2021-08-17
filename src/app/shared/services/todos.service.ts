import { Categories } from './../models/category';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Todo } from "src/app/shared/models/todo";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root",
})
export class TodosService {
  private todos$ = new BehaviorSubject<Todo[]>([]);
  searchTerm$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): void {
    this.todos$.next([...this.todos$.value, todo]);
  }

  deleteTodo(id: number): void {
    this.todos$.next(this.todos$.value.filter(todo => todo.id !== id))
  }

  getTodos(): BehaviorSubject<Todo[]> {
    return this.todos$;
  }

  fetchTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${environment.apiUrl}/todos`, {
        params: new HttpParams().set("_limit", "77"),
      })
      .pipe(
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
        category: Categories.GENERAL
      };
    });
  }
}
