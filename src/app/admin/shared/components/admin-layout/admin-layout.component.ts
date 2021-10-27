import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private router:Router,
    public auth:AuthService,
    private _eref: ElementRef,
  ) { }

  ngOnInit(): void {
  }

  logout(event:Event) {
    event.preventDefault();
    this.auth.logout().subscribe(res =>{
      console.log('logout',res)
      this.auth.setToken(null)
      this.router.navigate(['/'])
    })

  }

  hideMenu() {
    console.log(this._eref.nativeElement.querySelector(`#menu-toggle`).checked = false)
  }
}
