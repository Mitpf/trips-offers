import { Injectable } from '@angular/core';
import { ApiService } from '../app-services-utils/api.service';
import { UtilService } from '../app-services-utils/util.service';
import { InputDataOffer } from './types';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private apiService: ApiService) {}

  /* ---- */
  /* {__type: 'Pointer',className: '_User',objectId: userId,}; */

  addOffer(data: InputDataOffer) {
    
    const userId = UtilService.getUserData()?.userId;
    const isoDate = new Date(data.date);

    const dateObj = { __type: 'Date', iso: isoDate };

    const owner = UtilService.createPointer('_User', userId);

    const dataOffer = { ...data, date: dateObj, owner };

    this.apiService.post('/classes/offers', dataOffer).subscribe(
      (data) => console.log('sss', data),
      (error) => {
        console.error('Add new offer failed:', error);
        alert(
          'Add new offer failed:' + '\n' + error.error.error + '\n' + error.message
        );
      }
    );
  }
}
