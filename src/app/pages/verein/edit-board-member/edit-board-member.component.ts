import { Component, Inject, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BoardMember } from '../../../shared/models/board-member.model';
import { BoardRole } from '../../../shared/enums/board-role.enum';
import { BoardService } from '../../../shared/services/board.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { resizeImage } from '../../../shared/utils/image-utils';

export interface EditBoardMemberDialogData {
  member?: BoardMember;
  target: 'board' | 'playmaker';
  defaultRole?: string;
}

@Component({
  selector: 'app-edit-board-member',
  templateUrl: './edit-board-member.component.html',
  styleUrls: ['./edit-board-member.component.scss'],
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
export class EditBoardMemberComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly boardService = inject(BoardService);
  private readonly notificationService = inject(NotificationService);
  public readonly dialogRef = inject(MatDialogRef<EditBoardMemberComponent>);

  readonly availableRoles = Object.values(BoardRole);

  memberForm!: FormGroup;
  isSaving = false;
  imageFile?: File;
  imagePreviewUrl?: string;
  errorMessage = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditBoardMemberDialogData) {}

  get isEdit(): boolean {
    return !!this.data?.member?.id;
  }

  get targetTitle(): string {
    return this.data.target === 'playmaker' ? 'Spielabmacher' : 'Vorstandsmitglied';
  }

  ngOnInit(): void {
    const m = this.data?.member;
    const defaultRoles = m?.roles && m.roles.length > 0
      ? m.roles
      : (this.data.target === 'playmaker' ? [BoardRole.PLAYMAKER] : []);

    this.memberForm = this.fb.group({
      preName: [m?.preName || '', [Validators.required]],
      name: [m?.name || '', [Validators.required]],
      roles: [defaultRoles, [Validators.required]],
      email: [m?.email || '', [Validators.email]],
      phoneNumber: [m?.phoneNumber || ''],
      order: [m?.order ?? 10]
    });

    if (m?.image) {
      this.boardService.getBoardMemberImage(m.image).subscribe(url => {
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
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      this.errorMessage = 'Nur JPEG, PNG oder WebP Bilder sind erlaubt.';
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
    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      this.errorMessage = 'Bitte fülle alle erforderlichen Felder korrekt aus.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    try {
      let imageName = this.data?.member?.image || '';

      if (this.imageFile) {
        const processedFile = await resizeImage(this.imageFile, 600, 600, 0.85);
        imageName = await this.boardService.uploadMemberImage(processedFile).toPromise() as string;

        if (this.isEdit && this.data.member?.image && this.data.member.image !== imageName) {
          this.boardService.deleteMemberImage(this.data.member.image).subscribe();
        }
      }

      const val = this.memberForm.value;
      const memberData: BoardMember = {
        name: val.name.trim(),
        preName: val.preName.trim(),
        roles: Array.isArray(val.roles) ? val.roles : [val.roles],
        image: imageName,
        email: val.email?.trim() || '',
        phoneNumber: val.phoneNumber?.trim() || '',
        order: val.order != null ? Number(val.order) : 10
      };

      if (this.isEdit) {
        memberData.id = this.data.member!.id;
        await this.boardService.updateMember(memberData, this.data.target).toPromise();
        this.notificationService.showSuccess(`${this.targetTitle} "${memberData.preName} ${memberData.name}" aktualisiert.`);
      } else {
        await this.boardService.createMember(memberData, this.data.target).toPromise();
        this.notificationService.showSuccess(`${this.targetTitle} "${memberData.preName} ${memberData.name}" hinzugefügt.`);
      }

      if (this.data.target === 'playmaker') {
        this.boardService.loadPlaymaker$.next();
      } else {
        this.boardService.loadBoard$.next();
      }

      this.dialogRef.close(true);
    } catch (err) {
      console.error('Error saving member:', err);
      this.errorMessage = `Fehler beim Speichern von ${this.targetTitle}.`;
    } finally {
      this.isSaving = false;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
