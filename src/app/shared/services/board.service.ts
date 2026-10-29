import { Injectable, inject } from '@angular/core';
import { BoardMember } from "../models/board-member.model";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Firestore, collection, doc, getDocs, addDoc, setDoc, deleteDoc, DocumentReference, CollectionReference } from "@angular/fire/firestore";
import { Storage, ref, getDownloadURL } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  getBoardMemberImage(imageName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'images/board/' + imageName)));
  }

  getAllBoardMembers(): Observable<BoardMember[]> {
    return from(getDocs(collection(this.firestore, 'board'))).pipe(
      map(res => {
        const members: BoardMember[] = [];
        res.forEach(docSnap => {
          const member = docSnap.data() as BoardMember;
          member.id = docSnap.id;
          members.push(member);
        });
        return members;
      })
    );
  }

  getPlaymaker(): Observable<BoardMember> {
    return from(getDocs(collection(this.firestore, 'playmaker'))).pipe(
      map(res => {
        let playmaker: BoardMember;
        res.forEach(docSnap => {
          playmaker = docSnap.data() as BoardMember;
        });
        return playmaker;
      })
    );
  }

  createBoardMember(boardMember: BoardMember): Promise<DocumentReference<BoardMember>> {
    const boardCollection = collection(this.firestore, 'board') as CollectionReference<BoardMember>;
    return addDoc(boardCollection, boardMember);
  }

  updateBoardMember(boardMember: BoardMember): Promise<void> {
    return setDoc(doc(this.firestore, 'board', boardMember.id), boardMember, { merge: true });
  }

  deleteBoardMember(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'board', id));
  }
}
