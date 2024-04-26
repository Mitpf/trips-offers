import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { OfferDB } from '../types';
import { OffersService } from '../offer-services/offers.service';
import { UtilService } from 'src/app/app-services-utils/util.service';
import { ErrorService } from 'src/app/error-messages-module/error.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private offerService: OffersService,
    private router: Router,
    private errService: ErrorService
  ) {}

  offer = {} as OfferDB;
  loggedUserID: string = '';
  isOwner: boolean = false;

  ngOnInit(): void {
    this.errService.setError([
      {
        error: { code: 101, error: 'Object not found.' },
      },
    ]);
    this.loggedUserID = UtilService.getUserData()?.userId;

    this.activeRoute.params.subscribe((params) => {
      const offerId = params['offerId'];

      this.offerService.getOneOffer(offerId).subscribe((offerData: any) => {
        this.offer = offerData;
        this.isOwner =
          UtilService.getUserData()?.userId == offerData.owner.objectId;
      });
    });
  }

  deleteOffer(offerId: string) {
    this.offerService.deleteOneOffer(offerId).subscribe(() => {
      this.router.navigate(['offers-catalog']);
    });
  }
}
