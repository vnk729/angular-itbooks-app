import { Component, OnInit } from '@angular/core';
import { BookInfo, StoreService } from '../store/store.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { watch } from 'rxjs-watcher';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  bookInfo!: BookInfo;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    const switched$ = this.route.params.pipe(
      watch('book id', 10),
      switchMap((params: Params) => {
        return this.storeService.getBook(params.id);
      }),
      watch('book info', 10),
    );

    switched$.subscribe(
      (bookInfo: BookInfo) => {
        this.bookInfo = bookInfo;
      },
      (error) => alert(error.message)
    );
  }

  showRating(): string {
    const stars = ['☆☆☆☆☆', '★☆☆☆☆', '★★☆☆☆', '★★★☆☆', '★★★★☆', '★★★★★'];
    return stars[this.bookInfo?.rating];
  }
}
