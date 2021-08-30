import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories, Category } from '../models/category';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private todos$ = new BehaviorSubject<Todo[]>([]);
  categories: Category[] = [
    { id: 1, title: Categories.GENERAL, color: '#F44336' },
    { id: 2, title: Categories.INBOX, color: '#2196F3' },
    { id: 3, title: Categories.PERSONAL, color: '#4CAF50' },
    { id: 4, title: Categories.SOCIAL, color: '#9C27B0' },
    { id: 5, title: Categories.WORK, color: '#9C27B0' },
  ];

  constructor() {}

  getCategoryById(categoryId: number) {
    return this.categories.find((category) => category.id === categoryId);
  }

  getTodosByCategoryTitle(categoryTitle: string) {
    return this.todos$
      .asObservable()
      .pipe(
        map((todos) =>
          todos.filter(
            (todo) =>
              todo.categoryId ===
              this.categories.find(
                (category) => category.title === categoryTitle
              ).id
          )
        )
      );
  }

  getTodosByCategoryColor(categoryColor: string) {
    return this.todos$
      .asObservable()
      .pipe(
        map((todos) =>
          todos.filter(
            (todo) =>
              todo.categoryId ===
              this.categories.find(
                (category) => category.color === categoryColor
              ).id
          )
        )
      );
  }
}
