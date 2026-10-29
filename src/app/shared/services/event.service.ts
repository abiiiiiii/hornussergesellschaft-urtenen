import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from } from "rxjs";
import { ClubEvent } from "../models/event.model";
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
  orderBy,
  where,
  limit,
  DocumentReference,
  CollectionReference
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly firestore = inject(Firestore);

  readonly load$ = new BehaviorSubject(undefined);

  getAllEvents(): Observable<ClubEvent[]> {
    const q = query(
      collection(this.firestore, 'event'),
      orderBy('date', 'asc'),
      where('active', '==', true),
      limit(5)
    );
    return from(getDocs(q)).pipe(
      map(res => {
        const events: ClubEvent[] = [];
        res.forEach(docSnap => {
          const data = docSnap.data();
          const event = data as ClubEvent;
          if (data['date'] && typeof data['date'].toDate === 'function') {
            event.date = data['date'].toDate();
          }
          event.id = docSnap.id;
          events.push(event);
        });
        return events;
      })
    );
  }

  createEvent(event: ClubEvent): Observable<DocumentReference<ClubEvent>> {
    const eventCollection = collection(this.firestore, 'event') as CollectionReference<ClubEvent>;
    return from(addDoc(eventCollection, event));
  }

  updateEvent(event: ClubEvent): Observable<void> {
    return from(setDoc(doc(this.firestore, 'event', event.id), event, { merge: true }));
  }

  deleteEvent(id: string): Observable<void> {
    return from(deleteDoc(doc(this.firestore, 'event', id)));
  }
}
