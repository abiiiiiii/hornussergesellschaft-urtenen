import { Injectable, inject } from '@angular/core';
import { Observable, from } from "rxjs";
import { Storage, ref, getDownloadURL, deleteObject } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly storage = inject(Storage);

  getImage(fileName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'images/' + fileName)));
  }

  getFile(fileName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'pdf/' + fileName)));
  }

  delete(path: string): Observable<void> {
    return from(deleteObject(ref(this.storage, path)));
  }
}
