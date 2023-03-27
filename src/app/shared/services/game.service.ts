import {Injectable} from '@angular/core';
import {flatMap, Observable} from "rxjs";
import {Game} from "../models/game.model";
import {filter, map} from "rxjs/operators";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore, DocumentReference, QueryDocumentSnapshot} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private CURRENT_YEAR = new Date(new Date().getFullYear(), 0, 1);

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
  }

  getGameList(fileName: string): Observable<string> {
    return this.storage.ref('lists/' + fileName).getDownloadURL();
  }

  getGameReport(fileName: string): Observable<string> {
    return this.storage.ref('pdf/report/' + fileName).getDownloadURL();
  }

  getLatestGames(): Observable<Game[]> {
    return this.firestore.collection<Game>('game', ref => ref.orderBy('createdAt', 'desc').limit(5)).get().pipe(
      map(docs => {
        let games: Game[] = [];
        docs.forEach(doc => {
          if (doc.data().createdAt.toDate() > this.CURRENT_YEAR) {
            let game = this.mapToGame(doc);
            games.push(game);
          }
        })
        return games;
      })
    );
  }

  getGame(documentId: string): Observable<Game | undefined> {
    return this.firestore.collection<Game>('game').doc(documentId).get().pipe(
      filter(res => {
        return res.data().createdAt.toDate() > this.CURRENT_YEAR;
      }),
      map(res => {
        return this.mapToGame(res);
      })
    );
  }

  createGame(game: Game): Observable<DocumentReference<Game>> {
    return fromPromise(this.firestore.collection<Game>('game').add(game));
  }

  updateGame(game: Game): Observable<void> {
    return fromPromise(this.firestore.collection('game').doc<Game>(game.id).set(game, {merge: true}));
  }

  deleteGame(id: string): Observable<void> {
    return fromPromise(this.firestore.collection('game').doc(id).delete());
  }

  private mapToGame(doc: QueryDocumentSnapshot<Game>) {
    let game = doc.data() as Game;
    game.id = doc.id;
    game.createdAt = doc.data().createdAt.toDate();
    return game;
  }
}
