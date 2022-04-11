import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../services/game.service";
import {Observable} from "rxjs";
import {Location} from "@angular/common";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {

  homeList$: Observable<string>;
  awayList$: Observable<string>;

  constructor(private route: ActivatedRoute, private gameService: GameService, private location: Location) {
    this.route.params.subscribe(params => {
      this.gameService.getGame(params.id).subscribe(game => {
        if (game) {
          this.homeList$ = this.gameService.getGameList(game.homeList)
          if (game.awayList) {
            this.awayList$ = this.gameService.getGameList(game.awayList);
          }
        } else {
          this.location.back();
        }
      })
    })
  }

  back() {
    this.location.back();
  }
}
