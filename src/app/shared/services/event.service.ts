import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Event} from "../models/event.model";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getEventImage(imageName: string): Observable<string> {
    return this.storage.ref('event/images/' + imageName).getDownloadURL();
  }

  getEventFile(fileName: string): Observable<string> {
    return this.storage.ref('event/files/' + fileName).getDownloadURL();
  }

  getAllEvents(): Observable<Event[] | undefined> {
    return this.firestore.collection<Event>('event').valueChanges();
  }

  createEvent(event: Event): Promise<DocumentReference<Event>> {
    return this.firestore.collection<Event>('event').add(event)
  }

  updateEvent(event: Event): Promise<void> {
    return this.firestore.collection('event').doc<Event>(event.id).set(event, { merge: true});
  }

  deleteEvent(id: string): Promise<void> {
    return this.firestore.collection('event').doc(id).delete();
  }
}
