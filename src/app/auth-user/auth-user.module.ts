import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmailDirective } from './validators/email.directive';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, EmailDirective],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [LoginComponent, RegisterComponent, EmailDirective],
})
export class AuthUserModule {}
