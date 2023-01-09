import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

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
