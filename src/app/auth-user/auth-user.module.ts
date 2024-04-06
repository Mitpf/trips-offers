import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailDirective } from './validation-directives/email.directive';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, EmailDirective],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [LoginComponent, RegisterComponent, EmailDirective,ReactiveFormsModule],
})
export class AuthUserModule {}
