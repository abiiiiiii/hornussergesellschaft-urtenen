import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {GameMaker} from "../models/game-maker.model";

@Injectable({
  providedIn: 'root'
})
export class GameMakerService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getGameMakerImage(fileName: string): Observable<string> {
    return this.storage.ref('gameMaker/images/' + fileName).getDownloadURL();
  }

  getGameMaker(): Observable<GameMaker[] | undefined> {
    return this.firestore.collection<GameMaker>('gameMaker').valueChanges();
  }

  createGameMaker(gameMaker: GameMaker): Promise<DocumentReference<GameMaker>> {
    return this.firestore.collection<GameMaker>('gameMaker').add(gameMaker)
  }

  updateGameMaker(gameMaker: GameMaker): Promise<void> {
    return this.firestore.collection('gameMaker').doc<GameMaker>(gameMaker.id).set(gameMaker, { merge: true});
  }

  deleteGameMaker(id: string): Promise<void> {
    return this.firestore.collection('gameMaker').doc(id).delete();
  }
}
