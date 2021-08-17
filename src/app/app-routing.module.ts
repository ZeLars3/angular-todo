import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { TodoResolver } from "./todo.resolver";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AuthGuard } from './auth.guard';
import { ToDoComponent } from './todo/todo.component';

const appRoutes: Routes = [
  { path: "", component: SignInComponent, pathMatch: "full", canActivate: [AuthGuard] },
  { path: "sign-in", component: SignInComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "detail", component: TodoDetailComponent },
  {
    path: "todo", component: ToDoComponent,
    resolve: {
      todo: TodoResolver,
    },
    canActivate: [AuthGuard]
  },
  { path: "todo/:id", component: TodoDetailComponent},
  { path: "about", component: AboutComponent},
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}