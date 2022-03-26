import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../models/player.model";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  @Input() players: Player[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
