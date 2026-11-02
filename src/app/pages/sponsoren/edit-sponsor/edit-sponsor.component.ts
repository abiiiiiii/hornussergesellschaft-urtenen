import { Component, Inject, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Sponsor } from '../../../shared/models/sponsor.model';
import { SponsorType } from '../../../shared/enums/sponsor-type.enum';
import { SponsorService } from '../../../shared/services/sponsor.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { resizeImage } from '../../../shared/utils/image-utils';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface SponsorDialogData {
  sponsor?: Sponsor;
  defaultType?: SponsorType;
}

@Component({
  selector: 'app-edit-sponsor',
  templateUrl: './edit-sponsor.component.html',
  styleUrls: ['./edit-sponsor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class EditSponsorComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly sponsorService = inject(SponsorService);
  private readonly notificationService = inject(NotificationService);
  public readonly dialogRef = inject(MatDialogRef<EditSponsorComponent>);

  readonly sponsorTypes = [
    { value: SponsorType.MAIN_SPONSOR, label: 'Hauptsponsor' },
    { value: SponsorType.SPONSOR, label: 'Sponsor' }
  ];

  sponsorForm!: FormGroup;
  isSaving = false;
  imageFile?: File;
  imagePreviewUrl?: string;
  errorMessage = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: SponsorDialogData) {}

  get isEdit(): boolean {
    return !!this.data?.sponsor?.id;
  }

  ngOnInit(): void {
    const s = this.data?.sponsor;
    this.sponsorForm = this.fb.group({
      name: [s?.name || '', [Validators.required]],
      type: [s?.type || this.data?.defaultType || SponsorType.SPONSOR, [Validators.required]],
      url: [s?.url || ''],
      description: [s?.description || ''],
      street: [s?.street || ''],
      postalCode: [s?.postalCode || null],
      city: [s?.city || ''],
      email: [s?.email || '', [Validators.email]],
      phoneNumber: [s?.phoneNumber || ''],
      order: [s?.order ?? 10]
    });

    if (s?.image) {
      this.sponsorService.getSponsorImage(s.image).subscribe(url => {
        this.imagePreviewUrl = url;
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Nur Bilddateien (JPEG, PNG, GIF, SVG, WebP) sind erlaubt.';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.errorMessage = 'Das Bild darf maximal 5 MB gross sein.';
      return;
    }

    this.errorMessage = '';
    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async save(): Promise<void> {
    if (this.sponsorForm.invalid) {
      this.sponsorForm.markAllAsTouched();
      this.errorMessage = 'Bitte fülle alle erforderlichen Felder korrekt aus.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    try {
      let imageName = this.data?.sponsor?.image || '';

      if (this.imageFile) {
        // Client-side resize before uploading (unless SVG)
        const processedFile = await resizeImage(this.imageFile, 800, 600, 0.85);
        imageName = await this.sponsorService.uploadLogo(processedFile).toPromise() as string;

        // If replacing an existing image, clean up old one
        if (this.isEdit && this.data.sponsor?.image && this.data.sponsor.image !== imageName) {
          this.sponsorService.deleteLogo(this.data.sponsor.image).subscribe();
        }
      }

      const formVal = this.sponsorForm.value;
      const sponsorData: Sponsor = {
        name: formVal.name.trim(),
        type: formVal.type,
        url: formVal.url?.trim() || '',
        image: imageName,
        description: formVal.description?.trim() || '',
        street: formVal.street?.trim() || '',
        postalCode: formVal.postalCode ? Number(formVal.postalCode) : undefined,
        city: formVal.city?.trim() || '',
        email: formVal.email?.trim() || '',
        phoneNumber: formVal.phoneNumber || '',
        order: formVal.order != null ? Number(formVal.order) : 10
      };

      if (this.isEdit) {
        sponsorData.id = this.data.sponsor!.id;
        await this.sponsorService.updateSponsor(sponsorData).toPromise();
        this.notificationService.showSuccess(`Sponsor "${sponsorData.name}" erfolgreich aktualisiert.`);
      } else {
        await this.sponsorService.createSponsor(sponsorData).toPromise();
        this.notificationService.showSuccess(`Sponsor "${sponsorData.name}" erfolgreich erstellt.`);
      }

      this.sponsorService.load$.next();
      this.dialogRef.close(true);
    } catch (err: any) {
      console.error('Error saving sponsor:', err);
      this.errorMessage = 'Fehler beim Speichern des Sponsors. Bitte versuche es erneut.';
    } finally {
      this.isSaving = false;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
