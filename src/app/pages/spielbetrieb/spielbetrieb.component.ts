import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Team } from "../../shared/models/team.model";
import { TeamService } from "../../shared/services/team.service";
import { AuthService } from "../../core/services/auth.service";
import { AddResultComponent } from "../../shared/components/result/add-result/add-result.component";
import { MatDialog } from "@angular/material/dialog";
import { MatIcon } from '@angular/material/icon';
import { TeamComponent } from './team/team.component';

@Component({
    selector: 'app-spielbetrieb',
    templateUrl: './spielbetrieb.component.html',
    styleUrls: ['./spielbetrieb.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIcon, TeamComponent]
})
export class SpielbetriebComponent implements OnInit {

  private readonly teamService = inject(TeamService);
  public readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  teams: Team[] = [];

  ngOnInit(): void {
    this.teamService.load$.subscribe(() => {
      this.getTeams();
    });
  }

  getTeams(): void {
    this.teamService.getSeniorTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  addResult() {
    this.dialog.open(AddResultComponent, { data: { teams: this.teams, game: undefined } }).afterClosed().subscribe(() => {
      this.getTeams();
    });
  }

  goTo(id: string) {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
}
