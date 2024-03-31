import { ValidatorFn } from '@angular/forms';

export const matchPassValidator = (
  passControlName: string,
  repassControlName: string
): ValidatorFn => {
  return (control) => {
    const passControl = control.get(passControlName);
    const repassControl = control.get(repassControlName);

    const isMatched = passControl?.value == repassControl?.value;
    return isMatched ? null : { matchPassValidator: true };
  };
};
