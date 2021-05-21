import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentReference} from "@angular/fire/firestore";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {Team} from "../models/team.model";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getTeamImage(fileName: string): Observable<string> {
    return this.storage.ref('team/images/' + fileName).getDownloadURL();
  }

  getTeamAverage(fileName: string): Observable<string> {
    return this.storage.ref('team/files/' + fileName).getDownloadURL();
  }

  getAllTeams(): Observable<Team[] | undefined> {
    return this.firestore.collection<Team>('team').valueChanges();
  }

  createTeam(team: Team): Promise<DocumentReference<Team>> {
    return this.firestore.collection<Team>('team').add(team)
  }

  updateTeam(team: Team): Promise<void> {
    return this.firestore.collection('team').doc<Team>(team.id).set(team, { merge: true});
  }

  deleteTeam(id: string): Promise<void> {
    return this.firestore.collection('team').doc(id).delete();
  }
}
