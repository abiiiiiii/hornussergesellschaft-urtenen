import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference, QuerySnapshot} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Sponsor} from "../models/sponsor.model";
import {SponsorType} from "../enums/sponsor-type.enum";

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getSponsorImage(fileName: string): Observable<string> {
    return this.storage.ref('images/sponsors/' + fileName).getDownloadURL();
  }

  getSponsorsByType(type: SponsorType): Observable<QuerySnapshot<Sponsor>> {
    return this.firestore.collection<Sponsor>('sponsor', ref => ref.where('type', '==', type)).get();
  }

  createSponsor(sponsor: Sponsor): Promise<DocumentReference<Sponsor>> {
    return this.firestore.collection<Sponsor>('sponsor').add(sponsor)
  }

  updateSponsor(sponsor: Sponsor): Promise<void> {
    return this.firestore.collection('sponsor').doc<Sponsor>(sponsor.id).set(sponsor, { merge: true});
  }

  deleteSponsor(id: string): Promise<void> {
    return this.firestore.collection('sponsor').doc(id).delete();
  }
}
