import {Component, Input, OnInit} from '@angular/core';
import {News} from "../../models/news.model";
import {NewsService} from "../../services/news.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() news: News;
  flyerUrl$: Observable<string>;
  imageUrl$: Observable<string>;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.imageUrl$ = this.newsService.getNewsImage(this.news.image)
    if (this.news.flyer) {
      this.flyerUrl$ = this.newsService.getNewsFile(this.news.flyer);
    }

  }
}
