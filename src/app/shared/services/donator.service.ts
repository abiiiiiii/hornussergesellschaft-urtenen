import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { Donator } from '../models/donator.model';
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
export class DonatorService {
  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  readonly load$ = new BehaviorSubject<void>(undefined);

  getDonatorImage(fileName: string): Observable<string> {
    if (!fileName) {
      return of('');
    }
    return from(getDownloadURL(ref(this.storage, 'images/sponsors/' + fileName))).pipe(
      catchError(() => of(''))
    );
  }

  getDonators(): Observable<Donator[]> {
    const colRef = collection(this.firestore, 'donator');
    return from(getDocs(colRef)).pipe(
      switchMap(snap => {
        if (!snap.empty) {
          const list: Donator[] = [];
          snap.forEach(d => {
            const data = d.data() as Donator;
            data.id = d.id;
            list.push(data);
          });
          return of(this.sortDonators(list));
        }

        // Fallback to legacy 'sponsor' collection if 'donator' collection is empty
        const qLegacy = query(
          collection(this.firestore, 'sponsor'),
          where('type', 'in', ['DONATOR', 'PRIVATE_DONATOR'])
        );
        return from(getDocs(qLegacy)).pipe(
          map(legacySnap => {
            const list: Donator[] = [];
            legacySnap.forEach(d => {
              const val = d.data() as any;
              list.push({
                id: d.id,
                name: val.name || '',
                category: val.type === 'PRIVATE_DONATOR' ? 'PRIVATE' : 'COMPANY',
                city: val.city || '',
                url: val.url || '',
                email: val.email || '',
                image: val.image || '',
                order: val.order ?? 10
              });
            });
            return this.sortDonators(list);
          })
        );
      })
    );
  }

  createDonator(donator: Donator): Observable<string> {
    const col = collection(this.firestore, 'donator') as CollectionReference<Donator>;
    return from(addDoc(col, donator)).pipe(
      map(ref => ref.id)
    );
  }

  updateDonator(donator: Donator): Observable<void> {
    if (!donator.id) {
      return of(undefined);
    }
    return from(setDoc(doc(this.firestore, 'donator', donator.id), donator, { merge: true }));
  }

  deleteDonator(id: string, imageFileName?: string): Observable<void> {
    const deleteDoc$ = from(deleteDoc(doc(this.firestore, 'donator', id)));
    if (imageFileName) {
      return this.deleteLogo(imageFileName).pipe(
        switchMap(() => deleteDoc$)
      );
    }
    return deleteDoc$;
  }

  uploadLogo(file: File): Observable<string> {
    const sanitizedName = `donator_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
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

  private sortDonators(list: Donator[]): Donator[] {
    return list.sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return (a.name || '').localeCompare(b.name || '');
    });
  }
}
