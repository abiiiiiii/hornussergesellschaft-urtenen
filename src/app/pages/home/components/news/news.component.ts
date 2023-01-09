import {Component, Input, OnInit} from '@angular/core';
import {News} from "../../../../shared/models/news.model";
import {NewsService} from "../../../../shared/services/news.service";
import {Observable} from "rxjs";
import {ClubEvent} from "../../../../shared/models/event.model";
import {EventService} from "../../../../shared/services/event.service";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {EditNewsComponent} from "../edit-news/edit-news.component";
import {AuthService} from "../../../../core/services/auth.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() news: News;
  flyerUrl$: Observable<string>;
  imageUrl$: Observable<string>;

  constructor(private newsService: NewsService, private dialog: MatDialog, public authService: AuthService) {
  }

  ngOnInit() {
    this.imageUrl$ = this.newsService.getNewsImage(this.news.image)
    if (this.news.flyer) {
      this.flyerUrl$ = this.newsService.getNewsFile(this.news.flyer);
    }
  }

  delete() {
    this.news.active = false;
    this.newsService.updateNews(this.news).subscribe(() => {
      this.newsService.load$.next(undefined);
    })
  }

  edit() {
    this.dialog.open(EditNewsComponent, { data: this.news})
  }
}
