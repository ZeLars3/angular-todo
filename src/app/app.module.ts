import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './shared/app-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ColorDirective } from './shared/directives/color.directive';
import { ZoomDirective } from './shared/directives/zoom.directive';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TodoCategoriesComponent } from './todo-categories/todo-categories.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { ToDoComponent } from './todo/todo.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { SelectedCategoryComponent } from './selected-category/selected-category.component';
import { DebounceDirective } from './shared/directives/debounce.directive';
import { GetTitlePipe } from './shared/pipes/get-title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    NotFoundComponent,
    HomeComponent,
    TodoSearchComponent,
    TodoCategoriesComponent,
    SignInComponent,
    TodoDetailComponent,
    FilterPipe,
    ColorDirective,
    ZoomDirective,
    NavbarComponent,
    SelectedCategoryComponent,
    DebounceDirective,
    GetTitlePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard, FormGroupDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
