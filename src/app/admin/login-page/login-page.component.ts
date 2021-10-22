import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';
import {NgxSpinnerService} from "ngx-spinner";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {AdminService} from "../shared/services/admin.service";
import {ToastrService} from "ngx-toastr";

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
  public errorName = [];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    public route: Router,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private adminService: AdminService,
    private toast:ToastrService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('b2b_token')){
      this.route.navigate(['/account', 'dashboard'])
    }

  }

  password() {

  }

  onSubmit() {
    this.spinner.show()
    const user: any = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value
    }

    if (this.emailFormControl.status === 'VALID' && this.passwordFormControl.status === 'VALID') {

      this.auth.login(user).subscribe((res) => {
        console.log(res)
        this.spinner.hide()
        this.route.navigate(['/account', 'dashboard'])
        document.location.reload()

      }, error => {
        this.toast.error(error.error.message)
        console.log(error.error)


        this.spinner.hide()
      })
    } else {
      this.spinner.hide()
    }

  }

  email() {

  }
}
