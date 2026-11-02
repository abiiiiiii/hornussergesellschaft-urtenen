import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { BoardService } from 'src/app/shared/services/board.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { BoardMember } from '../../../shared/models/board-member.model';
import { BoardMemberComponent } from '../board-member/board-member.component';
import { EditBoardMemberComponent } from '../edit-board-member/edit-board-member.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playmaker',
  templateUrl: './playmaker.component.html',
  styleUrls: ['./playmaker.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [BoardMemberComponent, MatIconModule, MatDialogModule]
})
export class PlaymakerComponent implements OnInit, OnDestroy {
  public readonly authService = inject(AuthService);
  public readonly boardService = inject(BoardService);
  private readonly notificationService = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  playmakers: BoardMember[] = [];
  playmaker?: BoardMember;
  private sub = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.boardService.loadPlaymaker$.subscribe(() => {
        this.loadPlaymakers();
      })
    );
  }

  loadPlaymakers(): void {
    this.boardService.getAllPlaymakers().subscribe(playmakers => {
      this.playmakers = playmakers;
      this.playmaker = playmakers[0];
    });
  }

  addPlaymaker(): void {
    this.dialog.open(EditBoardMemberComponent, {
      data: { target: 'playmaker', defaultRole: 'Spielabmacher' },
      width: '550px',
      maxWidth: '95vw'
    });
  }

  editPlaymaker(member: BoardMember): void {
    this.dialog.open(EditBoardMemberComponent, {
      data: { member, target: 'playmaker' },
      width: '550px',
      maxWidth: '95vw'
    });
  }

  deletePlaymaker(member: BoardMember): void {
    if (!member.id) return;

    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Spielabmacher entfernen',
        message: `Möchtest du "${member.preName} ${member.name}" wirklich löschen?`,
        confirmText: 'Löschen',
        cancelText: 'Abbrechen',
        isDestructive: true
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.boardService.deleteMember(member.id!, 'playmaker', member.image).subscribe({
          next: () => {
            this.notificationService.showSuccess(`Spielabmacher "${member.preName} ${member.name}" wurde gelöscht.`);
            this.boardService.loadPlaymaker$.next();
          },
          error: (err) => {
            console.error('Delete playmaker error:', err);
            this.notificationService.showError('Fehler beim Löschen des Spielabmachers.');
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
