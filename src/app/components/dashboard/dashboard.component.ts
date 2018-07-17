import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  	constructor(private userService : UserService) { }

  	ngAfterViewInit() {  
  		console.error(this.userService.categories);
  	}

}


//https://github.com/MurhafSousli/ngx-sharebuttons/blob/master/README_V5.md