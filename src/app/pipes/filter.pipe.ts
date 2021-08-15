import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(todo: Todo[], search: string = ''): Todo[] {
    if (!search.trim()) {
      return todo;
    }
    return todo.filter(t => {t.title.toLowerCase().includes(search.toLowerCase())});
  }
}
