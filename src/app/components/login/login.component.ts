import { Component, OnInit } from '@angular/core';
import '../../../assets/js/login-animation.js';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

    email: string;
    password: string;

    userDetails : any ;

    ngAfterViewInit() {
    	(window as any).initialize();
  	}

    constructor(private authService : AuthService, private router: Router,
    	private firebaseAuth: AngularFireAuth, private userService:  UserService) { 
    	
    	authService.user.subscribe(_res=>{
    		console.error("login page", _res);
    		this.userDetails = _res;
    	});

    	userService.getLoggedInUserDetails();
    }
 
    login(){
    	let _data= {
	    	email : this.email,
	    	password : this.password
	    }
	  	this.authService.doLoginWithEmailAndPassword(_data)
	  		.then(res => {
		    console.error("You are loggedIn", res, this.authService.user);
		    this.router.navigate(['dashboard']);
		}, err => {
		    console.log(err); 
		})
	}

	googleLogin(){
		this.authService.doGoogleLogin()
	  		.then(res => {
		    console.error("You are loggedIn with google", res, this.authService.user);
		    this.router.navigate(['dashboard']);
		}, err => {
		    console.log(err); 
		})
	}

	facebookLogin(){
		this.authService.doFacebookLogin()
	  		.then(res => {
		    console.error("You are loggedIn with google", res, this.authService.user);
		    this.router.navigate(['dashboard']);
		}, err => {
		    console.log(err); 
		})
	}


	signup(){
		let _data= {
	    	email : this.email,
	    	password : this.password
	    }

	    this.authService.doRegisterWithEmailAndPassword(_data)
		  .then(res => {
		    console.error("User created successfully", res, this.authService.user);
		    
		    // this.authService.user.subscribe(_res=>{
		    // 	console.error(_res)
		    // })
		}, err => {
		    console.log(err); 
		})
	}
}
