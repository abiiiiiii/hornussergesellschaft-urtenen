import { Injectable, inject } from '@angular/core';
import { BoardMember } from "../models/board-member.model";
import { BoardRole } from "../enums/board-role.enum";
import { from, of, Observable, BehaviorSubject } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import {
  Firestore,
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  CollectionReference
} from "@angular/fire/firestore";
import { Storage, ref, getDownloadURL, uploadBytes, deleteObject } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  readonly loadBoard$ = new BehaviorSubject<void>(undefined);
  readonly loadPlaymaker$ = new BehaviorSubject<void>(undefined);

  getBoardMemberImage(imageName: string): Observable<string> {
    if (!imageName) {
      return of('');
    }
    return from(getDownloadURL(ref(this.storage, 'images/board/' + imageName))).pipe(
      catchError(() => of(''))
    );
  }

  uploadMemberImage(file: File): Observable<string> {
    const sanitized = `member_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    const storageRef = ref(this.storage, 'images/board/' + sanitized);
    return from(uploadBytes(storageRef, file)).pipe(
      map(() => sanitized)
    );
  }

  deleteMemberImage(fileName: string): Observable<void> {
    if (!fileName) {
      return of(undefined);
    }
    const storageRef = ref(this.storage, 'images/board/' + fileName);
    return from(deleteObject(storageRef)).pipe(
      catchError(() => of(undefined))
    );
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

        const roles = Object.values(BoardRole) as string[];
        return members.sort((a, b) => {
          if (a.order != null && b.order != null && a.order !== b.order) {
            return a.order - b.order;
          }
          if (a.order != null && b.order == null) return -1;
          if (a.order == null && b.order != null) return 1;

          const roleIdxA = a.roles?.[0] ? roles.indexOf(a.roles[0]) : 999;
          const roleIdxB = b.roles?.[0] ? roles.indexOf(b.roles[0]) : 999;
          const validA = roleIdxA >= 0 ? roleIdxA : 999;
          const validB = roleIdxB >= 0 ? roleIdxB : 999;

          if (validA !== validB) {
            return validA - validB;
          }
          return (a.name || '').localeCompare(b.name || '');
        });
      })
    );
  }

  getAllPlaymakers(): Observable<BoardMember[]> {
    return from(getDocs(collection(this.firestore, 'playmaker'))).pipe(
      map(res => {
        const members: BoardMember[] = [];
        res.forEach(docSnap => {
          const member = docSnap.data() as BoardMember;
          member.id = docSnap.id;
          members.push(member);
        });
        return members.sort((a, b) => (a.order ?? 10) - (b.order ?? 10) || (a.name || '').localeCompare(b.name || ''));
      })
    );
  }

  getPlaymaker(): Observable<BoardMember> {
    return this.getAllPlaymakers().pipe(
      map(list => list[0])
    );
  }

  createMember(member: BoardMember, target: 'board' | 'playmaker'): Observable<string> {
    const col = collection(this.firestore, target) as CollectionReference<BoardMember>;
    return from(addDoc(col, member)).pipe(
      map(ref => ref.id)
    );
  }

  updateMember(member: BoardMember, target: 'board' | 'playmaker'): Observable<void> {
    if (!member.id) {
      return of(undefined);
    }
    return from(setDoc(doc(this.firestore, target, member.id), member, { merge: true }));
  }

  deleteMember(id: string, target: 'board' | 'playmaker', imageFileName?: string): Observable<void> {
    const deleteDoc$ = from(deleteDoc(doc(this.firestore, target, id)));
    if (imageFileName) {
      return this.deleteMemberImage(imageFileName).pipe(
        map(() => undefined),
        catchError(() => of(undefined)),
        switchMap(() => deleteDoc$)
      );
    }
    return deleteDoc$;
  }

  createBoardMember(boardMember: BoardMember): Promise<any> {
    const boardCollection = collection(this.firestore, 'board') as CollectionReference<BoardMember>;
    return addDoc(boardCollection, boardMember);
  }

  updateBoardMember(boardMember: BoardMember): Promise<void> {
    return setDoc(doc(this.firestore, 'board', boardMember.id!), boardMember, { merge: true });
  }

  deleteBoardMember(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'board', id));
  }
}
