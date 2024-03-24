import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/app-services-utils/util.service';
import { AuthService } from 'src/app/auth-user/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(private authService: AuthService) {}

  get isLoggedUser() {
    return AuthService.isLoggedUser();
  }

  get userInfo() {
    return UtilService.getUserData();
  }

  logout() {
    console.log('LOGOUT user');
    this.authService.logout();
  }
}
