import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../shared/models/player.model";
import {pluck} from "rxjs/operators";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  @Input() players: Player[] = [];

  constructor() {
  }

  ngOnInit() {
    this.players.sort(this.sortByName)
  }

  sortByName(a: Player, b: Player) {
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
  }
}
