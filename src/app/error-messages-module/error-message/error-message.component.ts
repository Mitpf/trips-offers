/* import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent implements OnInit {
  constructor(private errorService: ErrorService) {}

  errMessages: string[] = [];

  ngOnInit(): void {
    this.errorService.apiErrors$.subscribe((err: any) => {
      if (err) {
        this.errMessages = [
          `Error: code-${err.error.code}`,
          `${err.error.error}`,
          `general message: ${err.message}`,
          ` status: ${err.status}`,
        ];
      }
    });
  }
} */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from '../error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
  constructor(private errorService: ErrorService) {}

  errMessages: string[] = [];
  errorSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.errorSubscription = this.errorService.apiErrors$.subscribe(
      (err: any) => {
        if (err) {

          if(err.error?.code){
            this.errMessages.push(`Error: code-${err.error?.code}`);
          }
          if(err.error?.error){
            this.errMessages.push(err.error?.error);
          }
          if(err.message){
            this.errMessages.push(`general message: ${err.message}`);
          }
          if(err.status){
            this.errMessages.push(` status: ${err.status}`);
          }

        }
      }
    );
  }

  close(){
    this.errMessages = [];
  }

  ngOnDestroy(): void {
    console.log('Error Message Component destroyed');
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
      
    }
    
    this.errMessages = [];
  }
}
