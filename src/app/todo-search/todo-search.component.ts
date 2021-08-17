import { ControlContainer, FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
} from "rxjs/operators";
import { Todo } from "../shared/models/todo";
import { TodosService } from "../shared/services/todos.service";

@Component({
  selector: "app-todo-search",
  templateUrl: "./todo-search.component.html",
  styleUrls: ["./todo-search.component.scss"],
})
export class TodoSearchComponent implements OnInit {
  private searchTerm = new Subject<string>();
  ngUnsubscribe = new Subject<string>();
  searchValue = new FormControl();

  constructor(
    private todoService: TodosService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.searchTerm.pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => this.todoService.setSearchTerm(term));

    this.searchValue.valueChanges.subscribe((value) => {
      this.searchTerm.next(value);
    });

    //this.searchValue.setValue("");

    // this.searchValue.valueChanges
    //   .pipe(
    //     filter((term) => term !== ""),
    //     debounceTime(400)
    //   )
    //   .subscribe((term) => this.search(term));
  }

  search(term: string): void {
    this.searchTerm.next(term);
  }

  onDestroy() {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
  }
}
