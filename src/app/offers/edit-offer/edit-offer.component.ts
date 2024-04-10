import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offer-services/offers.service';
import { InputDataOffer } from '../types';
import { OfferValidationService } from '../offer-services/offer-validation.service';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/error-messages-module/error.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent {

}
