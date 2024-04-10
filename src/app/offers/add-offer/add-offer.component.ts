import { Component, OnInit } from '@angular/core';
import { OffersService } from '../offer-services/offers.service';
import { InputDataOffer, OfferDB } from '../types';
import { OfferValidationService } from '../offer-services/offer-validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/error-messages-module/error.service';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
})
export class AddOfferComponent implements OnInit {
  //
  constructor(
    private offerService: OffersService,
    private ofValidService: OfferValidationService,
    private router: Router,
    private errService: ErrorService,
    private activeRoute: ActivatedRoute
  ) {}

  initOfferInputs: InputDataOffer = {
    name: '',
    destination: '',
    imglink: '',
    durationDays: 2,
    price: 100,
    minpeople: 3,
    maxpeople: 4,
    date: '',
    description: '',
  };

  form = this.ofValidService.formBuildValidators(this.initOfferInputs);
  descriptionText: string = '';
  isEditMode: boolean = false;

  ngOnInit() {
    this.form.get('description')?.valueChanges.subscribe((value) => {
      this.descriptionText = value || '';
    });

    const url = this.activeRoute.snapshot.url;
    const endpointUrl = url[url.length - 1].path;

    if (endpointUrl == 'edit') {
      this.isEditMode = true;

      this.activeRoute.params.subscribe((params) => {
        const offerId = params['offerId'];

        this.offerService.getOneOffer(offerId).subscribe((data: any) => {
          const {
            name,
            destination,
            imglink,
            durationDays,
            price,
            minpeople,
            maxpeople,
            date: { iso: date },
            description,
          } = data;

          this.initOfferInputs = {
            name,
            destination,
            imglink,
            durationDays,
            price,
            minpeople,
            maxpeople,
            date,
            description,
          };
          this.form = this.ofValidService.formBuildValidators(
            this.initOfferInputs
          );
        });
      });
    }

    /*  */
  }

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
    const { peopleGroup, ...rest } = this.form.value;

    const inputData = { ...rest, ...peopleGroup };

    this.offerService
      .addOffer(inputData as InputDataOffer)
      .subscribe(() => this.router.navigate(['offers-catalog']));
  }

  updateOffer() {
    const { peopleGroup, ...rest } = this.form.value;

    const inputData = { ...rest, ...peopleGroup };

    this.activeRoute.params.subscribe((params) => {
      const offerId = params['offerId'];

      this.offerService
        .updateOneOffer(offerId, inputData as InputDataOffer)
        .subscribe(() => this.router.navigate([`offer/${offerId}/details`]));
    });
  }

  handleSubmit() {
    if (this.form.invalid) {
      const message =
        this.getErrMessages()
          .map((err) => err.message)
          .join(' ') || 'Form not filled!';
      this.errService.setError({ message });
      return;
    }

    if (this.isEditMode) {
      this.updateOffer();
      return;
    } else {
      console.log('creating mode');

      this.addOffer();
    }
  }

  /* end class */
}
