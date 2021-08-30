import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Todo } from '../shared/models/todo';
import { CategoryService } from '../shared/services/category.service';
import { TodosService } from '../shared/services/todos.service';

@Component({
  selector: 'app-selected-category',
  templateUrl: './selected-category.component.html',
  styleUrls: ['./selected-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedCategoryComponent implements OnInit {
  categories = this.categoryService.categories;
  filteredTodos: Todo[] = [];
  complete = false;
  category = '';

  constructor(
    private categoryService: CategoryService,
    private todosService: TodosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(switchMap(({ id }) => this.todosService.getTodosByCategoryId(+id)))
      .subscribe((todos) => {
        this.filteredTodos = todos;
      });
  }

  deleteTodo(id: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.todosService.deleteTodo(id);
  }

  completeTodo(id: number, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.complete = !this.complete;
    this.todosService.completeTodo(id);
  }
}
