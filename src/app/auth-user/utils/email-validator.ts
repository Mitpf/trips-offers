import { ValidatorFn } from '@angular/forms';
import { EMAIL_PROVIDERS } from '../constants/email-providers';

/* providers:string[] */



export const emailValidator = (domains: string[],providers: string[] ): ValidatorFn => {
  const domainString = domains.join('|');
  const providersString = providers.join('|');
  const regExp = new RegExp(`[a-z0-9]+@(${providersString})\.(${domainString})$`);

  return (control) => {
    const isEmailInvalid = control.value === '' || regExp.test(control.value);

    //console.log('Test Regex', isEmailInvalid, 'control value: ', control.value);

    return isEmailInvalid ? null : { emailValidator: true };
  };
};
