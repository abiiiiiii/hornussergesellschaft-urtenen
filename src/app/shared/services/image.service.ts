import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Image} from "../models/image.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getImage(fileName: string): Observable<string> {
    return this.storage.ref('image/images/' + fileName).getDownloadURL();
  }

  getAllImages(): Observable<Image[] | undefined> {
    return this.firestore.collection<Image>('image').valueChanges();
  }

  createImage(image: Image): Promise<DocumentReference<Image>> {
    return this.firestore.collection<Image>('image').add(image)
  }

  updateImage(image: Image): Promise<void> {
    return this.firestore.collection('image').doc<Image>(image.id).set(image, { merge: true});
  }

  deleteImage(id: string): Promise<void> {
    return this.firestore.collection('image').doc(id).delete();
  }
}
