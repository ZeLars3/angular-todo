import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "../models/todo";

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(todos: Todo[], searchValue: string = ""): Todo[] {
    if (searchValue.length < 3) {
      return todos;
    }
    const result = todos.filter(todo => {
      return todo.title.toLowerCase()
      .includes(searchValue.toLowerCase());
    });
    return result;
  }
}
