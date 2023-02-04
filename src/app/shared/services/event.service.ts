import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ClubEvent} from "../models/event.model";
import {map} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  load$ = new BehaviorSubject(undefined);

  constructor(private firestore: AngularFirestore) { }

  getAllEvents(): Observable<ClubEvent[]> {
    return this.firestore.collection<ClubEvent>('event', ref => ref.orderBy('date', 'asc').where('active', '==', true).limit(5)).get().pipe(
      map(res => {
        let events: ClubEvent[] = [];
        res.forEach(doc => {
          let event = doc.data() as ClubEvent;
          event.date = doc.data().date.toDate();
          event.id = doc.id;
          events.push(event);
        })
        return events;
      })
    );
  }

  createEvent(event: ClubEvent): Observable<DocumentReference<ClubEvent>> {
    return fromPromise(this.firestore.collection<ClubEvent>('event').add(event));
  }

  updateEvent(event: ClubEvent): Observable<void> {
    return fromPromise(this.firestore.collection('event').doc<ClubEvent>(event.id).set(event, { merge: true }));
  }

  deleteEvent(id: string): Observable<void> {
    return fromPromise(this.firestore.collection('event').doc(id).delete());
  }
}
