import { CategoryService } from './../shared/services/category.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo } from '../shared/models/todo';
import { TodosService } from '../shared/services/todos.service';
import { TodoValidator } from '../todo/todo-validator';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDetailComponent implements OnInit {
  ngUnsubscribe$ = new Subject<void>();
  loading = false;
  form: FormGroup;
  editMode = false;
  todoData: Todo;
  categories = this.categoryService.categories;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((params) => {
        if (params.id) {
          this.editMode = true;
          this.todoData = this.todosService.getTodoById(+params.id);
        }
      });

    //const { title, description, category } = this.todoData || {};

    this.form = this.formBuilder.group({
      title: [
        this.editMode ? this.todoData.title : '',
        [Validators.required, TodoValidator.validateSymbol],
      ],
      description: [
        this.editMode ? this.todoData.description : '',
        [Validators.required],
      ],
      categoryId: [
        this.editMode ? this.todoData.categoryId : null,
        [Validators.required],
      ],
    });
  }

  OnSubmit(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.editMode) {
      this.addTodo();
    } else {
      this.updateTodo();
    }
  }

  addTodo() {
    const formData = this.form.getRawValue();
    const newTodo: Todo = {
      ...formData,
      completed: false,
    };

    this.todosService.addTodo(newTodo);
    this.form.reset();

    Object.keys(this.form.controls).forEach((key) => {
      this.form.controls[key].setErrors(null);
    });
  }

  updateTodo() {
    const formData = this.form.getRawValue();
    this.todosService.updateTodo({
      ...this.todoData,
      ...formData,
    });

    this.router.navigate(['/todos']);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}