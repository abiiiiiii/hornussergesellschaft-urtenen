import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";
import { NewsService } from "../../shared/services/news.service";
import { News } from "../../shared/models/news.model";
import { AddNewsComponent } from "./news/add-news/add-news.component";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from '@angular/material/icon';
import { NewsComponent } from './news/news.component';
import { MainSponsorsComponent } from './gold-sponsors/main-sponsors.component';
import { LatestGamesComponent } from './latest-games/latest-games.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIcon, NewsComponent, MainSponsorsComponent, LatestGamesComponent]
})
export class HomeComponent {

  @ViewChild('title') title?: ElementRef<HTMLElement>;

  private readonly newsService = inject(NewsService);
  public readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  news: News[] = [];

  constructor() {
    this.newsService.load$.subscribe(() => {
      this.getNews();
    });
  }

  getNews() {
    this.newsService.getAllNews().subscribe(news => {
      this.news = news;
    });
  }

  addNews() {
    this.dialog.open(AddNewsComponent);
  }
}
