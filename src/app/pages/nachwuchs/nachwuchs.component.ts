import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {AddResultComponent} from "../../shared/components/result/add-result/add-result.component";
import {TeamService} from "../../shared/services/team.service";
import {MatDialog} from "@angular/material/dialog";
import {Team} from "../../shared/models/team.model";
import {AppModule} from "../../app.module";
import {YOUTH_TEAM_NAME} from "../../core/constants";

@Component({
  selector: 'app-nachwuchs',
  templateUrl: './nachwuchs.component.html',
  styleUrl: './nachwuchs.component.scss'
})
export class NachwuchsComponent {

  youthTeam: Team;

  constructor(private teamService: TeamService, public authService: AuthService, private dialog: MatDialog) {
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
    })
  }
}
