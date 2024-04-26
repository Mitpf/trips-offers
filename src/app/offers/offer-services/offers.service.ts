import { Injectable } from '@angular/core';
import { UtilService } from '../../app-services-utils/util.service';
import { InputDataOffer } from '.././types';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OffersService {

  constructor(
    
    private router: Router,
    private http: HttpClient
  ) {}

  /* ---- */
  /* {__type: 'Pointer',className: '_User',objectId: userId,}; */

  addOffer(data: InputDataOffer) {
    const userId = UtilService.getUserData()?.userId;
    const isoDate = new Date(data.date).toISOString();

    const dateObj = { __type: 'Date', iso: isoDate };

    const owner = UtilService.createPointer('_User', userId);

    const dataOffer = { ...data, date: dateObj, owner };

    return this.http.post('/api/classes/offers', dataOffer);
  }

  getAllOffers() {
    return this.http.get('/api/classes/offers');
  }

  getOneOffer(offerId: string) {
    return this.http.get(`/api/classes/offers/${offerId}`);
  }

  deleteOneOffer(offerId: string) {
    return this.http.delete(`/api/classes/offers/${offerId}`);
  }

  updateOneOffer(offerId: string, data: InputDataOffer) {
    const userId = UtilService.getUserData()?.userId;
    const isoDate = new Date(data.date).toISOString();

    const dateObj = { __type: 'Date', iso: isoDate };

    const owner = UtilService.createPointer('_User', userId);

    const dataOffer = { ...data, date: dateObj /* owner */ };

    return this.http.put(`/api/classes/offers/${offerId}`, dataOffer);
  }

  getAllOffersByOneUser(userId: string) {
    const encodedQuery = encodeURIComponent(
      `{"owner":{"__type":"Pointer","className":"_User","objectId":"${userId}"}}`
    );
    return this.http.get(`/api/classes/offers?where=${encodedQuery}`);
  }

  /* --- */
}
