import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { FormValidationService } from '../../globals/global-services/form-validation.service';
import { ValidationError } from '../../globals/types/validation-errors';
import { EMAIL_DOMAINS } from '../constants/email-domains';
import { EMAIL_PROVIDERS } from '../constants/email-providers';
import { emailValidator } from '../utils-validation/email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private formVService: FormValidationService
  ) {}

  // $ validation //
  inpvalidErrors: ValidationError[] = [];

  form = this.fb.group({
    email: [
      '',
      [Validators.required, emailValidator(EMAIL_DOMAINS, EMAIL_PROVIDERS)],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  

  getValidErrMessages(form: FormGroup, name: string): string {
    //#getControlName from control
    const formControl = form.get(name);
    const controls = formControl?.parent
      ? Object.keys(formControl.parent.controls)
      : [];
    const controlName =
      controls.length > 0
        ? controls.find((key) => this.form.get(key) == formControl)
        : '';

    if (
      formControl?.hasError('required') &&
      (formControl.dirty || formControl.touched)
    ) {
      return `${controlName} is required!`;
    }

    if (
      formControl?.hasError('minlength') &&
      (formControl.dirty || formControl.touched)
    ) {
      return `${controlName} minimun ${formControl.errors?.['minlength'].requiredLength} letters!`;
    }

    if (
      formControl?.hasError('emailValidator') &&
      (formControl?.dirty || formControl?.touched)
    ) {
      return 'Invalid email!';
    }
    return '';
  }

  getErrMessageIn = this.getValidErrMessages.bind(this, this.form);

  /* // # alternative way
   getErrMessageIn = (name: string) => {
     return this.getValidErrMessages(this.form, name);
   } */

  //$ Login

  login() {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;

    if (email && password) {
      this.authService.login(email, password);
    }
  }
}
