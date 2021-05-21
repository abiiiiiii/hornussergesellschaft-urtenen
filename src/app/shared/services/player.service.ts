import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Player} from "../models/player.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private firestore: AngularFirestore) { }

  getAllPlayers(): Observable<Player[] | undefined> {
    return this.firestore.collection<Player>('player').valueChanges();
  }

  createPlayer(player: Player): Promise<DocumentReference<Player>> {
    return this.firestore.collection<Player>('player').add(player)
  }

  updatePlayer(player: Player): Promise<void> {
    return this.firestore.collection('player').doc<Player>(player.id).set(player, { merge: true});
  }

  deletePlayer(id: string): Promise<void> {
    return this.firestore.collection('player').doc(id).delete();
  }
}
