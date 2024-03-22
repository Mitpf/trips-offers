import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalComponentsModule } from './global-components/global-components.module';
import { MainComponentsModule } from './main-components/main-components.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { OffersModule } from './offers/offers.module';
import { ErrorMessagesModule } from './error-messages/error-messages.module';
import { ProfileComponent } from './user/profile/profile.component';
import { FavoritesComponent } from './user/favorites/favorites.component';
import { CreateOfferComponent } from './offers/create-offer/create-offer.component';
import { OfferRoutingModule } from './offers/offers-routing.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    GlobalComponentsModule,
    MainComponentsModule,
    AuthUserModule,
    UserModule,
    OffersModule,
    ErrorMessagesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
