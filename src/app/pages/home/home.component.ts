import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from "../../core/services/auth.service";
import { NewsService } from "../../shared/services/news.service";
import { News } from "../../shared/models/news.model";
import { Router } from "@angular/router";
import { AddNewsComponent } from "./news/add-news/add-news.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @ViewChild('title') title?: ElementRef<HTMLElement>

  news: News[] = [];

  constructor(private newsService: NewsService, public authService: AuthService, private dialog: MatDialog) {
    this.newsService.load$.subscribe(() => {
      this.getNews();
    })
  }

  getNews() {
    this.newsService.getAllNews().subscribe(news => {
      this.news = news;
    })
  }

  addNews() {
    this.dialog.open(AddNewsComponent);
  }
}
