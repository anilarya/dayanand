import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mode = new FormControl('over');
  formControl = '';
  shouldRun = true; 
  userDetails :any;

	constructor(private authService :  AuthService) {
	  	
	}

  	logoutFn(){
  		this.authService.logout();
  	}

  	ngOnInit() {
  		this.authService.user.subscribe(_res=>{
    		console.error("login page", _res);
    		this.userDetails = _res;
    	});
  	}

}
