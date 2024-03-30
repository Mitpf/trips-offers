import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(form: NgForm) {

    if (form.invalid) {
      return;
    }

console.log(form.value)

  }
}

/* 
login(email: string, password: string) {
    this.authService.login(email, password);
  }
*/
