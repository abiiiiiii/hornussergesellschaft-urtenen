import {Injectable} from '@angular/core';
import {User} from "../../shared/models/user.model";
import {map, switchMap} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {EMPTY, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
  }

  login(email: string, password: string): Observable<any> {
    return fromPromise(this.auth.signInWithEmailAndPassword(email, password));
  }

  logout(): Observable<void> {
    this.currentUser = null;
    return fromPromise(this.auth.signOut());
  }

  checkIfUserIsLoggedIn(): void {
    this.auth.authState.pipe(
      switchMap(user => {
        if (user?.uid) {
          return this.getUserRole(user.uid).pipe(
            map(role => ({userId: user.uid, role: role.data().role}))
          );
        }
        return EMPTY;
      })
    ).subscribe(currentUser => this.currentUser = currentUser);
  }

  getUserRole(userId: string): Observable<any> {
    return this.firestore.doc(`user/${userId}`).get();
  }
}
