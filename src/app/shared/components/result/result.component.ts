import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../models/game.model";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit{

  @Input() game: Game;
  @Input() showReport = true;
  report$: Observable<any>;

  constructor(private gameService: GameService ) {
  }

  ngOnInit() {
    if (this.game.reportFile) {
      this.report$ = this.gameService.getGameReport(this.game.reportFile);
    }
  }
}
