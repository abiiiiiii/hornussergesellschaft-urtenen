import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Result} from "../models/result.model";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private firestore: AngularFirestore) { }

  getAllResults(): Observable<Result[] | undefined> {
    return this.firestore.collection<Result>('result').valueChanges();
  }

  createResult(result: Result): Promise<DocumentReference<Result>> {
    return this.firestore.collection<Result>('result').add(result)
  }

  updateResult(result: Result): Promise<void> {
    return this.firestore.collection('result').doc<Result>(result.id).set(result, { merge: true});
  }

  deleteResult(id: string): Promise<void> {
    return this.firestore.collection('result').doc(id).delete();
  }
}
