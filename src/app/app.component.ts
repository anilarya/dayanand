import { Component } from '@angular/core'; 
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private authService : AuthService,  private userService:  UserService) {

  } 

  ngOnInit() {
  		this.userService.getLoggedInUserDetails();  
  		this.userService.getAllCategories();
  	}

}
