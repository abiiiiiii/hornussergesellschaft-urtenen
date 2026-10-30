import { Injectable, inject } from '@angular/core';
import { Observable, from } from "rxjs";
import { Game } from "../models/game.model";
import { filter, map } from "rxjs/operators";
import { Storage, ref, getDownloadURL } from "@angular/fire/storage";
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  DocumentReference,
  CollectionReference,
  DocumentData
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  private readonly CURRENT_YEAR = new Date(new Date().getFullYear(), 0, 1);

  getGameList(fileName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'lists/' + fileName)));
  }

  getGameReport(fileName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'pdf/report/' + fileName)));
  }

  getLatestGames(): Observable<Game[]> {
    const q = query(
      collection(this.firestore, 'game'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    return from(getDocs(q)).pipe(
      map(docs => {
        const games: Game[] = [];
        docs.forEach(docSnap => {
          const data = docSnap.data();
          if (data?.['createdAt'] && typeof data['createdAt'].toDate === 'function') {
            if (data['createdAt'].toDate() > this.CURRENT_YEAR) {
              games.push(this.mapToGame(docSnap.id, data));
            }
          }
        });
        return games;
      })
    );
  }

  getGame(documentId: string): Observable<Game | undefined> {
    return from(getDoc(doc(this.firestore, 'game', documentId))).pipe(
      filter(res => {
        const data = res.data();
        if (data?.['createdAt'] && typeof data['createdAt'].toDate === 'function') {
          return data['createdAt'].toDate() > this.CURRENT_YEAR;
        }
        return false;
      }),
      map(res => {
        const data = res.data();
        return data ? this.mapToGame(res.id, data) : undefined;
      })
    );
  }

  createGame(game: Game): Observable<DocumentReference<Game>> {
    const gameCollection = collection(this.firestore, 'game') as CollectionReference<Game>;
    return from(addDoc(gameCollection, game));
  }

  updateGame(game: Game): Observable<void> {
    return from(setDoc(doc(this.firestore, 'game', game.id), game, { merge: true }));
  }

  deleteGame(id: string): Observable<void> {
    return from(deleteDoc(doc(this.firestore, 'game', id)));
  }

  private mapToGame(id: string, data: DocumentData): Game {
    const game = { ...data } as Game;
    game.id = id;
    if (data['createdAt'] && typeof data['createdAt'].toDate === 'function') {
      game.createdAt = data['createdAt'].toDate();
    }
    return game;
  }
}
