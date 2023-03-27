import {Component, Input, OnInit} from '@angular/core';
import {News} from "../../../../shared/models/news.model";
import {NewsService} from "../../../../shared/services/news.service";
import {Observable} from "rxjs";
import {ClubEvent} from "../../../../shared/models/event.model";
import {EventService} from "../../../../shared/services/event.service";
import {AuthService} from "../../../../core/services/auth.service";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {EditClubEventComponent} from "../edit-club-event/edit-club-event.component";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: ClubEvent;
  flyerUrl$: Observable<string>;
  imageUrl$: Observable<string>;

  constructor(private eventService: EventService, private newsService: NewsService, public authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.imageUrl$ = this.newsService.getNewsImage(this.event.image)
    if (this.event.flyer) {
      this.flyerUrl$ = this.newsService.getNewsFile(this.event.flyer);
    }
  }

  delete() {
    this.event.active = false;
    this.eventService.updateEvent(this.event).subscribe(() => this.eventService.load$.next(undefined))
  }

  edit() {
    this.dialog.open(EditClubEventComponent, { data: this.event})
  }
}
