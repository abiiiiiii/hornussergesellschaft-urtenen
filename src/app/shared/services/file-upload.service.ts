import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from "@angular/fire/storage";
import {Observable, Subject} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  uploadPercentage: Observable<number | undefined> = new Subject();

  constructor(private storage: AngularFireStorage) { }

  uploadFile(path: string, file: File): Observable<any> {
      return fromPromise(this.storage.upload(path + file.name, file));
  }
}
