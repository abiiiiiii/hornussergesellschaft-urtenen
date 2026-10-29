import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  readonly currentUser = toSignal(
    authState(this.auth).pipe(
      switchMap(user => {
        if (user?.uid) {
          return docData<{ role?: string }>(doc(this.firestore, `user/${user.uid}`)).pipe(
            map(data => ({
              userId: user.uid,
              role: data?.role ?? ''
            }))
          );
        }
        return of(null);
      })
    ),
    { initialValue: null }
  );

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  getUserRole(userId: string): Observable<{ role?: string } | undefined> {
    return docData<{ role?: string }>(doc(this.firestore, `user/${userId}`));
  }
}
