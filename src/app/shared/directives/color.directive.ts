import { Colors } from "./../models/colors";
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";
import { Categories } from "../models/category";

@Directive({
  selector: '[appColor]',
})
export class ColorDirective {
  @Input('appColor') category: string;
  private color: string;

  constructor(private element: ElementRef, private render: Renderer2) {
    this.render.setStyle(this.element.nativeElement, 'color', this.color);
  }

  @HostListener('mouseenter') onMouseEnter() {
    switch (this.category) {
      case Categories.GENERAL:
        this.color = Colors.BLUE;
        break;
      case Categories.WORK:
        this.color = Colors.RED;
        break;
      case Categories.INBOX:
        this.color = Colors.GREEN;
        break;
      case Categories.PERSONAL:
        this.color = Colors.YELLOW;
        break;
      case Categories.SOCIAL:
        this.color = Colors.MAGENTA;
        break;
    }
    this.changeColor(this.color);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor('black');
  }

  changeColor(color: string) {
    this.render.setStyle(this.element.nativeElement, 'color', color);
  }
}
