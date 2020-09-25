import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public errorEmail = [];
  public errorPassword = [];
  public  errorName = [];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    public route: Router,
    private spinner: NgxSpinnerService,
    private auth:AuthService
  ) { }

  ngOnInit(): void {
  }

  password() {
    console.log('work')
  }

  onSubmit() {
    const user:User = {
      email:this.emailFormControl.value,
      password:this.passwordFormControl.value
    }
    this.auth.login(user).subscribe(()=>{
      this.route.navigate(['/admin','dashboard'])
    })
  }

  email() {
    console.log('email')
  }
}
