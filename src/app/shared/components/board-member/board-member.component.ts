import {Component, Input, OnInit} from '@angular/core';
import {BoardMember} from "../../models/board-member.model";
import {Observable} from "rxjs";
import {BoardService} from "../../services/board.service";

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
