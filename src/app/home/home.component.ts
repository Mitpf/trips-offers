import { Component } from '@angular/core';
import { AuthService } from '../auth-user/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  get isLoggedUser() {
    return AuthService.isLoggedUser();
  }

}
