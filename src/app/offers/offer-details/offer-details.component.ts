import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { OfferDB } from '../types';
import { OffersService } from '../offer-services/offers.service';
import { UtilService } from 'src/app/app-services-utils/util.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private offerService: OffersService
  ) {}

  offer = {} as OfferDB;
  loggedUserID: string = '';

  ngOnInit(): void {
    this.loggedUserID = UtilService.getUserData()?.userId;

    this.activeRoute.params.subscribe((params) => {
      const offerId = params['offerId'];

      this.offerService.getOneOffer(offerId).subscribe((offerData: any) => {
        this.offer = offerData;
      });
    });
  }
}
