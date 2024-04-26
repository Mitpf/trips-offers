import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error-messages-module/error.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

constructor(
  private errService:ErrorService
){}

errMessages: string[] = [];
errorSubscription: Subscription | undefined;

  title = 'trips-offers';

  ngOnInit(): void {
    
    this.errorSubscription = this.errService.errMessages$.subscribe(
      (messages: string[]) => {
        this.errMessages = messages;
      }
    );

  }


  get errMessages$(): Observable<string[]> {
    return this.errService.errMessages$;
  }
}
