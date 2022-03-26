import {Component, OnInit} from '@angular/core';
import {BoardMember} from "../../models/board-member.model";
import {BoardService} from "../../services/board.service";

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
      this.boardMembers = res;
    })
  }

}
