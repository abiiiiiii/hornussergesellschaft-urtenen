import { Component, Inject, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Team } from '../../../../shared/models/team.model';
import { Player } from '../../../../shared/models/player.model';
import { TeamService } from '../../../../shared/services/team.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { resizeImage } from '../../../../shared/utils/image-utils';

export interface EditTeamDialogData {
  team: Team;
}

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class EditTeamComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly teamService = inject(TeamService);
  private readonly notificationService = inject(NotificationService);
  private readonly dialog = inject(MatDialog);
  public readonly dialogRef = inject(MatDialogRef<EditTeamComponent>);

  teamForm!: FormGroup;
  newPlayerForm!: FormGroup;

  players: Player[] = [];
  editingPlayerIndex: number | null = null;
  editPlayerName = '';
  editPlayerPreName = '';

  imageFile?: File;
  imagePreviewUrl?: string;
  isSaving = false;
  errorMessage = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditTeamDialogData) {}

  ngOnInit(): void {
    const t = this.data.team;
    this.players = (t.players || []).map(p => ({ ...p }));

    this.teamForm = this.fb.group({
      name: [t.name || '', [Validators.required]]
    });

    this.newPlayerForm = this.fb.group({
      preName: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });

    if (t.image) {
      this.teamService.getTeamImage(t.image).subscribe(url => {
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
      this.errorMessage = 'Nur JPEG, PNG oder WebP Bilder sind für Teambilder erlaubt.';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      this.errorMessage = 'Das Bild darf maximal 10 MB gross sein.';
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

  addPlayer(): void {
    if (this.newPlayerForm.invalid) {
      this.newPlayerForm.markAllAsTouched();
      return;
    }

    const val = this.newPlayerForm.value;
    this.players.push({
      name: val.name.trim(),
      preName: val.preName.trim()
    });

    this.newPlayerForm.reset();
  }

  startEditPlayer(index: number): void {
    this.editingPlayerIndex = index;
    this.editPlayerName = this.players[index].name;
    this.editPlayerPreName = this.players[index].preName;
  }

  savePlayerEdit(index: number): void {
    if (!this.editPlayerName.trim() || !this.editPlayerPreName.trim()) {
      return;
    }
    this.players[index].name = this.editPlayerName.trim();
    this.players[index].preName = this.editPlayerPreName.trim();
    this.editingPlayerIndex = null;
  }

  cancelPlayerEdit(): void {
    this.editingPlayerIndex = null;
  }

  removePlayer(index: number): void {
    const player = this.players[index];
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Spieler entfernen',
        message: `Möchtest du "${player.preName} ${player.name}" wirklich aus der Teamliste entfernen?`,
        confirmText: 'Entfernen',
        cancelText: 'Abbrechen',
        isDestructive: true
      }
    });

    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.players.splice(index, 1);
        if (this.editingPlayerIndex === index) {
          this.editingPlayerIndex = null;
        }
      }
    });
  }

  movePlayerUp(index: number): void {
    if (index > 0) {
      const temp = this.players[index];
      this.players[index] = this.players[index - 1];
      this.players[index - 1] = temp;
    }
  }

  movePlayerDown(index: number): void {
    if (index < this.players.length - 1) {
      const temp = this.players[index];
      this.players[index] = this.players[index + 1];
      this.players[index + 1] = temp;
    }
  }

  sortAlphabetically(): void {
    this.players.sort((a, b) => {
      const comp = (a.name || '').localeCompare(b.name || '');
      if (comp !== 0) return comp;
      return (a.preName || '').localeCompare(b.preName || '');
    });
  }

  async save(): Promise<void> {
    if (this.teamForm.invalid) {
      this.teamForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    try {
      let imageName = this.data.team.image;

      if (this.imageFile) {
        // Client-side resize and compression to HD format (1920x1080)
        const processedFile = await resizeImage(this.imageFile, 1920, 1080, 0.85);
        const uploadedName = await this.teamService.uploadTeamPicture(processedFile).toPromise() as string;

        // Delete old picture from storage if not a placeholder
        if (this.data.team.image && this.data.team.image !== uploadedName) {
          this.teamService.deleteTeamPicture(this.data.team.image).subscribe();
        }
        imageName = uploadedName;
      }

      const updatedTeam: Team = {
        ...this.data.team,
        name: this.teamForm.get('name')?.value.trim(),
        image: imageName,
        players: this.players
      };

      await this.teamService.updateTeam(updatedTeam).toPromise();
      this.notificationService.showSuccess(`Team "${updatedTeam.name}" erfolgreich aktualisiert.`);
      this.teamService.load$.next(undefined);
      this.dialogRef.close(true);
    } catch (err) {
      console.error('Error saving team:', err);
      this.errorMessage = 'Fehler beim Speichern des Teams. Bitte versuche es erneut.';
    } finally {
      this.isSaving = false;
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
