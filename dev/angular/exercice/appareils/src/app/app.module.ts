import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AuthGuard } from './auth.guard'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppareilComponent } from './appareil/appareil.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppareilService } from './services/appareil.service';
import { AuthService } from './services/authentication.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { ListAppareilComponent } from './list-appareil/list-appareil.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const config = {
}

@NgModule({
  declarations: [
    AppComponent,
    AppareilComponent,
    NotFoundComponent,
    ListAppareilComponent,
    NavigationBarComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    AppareilService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
