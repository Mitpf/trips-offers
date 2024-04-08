import { Injectable } from '@angular/core';
import { ApiService } from '../../app-services-utils/api.service';
import { UtilService } from '../../app-services-utils/util.service';
import { InputDataOffer } from '.././types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private apiService: ApiService, private router: Router) {}

  /* ---- */
  /* {__type: 'Pointer',className: '_User',objectId: userId,}; */

  addOffer(data: InputDataOffer) {
    const userId = UtilService.getUserData()?.userId;
    const isoDate = new Date(data.date).toISOString();

    const dateObj = { __type: 'Date', iso: isoDate };

    const owner = UtilService.createPointer('_User', userId);

    const dataOffer = { ...data, date: dateObj, owner };

    this.apiService.post('/api/classes/offers', dataOffer).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/offers-catalog');
      },
      error: (error) => {
        console.error('Add new offer failed:', error);
        alert(
          'Add new offer failed:' + '\n' + error.error + '\n' + error.message
        );
      },
    });
  }



  /* --- */
}
