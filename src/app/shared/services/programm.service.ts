import { Injectable, inject } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Storage, ref, getDownloadURL, uploadBytes } from '@angular/fire/storage';

export const JAHRESPROGRAMM_PATH = 'pdf/jahresprogramm.pdf';
export const NACHWUCHS_JAHRESPROGRAMM_PATH = 'pdf/nachwuchs_jahresprogramm.pdf';

@Injectable({
  providedIn: 'root'
})
export class ProgrammService {
  private readonly storage = inject(Storage);

  getJahresprogrammUrl(): Observable<string> {
    return from(getDownloadURL(ref(this.storage, JAHRESPROGRAMM_PATH)));
  }

  getNachwuchsJahresprogrammUrl(): Observable<string> {
    return from(getDownloadURL(ref(this.storage, NACHWUCHS_JAHRESPROGRAMM_PATH)));
  }

  uploadJahresprogramm(file: File): Observable<any> {
    return from(uploadBytes(ref(this.storage, JAHRESPROGRAMM_PATH), file));
  }

  uploadNachwuchsJahresprogramm(file: File): Observable<any> {
    return from(uploadBytes(ref(this.storage, NACHWUCHS_JAHRESPROGRAMM_PATH), file));
  }
}

