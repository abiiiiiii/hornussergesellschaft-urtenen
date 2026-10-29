import { Injectable, inject } from '@angular/core';
import { Observable, from } from "rxjs";
import { Album } from "../models/album.model";
import { map } from "rxjs/operators";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  DocumentReference,
  CollectionReference
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PhotoAlbumService {

  private readonly firestore = inject(Firestore);

  getAllAlbums(): Observable<Album[]> {
    return from(getDocs(collection(this.firestore, 'album'))).pipe(
      map(res => {
        const galleries: Album[] = [];
        res.forEach(docSnap => {
          const gallery = docSnap.data() as Album;
          gallery.id = docSnap.id;
          galleries.push(gallery);
        });
        return galleries;
      })
    );
  }

  getAlbumById(documentId: string): Observable<Album> {
    return from(getDoc(doc(this.firestore, 'album', documentId))).pipe(
      map(res => {
        const album = res.data() as Album;
        album.id = res.id;
        return album;
      })
    );
  }

  createAlbum(album: Album): Observable<DocumentReference<Album>> {
    const col = collection(this.firestore, 'album') as CollectionReference<Album>;
    return from(addDoc(col, album));
  }

  updateAlbum(album: Album): Observable<void> {
    return from(setDoc(doc(this.firestore, 'album', album.id), album, { merge: true }));
  }

  deleteAlbum(id: string): Observable<void> {
    return from(deleteDoc(doc(this.firestore, 'album', id)));
  }
}
