import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../shared/services/auth.service";
import {User} from "../../shared/interfaces";
import {AdminService} from "../shared/services/admin.service";
import {ToastrService} from "ngx-toastr";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public errorEmail = [];
  form: FormGroup;
  public errorPassword = [];
  public errorName = [];
  public countrys:any

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  countryFormControl = new FormControl('', [
    Validators.required,
  ]);
  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);


  matcher = new MyErrorStateMatcher();
  constructor(
    public route: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toast:ToastrService
  ) {
    this.createForm()
  }

  ngOnInit(): void {
    if (localStorage.getItem('nyVladikTokenAdmin')){
      this.route.navigate(['/admin', 'dashboard'])
    }else {
      this.adminService.getCountry().subscribe(res =>{
        this.countrys = res
        console.log(res)
      },error => {
        console.log(error)
      })
    }
  }
  private createForm() {
    this.form = this.fb.group({
      country: new FormControl('', [
        Validators.required
      ]),

    })
  }
  onSubmit() {
    this.spinner.show()
    const user: User = {
      country_id:+this.countryFormControl.value,
      email: this.emailFormControl.value,
      phone: this.phoneFormControl.value,
      password: this.passwordFormControl.value,
      company:'test'

    }
    console.log(user)
    if (this.emailFormControl.status === 'VALID' && this.passwordFormControl.status === 'VALID'
      && this.phoneFormControl.status === 'VALID'&& this.countryFormControl.status === 'VALID'
    ) {
      this.auth.registration(user)
      this.spinner.hide()

      this.auth.registration(user).subscribe((res) => {
        console.log(res)
        this.toast.success(res.success)
        this.spinner.hide()
        // this.route.navigate(['/admin', 'dashboard'])
      }, error => {
        // console.log(error)
        // if (error.error.body) {
        //   this.errorPassword.push(error.error.body);
        // } else if (typeof error.error.errors.email[0] !== undefined) {
        //   this.errorPassword.push(error.error.errors.email[0]);
        // }
        //
        // this.spinner.hide()
      })
    } else {
      this.spinner.hide()
    }

  }
  password() {

  }
  email(){}

}
