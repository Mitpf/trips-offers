import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  FormBuilder,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { emailValidator } from '../utils/email-validator';
import { EMAIL_DOMAINS } from '../constants/email-domains';
import { matchPassValidator } from '../utils/password-matcher';
import { GlobalValidationService } from 'src/app/globals/global-services/global-validation.service';
import {
  ErrorDefinition,
  ValidationError,
} from 'src/app/globals/types/validation-errors';
import { FormValidatonService } from 'src/app/globals/global-services/form-validaton.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private glValidService: GlobalValidationService,
    private formVService: FormValidatonService
  ) {}

  inpvalidErrors: ValidationError[] = [];

  /* Setting validators to controls */
  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
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
      minlength: 'Username minimum 6 letters long!',
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

  /* update message array with active validation err messages */

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.inpvalidErrors = this.formVService.updateErrors(
        this.form,
        this.defErrMessages
      );
    });
  }

  /* udpate err-messages according touching event for every control/input/group , udpate arr-err-message  */
  ngDoCheck() {
    this.glValidService.checkTouched(
      this.form,
      ['username', 'email', 'password', 'repass', 'pswGroup'],
      this.inpvalidErrors,
      this.formVService.updateErrors.bind(
        this.formVService,
        this.form,
        this.defErrMessages
      )
    );

    this.inpvalidErrors = this.formVService.updateErrors(
      this.form,
      this.defErrMessages
    );

    console.log(this.inpvalidErrors);
  }

  hasErr(name: string) {
    return this.inpvalidErrors.some((err) => err.name == name);
  }

  /* ----- */

  register(): void {
    if (this.form.invalid) {
      return;
    }

    //console.log(this.form.value);
  }

  /* register(
    e: Event,
    email: string,
    username: string,
    password: string,
    repassword: string
  ) {
    this.authService.register(e, email, username, password, repassword);
  } */
}
