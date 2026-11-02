import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from "rxjs";
import { BoardMember } from "../../../shared/models/board-member.model";
import { BoardService } from "../../../shared/services/board.service";
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-board-member',
  templateUrl: './board-member.component.html',
  styleUrls: ['./board-member.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AsyncPipe, MatIconModule]
})
export class BoardMemberComponent implements OnInit, OnChanges {
  @Input() member?: BoardMember;
  @Input() canEdit = false;

  @Output() edit = new EventEmitter<BoardMember>();
  @Output() delete = new EventEmitter<BoardMember>();

  image$: Observable<string> = of('');

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.loadImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member']) {
      this.loadImage();
    }
  }

  private loadImage(): void {
    if (this.member?.image) {
      this.image$ = this.boardService.getBoardMemberImage(this.member.image);
    } else {
      this.image$ = of('');
    }
  }

  onEdit(): void {
    if (this.member) {
      this.edit.emit(this.member);
    }
  }

  onDelete(): void {
    if (this.member) {
      this.delete.emit(this.member);
    }
  }
}
