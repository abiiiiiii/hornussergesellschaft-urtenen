import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BoardMember} from "../../../shared/models/board-member.model";
import {BoardService} from "../../../shared/services/board.service";

@Component({
  selector: 'app-board-member',
  templateUrl: './board-member.component.html',
  styleUrls: ['./board-member.component.scss']
})
export class BoardMemberComponent implements OnInit {

  @Input() member: BoardMember;
  image$: Observable<string>;

  constructor(private boardService: BoardService) {
  }

  ngOnInit(): void {
    this.image$ = this.boardService.getBoardMemberImage(this.member.image);

  }

}
