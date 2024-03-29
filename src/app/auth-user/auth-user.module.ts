import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaxCountDirective } from './max-count.directive';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, MaxCountDirective],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthUserModule {}
