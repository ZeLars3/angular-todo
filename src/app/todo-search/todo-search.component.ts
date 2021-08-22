import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { TodosService } from '../shared/services/todos.service';

@Component({
  selector: 'app-todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoSearchComponent implements OnInit {
  private searchTerm$ = new Subject<string>();
  private ngUnsubscribe$ = new Subject<void>();
  searchValue = new FormControl();

  constructor(private todoService: TodosService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.searchTerm$
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(term => {
        this.todoService.setSearchTerm(term);
        this.changeDetectorRef.markForCheck();
      });
    this.searchValue.valueChanges.subscribe((value) => {
      this.searchTerm$.next(value);
    });
    this.searchValue.setValue('');
  }

  search(term: string): void {
    this.searchTerm$.next(term);
  }

  onDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
