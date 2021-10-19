import {Component, ElementRef, OnInit} from '@angular/core';
import {AdminService} from "../../../admin/shared/services/admin.service";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host:{
    '(document:click)': 'hideBasket($event)',
  }
})
export class HeaderComponent implements OnInit {
  authBool:boolean;
  showBasket:boolean = false;
  $event: Event;
  constructor(
    private  auth: AdminService,
    private productService:ProductService,
    private _eref: ElementRef
  ) {
    this.productService.getToken().subscribe(res =>{
       this.authBool = res

    })
    this.auth.getCountry()
  }

  ngOnInit(): void {
    console.log(this.productService.showBasket$.subscribe(res =>{
      console.log(res,'subject !! header')
      this.productService.showOrderBasket().subscribe(res =>{
        console.log(res)
      })
    }))
  }
  logout() {
    localStorage.clear()
    document.location.reload()
  }

  hideBasket(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showBasket = false
    }
  }
}
