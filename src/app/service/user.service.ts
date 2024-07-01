// user.service.ts
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
    uid: string;
    displayName: string;
    // other relevant user properties
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private firestore: Firestore) {}

    getUser(uid: string): Observable<User | undefined> {
        return this.firestore.doc<User>(`users/${uid}`).valueChanges();
    }
}
