import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  register(
    e: Event,
    email: string,
    username: string,
    password: string,
    repassword: string
  ) {
    this.authService.register(e, email, username, password, repassword);
  }
}
