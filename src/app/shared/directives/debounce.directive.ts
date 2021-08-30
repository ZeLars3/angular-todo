import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounce]',
})

//debounce derictive is used to display the search result after the 500ms
export class DebounceDirective implements OnInit, OnDestroy {
  @Input() appDebounce: number;
  @Output() search = new EventEmitter<string>();
  private searchTerm$ = new Subject<string>();
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.searchTerm$.pipe(
      debounceTime(this.appDebounce),
    ).subscribe(term => this.search.emit(term));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @Input()
  set searchTerm(term: string) {
    this.searchTerm$.next(term);
  }
}
