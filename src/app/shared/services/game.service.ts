import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference, QuerySnapshot} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Game} from "../models/game.model";
import {map} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getGameList(fileName: string): Observable<string> {
    return this.storage.ref('lists/' + fileName).getDownloadURL();
  }

  getGameReport(fileName: string): Observable<string> {
    return this.storage.ref('pdf/' + fileName).getDownloadURL();
  }

  getLatestGames(): Observable<QuerySnapshot<Game>> {
    return this.firestore.collection<Game>('game', ref => ref.orderBy('createdAt', 'desc').limit(5)).get();
  }

  getGame(documentId: string): Observable<Game | undefined> {
    let currentYearDate = new Date(new Date().getFullYear(), 0, 1);
    return this.firestore.collection<Game>('game', ref => ref.where('createdAt', '>=', currentYearDate)).doc(documentId).get().pipe(
      map(res => res.data())
    );
  }

  createGame(game: Game): Observable<DocumentReference<Game>> {
    return fromPromise(this.firestore.collection<Game>('game').add(game));
  }

  updateGame(game: Game): Promise<void> {
    return this.firestore.collection('game').doc<Game>(game.id).set(game, { merge: true});
  }

  deleteGame(id: string): Promise<void> {
    return this.firestore.collection('game').doc(id).delete();
  }
}
