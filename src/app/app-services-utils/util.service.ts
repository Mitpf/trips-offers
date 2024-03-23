import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  static setUserData(data: Object) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  static getUserData() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString !== null) {
      return JSON.parse(userDataString);
    }
    return null; 
  }
}
