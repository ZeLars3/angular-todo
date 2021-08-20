import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appColor]",
})
export class ColorDirective {
  @Input("color") color: string;
  @Input("category") category: string;

  constructor(private element: ElementRef, private render: Renderer2) {
    this.render.setStyle(this.element.nativeElement, "color", this.color);
    element.nativeElement.style.color = this.color;
  }

  @HostListener("mouseenter") onMouseEnter() {
    switch (this.category) {
      case "General":
        this.color = "blue";
        break;
      case "Work":
        this.color = "red";
        break;
      case "Inbox":
        this.color = "green";
        break;
      case "Personal":
        this.color = "orange";
        break;
      case "Social":
        this.color = "gold";
        break;
    }
    this.ChangeColor(this.color);
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.ChangeColor("black");
  }

  ChangeColor(color: string) {
    this.render.setStyle(this.element.nativeElement, "color", color);
  }
}
