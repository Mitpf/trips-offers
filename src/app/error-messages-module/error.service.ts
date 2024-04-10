import { Injectable } from '@angular/core';
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
}
