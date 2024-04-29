import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from '../error.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent implements OnInit {
  constructor(private errorService: ErrorService) {}

  errMessages: string[] = [];
  errorSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.errorSubscription = this.errorService.errMessages$.subscribe(
      (messages: string[]) => {
        this.errMessages = messages;
      }
    );
  }

  get errMessages$(): Observable<string[]> {
    return this.errorService.errMessages$;
  }

  close() {
    this.errorService.setError([]);
  }

  
}
