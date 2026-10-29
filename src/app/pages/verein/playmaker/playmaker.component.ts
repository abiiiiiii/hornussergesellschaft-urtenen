import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BoardService } from 'src/app/shared/services/board.service';
import {BoardMember} from "../../../shared/models/board-member.model";
import { BoardMemberComponent } from '../board-member/board-member.component';

@Component({
    selector: 'app-playmaker',
    templateUrl: './playmaker.component.html',
    styleUrls: ['./playmaker.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [BoardMemberComponent]
})
export class PlaymakerComponent implements OnInit {

  playmaker: BoardMember

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
     this.boardService.getPlaymaker().subscribe(playmaker => this.playmaker = playmaker);
  }

}
