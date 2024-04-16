import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[rolesAdministrationOnlyNumber]',
  standalone: true,
})
export class OnlyNumberDirective {

  @Input() OnlyNumber: boolean;

  @HostListener('keypress', ['$event']) onKeyDown(e:KeyboardEvent) {
    if(!(/^[0-9]$/).test(e.key)){
      e.preventDefault();
    }
  }

}
