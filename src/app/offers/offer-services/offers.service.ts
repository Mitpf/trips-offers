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

  getAllOffersByOneUser() {
    /* const encodedQuery = encodeURIComponent(
      `{"owner":{"__type":"Pointer","className":"_User","objectId":"${userId}"}}`
    );
    return this.apiService.get(
      'https://parseapi.back4app.com/classes/offers?where=' + encodedQuery
    ); */

    return this.apiService.get(
      'https://parseapi.back4app.com/classes/offers?where=%7B%22owner%22%3A%7B%22__type%22%3A%22Pointer%22%2C%22className%22%3A%22_User%22%2C%22objectId%22%3A%22PGm9J4ARoB%22%7D%7D'
    );
  }

  /* --- */
}
