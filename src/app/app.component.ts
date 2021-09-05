import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);

  constructor(private overlay: OverlayContainer) {}

  ngOnInit() {
  this.toggleControl.valueChanges.subscribe((value) => {
    this.className = value ? 'darkMode' : '';
    this.overlay.getContainerElement().classList.toggle('darkMode');
  });
}
}
