import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile' },
      {
        path: ':userId',
        children: [
          { path: 'favorites', component: FavoritesComponent },
          { path: 'profile', component: ProfileComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
