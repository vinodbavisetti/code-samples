import {Directive, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";

@Directive({
    selector: '[appElementResized]',
    standalone: true
})
export class ElementResizedDirective implements OnInit, OnDestroy {

    domElement: HTMLElement = inject(ElementRef).nativeElement;

    _appElementResized = new EventEmitter<ResizeObserverEntry>;
    @Output() appElementResized = this._appElementResized.pipe(
        debounceTime(300),
        distinctUntilChanged((previous, current) => {
            return this.considerOnlyWidth ? (previous.contentRect.width === current.contentRect.width) : false;
        }),
    );

    @Input() considerOnlyWidth = true;

    observer = new ResizeObserver(entries => {
        this._appElementResized.next(entries[0]);
    });

    ngOnInit(){
        this.observer.observe(this.domElement);
    }

    ngOnDestroy() {
        // this.observer.unobserve(this.domElement);
        this.observer.disconnect();
    }

}
