import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service'; 
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import {User , Roles} from '../interface/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user : any;
  public userList = []; 

  public categories = [];

  constructor( private authService :AuthService, private afs: AngularFirestore) {
  
  } 


	public getLoggedInUserDetails(){ 
	  	this.authService.user.subscribe(_res=>{ 
	  		if(_res && _res.uid){
	  			let userDocRef = this.afs.firestore.collection(`users`).doc(_res.uid);
	  		 
		  		userDocRef.get().then(doc=> {
				    if (doc.exists) {
				        console.log("Document data:", doc.data());
				        this.user = doc.data();
				    } else { 
				        console.log("No such document!");
				    }
				}).catch(error=> {
				    console.log("Error getting document:", error);
				});
	  		}
	  		
	  	});
	}


  	getAllUsers(){
  		let userDoc = this.afs.firestore.collection(`users`);
		userDoc.get().then((querySnapshot) => { 
	   		querySnapshot.forEach((doc) => {  
	        	this.userList.push(doc.data()); 
	   		});
	   
		});
  	}

  	public getAllCategories(){ 
	  	let categoryDoc = this.afs.firestore.collection('categories');
		categoryDoc.get().then((querySnapshot) => { 
		   querySnapshot.forEach((doc) => {  
		        let _temp = {
		        	id : doc.id, 
		        	data : doc.data()
		        }
		        this.categories.push(_temp);
		        console.error("1", this.categories); 
		   });
		   
		});	
	}
}
