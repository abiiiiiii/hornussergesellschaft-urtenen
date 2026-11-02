import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  showSuccess(message: string, duration = 3000): void {
    this.snackBar.open(message, 'OK', {
      duration,
      panelClass: ['snackbar-success'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  showError(message: string, duration = 4000): void {
    this.snackBar.open(message, 'Schliessen', {
      duration,
      panelClass: ['snackbar-error'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  showInfo(message: string, duration = 3000): void {
    this.snackBar.open(message, 'OK', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}

