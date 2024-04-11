import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth-user/login/login.component';
import { RegisterComponent } from './auth-user/register/register.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './logged-user/favorites/favorites.component';
import { Page404Component } from './page-404/page-404.component';
import { ErrorMessageComponent } from './error-messages-module/error-message/error-message.component';
import { isGuestActivate } from './route-gurads/isguest.activate';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent,canActivate:[isGuestActivate] },
  { path: 'register', component: RegisterComponent,canActivate:[isGuestActivate] },
  {path:'error',component: ErrorMessageComponent},
  /* { path: '**', redirectTo: '/404' }, */
  { path: '404', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
