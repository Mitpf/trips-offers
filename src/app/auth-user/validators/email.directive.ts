import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { emailValidator } from '../utils/email-validator';

@Directive({
  selector: '[appEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true,
    },
  ],
})
export class EmailDirective implements Validator {
  constructor() {}

  //@Input() appEmail: string[] = [];
  @Input() domains: string[] = [];
  @Input() providers: string[] = [];

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const validatorFn = emailValidator(this.domains, this.providers);
    return validatorFn(control);
    //return this.validator(control);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('changes', changes['appEmail']);

  //   const { currentValue } = changes['appEmail'];
  //   if (currentValue?.length) {
  //     this.validator = emailValidator(currentValue);
  //   }
  // }
}

/* contorl-ки са всички тези инпути на формата */
