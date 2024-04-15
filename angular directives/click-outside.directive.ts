import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[medevaClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {

  constructor(private el: ElementRef) { }

  @Output('medevaClickOutside') public clickedOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.el.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickedOutside.emit(target);
    }
  }

}
