import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpClientModule} from '@angular/common/http'
import {AppComponent} from './app.component'
import {FormGroupDirective, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './shared/app-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ColorDirective } from './shared/directives/color.directive';
import { ZoomDirective } from './shared/directives/zoom.directive';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AuthGuard } from './auth.guard';
import { TodoCategoriesComponent } from './todo-categories/todo-categories.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { ToDoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    AboutComponent,
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [AuthGuard, FormGroupDirective],
  bootstrap: [AppComponent]
})
export class AppModule {
}
