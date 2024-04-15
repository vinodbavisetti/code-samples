import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true
})
export class AutoFocusDirective implements OnInit {
  private hostElement: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.hostElement = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    if(this.hostElement instanceof HTMLInputElement){
        this.hostElement.focus();
    } else {
      setTimeout(() => {
        this.hostElement.querySelector('input')?.focus();
      }, 100);
    }
  }
}
