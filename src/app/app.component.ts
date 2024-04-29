import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error-messages-module/error.service';
import { Observable, Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private errService: ErrorService, private router: Router) {}

  title = 'trips-offers';

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.errService.setError([]);
      }
    });
  }
}
