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

@Injectable({
  providedIn: 'root',
})
export class OfferValidationService {
  constructor(
    private fb: FormBuilder,
    private formVService: FormValidationService
  ) {}

  imgLinkRegex: string = '^https?://.*.(jpg|gif|png)$';

  formBuildValidators() {
    return this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
      ],
      destination: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      imglink: ['', [Validators.required, regexValidator(this.imgLinkRegex)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150),
        ],
      ],
      minpeople: [0],
      maxpeople: [0],
      peopleGroup: this.fb.group(
        {
          minpeople: [3, [Validators.required,minNumValueValidator(3)]],
          maxpeople: [4, [Validators.required]],
        },
        {
          validators: [
            pMaxGreatGroupValidator('minpeople','maxpeople')
          ],
        }
      ),
      price: [0, [Validators.required]],
      date: ['', [Validators.required]],
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
      maxlength: 'Description maximum 150 letters long!',
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
    },
    date: {
      required: 'Date is required!',
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
