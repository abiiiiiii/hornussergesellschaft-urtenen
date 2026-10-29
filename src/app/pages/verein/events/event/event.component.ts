import {Component, Input, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {NewsService} from "../../../../shared/services/news.service";
import {Observable} from "rxjs";
import {ClubEvent} from "../../../../shared/models/event.model";
import {EventService} from "../../../../shared/services/event.service";
import {AuthService} from "../../../../core/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {EditClubEventComponent} from "./edit-club-event/edit-club-event.component";
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIcon, AsyncPipe, DatePipe]
})
export class EventComponent implements OnInit {

  @Input() event: ClubEvent;
  flyerUrl$: Observable<string>;
  imageUrl$: Observable<string>;

  private readonly eventService = inject(EventService);
  private readonly newsService = inject(NewsService);
  public readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.imageUrl$ = this.newsService.getNewsImage(this.event.image);
    if (this.event.flyer) {
      this.flyerUrl$ = this.newsService.getNewsFile(this.event.flyer);
    }
  }

  delete() {
    this.event.active = false;
    this.eventService.updateEvent(this.event).subscribe(() => this.eventService.load$.next(undefined));
  }

  edit() {
    this.dialog.open(EditClubEventComponent, { data: this.event});
  }
}
