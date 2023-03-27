import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";

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
  }}
