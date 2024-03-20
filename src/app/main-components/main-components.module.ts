import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavigationComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [HeaderComponent, FooterComponent],
})
export class MainComponentsModule {}
