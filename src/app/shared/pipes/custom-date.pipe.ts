import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: { seconds: number}): string | null {
    return this.datePipe.transform(value.seconds * 1000, 'dd.MM.yyyy');
  }

}
