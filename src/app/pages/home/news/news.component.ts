import {Component, Input, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {News} from "../../../shared/models/news.model";
import {NewsService} from "../../../shared/services/news.service";
import {AuthService} from "../../../core/services/auth.service";
import {EditNewsComponent} from "./edit-news/edit-news.component";
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIcon, AsyncPipe]
})
export class NewsComponent implements OnInit {

  @Input() news: News;
  flyerUrl$: Observable<string>;
  imageUrl$: Observable<string>;

  private readonly newsService = inject(NewsService);
  private readonly dialog = inject(MatDialog);
  public readonly authService = inject(AuthService);

  ngOnInit() {
    this.imageUrl$ = this.newsService.getNewsImage(this.news.image);
    if (this.news.flyer) {
      this.flyerUrl$ = this.newsService.getNewsFile(this.news.flyer);
    }
  }

  delete() {
    this.news.active = false;
    this.newsService.updateNews(this.news).subscribe(() => {
      this.newsService.load$.next(undefined);
    });
  }

  edit() {
    this.dialog.open(EditNewsComponent, { data: this.news});
  }
}
