import { Injectable, inject } from '@angular/core';
import { Observable, from } from "rxjs";
import { Sponsor } from "../models/sponsor.model";
import { SponsorType } from "../enums/sponsor-type.enum";
import { map } from "rxjs/operators";
import {
  Firestore,
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  DocumentReference,
  CollectionReference
} from "@angular/fire/firestore";
import { Storage, ref, getDownloadURL } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  getSponsorImage(fileName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'images/sponsors/' + fileName)));
  }

  getSponsorsByType(type: SponsorType): Observable<Sponsor[]> {
    const q = query(
      collection(this.firestore, 'sponsor'),
      where('type', '==', type)
    );
    return from(getDocs(q)).pipe(
      map(res => {
        const sponsors: Sponsor[] = [];
        res.forEach(docSnap => {
          const sponsor = docSnap.data() as Sponsor;
          sponsor.id = docSnap.id;
          sponsors.push(sponsor);
        });
        return sponsors;
      })
    );
  }

  createSponsor(sponsor: Sponsor): Promise<DocumentReference<Sponsor>> {
    const col = collection(this.firestore, 'sponsor') as CollectionReference<Sponsor>;
    return addDoc(col, sponsor);
  }

  updateSponsor(sponsor: Sponsor): Promise<void> {
    return setDoc(doc(this.firestore, 'sponsor', sponsor.id), sponsor, { merge: true });
  }

  deleteSponsor(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'sponsor', id));
  }
}
