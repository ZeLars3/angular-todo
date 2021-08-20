import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Todo } from "../shared/models/todo";
import { TodosService } from "../shared/services/todos.service";
import { TodoValidator } from "../todo/todo-validator";
import { Categories } from "../shared/models/category";

@Component({
  selector: "app-todo-detail",
  templateUrl: "./todo-detail.component.html",
  styleUrls: ["./todo-detail.component.scss"],
})
export class TodoDetailComponent implements OnInit {
  ngUnsubscribe$ = new Subject<void>();
  todos: Todo[] = [];
  categories = Object.values(Categories);
  loading = false;
  error = "";
  form: FormGroup;
  editMode = false;
  todoData: Todo;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((params) => {
        if (params.id) {
          this.editMode = true;
          this.todoData = this.todosService.getTodoById(+params.id);
          console.log(this.todoData);
        }
      });
      
    //const { title, description, category } = this.todoData || {};

    this.form = this.formBuilder.group({
      title: [
        this.editMode ? this.todoData.title : "",
        [Validators.required, TodoValidator.validateSymbol],
      ],
      description: [
        this.editMode ? this.todoData.description : "",
        [Validators.required, Validators.minLength(5)],
      ],
      category: [ 
        this.editMode ? this.todoData.category : "",
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

  changeCategory(event) {
    this.category.setValue(event.target.value, {
      onlySelf: true,
    });
  }

  get category() {
    return this.form.get('category');
  }

  addTodo() {
    const formData = this.form.getRawValue();
    const newTodo: Todo = {
      ...formData,
      completed: false,
    };

    this.todosService.addTodo(newTodo);
    console.log(newTodo);
    this.form.reset();
  }

  updateTodo() {
    const formData = this.form.getRawValue();
    this.todosService.updateTodo({
      ...this.todoData,
      ...formData,
    });

    this.router.navigate(["/todo"]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
