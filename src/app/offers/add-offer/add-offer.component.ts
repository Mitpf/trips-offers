import { Component } from '@angular/core';
import { OffersService } from '../offer-services/offers.service';
import { InputDataOffer } from '../types';
import { OfferValidationService } from '../offer-services/offer-validation.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
})
export class AddOfferComponent {
  constructor(
    private offerService: OffersService,
    private ofValidService: OfferValidationService
  ) {}

  form = this.ofValidService.formBuildValidators();

  /*//# errMessages -->> [{name: string, message: string}] */

  getErrMessages() {
    return this.ofValidService.getErrMessages(this.form);
  }

  hasErr(name: string) {
    return this.getErrMessages().some((err) => err.name == name);
  }

  getErrIn(name: string) {
    return this.getErrMessages().find((err) => err.name == name)?.message;
  }

  /* Post data to DB */
  addOffer() {
    if (this.form.invalid) {
      alert(this.getErrMessages().map(err=>err.message).join(' ')||'Form not filled!');
      return;
    }
    const { peopleGroup, ...rest } = this.form.value;

    const inputData = { ...rest, ...peopleGroup };

    this.offerService.addOffer(inputData as InputDataOffer);
  }
}
