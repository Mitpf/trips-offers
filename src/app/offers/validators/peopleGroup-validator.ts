import { ValidatorFn } from '@angular/forms';

export const pMaxGreatGroupValidator = (
    minPControlName: string,
    maxPControlName: string
): ValidatorFn => {
  return (control) => {
    const minPeopleControl = control.get(minPControlName);
    const maxPeopleControl = control.get(maxPControlName);

    const isMaxGreater = maxPeopleControl?.value > minPeopleControl?.value;
    return isMaxGreater ? null : { pMaxGreatGroupValidator: true };
  };
};
