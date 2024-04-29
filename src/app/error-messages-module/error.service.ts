
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  private apiErrorsB$$ = new BehaviorSubject<any>(null);
  public apiErrors$ = this.apiErrorsB$$.asObservable();

  private errMessagesB$$ = new BehaviorSubject<string[]>(null!);
  public errMessages$ = this.errMessagesB$$.asObservable();

  setError(error: any): void {
    this.apiErrorsB$$.next(error);
    this.errMessagesB$$.next(this.processError(error));
  }

  private processError(error: any): string[] {
   
    let messages: string[] = [];

    if (error?.error?.code) {
      messages.push(`Error: code-${error.error.code}`);
    }
    if (error?.error?.error) {
      messages.push(error.error.error);
    }
    if (error?.message) {
      messages.push(`general message: ${error.message}`);
    }
    if (error?.status) {
      messages.push(`status: ${error.status}`);
    }

    return messages;
  }
}