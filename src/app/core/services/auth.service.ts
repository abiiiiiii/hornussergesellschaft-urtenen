import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {User} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = {userId: ''};

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {
  }

  login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  getUserRole(userId: string) {
    this.firestore.collection('user').doc<User>(userId).get();
  }
}
