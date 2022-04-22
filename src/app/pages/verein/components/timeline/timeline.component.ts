import { Component, OnInit } from '@angular/core';
import {FileService} from "../../../../shared/services/file.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  timeline$: Observable<string>

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.timeline$ = this.fileService.getFile('chronik.pdf');
  }

}
