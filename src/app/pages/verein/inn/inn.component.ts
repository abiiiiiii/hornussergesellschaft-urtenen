import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Observable} from "rxjs";
import {FileService} from "../../../shared/services/file.service";
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-inn',
    templateUrl: './inn.component.html',
    styleUrls: ['./inn.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AsyncPipe]
})
export class InnComponent implements OnInit {

  image$: Observable<string>

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.image$ = this.fileService.getImage('inn/wirtschaft.jpeg');
  }

}
