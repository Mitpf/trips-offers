import { ValidatorFn } from '@angular/forms';

export const minNumValueValidator = (minValue: number): ValidatorFn => {
  return (control) => {
    const isLessMinimum = Number(control?.value) < minValue;

    return isLessMinimum ? { minNumValueValidator: true } : null;
  };
};
