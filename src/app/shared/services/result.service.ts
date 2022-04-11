import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Result} from "../models/result.model";
import {map} from "rxjs/operators";
import {News} from "../models/news.model";

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private firestore: AngularFirestore) { }

  getAllResults(): Observable<Result[]> {
    return this.firestore.collection<Result>('result').get().pipe(
      map(res => {
        let results: Result[] = [];
        res.forEach(doc => {
          let result = doc.data() as Result;
          result.id = doc.id;
          results.push(result);
        })
        return results;
      })
    );
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
