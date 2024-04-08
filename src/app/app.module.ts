import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalsModule } from './globals/globals.module';
import { MainComponentsModule } from './main-components/main-components.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { HomeComponent } from './home/home.component';
import { LoggedUserModule } from './logged-user/logged-user.module';
import { OffersModule } from './offers/offers.module';
import { ErrorMessagesModule } from './error-messages/error-messages.module';
import { appInterceptorProvider } from './app.interceptor';


@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    GlobalsModule,
    MainComponentsModule,
    AuthUserModule,
    LoggedUserModule,
    OffersModule,
    ErrorMessagesModule,
    AppRoutingModule,
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
