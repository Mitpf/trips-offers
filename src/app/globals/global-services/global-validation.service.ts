import { Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ErrorDefinition, Message, ValidationError } from '../types/validation-errors';



@Injectable({
  providedIn: 'root',
})
export class GlobalValidationService {
  constructor() {}

  setValidErrMessages(
    messageObj: ErrorDefinition,
    controlName: string,
    messages: Message[]
  ): void {
    if (!messageObj[controlName]) {
      messageObj[controlName] = {};
    }
    messages.forEach((validator) => {
      const validatorName = Object.keys(validator)[0];
      const message = validator[validatorName];
      messageObj[controlName][validatorName] = message;
    });
  }
  
  /* --------------------- */
  checkTouched(form: FormGroup, names: string[],errMessages: ValidationError[],callback:()=>void) {
    names.forEach((name) => {
      const usernameControl = form.get(name);
      if (usernameControl?.touched) {
        callback()
      }
    });
  }

  
/* ---------------------- */
  /* -------------------------- */
}
