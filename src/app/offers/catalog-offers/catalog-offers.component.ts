import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offer-services/offers.service';
import { UtilService } from 'src/app/app-services-utils/util.service';
import { OfferDB } from '../types';

@Component({
  selector: 'app-catalog-offers',
  templateUrl: './catalog-offers.component.html',
  styleUrls: ['./catalog-offers.component.css'],
})
export class CatalogOffersComponent implements OnInit {
  constructor(private offerService: OffersService) {}

  allOffers: OfferDB[] = [];
  loggedUserID: string = '';

  ngOnInit(): void {
    this.loggedUserID = UtilService.getUserData()?.userId;

    this.offerService.getAllOffers().subscribe((data: any) => {
      if (data) {
        this.allOffers = data.results;
      }
    });
  }

  
}
