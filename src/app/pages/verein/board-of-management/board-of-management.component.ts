import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { BoardMember } from "../../../shared/models/board-member.model";
import { BoardService } from "../../../shared/services/board.service";
import { AuthService } from "../../../core/services/auth.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { BoardMemberComponent } from '../board-member/board-member.component';
import { EditBoardMemberComponent } from '../edit-board-member/edit-board-member.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-of-management',
  templateUrl: './board-of-management.component.html',
  styleUrls: ['./board-of-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BoardMemberComponent, MatIconModule, MatDialogModule]
})
export class BoardOfManagementComponent implements OnInit, OnDestroy {
  public readonly authService = inject(AuthService);
  private readonly boardService = inject(BoardService);
  private readonly notificationService = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  boardMembers: BoardMember[] = [];
  private sub = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.boardService.loadBoard$.subscribe(() => {
        this.loadMembers();
      })
    );
  }

  loadMembers(): void {
    this.boardService.getAllBoardMembers().subscribe(res => {
      this.boardMembers = res;
    });
  }

  addMember(): void {
    this.dialog.open(EditBoardMemberComponent, {
      data: { target: 'board' },
      width: '550px',
      maxWidth: '95vw'
    });
  }

  editMember(member: BoardMember): void {
    this.dialog.open(EditBoardMemberComponent, {
      data: { member, target: 'board' },
      width: '550px',
      maxWidth: '95vw'
    });
  }

  deleteMember(member: BoardMember): void {
    if (!member.id) return;

    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Vorstandsmitglied entfernen',
        message: `Möchtest du "${member.preName} ${member.name}" wirklich aus dem Vorstand entfernen?`,
        confirmText: 'Entfernen',
        cancelText: 'Abbrechen',
        isDestructive: true
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.boardService.deleteMember(member.id!, 'board', member.image).subscribe({
          next: () => {
            this.notificationService.showSuccess(`"${member.preName} ${member.name}" wurde entfernt.`);
            this.boardService.loadBoard$.next();
          },
          error: (err) => {
            console.error('Delete board member error:', err);
            this.notificationService.showError('Fehler beim Entfernen des Vorstandsmitglieds.');
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
