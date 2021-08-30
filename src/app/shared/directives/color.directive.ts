import { CategoryService } from './../services/category.service';
import { Colors } from './../models/colors';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { Categories } from '../models/category';

@Directive({
  selector: '[appColor]',
})
export class ColorDirective {
  @Input('appColor') categoryId: number;
  private color: string;

  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private categoryService: CategoryService
  ) {
    this.render.setStyle(this.element.nativeElement, 'color', this.color);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setCategoryColor();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeColor(Colors.BLACK);
  }

  changeColor(color: string) {
    this.render.setStyle(this.element.nativeElement, 'color', color);
  }

  private setCategoryColor() {
    const category = this.categoryService.categories.find(
      (category) => category.id === this.categoryId
    );

    if (!category) {
      return;
    }

    switch (category.title) {
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
}
