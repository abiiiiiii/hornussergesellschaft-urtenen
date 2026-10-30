import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from "rxjs";
import {FileService} from "../../../shared/services/file.service";
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-history',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AsyncPipe]
})
export class TimelineComponent implements OnInit {

  timeline$: Observable<string>

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.timeline$ = this.fileService.getFile('chronik.pdf');
  }

}
