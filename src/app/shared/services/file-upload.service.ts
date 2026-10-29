import { Injectable, inject } from '@angular/core';
import { Observable, Subject, from } from "rxjs";
import { Storage, ref, uploadBytes } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private readonly storage = inject(Storage);

  readonly uploadPercentage: Observable<number | undefined> = new Subject();

  uploadFile(path: string, file: File): Observable<any> {
    return from(uploadBytes(ref(this.storage, path + file.name), file));
  }
}
