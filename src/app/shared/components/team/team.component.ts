import {Component, Input, OnInit} from '@angular/core';
import {Team} from "../../models/team.model";
import {Game} from "../../models/game.model";
import {GameMode} from "../../enums/game-mode.enum";
import {TeamService} from "../../services/team.service";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  @Input() team?: Team ;

  championship: Game[] = [];
  festivals: Game[] = [];
  smallEvent: Game[] = [];
  groupChampionship: Game[] = [];
  testGame: Game[] = [];
  imageUrl = "";

  constructor(private teamService: TeamService, private gameService: GameService) { }

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
          }
        });
      });
      this.teamService.getTeamImage(this.team.image).subscribe(res => {
        this.imageUrl = res;
      });
    }
  }

}