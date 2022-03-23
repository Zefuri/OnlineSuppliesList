import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  connectedUser: firebase.User;

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.connectedUser = user;
      } else {
        this.connectedUser = null;
      }
    });
  }

  isSignedIn(): boolean {
    return this.connectedUser ? true : false;
  }

  getConnectedUser() {
    return this.connectedUser;
  }

  async register(email: string, password: string) {
    const userCred = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await userCred.user.sendEmailVerification();
    await this.auth.signOut();
  }

  loginEmailAndPassword(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  loginGoogle() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    return this.auth.signOut();
  }
}
