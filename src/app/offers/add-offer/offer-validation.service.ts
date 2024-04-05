import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ErrorDefinition,
  ValidationError,
} from '../../globals/types/validation-errors';
import { FormValidationService } from '../../globals/global-services/form-validation.service';

@Injectable({
  providedIn: 'root',
})
export class OfferValidationService {
  constructor(
    private fb: FormBuilder,
    private formVService: FormValidationService
  ) {}

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
      imglink: ['', [Validators.required /* TODO img link validation */]],
      description: ['', [Validators.required]],
      minpeople: [0],
      maxpeople: [0],
      peopleGroup: this.fb.group(
        {
          minpeople: [0, [Validators.required]],
          maxpeople: [0, [Validators.required]],
        },
        {
          validators: [
            /* todo peopleValidator */
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
      required: 'imglink is required!',
    },
    description: {
      required: 'description is required!',
    },
    minpeople: {
      required: 'minpeople is required!',
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
      todovalidator: "Max people >= minpeople",
    },
  };

  /* return array with activated errors messages */
  getErrMessages(form: FormGroup): ValidationError[] {
    return this.formVService.updateErrors(form, this.errMessagesDefinitions);
  }

  /* --- */
}
