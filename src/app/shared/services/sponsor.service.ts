import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { Sponsor } from '../models/sponsor.model';
import { SponsorType } from '../enums/sponsor-type.enum';
import { map, switchMap, catchError } from 'rxjs/operators';
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
  CollectionReference
} from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL, uploadBytes, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  readonly load$ = new BehaviorSubject<void>(undefined);

  getSponsorImage(fileName: string): Observable<string> {
    if (!fileName) {
      return of('');
    }
    return from(getDownloadURL(ref(this.storage, 'images/sponsors/' + fileName))).pipe(
      catchError(() => of(''))
    );
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
        return sponsors.sort((a, b) => {
          const orderA = a.order ?? 999;
          const orderB = b.order ?? 999;
          if (orderA !== orderB) {
            return orderA - orderB;
          }
          return (a.name || '').localeCompare(b.name || '');
        });
      })
    );
  }

  uploadLogo(file: File): Observable<string> {
    const sanitizedName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const storageRef = ref(this.storage, 'images/sponsors/' + sanitizedName);
    return from(uploadBytes(storageRef, file)).pipe(
      map(() => sanitizedName)
    );
  }

  deleteLogo(fileName: string): Observable<void> {
    if (!fileName) {
      return of(undefined);
    }
    const storageRef = ref(this.storage, 'images/sponsors/' + fileName);
    return from(deleteObject(storageRef)).pipe(
      catchError(() => of(undefined))
    );
  }

  createSponsor(sponsor: Sponsor): Observable<string> {
    const col = collection(this.firestore, 'sponsor') as CollectionReference<Sponsor>;
    return from(addDoc(col, sponsor)).pipe(
      map(ref => ref.id)
    );
  }

  updateSponsor(sponsor: Sponsor): Observable<void> {
    if (!sponsor.id) {
      return of(undefined);
    }
    return from(setDoc(doc(this.firestore, 'sponsor', sponsor.id), sponsor, { merge: true }));
  }

  deleteSponsor(id: string, imageFileName?: string): Observable<void> {
    const deleteDoc$ = from(deleteDoc(doc(this.firestore, 'sponsor', id)));
    if (imageFileName) {
      return this.deleteLogo(imageFileName).pipe(
        switchMap(() => deleteDoc$)
      );
    }
    return deleteDoc$;
  }
}
