import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Gallery} from "../models/gallery.model";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private firestore: AngularFirestore) { }

  getAllGalleries(): Observable<Gallery[] | undefined> {
    return this.firestore.collection<Gallery>('gallery').valueChanges();
  }

  createGallery(gallery: Gallery): Promise<DocumentReference<Gallery>> {
    return this.firestore.collection<Gallery>('gallery').add(gallery)
  }

  updateGallery(gallery: Gallery): Promise<void> {
    return this.firestore.collection('gallery').doc<Gallery>(gallery.id).set(gallery, { merge: true});
  }

  deleteGallery(id: string): Promise<void> {
    return this.firestore.collection('gallery').doc(id).delete();
  }
}
