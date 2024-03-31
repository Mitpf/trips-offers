import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from '../utils/email-validator';
import { EMAIL_DOMAINS } from '../constants/email-domains';
import { matchPassValidator } from '../utils/password-matcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    password: ['',],
    repass: ['',],
    pswGroup: this.fb.group(
      {
        password: ['', [Validators.required,Validators.minLength(6)]],
        repass: ['', [Validators.required,Validators.minLength(6)]],
      },
      {
        validators:[matchPassValidator('password','repass')],
      }
    ),
  });
  //controls

  register(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
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
