import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component'
import { AppRoutingModule } from './shared/app-routing.module';
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
import { SignInModule } from './sign-in/sign-in.module';
import { CategoryPipePipe } from './shared/pipes/category-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    NotFoundComponent,
    TodoSearchComponent,
    TodoCategoriesComponent,
    TodoDetailComponent,
    FilterPipe,
    ColorDirective,
    ZoomDirective,
    NavbarComponent,
    SelectedCategoryComponent,
    DebounceDirective,
    GetTitlePipe,
    CategoryPipePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SignInModule,
  ],
  providers: [AuthGuard, FormGroupDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
