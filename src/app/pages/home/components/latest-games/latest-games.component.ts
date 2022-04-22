import { Component, OnInit } from '@angular/core';
import { Game } from "../../../../shared/models/game.model";
import { GameService } from "../../../../shared/services/game.service";

@Component({
  selector: 'app-latest-games',
  templateUrl: './latest-games.component.html',
  styleUrls: ['./latest-games.component.scss']
})
export class LatestGamesComponent implements OnInit {

  games: Game[] = []

  constructor(private gameService: GameService) {
    this.gameService.getLatestGames().subscribe(res => {
      this.games = res;
    })
  }

  ngOnInit(): void {
  }

}
