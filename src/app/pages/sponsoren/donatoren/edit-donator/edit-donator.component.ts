import { Component, Inject, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Donator, DonatorCategory } from '../../../../shared/models/donator.model';
import { DonatorService } from '../../../../shared/services/donator.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { resizeImage } from '../../../../shared/utils/image-utils';

export interface DonatorDialogData {
  donator?: Donator;
  defaultCategory?: DonatorCategory;
}

@Component({
  selector: 'app-edit-donator',
  templateUrl: './edit-donator.component.html',
  styleUrls: ['./edit-donator.component.scss'],
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
export class EditDonatorComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly donatorService = inject(DonatorService);
  private readonly notificationService = inject(NotificationService);
  public readonly dialogRef = inject(MatDialogRef<EditDonatorComponent>);

  readonly categories: { value: DonatorCategory; label: string }[] = [
    { value: 'COMPANY', label: 'Gewerbe / Firma' },
    { value: 'PRIVATE', label: 'Privatperson / Gönner' }
  ];

  donatorForm!: FormGroup;
  isSaving = false;
  imageFile?: File;
  imagePreviewUrl?: string;
  errorMessage = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DonatorDialogData) {}

  get isEdit(): boolean {
    return !!this.data?.donator?.id;
  }

  get isCompany(): boolean {
    return this.donatorForm?.get('category')?.value === 'COMPANY';
  }

  ngOnInit(): void {
    const d = this.data?.donator;
    this.donatorForm = this.fb.group({
      name: [d?.name || '', [Validators.required]],
      category: [d?.category || this.data?.defaultCategory || 'COMPANY', [Validators.required]],
      city: [d?.city || ''],
      url: [d?.url || ''],
      email: [d?.email || '', [Validators.email]],
      order: [d?.order ?? 10]
    });

    if (d?.image) {
      this.donatorService.getDonatorImage(d.image).subscribe(url => {
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
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.errorMessage = 'Nur Bilddateien sind erlaubt.';
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
    if (this.donatorForm.invalid) {
      this.donatorForm.markAllAsTouched();
      this.errorMessage = 'Bitte fülle alle erforderlichen Felder korrekt aus.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    try {
      let imageName = this.data?.donator?.image || '';

      if (this.imageFile && this.isCompany) {
        const processedFile = await resizeImage(this.imageFile, 800, 600, 0.85);
        imageName = await this.donatorService.uploadLogo(processedFile).toPromise() as string;

        if (this.isEdit && this.data.donator?.image && this.data.donator.image !== imageName) {
          this.donatorService.deleteLogo(this.data.donator.image).subscribe();
        }
      }

      const val = this.donatorForm.value;
      const donatorData: Donator = {
        name: val.name.trim(),
        category: val.category,
        city: val.city?.trim() || '',
        url: val.url?.trim() || '',
        email: val.email?.trim() || '',
        image: this.isCompany ? imageName : '',
        order: val.order != null ? Number(val.order) : 10
      };

      if (this.isEdit) {
        donatorData.id = this.data.donator!.id;
        await this.donatorService.updateDonator(donatorData).toPromise();
        this.notificationService.showSuccess(`Donator "${donatorData.name}" erfolgreich aktualisiert.`);
      } else {
        await this.donatorService.createDonator(donatorData).toPromise();
        this.notificationService.showSuccess(`Donator "${donatorData.name}" erfolgreich erstellt.`);
      }

      this.donatorService.load$.next();
      this.dialogRef.close(true);
    } catch (err) {
      console.error('Error saving donator:', err);
      this.errorMessage = 'Fehler beim Speichern des Donators.';
    } finally {
      this.isSaving = false;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
