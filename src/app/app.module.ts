import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'; 

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule} from './shared/modules/matModule'; 

import { AngularFireModule,FirebaseOptionsToken  } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { CreationComponent } from './components/creation/creation.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ResolveService } from './shared/services/resolve.service';
import { TrimPipe } from './shared/pipes/trim.pipe';

const appRoutes: Routes = [
  {
    path       : '',  // Default page is submitted apps
    redirectTo : "/login",
    pathMatch  : 'full'
  },
  {
    path     : 'login',   
    component: LoginComponent,  
  }, 
  {
    path     : 'dashboard',   
    component: DashboardComponent, 
    resolve  : { initData: ResolveService }
  }, 
  {
    path     : 'creation',   
    component: CreationComponent, 
    // resolve  : { initData: DataResolverService }
  }];
 

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    CreationComponent,
    TrimPipe
  ],
  imports: [
    BrowserModule, AngularFireModule.initializeApp(environment.firebase),
    RouterModule, FormsModule, ReactiveFormsModule, MaterialModule,
    BrowserAnimationsModule,FlexLayoutModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features 
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload', useHash: true}), ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// https://webdesign.tutsplus.com/articles/15-inspiring-examples-of-css-animation-on-codepen--cms-23937