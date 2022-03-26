import {AfterContentInit, AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {NewsService} from "../../shared/services/news.service";
import {News} from "../../shared/models/news.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AddNewsComponent} from "../../shared/components/add-news/add-news.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('title') title?: ElementRef<HTMLElement>

  news: News[] = [];

  constructor(private newsService: NewsService, public authService: AuthService, private dialog: MatDialog, private router: Router) {
    this.getNews();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      let headerHeight = document.getElementById('header')?.getBoundingClientRect().height
      if (headerHeight && window.scrollY == 0) {
        window.scrollBy(0, headerHeight - 150);
      }
    }, 100)
  }

  getNews() {
    this.newsService.getAllNews().subscribe(docs => {
      docs.forEach(doc => {
        let news = doc.data() as News;
        news.id = doc.id;
        this.news.push(news);
      })
    })
  }

  addNews() {
    this.dialog.open(AddNewsComponent, {data: {showEventCheckbox: true, isEvent: false}}).afterClosed().subscribe(() => {
      this.news = [];
      this.getNews();
    })
  }
}
