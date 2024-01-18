import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import * as path from "path";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getImage(fileName: string): Observable<string> {
    return this.storage.ref('images/' + fileName).getDownloadURL();
  }

  getFile(fileName: string): Observable<string> {
    return this.storage.ref('pdf/' + fileName).getDownloadURL();
  }

  delete(path: string): Observable<any> {
    return this.storage.ref(path).delete();
  }
}
