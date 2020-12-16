import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { NotFoundComponent } from './not-found/not-found.component'
import { ListAppareilComponent } from './list-appareil/list-appareil.component';
import { UserProfileComponent } from './user-profile/user-profile.component'

const routes: Routes = [
  {
    path: '',
    component: ListAppareilComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: UserProfileComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
