import {Component, ElementRef, OnInit} from '@angular/core';
import {AdminService} from "../../../admin/shared/services/admin.service";
import {ProductService} from "../../../services/product.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {basketShow} from "../../interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host:{
    '(document:click)': 'hideBasket($event)',
  },
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0,top:-100 }),
            animate('0.5s ease-out',
              style({ height: 'auto', opacity: 1,top:55 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({  opacity: 1,top:55  }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0,top:-100 }))
          ]
        )
      ]
    )
  ]
})
export class HeaderComponent implements OnInit {
  authBool:boolean;
  showBasket:boolean = false;
  $event: Event;
  showBasketProduct:basketShow
  constructor(
    private  auth: AdminService,
    private productService:ProductService,
    private _eref: ElementRef,

  ) {
    this.productService.getToken().subscribe(res =>{
      console.log(this.authBool,'тут')
       this.authBool = res

    })

  }

  ngOnInit(): void {
    this.productService.showOrderBasket().subscribe((res:basketShow) =>{
      this.showBasketProduct = res
      console.log(this.showBasketProduct,'def basket')

    })


      this.productService.showBasket$.subscribe(res =>{
        console.log('TRIGGER',console.log(res))
        this.productService.showOrderBasket().subscribe((res:basketShow) =>{
          this.showBasketProduct = res
          console.log('UPDATE BASKET')
        },error => {
          this.showBasketProduct = null
        })
    })
  }
  logout() {
    this.productService.logout().subscribe(res =>{
      console.log(res,'11122121')
      localStorage.clear()
      document.location.reload()
    })

  }

  hideBasket(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.showBasket = false
    }
  }

  hideMenu() {
    console.log(this._eref.nativeElement.querySelector(`#menu-toggle`).checked = false)


  }
}
