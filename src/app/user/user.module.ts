import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [ProfileComponent, FavoritesComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
