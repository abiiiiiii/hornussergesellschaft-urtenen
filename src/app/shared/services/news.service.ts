import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from } from "rxjs";
import { News } from "../models/news.model";
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
import { Storage, ref, getDownloadURL } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  readonly load$ = new BehaviorSubject(undefined);

  getNewsImage(imageName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'images/news/' + imageName)));
  }

  getNewsFile(fileName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'pdf/news/' + fileName)));
  }

  getAllNews(): Observable<News[]> {
    const q = query(
      collection(this.firestore, 'news'),
      orderBy('createdAt', 'desc'),
      where('active', '==', true),
      limit(5)
    );
    return from(getDocs(q)).pipe(
      map(res => {
        const news: News[] = [];
        res.forEach(docSnap => {
          const n = docSnap.data() as News;
          n.id = docSnap.id;
          news.push(n);
        });
        return news;
      })
    );
  }

  createNews(news: News): Observable<DocumentReference<News>> {
    const col = collection(this.firestore, 'news') as CollectionReference<News>;
    return from(addDoc(col, news));
  }

  updateNews(news: News): Observable<void> {
    return from(setDoc(doc(this.firestore, 'news', news.id), news, { merge: true }));
  }

  deleteNews(id: string): Observable<void> {
    return from(deleteDoc(doc(this.firestore, 'news', id)));
  }
}
