import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Sponsor} from "../models/sponsor.model";

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getSponsorImage(fileName: string): Observable<string> {
    return this.storage.ref('sponsor/images/' + fileName).getDownloadURL();
  }

  getAllSponsors(): Observable<Sponsor[] | undefined> {
    return this.firestore.collection<Sponsor>('sponsor').valueChanges();
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
