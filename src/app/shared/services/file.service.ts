import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Image} from "../models/image.model";

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
