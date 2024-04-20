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

    return this.apiService.post('/api/classes/offers', dataOffer);
  }

  getAllOffers() {
    return this.apiService.get('/api/classes/offers');
  }

  getOneOffer(offerId: string) {
    return this.apiService.get(`/api/classes/offers/${offerId}`);
  }

  deleteOneOffer(offerId: string) {
    return this.apiService.delete(`/api/classes/offers/${offerId}`);
  }

  updateOneOffer(offerId: string, data: InputDataOffer) {
    const userId = UtilService.getUserData()?.userId;
    const isoDate = new Date(data.date).toISOString();

    const dateObj = { __type: 'Date', iso: isoDate };

    const owner = UtilService.createPointer('_User', userId);

    const dataOffer = { ...data, date: dateObj /* owner */ };

    return this.apiService.put(`/api/classes/offers/${offerId}`, dataOffer);
  }

  getAllOffersByOneUser(userId:string) {
    const encodedQuery = encodeURIComponent(
      `{"owner":{"__type":"Pointer","className":"_User","objectId":"${userId}"}}`
    );
    return this.apiService.get(
      `/api/classes/offers?where=${encodedQuery}` 
    );

  }

  /* --- */
}
