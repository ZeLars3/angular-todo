import { SelectedCategoryComponent } from './../selected-category/selected-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AuthGuard } from './guards/auth.guard';
import { ToDoComponent } from '../todo/todo.component';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SignInComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'sign-in',
    loadChildren: () => import('../sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'todos',
    component: ToDoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: TodoDetailComponent,
  },
  {
    path: 'todos/category/:id',
    component: SelectedCategoryComponent,
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
