import {Component, Input, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {Game} from "../../models/game.model";
import {Observable} from "rxjs";
import {GameService} from "../../services/game.service";
import {AuthService} from "../../../core/services/auth.service";
import {EditResultComponent} from "./edit-result/edit-result.component";
import {TeamService} from "../../services/team.service";
import {MatDialog} from "@angular/material/dialog";
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatIcon, AsyncPipe, DatePipe]
})
export class ResultComponent implements OnInit {

  @Input() game: Game;
  @Input() showReport = true;
  report$: Observable<any>;

  private readonly gameService = inject(GameService);
  public readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly teamService = inject(TeamService);

  ngOnInit() {
    if (this.game.reportFile) {
      this.report$ = this.gameService.getGameReport(this.game.reportFile);
    }
  }

  edit() {
    this.dialog.open(EditResultComponent, { data: this.game});
  }

  delete() {
    this.gameService.deleteGame(this.game.id).subscribe(() => {
        this.teamService.load$.next(undefined);
    });
  }
}
