import {Component, OnInit} from '@angular/core';
import {BoardMember} from "../../../shared/models/board-member.model";
import {BoardService} from "../../../shared/services/board.service";
import {BoardRole} from "../../../shared/enums/board-role.enum";

@Component({
  selector: 'app-board-of-management',
  templateUrl: './board-of-management.component.html',
  styleUrls: ['./board-of-management.component.scss']
})
export class BoardOfManagementComponent implements OnInit {

  boardMembers: BoardMember[];

  constructor(private boardService: BoardService) {
  }

  ngOnInit(): void {
    this.boardService.getAllBoardMembers().subscribe(res => {
      const roles = Object.values(BoardRole);
      this.boardMembers =res.sort((a, b) => roles.indexOf(a.roles[0]) - roles.indexOf(b.roles[0]));
    })
  }

}
