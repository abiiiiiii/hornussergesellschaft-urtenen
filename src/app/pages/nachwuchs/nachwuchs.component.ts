import {Component, ChangeDetectionStrategy, inject} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {AddResultComponent} from "../../shared/components/result/add-result/add-result.component";
import {TeamService} from "../../shared/services/team.service";
import {MatDialog} from "@angular/material/dialog";
import {Team} from "../../shared/models/team.model";
import {YOUTH_TEAM_NAME} from "../../core/constants";
import { MatIcon } from '@angular/material/icon';
import { TeamComponent } from '../spielbetrieb/team/team.component';

@Component({
    selector: 'app-nachwuchs',
    templateUrl: './nachwuchs.component.html',
    styleUrl: './nachwuchs.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIcon, TeamComponent]
})
export class NachwuchsComponent {

  private readonly teamService = inject(TeamService);
  public readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  youthTeam: Team;

  constructor() {
    this.loadYouthTeam();
  }

  addResult() {
    this.dialog.open(AddResultComponent, {data: {teams: [this.youthTeam], game: undefined}}).afterClosed().subscribe(() => {
      this.loadYouthTeam();
    });
  }

  private loadYouthTeam() {
    this.teamService.getTeamByName(YOUTH_TEAM_NAME).subscribe(team => {
      this.youthTeam = team;
    });
  }
}
