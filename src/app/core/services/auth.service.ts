import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { UserRole } from '../../shared/enums/user-role.enum';

/**
 * AuthService provides authentication and role-based permissions.
 *
 * Admin Setup:
 * In Firestore, roles are stored under collection `user/{uid}`:
 * Document ID = Firebase Auth User UID
 * Content: `{ "role": "admin" }` (or `"mitglied"` for standard members).
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  readonly currentUser$: Observable<User | null> = authState(this.auth).pipe(
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
    }),
    shareReplay(1)
  );

  readonly currentUser = toSignal(this.currentUser$, { initialValue: null });

  readonly isAdmin = computed(() => this.currentUser()?.role === UserRole.ADMIN);

  readonly isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    map(user => user?.role === UserRole.ADMIN)
  );

  readonly isAuthenticated$: Observable<boolean> = authState(this.auth).pipe(
    map(user => !!user)
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
