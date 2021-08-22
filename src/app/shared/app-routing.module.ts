import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';
import { ToDoComponent } from '../todo/todo.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SignInComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail',
    component: TodoDetailComponent,
  },
  {
    path: 'todo',
    component: ToDoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'todo/:id',
    component: TodoDetailComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
