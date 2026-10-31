import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { Donator } from '../../../shared/models/donator.model';
import { DonatorService } from '../../../shared/services/donator.service';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { EditDonatorComponent } from './edit-donator/edit-donator.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-donatoren',
  templateUrl: './donatoren.component.html',
  styleUrls: ['./donatoren.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatIconModule, MatDialogModule, AsyncPipe]
})
export class DonatorenComponent implements OnInit, OnDestroy {
  public readonly authService = inject(AuthService);
  public readonly donatorService = inject(DonatorService);
  private readonly notificationService = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  companyDonators: Donator[] = [];
  privateDonators: Donator[] = [];
  private sub = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.donatorService.load$.subscribe(() => {
        this.loadDonators();
      })
    );
  }

  loadDonators(): void {
    this.donatorService.getDonators().subscribe(donators => {
      this.companyDonators = donators.filter(d => d.category === 'COMPANY');
      this.privateDonators = donators.filter(d => d.category === 'PRIVATE');
    });
  }

  getImageUrl(fileName?: string): Observable<string> {
    return this.donatorService.getDonatorImage(fileName || '');
  }

  addDonator(category: 'COMPANY' | 'PRIVATE' = 'COMPANY'): void {
    this.dialog.open(EditDonatorComponent, {
      data: { defaultCategory: category },
      width: '550px',
      maxWidth: '95vw'
    });
  }

  editDonator(donator: Donator): void {
    this.dialog.open(EditDonatorComponent, {
      data: { donator },
      width: '550px',
      maxWidth: '95vw'
    });
  }

  deleteDonator(donator: Donator): void {
    if (!donator.id) {
      return;
    }

    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Donator löschen',
        message: `Möchtest du den Donator "${donator.name}" wirklich unwiderruflich löschen?`,
        confirmText: 'Löschen',
        cancelText: 'Abbrechen',
        isDestructive: true
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.donatorService.deleteDonator(donator.id!, donator.image).subscribe({
          next: () => {
            this.notificationService.showSuccess(`Donator "${donator.name}" wurde gelöscht.`);
            this.donatorService.load$.next();
          },
          error: (err) => {
            console.error('Delete donator error:', err);
            this.notificationService.showError('Fehler beim Löschen des Donators.');
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
