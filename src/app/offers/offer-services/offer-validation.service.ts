import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ErrorDefinition,
  ValidationError,
} from '../../globals/types/validation-errors';
import { FormValidationService } from '../../globals/global-services/form-validation.service';
import { regexValidator } from '../../globals/form-validators/regex-form-validator';
import { minNumValueValidator } from '../../globals/form-validators/minvalue-form-validator';
import{pMaxGreatGroupValidator} from '../../offers/validators/peopleGroup-validator'
import { InputDataOffer } from '../types';

@Injectable({
  providedIn: 'root',
})
export class OfferValidationService {
  constructor(
    private fb: FormBuilder,
    private formVService: FormValidationService
  ) {}

  imgLinkRegex: string = '^https?://.*.(jpg|gif|png)$';

  formBuildValidators(initInp:InputDataOffer) {
    return this.fb.group({
      name: [
        initInp.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      destination: [
        initInp.destination,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      imglink: [initInp.imglink, [Validators.required, regexValidator(this.imgLinkRegex)]],
      description: [
        initInp.description,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(2000),
        ],
      ],
      minpeople: [0],
      maxpeople: [0],
      peopleGroup: this.fb.group(
        {
          minpeople: [initInp.minpeople, [Validators.required,minNumValueValidator(3)]],
          maxpeople: [initInp.maxpeople, [Validators.required]],
        },
        {
          validators: [
            pMaxGreatGroupValidator('minpeople','maxpeople')
          ],
        }
      ),
      price: [initInp.price, [Validators.required,minNumValueValidator(100)]],
      date: [initInp.date, [Validators.required]],
      durationDays: [initInp.durationDays, [Validators.required,Validators.required,minNumValueValidator(2)]],
    });
  }

  /* Define messages errors for any case control-validator */
  private errMessagesDefinitions: ErrorDefinition = {
    name: {
      required: 'Name is required!',
      minlength: 'Name minimum 3 letters long!',
      maxlength: 'Name maximum 40 letters long!',
    },
    destination: {
      required: 'destination is required!',
      minlength: 'destination minimum 3 letters long!',
      maxlength: 'destination maximum 20 letters long!',
    },
    imglink: {
      required: 'Imglink is required!',
      regexValidator: 'Not valid image link!',
    },
    description: {
      required: 'Description is required!',
      minlength: 'Description minimum 10 letters long!',
      maxlength: 'Description maximum 2000 letters long!',
    },
    minpeople: {
      required: 'minpeople is required!',
      minNumValueValidator:'Minimum is 3 people!'
    },
    maxpeople: {
      required: 'maxpeople is required!',
    },
    price: {
      required: 'Price is required!',
      minNumValueValidator:'Minimum price is 100$!'
    },
    date: {
      required: 'Date is required!',
    },
    durationDays: {
      required: 'Duration is required!',
      minNumValueValidator:'minimum is 2 days !'
    },

    peopleGroup: {
      pMaxGreatGroupValidator: 'Must Maxpeople >  minpeople!',
    },
  };

  /* return array with activated errors messages */
  getErrMessages(form: FormGroup): ValidationError[] {
    return this.formVService.updateErrors(form, this.errMessagesDefinitions);
  }

  /* --- */
}
