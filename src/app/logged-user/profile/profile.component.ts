import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/app-services-utils/api.service';
import { UtilService } from 'src/app/app-services-utils/util.service';
import { OffersService } from 'src/app/offers/offer-services/offers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private offerService: OffersService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    console.log('asdf');

    this.offerService
      .getAllOffersByOneUser('PGm9J4ARoB')
      .subscribe((data) => console.log(data));
  }
}
