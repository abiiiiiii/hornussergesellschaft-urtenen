import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../services/news.service";
import {News} from "../../models/news.model";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  events: News[] = [];

  constructor(private newsService: NewsService) {
    this.newsService.getAllEvents().subscribe(events => {
      events.forEach(doc => {
        let event = doc.data() as News;
        event.id = doc.id;
        this.events.push(event);
      })
    })
  }

  ngOnInit(): void {
  }

}
