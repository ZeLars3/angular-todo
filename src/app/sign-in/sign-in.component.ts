import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginValidator } from '../login.validator';
import { TodosService } from '../services/todos.service';
import { TodoValidator } from '../todo-validator';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public form: FormGroup;

  public isBusy = false;
  public hasFailed = false;
  public showInputErrors = false;
  public username = '';
  public error = '';
  public password = ''


  constructor( private formBuilder: FormBuilder, private router: Router,) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, LoginValidator.login]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), LoginValidator.password])
    });
  }

  public doSignIn() {

    if (this.form.invalid) {
      this.showInputErrors = true;
      return;
    }

    this.isBusy = true;
    this.hasFailed = false;

    this.router.navigate(['/todo']);
  }
}
