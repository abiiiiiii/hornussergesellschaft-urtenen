import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference, DocumentSnapshot, QuerySnapshot} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Team} from "../models/team.model";
import {fromPromise} from "rxjs/internal-compatibility";
import {map} from "rxjs/operators";
import {News} from "../models/news.model";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getTeamImage(fileName: string): Observable<string> {
    return this.storage.ref('images/team_pictures/' + fileName).getDownloadURL();
  }

  getAllTeams(): Observable<Team[]> {
    return this.firestore.collection<Team>('team', ref => ref.orderBy('name', 'asc')).get().pipe(
      map(res => {
        let teams: Team[] = [];
        res.forEach(doc => {
          let team = doc.data() as Team;
          team.id = doc.id;
          teams.push(team);
        })
        return teams;
      })
    );
  }

  createTeam(team: Team): Promise<DocumentReference<Team>> {
    return this.firestore.collection<Team>('team').add(team)
  }

  updateTeam(team: Team): Observable<void> {
    return fromPromise(this.firestore.collection('team').doc<Team>(team.id).set(team, { merge: true}));
  }

  deleteTeam(id: string): Promise<void> {
    return this.firestore.collection('team').doc(id).delete();
  }
}
