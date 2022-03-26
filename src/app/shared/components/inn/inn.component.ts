import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-inn',
  templateUrl: './inn.component.html',
  styleUrls: ['./inn.component.scss']
})
export class InnComponent implements OnInit {

  image$: Observable<string>

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.image$ = this.fileService.getImage('inn/wirtschaft.jpeg');
  }

}
