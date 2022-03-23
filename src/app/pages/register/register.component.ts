import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/models/custom-validators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private as: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  get confirmPasswordControl() {
    return this.form.get('confirmPassword') as FormControl;
  }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group(
      {
        // email is required and must be a valid email email
        email: ['', [Validators.required, Validators.email]],
        confirmPassword: ['', Validators.compose([Validators.required])],
        password: [
          '',
          Validators.compose([
            // 1. Password Field is Required
            Validators.required,
            // 2. check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, { hasNumber: true }),
            // 3. check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // 4. check whether the entered password has a lower-case letter
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            // 5. Has a minimum length of 8 characters
            Validators.minLength(8),
          ]),
        ],
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator,
      }
    );
  }

  async register() {
    await this.as.register(
      this.form.get('email').value,
      this.form.get('password').value
    );
    this.router.navigate(['/auth']);
  }
}
