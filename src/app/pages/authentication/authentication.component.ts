import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  form: FormGroup;

  constructor(
    public as: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  get passwordControl() {
    return this.form.get('password') as FormControl;
  }

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async loginEmailAndPassword() {
    await this.as.loginEmailAndPassword(
      this.form.get('email').value,
      this.form.get('password').value
    );
    this.router.navigate(['/playlist']);
  }

  async loginGoogle() {
    await this.as.loginGoogle();
    this.router.navigate(['/playlist']);
  }

  toRegisterPage() {
    this.router.navigate(['/register']);
  }
}
