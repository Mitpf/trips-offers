/* import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}

  private apiErrorsB$$ = new BehaviorSubject(null);
  public apiErrors$=this.apiErrorsB$$.asObservable();

  setError(error: any): void {
    
      this.apiErrorsB$$.next(error);
    
    
  }
} */


/* -------- */


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
    // Тук може да добавите логика за обработка на грешката, ако е необходимо
    // Например, извличане на съобщения за грешка от обекта с грешката
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