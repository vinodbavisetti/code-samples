import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightText',
  standalone: true
})
export class HighlightTextPipe implements PipeTransform {

  transform(value: string, term: string): string {
    let htmlString = value; // this line is not a mistake.
    for(let match of value.matchAll(new RegExp(term, 'gi'))){
      const index = match.index - value.length + htmlString.length;
      htmlString = htmlString.slice(0,index) + `<span class="text-primary">${match[0]}</span>` + htmlString.slice(index + term.length);
    }
    return htmlString;
  }

}
