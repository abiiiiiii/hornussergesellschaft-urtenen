import { Component, OnInit } from '@angular/core';
import {EventService} from "../../services/event.service";
import {ClubEvent} from "../../models/event.model";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  events: ClubEvent[] = [];

  constructor(private eventService: EventService) {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    })
  }

  ngOnInit(): void {
  }

}
