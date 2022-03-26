import { Component, OnInit } from '@angular/core';
import {BoardService} from "../../services/board.service";
import {Observable} from "rxjs";
import {BoardMember} from "../../models/board-member.model";

@Component({
  selector: 'app-playmaker',
  templateUrl: './playmaker.component.html',
  styleUrls: ['./playmaker.component.scss']
})
export class PlaymakerComponent implements OnInit {

  playmaker: BoardMember

  constructor(public boardService: BoardService) { }

  ngOnInit(): void {
     this.boardService.getPlaymaker().subscribe(playmaker => this.playmaker = playmaker);
  }

}
