import { Injectable } from '@angular/core'; 
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import {User , Roles} from '../interface/user'
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
	user: Observable<firebase.User>; 
    constructor(private firebaseAuth: AngularFireAuth, private router : Router,
    	private afs: AngularFirestore) { 
    	this.user = firebaseAuth.authState; 
    }

  	doRegisterWithEmailAndPassword(_value){
	    return new Promise<any>((resolve, reject) => {
	     	firebase.auth().createUserWithEmailAndPassword(_value.email, _value.password)
	     	.then(_res => { 
	     		firebase.auth().currentUser.sendEmailVerification();
	     		this.updateUserData(_res.user);
	       		resolve(_res);
	     	}, err => reject(err))
	   });
	}

	doLoginWithEmailAndPassword(_value){
	    return new Promise<any>((resolve, reject) => {
	     	firebase.auth().signInWithEmailAndPassword(_value.email, _value.password)
	     	.then(res => {
	       		resolve(res);
	     	}, err => reject(err))
	   });
	} 


	doGoogleLogin(){
		return new Promise<any>((resolve, reject) => {
		    let provider = new firebase.auth.GoogleAuthProvider();
		    provider.addScope('profile');
		    provider.addScope('email');
		    this.firebaseAuth.auth.signInWithPopup(provider)
		    .then(res => {
		      resolve(res);
		      this.updateUserData(res.user);
		    })
		});
	}

	doFacebookLogin(){
		return new Promise<any>((resolve, reject) => {
		    let provider = new firebase.auth.FacebookAuthProvider();
		    // provider.addScope('profile');
		    // provider.addScope('email');
		    this.firebaseAuth.auth.signInWithPopup(provider)
		    .then(res => {
		      resolve(res);
		      this.updateUserData(res.user);
		    })
		});
	}

	 private updateUserData(user) {
	    // Sets user data to firestore on login

	    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

	    const data: User = {
	      uid: user.uid,
	      email: user.email,
	      displayName: user.displayName,
	      photoURL: user.photoURL,
	      roles : {reader : true}
	    }

	    return userRef.set(data, { merge: true })

	  }


	logout() {
	    this.firebaseAuth.auth.signOut()
	    .then((res) => this.router.navigate(['/login']));
	  }
}