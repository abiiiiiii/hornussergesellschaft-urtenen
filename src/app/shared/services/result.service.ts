import { Injectable, inject } from '@angular/core';
import { Observable, from } from "rxjs";
import { Result } from "../models/result.model";
import { map } from "rxjs/operators";
import {
  Firestore,
  collection,
  doc,
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
export class ResultService {

  private readonly firestore = inject(Firestore);

  getAllResults(): Observable<Result[]> {
    return from(getDocs(collection(this.firestore, 'result'))).pipe(
      map(res => {
        const results: Result[] = [];
        res.forEach(docSnap => {
          const result = docSnap.data() as Result;
          result.id = docSnap.id;
          results.push(result);
        });
        return results;
      })
    );
  }

  createResult(result: Result): Promise<DocumentReference<Result>> {
    const col = collection(this.firestore, 'result') as CollectionReference<Result>;
    return addDoc(col, result);
  }

  updateResult(result: Result): Promise<void> {
    return setDoc(doc(this.firestore, 'result', result.id), result, { merge: true });
  }

  deleteResult(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'result', id));
  }
}
