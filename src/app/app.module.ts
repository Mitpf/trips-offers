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

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    GlobalComponentsModule,
    MainComponentsModule,
    AuthUserModule,
    UserModule,
    OffersModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
