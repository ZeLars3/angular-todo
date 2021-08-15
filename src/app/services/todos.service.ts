import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Todo } from "src/app/interfaces/todo";
import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class TodosService {
  private todosUrl = "api/todos";

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(
      "https://jsonplaceholder.typicode.com/todos",
      todo,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }

  fetchTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>("https://jsonplaceholder.typicode.com/todos", {
        params: new HttpParams().set("_limit", "77"),
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          return throwError(error.message);
        })
      );
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.todosUrl}/${id}`);
  }

  removeTodo(id: number): Observable<void> {
    return this.http.delete<void>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }

  completeTodo(id: number): Observable<void> {
    return this.http.put<void>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      { completed: true }
    );
  }

  // searchTodo(term: string): Observable<Todo[]> {
  //   if (!term.trim()) {
  //     return of([]);
  //   }
  //   return this.http.get<Todo[]>(`${this.todosUrl}/?name=${term}`).pipe();
  // }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put<Todo>(this.todosUrl, todo, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  signIn(username: string, password: string) {
    return this.http
      .post(API_URL + "/sign-in", {
        username,
        password,
      })
  }
}
