import {Injectable} from '@angular/core';
import {BoardMember} from "../models/board-member.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFirestore, DocumentReference} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
  }

  getBoardMemberImage(imageName: string): Observable<string> {
    return this.storage.ref('images/board/' + imageName).getDownloadURL();
  }

  getAllBoardMembers(): Observable<BoardMember[]> {
    return this.firestore.collection<BoardMember>('board').get().pipe(
      map(res => {
        let members: BoardMember[] = [];
        res.forEach(doc => {
          let member = doc.data() as BoardMember;
          member.id = doc.id;
          members.push(member);
        })
        return members;
      })
    );
  }

  getPlaymaker(): Observable<BoardMember> {
    return this.firestore.collection<BoardMember>('playmaker').get().pipe(
      map(res => {
        let playmaker: BoardMember;
        res.forEach(doc => {
          playmaker = doc.data();
        })
        return playmaker;
      })
    );
  }

  createBoardMember(boardMember: BoardMember): Promise<DocumentReference<BoardMember>> {
    return this.firestore.collection<BoardMember>('board').add(boardMember)
  }

  updateBoardMember(boardMember: BoardMember): Promise<void> {
    return this.firestore.collection('board').doc<BoardMember>(boardMember.id).set(boardMember, {merge: true});
  }

  deleteBoardMember(id: string): Promise<void> {
    return this.firestore.collection('board').doc(id).delete();
  }
}
