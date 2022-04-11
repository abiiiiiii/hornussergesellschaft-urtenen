import { Component, OnInit } from '@angular/core';
import { Team } from "../../shared/models/team.model";
import { Player } from "../../shared/models/player.model";
import { Game } from "../../shared/models/game.model";
import { GameMode } from "../../shared/enums/game-mode.enum";
import { TeamService } from "../../shared/services/team.service";
import { GameService } from "../../shared/services/game.service";
import { AuthService } from "../../core/services/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { AddResultComponent } from "../../shared/components/add-result/add-result.component";
import {docChanges} from "@angular/fire/firestore";

@Component({
  selector: 'app-spielbetrieb',
  templateUrl: './spielbetrieb.component.html',
  styleUrls: ['./spielbetrieb.component.scss']
})
export class SpielbetriebComponent implements OnInit {

  teams: Team[] = [];

  constructor(private teamService: TeamService, public authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getAllTeams().subscribe(teams => {
      this.teams = teams;
    })
  }

  addResult() {
    this.dialog.open(AddResultComponent, { data: { teams: this.teams, game: undefined } }).afterClosed().subscribe(() => {
      this.getTeams();
    })
  }

  goTo(id: string) {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
}
