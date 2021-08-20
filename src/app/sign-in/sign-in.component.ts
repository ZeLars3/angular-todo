import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginValidator } from './login.validator';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  isBusy = false;
  username = '';
  error = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        LoginValidator.login,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        LoginValidator.password,
      ]),
    });
  }

  doSignIn() {
    if (this.form.invalid) {
      return;
    }
    this.isBusy = true;
    this.router.navigate(['/todo']);
  }

  login() {
    if (this.form.valid) {
      this.form.getRawValue();
      this.authService.sendToken(this.form.value.username);
      this.router.navigate(['/todo']);
    }
  }
}
