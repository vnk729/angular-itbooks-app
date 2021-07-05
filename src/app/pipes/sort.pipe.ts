import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(list: any[], sortBy: string, order: any): any[] {
    return orderBy(list, [sortBy], [order]);
  }
}
