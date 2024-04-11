import { Injectable } from '@angular/core';
import { UserB4app } from '../globals/types/back4app';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  constructor() {}

  static setUserData(data: UserB4app) {
    const userId = data.objectId;
    localStorage.setItem('userData', JSON.stringify({ ...data, userId }));
  }

  static getUserData() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString !== null) {
      return JSON.parse(userDataString);
    }
    return null;
  }
  static isUserLogged() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString !== null) {
      return true;
    }
    return false;
  }

  static clearUserData() {
    localStorage.removeItem('userData');
  }

  static createPointer(className: string, objectId: string) {
    return { __type: 'Pointer', className, objectId };
  }

  static addOwnerPointer(record: Object, ownerId: string) {
    return { ...record, owner: this.createPointer('_User', ownerId) };
  }

  static addOwner(record:{owner:{}}, ownerId:string) {
    const data = Object.assign({}, record);
    data.owner = this.createPointer('_User', ownerId);
    return data;
  }

}
