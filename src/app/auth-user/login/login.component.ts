import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('email') emailModel!: NgModel;
  @ViewChild('password') passwordModel!: NgModel;

  isEmailFieldFocused: boolean = false;
  isPasswordFieldFocused: boolean = false;
  isFormReset: boolean = false; // Flag to track if the form has been reset

  constructor(private authService: AuthService) {}

  formSubmitHandler(form: NgForm) {
    if (form?.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const { email, password } = form?.value;
    //form.reset();
    this.isFormReset = true;
    form.setValue({ email: '', password: '' });

    this.authService.login(email, password);
  }

  onFocus(field: string) {
    if (field === 'email') {
      this.isEmailFieldFocused = true;
    } else if (field === 'password') {
      this.isPasswordFieldFocused = true;
    }
  }

  onBlur(field: string) {
    if (field === 'email') {
      this.isEmailFieldFocused = false;
    } else if (field === 'password') {
      this.isPasswordFieldFocused = false;
    }
  }

  get emailErrorMessage(): string {
    if (this.isFormReset) {
      return '';
    }

    if (this.emailModel?.touched && !this.isEmailFieldFocused) {
      if (this.emailModel.errors?.['required']) {
        return 'Email is required!';
      }

      if (this.emailModel.errors?.['email']) {
        return `Email is not valid!`;
      }
    }

    return '';
  }

  get passwordErrorMessage(): string {
    if (this.isFormReset) {
      return '';
    }
    if (this.passwordModel?.touched && !this.isPasswordFieldFocused) {
      if (this.passwordModel.errors?.['required']) {
        return 'Password is required!';
      }

      if (this.passwordModel.errors?.['appMaxCount']) {
        return `Password is less than ${this.passwordModel.errors?.['appMaxCount']} characters!`;
      }
    }

    return '';
  }
}
