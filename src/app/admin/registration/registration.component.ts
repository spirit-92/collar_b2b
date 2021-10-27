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
  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  countryFormControl = new FormControl('', [
    Validators.required,
  ]);
  companyFormControl = new FormControl('', [
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
    if (localStorage.getItem('b2b_token')){
      this.route.navigate(['/'])
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
    const user: any = {
      country_id:+this.countryFormControl.value,
      email: this.emailFormControl.value,
      firstName: this.firstNameFormControl.value,
      lastName:this.lastNameFormControl.value,
      company: this.companyFormControl.value

    }
    console.log(user)
    if (this.emailFormControl.status === 'VALID' && this.firstNameFormControl.status === 'VALID'
      && this.lastNameFormControl.status === 'VALID'&& this.countryFormControl.status === 'VALID'
      && this.companyFormControl.status === 'VALID'

    ) {
      this.auth.firstRegistration(user).subscribe((res) => {
        console.log(res)
        this.toast.success(res.success)
        this.spinner.hide()
        this.route.navigate(['/account','user', 'order'])

      }, error => {
        error.error.forEach(mes =>{
         this.toast.error(mes)
       })
        this.spinner.hide()
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
