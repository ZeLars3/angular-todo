import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginValidator } from '../login.validator';
import { TodosService } from '../services/todos.service';

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


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private todoService: TodosService,
  ) {
    this.form = formBuilder.group({
      username: ['', Validators.required, LoginValidator.login],
      password: ['', Validators.required, LoginValidator.password]
    });
  }

  ngOnInit() {
  }

  public doSignIn() {

    if (this.form.invalid) {
      this.showInputErrors = true;
      return;
    }

    this.isBusy = true;
    this.hasFailed = false;

    this.form.value.username = this.username;
    this.form.value.password = this.password;

    this.router.navigate(['/todo']);

    // this.todoService
    //   .signIn(this.username, this.password)
    //   .subscribe(
    //     (response) => {
    //       this.auth.doSignIn(
    //         response.token,
    //         response.name
    //       );
    //       this.router.navigate(['todo']);
    //     },
    //     (error) => {
    //       this.isBusy = false;
    //       this.hasFailed = true;
    //     }
    //   );
  
  
  }
}
