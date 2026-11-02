import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, inject } from '@angular/core';
import { Team } from "../../../shared/models/team.model";
import { Game } from "../../../shared/models/game.model";
import { TeamService } from "../../../shared/services/team.service";
import { GameService } from "../../../shared/services/game.service";
import { AuthService } from "../../../core/services/auth.service";
import { GameMode } from "../../../shared/enums/game-mode.enum";
import { NgIf, NgSwitch, NgFor } from '@angular/common';
import { TeamListComponent } from '../team-list/team-list.component';
import { ResultComponent } from '../../../shared/components/result/result.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NgIf, TeamListComponent, NgSwitch, NgFor, ResultComponent, MatButtonModule, MatIconModule]
})
export class TeamComponent implements OnInit, OnChanges {
  @Input() team?: Team;

  public readonly authService = inject(AuthService);
  private readonly teamService = inject(TeamService);
  private readonly gameService = inject(GameService);
  private readonly dialog = inject(MatDialog);

  championship: Game[] = [];
  festivals: Game[] = [];
  smallEvent: Game[] = [];
  groupChampionship: Game[] = [];
  testGame: Game[] = [];
  imageUrl = '';

  ngOnInit(): void {
    this.initTeam();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['team'] && !changes['team'].firstChange) {
      this.initTeam();
    }
  }

  private initTeam(): void {
    if (!this.team) return;

    this.championship = [];
    this.festivals = [];
    this.smallEvent = [];
    this.groupChampionship = [];
    this.testGame = [];

    (this.team.games || []).forEach(gameId => {
      this.gameService.getGame(gameId).subscribe(game => {
        if (game) {
          game.id = gameId;
          if (game.mode === GameMode.CHAMPIONSHIP) {
            this.championship.push(game);
          } else if (game.mode === GameMode.TEST_GAME) {
            this.testGame.push(game);
          } else if (game.mode === GameMode.SMALL_EVENT) {
            this.smallEvent.push(game);
          } else if (game.mode === GameMode.GROUP_CHAMPIONSHIP) {
            this.groupChampionship.push(game);
          } else if (game.mode === GameMode.FESTIVAL) {
            this.festivals.push(game);
          }
          this.sortResults();
        }
      });
    });

    if (this.team.image) {
      this.teamService.getTeamImage(this.team.image).subscribe(res => {
        this.imageUrl = res;
      });
    }
  }

  editTeam(): void {
    if (!this.team) return;
    this.dialog.open(EditTeamComponent, {
      data: { team: this.team },
      width: '650px',
      maxWidth: '95vw'
    });
  }

  sortResults() {
    this.championship.sort(TeamComponent.sort);
    this.groupChampionship.sort(TeamComponent.sort);
    this.festivals.sort(TeamComponent.sort);
    this.smallEvent.sort(TeamComponent.sort);
    this.testGame.sort(TeamComponent.sort);
  }

  hasNoResults(): boolean {
    return this.championship.length == 0 &&
      this.groupChampionship.length == 0 &&
      this.festivals.length == 0 &&
      this.smallEvent.length == 0 &&
      this.testGame.length == 0;
  }

  private static sort(a: Game, b: Game) {
    return b.createdAt - a.createdAt;
  }
}
