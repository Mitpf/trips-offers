import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ErrorDefinition, ValidationError } from '../types/validation-errors';

@Injectable({
  providedIn: 'root'
})
export class FormValidatonService {

  constructor() { }

  /*  */
  updateErrors(form: FormGroup, defErrMessages: ErrorDefinition): ValidationError[] {
    const validErrMessages: ValidationError[] = [];
    if (form) {
      this.processControl(form, '', validErrMessages, defErrMessages);
    }
    
    return validErrMessages;
  }

  private processControl(control: AbstractControl, groupName: string, validErrMessages: ValidationError[], defErrMessages: ErrorDefinition): void {
    
    if (control instanceof FormGroup) {
      // check for active errors of group
      if (control.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          validErrMessages.push({
            name: groupName,
            message: defErrMessages[groupName]?.[errorKey] || 'no Validation error message!',
          });
        });
      }
      
      //  check for subcontrols
      Object.keys(control.controls).forEach((controlName) => {
        const subControl = control.get(controlName);
        if (subControl) {
          // recursive invoke
          this.processControl(subControl, controlName, validErrMessages, defErrMessages);
        }
      });
    } else {
      // check for active errors of current control
      if (control && control.invalid && (control.dirty || control.touched)) {
        const errors: ValidationErrors | null = control.errors;
        if (errors) {
          Object.keys(errors).forEach((errorKey) => {
            validErrMessages.push({
              name: groupName,
              message: defErrMessages[groupName]?.[errorKey] || 'no Validation error message!',
            });
          });
        }
      }
    }
    
  }


}

