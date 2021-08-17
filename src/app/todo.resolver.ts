import { TodosService } from './shared/services/todos.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Todo } from "src/app/shared/models/todo";
import { delay }  from 'rxjs/operators'

@Injectable({
  providedIn: "root",
})
export class TodoResolver implements Resolve<Todo> {
  constructor(private todosService: TodosService) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Todo | Observable<any> | Promise<any> {
    return this.todosService.fetchTodos()
    .pipe(
      delay(1000)
    );
  }
}