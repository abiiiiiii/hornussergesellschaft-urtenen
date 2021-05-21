import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {BoardMember} from "../models/board-member.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getBoardMemberImage(imageName: string): Observable<string> {
    return this.storage.ref('board/images/' + imageName).getDownloadURL();
  }

  getAllBoardMembers(): Observable<BoardMember[] | undefined> {
    return this.firestore.collection<BoardMember>('board').valueChanges();
  }

  createBoardMember(boardMember: BoardMember): Promise<DocumentReference<BoardMember>> {
    return this.firestore.collection<BoardMember>('board').add(boardMember)
  }

  updateBoardMember(boardMember: BoardMember): Promise<void> {
    return this.firestore.collection('board').doc<BoardMember>(boardMember.id).set(boardMember, { merge: true});
  }

  deleteBoardMember(id: string): Promise<void> {
    return this.firestore.collection('board').doc(id).delete();
  }
}
