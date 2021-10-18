import { Component } from '@angular/core';
import {AdminService} from "./admin/shared/services/admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authBool:boolean;
  constructor(
    private  auth: AdminService
  ) {
    this.authBool = !!localStorage.getItem('b2b_token')
    this.auth.getCountry()
  }

  logout() {
    localStorage.removeItem('b2b_token')
    document.location.reload()
  }
}
