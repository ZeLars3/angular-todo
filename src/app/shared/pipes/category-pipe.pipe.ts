import { Category } from './../models/category';
import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipePipe implements PipeTransform {
  transform(todos: Todo[], category: Category): Todo[] {
    if (!todos || !category) {
      return todos;
    }
    return todos.filter(todo => todo.categoryId === category.id);
  }
}
