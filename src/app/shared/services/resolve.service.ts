import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from "rxjs"; 
import { forkJoin } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ResolveService implements Resolve<any>{

  constructor(private userService : UserService) { }

  resolve(route: ActivatedRouteSnapshot) { 
  		// let _appid = route.paramMap.get('appid'), 
  		// _masterList = this.Data.getMasterList().catch((e: any) => Observable.throw(this.handleError(e))) ,
    //     _web2PyVariables = this.Data.web2PyBasicVariables().catch((e: any) => Observable.throw(this.handleError(e))),
  		// _appDetails : Observable<any>,
  		let _observableList = [this.userService.categories, this.userService.user];

  		// if(_appid){
  		// 	_appDetails = this.Data.getappDetails(_appid).catch((e: any) => Observable.throw(this.handleError(e)));
  		// 	_observableList.push(_appDetails);
  		// }  
	    return  _observableList
    }
}
