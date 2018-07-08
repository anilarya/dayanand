import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule} from './shared/modules/matModule'; 

const appRoutes: Routes = [
  {
    path       : '',  // Default page is submitted apps
    redirectTo : "/dashboard",
    pathMatch  : 'full'
  },
  {
    path     : 'login',   
    component: LoginComponent,  
  }, 
  {
    path     : 'dashboard',   
    component: DashboardComponent, 
    // resolve  : { initData: DataResolverService }

  }];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, RouterModule, FormsModule, ReactiveFormsModule, MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload', useHash: false}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
