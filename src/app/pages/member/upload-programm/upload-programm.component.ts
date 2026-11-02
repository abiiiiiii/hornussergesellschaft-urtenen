import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProgrammService } from '../../../shared/services/programm.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

export type ProgrammType = 'jahresprogramm' | 'nachwuchs';

export interface UploadProgrammData {
  type: ProgrammType;
}

@Component({
  selector: 'app-upload-programm',
  templateUrl: './upload-programm.component.html',
  styleUrls: ['./upload-programm.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatProgressSpinner]
})
export class UploadProgrammComponent {
  file: File | null = null;
  isUploading = false;
  showValidationError = false;
  showUploadError = false;

  get title(): string {
    return this.data.type === 'jahresprogramm'
      ? 'Jahresprogramm aktualisieren'
      : 'Nachwuchs Jahresprogramm aktualisieren';
  }

  constructor(
    private dialogRef: MatDialogRef<UploadProgrammComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadProgrammData,
    private programmService: ProgrammService
  ) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.showValidationError = false;
    } else {
      this.file = null;
    }
  }

  upload(): void {
    if (!this.file) {
      this.showValidationError = true;
      return;
    }

    this.isUploading = true;
    this.showUploadError = false;

    const upload$ = this.data.type === 'jahresprogramm'
      ? this.programmService.uploadJahresprogramm(this.file)
      : this.programmService.uploadNachwuchsJahresprogramm(this.file);

    upload$.subscribe({
      next: () => {
        this.isUploading = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.isUploading = false;
        this.showUploadError = true;
      }
    });
  }
}

