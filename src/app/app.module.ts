import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {HttpClientModule} from '@angular/common/http'
import {AppComponent} from './app.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToDoComponent } from './todo/todo.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoResolver } from './todo.resolver';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { TodoCategoriesComponent } from './todo-categories/todo-categories.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ColorDirective } from './directives/color.directive';
import { ZoomDirective } from './directives/zoom.directive';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthResolver } from './auth.resolver';

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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [TodoResolver, AuthResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
}
