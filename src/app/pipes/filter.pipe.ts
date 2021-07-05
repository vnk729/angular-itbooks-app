import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../store/store.service';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(books: Book[], search: string = ''): Book[] {
    if (!search.trim()) {
      return books;
    }
    return books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
  }
}
