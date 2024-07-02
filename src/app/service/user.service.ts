// user.service.ts
import { Injectable } from '@angular/core';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, UserCredential, createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { Firestore, addDoc, collection, doc, docData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface User {
    uid: string;
    displayName: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private firestore: Firestore, private fireauth: Auth,) { }

    getUser(uid: string): Observable<User | undefined> {
        const userDocRef = doc(this.firestore, `users/${uid}`);
        return docData(userDocRef, { idField: 'uid' }) as Observable<User | undefined>;
    }

    async addsignup(signupObj: { userName: string, useremail: string, userpassword: string }) {
        const signupData = collection(this.firestore, 'signup');
        await addDoc(signupData, signupObj);
      }

    signupUser(email: string, password: string) {
        return createUserWithEmailAndPassword(this.fireauth, email, password);
    }

    loginUser(email: string, password: string) {
        return signInWithEmailAndPassword(this.fireauth, email, password);
    }

    googleSignIn(): Promise<UserCredential> {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(this.fireauth, provider);
    }

    FacebookSignIn() {
        const provider = new FacebookAuthProvider();
        return signInWithRedirect(this.fireauth, provider);
    }

    TwitterSignIn() {
        const provider = new TwitterAuthProvider();
        return signInWithRedirect(this.fireauth, provider);
    }

    handleRedirectResult() {
        return getRedirectResult(this.fireauth);
    }
}