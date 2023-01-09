import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import { News } from "../models/news.model";
import {map} from "rxjs/operators";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public load$ = new BehaviorSubject(undefined);

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getNewsImage(imageName: string): Observable<string> {
    return this.storage.ref('images/news/' + imageName).getDownloadURL();
  }

  getNewsFile(fileName: string): Observable<string> {
    return this.storage.ref('pdf/news/' + fileName).getDownloadURL();
  }

  getAllNews(): Observable<News[]> {
    return this.firestore.collection<News>('news', ref => ref.orderBy('createdAt', 'desc').where('active', '==', true).limit(5)).get().pipe(
      map(res => {
        let news: News[] = [];
        res.forEach(doc => {
          let n = doc.data() as News;
          n.id = doc.id;
          news.push(n);
        })
        return news;
      })
    );
  }

  createNews(news: News): Observable<DocumentReference<News>> {
    return fromPromise(this.firestore.collection<News>('news').add(news));
  }

  updateNews(news: News): Observable<void> {
    return fromPromise(this.firestore.collection('news').doc<News>(news.id).set(news, { merge: true }));
  }

  deleteNews(id: string): Observable<void> {
    return fromPromise(this.firestore.collection('news').doc(id).delete());
  }
}
