import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Gallery} from "../models/gallery.model";
import {map} from "rxjs/operators";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private firestore: AngularFirestore) { }

  getAllGalleries(): Observable<Gallery[]> {
    return this.firestore.collection<Gallery>('gallery').get().pipe(
      map(res => {
        let galleries: Gallery[] = [];
        res.forEach(doc => {
          let gallery = doc.data() as Gallery;
          gallery.id = doc.id;
          galleries.push(gallery);
        })
        return galleries;
      })
    );
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
