import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  uploadPercentage: Observable<number | undefined> = new Subject();

  constructor(private storage: AngularFireStorage) { }

  uploadFiles(path: string, files: File[]) {
    files.forEach(file => {
      const task = this.storage.upload(path + file.name, file);
      this.uploadPercentage = task.percentageChanges();
    })
  }
}
