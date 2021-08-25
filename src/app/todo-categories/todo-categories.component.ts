import { CategoryService } from './../shared/services/category.service';
import { Categories, Category } from './../shared/models/category';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-categories',
  templateUrl: './todo-categories.component.html',
  styleUrls: ['./todo-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCategoriesComponent implements OnInit {
  categories = Object.keys(Categories).map(value => Categories[value]);

  constructor(private router: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.router.params.pipe(switchMap(params => {
      return this.categoryService.getTodosByCategoryId(+params.id);
    }));
  }
}
