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
    const inpvalidErrors: ValidationError[] = [];
    if (form) {
      this.processControl(form, '', inpvalidErrors, defErrMessages);
    }
    
    return inpvalidErrors;
  }

  private processControl(control: AbstractControl, groupName: string, inpvalidErrors: ValidationError[], defErrMessages: ErrorDefinition): void {
    if (control instanceof FormGroup) {
      // check for active errors of group
      if (control.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          inpvalidErrors.push({
            name: groupName,
            message: defErrMessages[groupName]?.[errorKey] || 'no Validation error message!',
          });
        });
      }
      
      // all subcontrols
      Object.keys(control.controls).forEach((controlName) => {
        const subControl = control.get(controlName);
        if (subControl) {
          // recursive invoke
          this.processControl(subControl, controlName, inpvalidErrors, defErrMessages);
        }
      });
    } else {
      // check for active errors of current control
      if (control && control.invalid && (control.dirty || control.touched)) {
        const errors: ValidationErrors | null = control.errors;
        if (errors) {
          Object.keys(errors).forEach((errorKey) => {
            inpvalidErrors.push({
              name: groupName,
              message: defErrMessages[groupName]?.[errorKey] || 'no Validation error message!',
            });
          });
        }
      }
    }
  }


}

/* 
updateErrors(): void {
    this.inpvalidErrors = [];
    if (this.form) {
      this.processControl(this.form, '');
    }
  }

  private processControl(control: AbstractControl, groupName: string): void {
    if (control instanceof FormGroup) {
      // check for active errors of group
      if (control.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          this.inpvalidErrors.push({
            name: groupName,
            message:
              this.defErrMessages[groupName]?.[errorKey] ||
              'no Validation error message!',
          });
        });
      }

      // all subcontrols
      Object.keys(control.controls).forEach((controlName) => {
        const subControl = control.get(controlName);
        if (subControl) {
          // recursive invoke
          this.processControl(subControl, controlName);
        }
      });
    } else {
      // check for active errors of current control
      if (control && control.invalid && (control.dirty || control.touched)) {
        const errors: ValidationErrors | null = control.errors;
        if (errors) {
          Object.keys(errors).forEach((errorKey) => {
            this.inpvalidErrors.push({
              name: groupName,
              message:
                this.defErrMessages[groupName]?.[errorKey] ||
                'no Validation error message!',
            });
          });
        }
      }
    }
  }
*/