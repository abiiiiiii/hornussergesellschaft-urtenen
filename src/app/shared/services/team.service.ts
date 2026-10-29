import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, from } from "rxjs";
import { Team } from "../models/team.model";
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
  where,
  orderBy,
  DocumentReference,
  CollectionReference
} from "@angular/fire/firestore";
import { Storage, ref, getDownloadURL } from "@angular/fire/storage";
import { YOUTH_TEAM_NAME } from "../../core/constants";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  readonly load$ = new BehaviorSubject(undefined);

  getTeamImage(fileName: string): Observable<string> {
    return from(getDownloadURL(ref(this.storage, 'images/team_pictures/' + fileName)));
  }

  getSeniorTeams(): Observable<Team[]> {
    const q = query(
      collection(this.firestore, 'team'),
      where('name', '!=', YOUTH_TEAM_NAME),
      orderBy('name', 'asc')
    );
    return from(getDocs(q)).pipe(
      map(res => {
        const teams: Team[] = [];
        res.forEach(docSnap => {
          const team = docSnap.data() as Team;
          team.id = docSnap.id;
          teams.push(team);
        });
        return teams;
      })
    );
  }

  getTeamByName(name: string): Observable<Team> {
    const q = query(
      collection(this.firestore, 'team'),
      where('name', '==', name)
    );
    return from(getDocs(q)).pipe(
      map(res => {
        const docSnap = res.docs[0];
        if (docSnap) {
          const team = docSnap.data() as Team;
          team.id = docSnap.id;
          return team;
        }
        return undefined as any;
      })
    );
  }

  createTeam(team: Team): Promise<DocumentReference<Team>> {
    const col = collection(this.firestore, 'team') as CollectionReference<Team>;
    return addDoc(col, team);
  }

  updateTeam(team: Team): Observable<void> {
    return from(setDoc(doc(this.firestore, 'team', team.id), team, { merge: true }));
  }

  deleteTeam(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'team', id));
  }
}
