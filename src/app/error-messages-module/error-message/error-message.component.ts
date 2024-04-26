import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from '../error.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  constructor(private errorService: ErrorService) {}

  @Input() messages: string[] = [];
  errMessages: string[] = [];
  errorSubscription: Subscription | undefined;

  ngOnInit(): void {
    console.log('ngOninit');

    this.errorSubscription = this.errorService.errMessages$.subscribe(
      (messages: string[]) => {
        this.errMessages = messages;
        console.log('ng on init: Error messages:', this.errMessages);
        //this.messages = messages;
      }
    );
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit rendered child');
    console.log('ngAfterViewInit Error messages:', this.errMessages);
  }

  get errMessages$(): Observable<string[]> {
    return this.errorService.errMessages$;
  }

  close() {
    this.errorService.setError([]);
  }

  ngOnDestroy(): void {
    console.log('on DESTROY works');
    this.errorService.setError([]);
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }
}
