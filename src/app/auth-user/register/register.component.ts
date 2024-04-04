import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../utils/email-validator';
import { EMAIL_DOMAINS } from '../constants/email-domains';
import { matchPassValidator } from '../utils/password-matcher';
import { GlobalValidationService } from '../../globals/global-services/global-validation.service';
import {
  ErrorDefinition,
  ValidationError,
} from '../../globals/types/validation-errors';
import { FormValidatonService } from '../../globals/global-services/form-validaton.service';
import { EMAIL_PROVIDERS } from '../constants/email-providers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent  {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private glValidService: GlobalValidationService,
    private formVService: FormValidatonService
  ) {}

 
   //#-----VALIDATION------- 
  //$_______________________
 
  /* Setting validators to controls */
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [Validators.required, emailValidator(EMAIL_DOMAINS, EMAIL_PROVIDERS)],
    ],
    password: [''],
    repass: [''],
    pswGroup: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        repass: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [matchPassValidator('password', 'repass')],
      }
    ),
  });

  /* Define messages errors for any case control-validator */
  private defErrMessages: ErrorDefinition = {
    username: {
      required: 'Username is required!',
      minlength: 'Username minimum 3 letters long!',
    },
    email: {
      required: 'Email is required!',
      emailValidator: 'Email is not valid!',
    },
    password: {
      required: 'Password is required!',
      minlength: 'Password must be at least 6 characters long',
    },
    repass: {
      required: 'Repass is required!',
      minlength: 'Repass must be at least 6 characters long',
    },
    pswGroup: {
      matchPassValidator: "Passwords doesn't match!",
    },
  };

  getErrMessage(): ValidationError[] {
    return this.formVService.updateErrors(this.form, this.defErrMessages);
  }
 

  hasErr(name: string) {  
    return this.getErrMessage().some((err) => err.name == name);
  }


  isTouched(nameControl: string) {
    return !!this.form.get(nameControl)?.touched;
  }

  isDirtFGcontrol(groupName: string, nameControl: string) {
    return this.form.get(groupName)?.get(nameControl)?.dirty;
  }

  /*//# --------------------- */
  /*//$ ----- $REGISTER------- */
  /*//# --------------------- */

  register(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, username } = this.form.value;
    const password = this.form.value.pswGroup?.password;

    if (
      typeof email == 'string' &&
      typeof username == 'string' &&
      typeof password == 'string'
    ) {
      this.authService.register(email, username, password);
    }
  }

  /*  ------ */
}
