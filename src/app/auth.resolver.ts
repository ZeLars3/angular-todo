import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { Todo } from "./interfaces/todo";
import { TodosService } from "./services/todos.service";

@Injectable({
    providedIn: "root",
  })
  export class AuthResolver implements Resolve<Todo> {
    constructor(private todosService: TodosService) {}
  
    resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Todo | Observable<any> | Promise<any> {
        return
    }
  }