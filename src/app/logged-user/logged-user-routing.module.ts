import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { Page404Component } from '../page-404/page-404.component';


const routes: Routes = [
  {
    path: 'user/:userId/favorites',
    component: FavoritesComponent,
  },
  {
    path: 'user/:userId/profile',
    component: FavoritesComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedUserRoutingModule {}
