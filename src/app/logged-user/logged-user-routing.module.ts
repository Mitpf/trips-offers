import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: 'user',

    children: [
      {
        path: ':userId',

        children: [
          { path: 'favorites', component: FavoritesComponent },
          { path: 'profile', component: ProfileComponent },
          { path: '**', redirectTo: '/404' },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggedUserRoutingModule {}
