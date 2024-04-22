import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { LoggedUserRoutingModule } from './logged-user-routing.module';

@NgModule({
  declarations: [ProfileComponent, FavoritesComponent],
  imports: [CommonModule, LoggedUserRoutingModule],
  exports:[LoggedUserRoutingModule]
})
export class LoggedUserModule {}
