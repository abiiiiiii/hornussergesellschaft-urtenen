import {Component, Input, OnInit} from '@angular/core';
import {News} from "../../models/news.model";
import {NewsService} from "../../services/news.service";
import {Observable} from "rxjs";
import {ClubEvent} from "../../models/event.model";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() content: News | ClubEvent;
  flyerUrl$: Observable<string>;
  imageUrl$: Observable<string>;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.imageUrl$ = this.newsService.getNewsImage(this.content.image)
    if (this.content.flyer) {
      this.flyerUrl$ = this.newsService.getNewsFile(this.content.flyer);
    }

  }
}
