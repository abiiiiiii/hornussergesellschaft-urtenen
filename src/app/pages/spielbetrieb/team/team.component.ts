import {Component, Input, OnInit} from '@angular/core';
import {Team} from "../../../shared/models/team.model";
import {Game} from "../../../shared/models/game.model";
import {TeamService} from "../../../shared/services/team.service";
import {GameService} from "../../../shared/services/game.service";
import {GameMode} from "../../../shared/enums/game-mode.enum";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input() team?: Team;

  championship: Game[] = [];
  festivals: Game[] = [];
  smallEvent: Game[] = [];
  groupChampionship: Game[] = [];
  testGame: Game[] = [];
  imageUrl = "";

  constructor(private teamService: TeamService, private gameService: GameService) {
  }

  ngOnInit(): void {
    if (this.team) {
      this.team.games.forEach(gameId => {
        this.gameService.getGame(gameId).subscribe(game => {
          if (game) {
            game.id = gameId;
            if (game.mode === GameMode.CHAMPIONSHIP) {
              this.championship.push(game)
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

      this.teamService.getTeamImage(this.team.image).subscribe(res => {
        this.imageUrl = res;
      });
    }
  }

  sortResults() {
    this.championship.sort(TeamComponent.sort)
    this.groupChampionship.sort(TeamComponent.sort)
    this.festivals.sort(TeamComponent.sort)
    this.smallEvent.sort(TeamComponent.sort)
    this.testGame.sort(TeamComponent.sort)
  }

  hasNoResults(): boolean {
    return this.championship.length == 0 &&
      this.groupChampionship.length == 0 &&
      this.festivals.length == 0 &&
      this.smallEvent.length == 0 &&
      this.testGame.length == 0
  }

  private static sort(a: Game, b: Game) {
    return b.createdAt - a.createdAt;
  }
}
