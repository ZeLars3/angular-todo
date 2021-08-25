import { Directive, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounce]'
})
export class DebounceDirective implements OnInit, OnDestroy {
  @Input('appDebounce') debounceTime = 500;
  private input = new Subject();
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.subscription = this.input.pipe(debounceTime(this.debounceTime)).subscribe(event => this.clickEvent(event));
  }
  
  @HostListener('click', ['$event'])
  clickEvent(event) { 
    this.input.next(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
