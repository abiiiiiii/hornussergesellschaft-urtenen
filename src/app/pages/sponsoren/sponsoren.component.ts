import { AfterViewInit, Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { Sponsor } from '../../shared/models/sponsor.model';
import { SponsorType } from '../../shared/enums/sponsor-type.enum';
import { SponsorService } from '../../shared/services/sponsor.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../shared/services/notification.service';
import { SponsorComponent } from '../../shared/components/sponsor/sponsor.component';
import { EditSponsorComponent } from './edit-sponsor/edit-sponsor.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sponsoren',
  templateUrl: './sponsoren.component.html',
  styleUrls: ['./sponsoren.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SponsorComponent, MatIconModule, MatDialogModule]
})
export class SponsorenComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly authService = inject(AuthService);
  private readonly sponsorService = inject(SponsorService);
  private readonly notificationService = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  donators: Sponsor[] = [];
  privateDonators: Sponsor[] = [];
  sponsors: Sponsor[] = [];
  mainSponsors: Sponsor[] = [];

  readonly SponsorType = SponsorType;

  private sub = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.sponsorService.load$.subscribe(() => {
        this.loadSponsors();
      })
    );
  }

  loadSponsors(): void {
    this.sponsorService.getSponsorsByType(SponsorType.MAIN_SPONSOR).subscribe(sponsors => {
      this.mainSponsors = sponsors;
    });
    this.sponsorService.getSponsorsByType(SponsorType.SPONSOR).subscribe(sponsors => {
      this.sponsors = sponsors;
    });
    this.sponsorService.getSponsorsByType(SponsorType.DONATOR).subscribe(sponsors => {
      this.donators = sponsors;
    });
    this.sponsorService.getSponsorsByType(SponsorType.PRIVATE_DONATOR).subscribe(sponsors => {
      this.privateDonators = sponsors;
    });
  }

  addSponsor(defaultType: SponsorType = SponsorType.SPONSOR): void {
    this.dialog.open(EditSponsorComponent, {
      data: { defaultType },
      width: '600px',
      maxWidth: '95vw'
    });
  }

  editSponsor(sponsor: Sponsor): void {
    this.dialog.open(EditSponsorComponent, {
      data: { sponsor },
      width: '600px',
      maxWidth: '95vw'
    });
  }

  deleteSponsor(sponsor: Sponsor): void {
    if (!sponsor.id) {
      return;
    }

    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Sponsor löschen',
        message: `Möchtest du den Sponsor "${sponsor.name}" wirklich unwiderruflich löschen?`,
        confirmText: 'Löschen',
        cancelText: 'Abbrechen',
        isDestructive: true
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.sponsorService.deleteSponsor(sponsor.id!, sponsor.image).subscribe({
          next: () => {
            this.notificationService.showSuccess(`Sponsor "${sponsor.name}" wurde gelöscht.`);
            this.sponsorService.load$.next();
          },
          error: (err) => {
            console.error('Delete sponsor error:', err);
            this.notificationService.showError('Fehler beim Löschen des Sponsors.');
          }
        });
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const headerHeight = document.getElementById('header')?.getBoundingClientRect().height;
      if (headerHeight && window.scrollY === 0) {
        window.scrollBy(0, headerHeight);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
