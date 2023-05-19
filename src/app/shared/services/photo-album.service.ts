import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Album} from "../models/album.model";
import {filter, map} from "rxjs/operators";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {Game} from "../models/game.model";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class PhotoAlbumService {

  constructor(private firestore: AngularFirestore) { }

  getAllAlbums(): Observable<Album[]> {
    return this.firestore.collection<Album>('album').get().pipe(
      map(res => {
        let galleries: Album[] = [];
        res.forEach(doc => {
          let gallery = doc.data() as Album;
          gallery.id = doc.id;
          galleries.push(gallery);
        })
        return galleries;
      })
    );
  }

  getAlbumById(documentId: string): Observable<Album> {
    return this.firestore.collection<Album>('album').doc(documentId).get().pipe(
      map(res => {
        let album = res.data() as Album;
        album.id = res.id;
        return album;
      })
    )
  }

  createAlbum(album: Album): Observable<DocumentReference<Album>> {
    return fromPromise(this.firestore.collection<Album>('album').add(album));
  }

  updateAlbum(album: Album): Observable<void> {
    return fromPromise(this.firestore.collection('album').doc<Album>(album.id).set(album, { merge: true}));
  }

  deleteAlbum(id: string): Observable<void> {
    return fromPromise(this.firestore.collection('album').doc(id).delete());
  }
}
