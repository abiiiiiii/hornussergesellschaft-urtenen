import { Component, OnInit } from '@angular/core';
import { Team } from "../../shared/models/team.model";
import { TeamService } from "../../shared/services/team.service";
import { AuthService } from "../../core/services/auth.service";
import { AddResultComponent } from "./components/add-result/add-result.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-spielbetrieb',
  templateUrl: './spielbetrieb.component.html',
  styleUrls: ['./spielbetrieb.component.scss']
})
export class SpielbetriebComponent implements OnInit {

  teams: Team[] = [];

  constructor(private teamService: TeamService, public authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.teamService.load$.subscribe(() => {
      this.getTeams();
    })
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
