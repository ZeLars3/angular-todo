import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-todo-categories',
  templateUrl: './todo-categories.component.html',
  styleUrls: ['./todo-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCategoriesComponent {
  constructor() {}
}
