import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Sponsor} from "../models/sponsor.model";
import {SponsorType} from "../enums/sponsor-type.enum";
import {map} from "rxjs/operators";
import {News} from "../models/news.model";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {InternalDocument} from "../models/internal-document.model";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class InternalDocumentService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getAllInternalDocuments(): Observable<InternalDocument[]> {
    return this.firestore.collection<InternalDocument>('internal-document', ref => ref.where('active', '==', true)).get().pipe(
      map(res => {
        let internalDocuments: InternalDocument[] = [];
        res.forEach(doc => {
          let internalDocument = doc.data() as InternalDocument;
          internalDocument.id = doc.id;
          internalDocuments.push(internalDocument);
        })
        return internalDocuments;
      })
    );
  }

  getInternalDocumentFile(fileName: string): Observable<string> {
    return this.storage.ref('pdf/internal/' + fileName).getDownloadURL();
  }

  createInternalDocument(internalDocument: InternalDocument): Observable<DocumentReference<InternalDocument>> {
    return fromPromise(this.firestore.collection<InternalDocument>('internal-document').add(internalDocument));
  }

  updateInternalDocument(internalDocument: InternalDocument): Observable<void> {
    return fromPromise(this.firestore.collection('internal-document').doc<InternalDocument>(internalDocument.id).set(internalDocument, { merge: true}));
  }

  deleteInternalDocument(id: string): Observable<void> {
    return fromPromise(this.firestore.collection('sponsor').doc(id).delete());
  }
}
