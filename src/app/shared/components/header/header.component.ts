import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../admin/shared/services/admin.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authBool:boolean;
  constructor(
    private  auth: AdminService
  ) {
    this.authBool = !!localStorage.getItem('b2b_token')
    this.auth.getCountry()
  }

  ngOnInit(): void {
  }
  logout() {
    localStorage.removeItem('b2b_token')
    document.location.reload()
  }
}
