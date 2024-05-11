import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService {
  constructor() {}

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading$$.asObservable();

  setIsLoading() {
    this.isLoading$$.next(true);
  }

  stopIsLoading() {
    this.isLoading$$.next(false);
  }
}
