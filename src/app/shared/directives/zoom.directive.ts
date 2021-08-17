import { HostListener, Renderer2 } from '@angular/core';
import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective {
  @Input('zoom') size!: string | number;

  constructor(private element: ElementRef, private render: Renderer2) {
    this.render.setStyle(this.element.nativeElement, 'cursor', 'pointer');
    element.nativeElement.style.fontSize = '18px';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setFontSize(this.size);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setFontSize(18);
  }

  setFontSize(value: number | string): void {
    this.element.nativeElement.style.fontSize = `${value}px`;
  }
}