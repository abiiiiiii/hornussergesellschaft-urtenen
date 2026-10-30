import { Injectable, inject } from '@angular/core';
import { Observable, from } from "rxjs";
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
import { Storage, ref, getDownloadURL } from "@angular/fire/storage";
import { InternalDocument } from "../models/internal-document.model";

@Injectable({
  providedIn: 'root'
})
export class InternalDocumentService {

  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  getAllInternalDocuments(): Observable<InternalDocument[]> {
    return from(getDocs(collection(this.firestore, 'internal-document'))).pipe(
      map(res => {
        const internalDocuments: InternalDocument[] = [];
        res.forEach(docSnap => {
          const internalDocument = docSnap.data() as InternalDocument;
          internalDocument.id = docSnap.id;
          internalDocuments.push(internalDocument);
        });
        return internalDocuments;
      })
    );
  }

  getInternalDocumentFile(fileName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'pdf/internal/' + fileName)));
  }

  createInternalDocument(internalDocument: InternalDocument): Observable<DocumentReference<InternalDocument>> {
    const col = collection(this.firestore, 'internal-document') as CollectionReference<InternalDocument>;
    return from(addDoc(col, internalDocument));
  }

  updateInternalDocument(internalDocument: InternalDocument): Observable<void> {
    return from(setDoc(doc(this.firestore, 'internal-document', internalDocument.id), internalDocument, { merge: true }));
  }

  deleteInternalDocument(id: string): Observable<void> {
    return from(deleteDoc(doc(this.firestore, 'internal-document', id)));
  }
}
