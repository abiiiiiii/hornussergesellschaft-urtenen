import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../../shared/services/event.service";
import {ClubEvent} from "../../../../shared/models/event.model";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: ClubEvent[] = [];

  constructor(private eventService: EventService) {
    this.getEvents()
  }

  ngOnInit(): void {
    this.eventService.load$.subscribe(() => {
      this.getEvents()
    })
  }

  private getEvents(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    })
  }

}
