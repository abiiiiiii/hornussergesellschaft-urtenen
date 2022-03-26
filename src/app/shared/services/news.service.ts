import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference, QuerySnapshot} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {News} from "../models/news.model";
import {fromPromise} from "rxjs/internal-compatibility";
import {AuthService} from "../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getNewsImage(imageName: string): Observable<string> {
    return this.storage.ref('images/news/' + imageName).getDownloadURL();
  }

  getNewsFile(fileName: string): Observable<string> {
    return this.storage.ref('pdf/news/' + fileName).getDownloadURL();
  }

  getAllNews(): Observable<QuerySnapshot<News>> {
    return this.firestore.collection<News>('news', ref => ref.orderBy('createdAt', 'desc').limit(5)).get();
  }

  getAllEvents(): Observable<QuerySnapshot<News>> {
    return this.firestore.collection<News>('news', ref => ref.where('isEvent', '==', true)).get();
  }

  createNews(news: News): Observable<DocumentReference<News>> {
    return fromPromise(this.firestore.collection<News>('news').add(news));
  }

  updateNews(news: News): Promise<void> {
    return this.firestore.collection('news').doc<News>(news.id).set(news, { merge: true});
  }

  deleteNews(id: string): Promise<void> {
    return this.firestore.collection('news').doc(id).delete();
  }
}
