import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appMaxCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MaxCountDirective,
      multi: true,
    },
  ],
})
export class MaxCountDirective implements Validator {
  constructor() {}
  @Input() appMaxCount: number | undefined;
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    
    console.log(control.value);
    console.log(this.appMaxCount);

    const len = control.value?.length || 0;

    if (!this.appMaxCount || len >= this.appMaxCount) {
      return null;
    }

    return { appMaxCount: this.appMaxCount };

  }
}
