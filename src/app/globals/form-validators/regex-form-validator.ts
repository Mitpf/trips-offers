import { ValidatorFn } from '@angular/forms';

export const regexValidator = (regExpression: string): ValidatorFn => {
  const regExp = new RegExp(regExpression);
  return (control) => {
    const isControlValueInvalid =
      control.value === '' || regExp.test(control.value);

    return isControlValueInvalid ? null : { regexValidator: true };
  };
};
