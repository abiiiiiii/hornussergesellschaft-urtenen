import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Game} from "../models/game.model";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getGameReport(fileName: string): Observable<string> {
    return this.storage.ref('game/files/' + fileName).getDownloadURL();
  }

  getAllGames(): Observable<Game[] | undefined> {
    return this.firestore.collection<Game>('game').valueChanges();
  }

  createGame(game: Game): Promise<DocumentReference<Game>> {
    return this.firestore.collection<Game>('game').add(game)
  }

  updateGame(game: Game): Promise<void> {
    return this.firestore.collection('game').doc<Game>(game.id).set(game, { merge: true});
  }

  deleteGame(id: string): Promise<void> {
    return this.firestore.collection('game').doc(id).delete();
  }
}
