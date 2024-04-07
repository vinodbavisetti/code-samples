import {Directive, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';

@Directive({
  selector: '[appIsVisible]',
  standalone: true
})
export class IsVisibleDirective implements OnInit, OnDestroy{

  domElement: HTMLElement = inject(ElementRef).nativeElement;

  @Output() visible = new EventEmitter<boolean>();

  observer = new IntersectionObserver(([entry]) => {
    this.visible.next(entry.isIntersecting);
  }, {
    threshold: 0.9,
    // root: this.domElement.parentElement,
    // rootMargin: '20px',
  });

  ngOnInit() {
    this.observer.observe(this.domElement);
  }

  ngOnDestroy() {
    // this.observer.unobserve(this.domElement);
    this.observer.disconnect();
  }

}
