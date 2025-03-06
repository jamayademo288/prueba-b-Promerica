import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SvsvFormat'
})
export class SvsvFormatPipe implements PipeTransform {

  transform(value: string): unknown {
    if (value && value.length === 8) {
      // Formatea el número al formato +503 7122-8826
      return `+503 ${value.substring(0, 4)}-${value.substring(4)}`;
    }
    return value;
  }

}
