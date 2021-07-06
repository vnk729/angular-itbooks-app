import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(list: any[], search: string = ''): any[] {
    if (!search.trim()) {
      return list;
    }
    return list.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));
  }
}
