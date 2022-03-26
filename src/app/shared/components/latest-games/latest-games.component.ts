import { Component, OnInit } from '@angular/core';
import {Game} from "../../models/game.model";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-latest-games',
  templateUrl: './latest-games.component.html',
  styleUrls: ['./latest-games.component.scss']
})
export class LatestGamesComponent implements OnInit {

  games: Game[] = []

  constructor(private  gameService: GameService) {
    this.gameService.getLatestGames().subscribe(res => {
      res.forEach(doc => {
        let game = doc.data() as Game;
        game.id = doc.id
        this.games.push(game);
      })
    })
  }

  ngOnInit(): void {
  }

}
