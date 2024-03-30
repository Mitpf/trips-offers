import { ValidatorFn } from '@angular/forms';

export const emailValidator = (domains: string[]): ValidatorFn => {
  const domainString = domains.join('|');
  const regExp = new RegExp(`[A-Za-z0-9]+@gmail\.(${domainString})`);

  return (control) => {
    const isEmailInvalid = control.value === '' || regExp.test(control.value);

    console.log('Test Regex', isEmailInvalid, 'control value: ', control.value);

    return isEmailInvalid ? null : { emailValidator: true };
  };
};
