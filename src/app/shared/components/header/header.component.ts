import {Component, ElementRef, OnInit} from '@angular/core';
import {AdminService} from "../../../admin/shared/services/admin.service";
import {ProductService} from "../../../services/product.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {basketShow} from "../../interfaces";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

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
    private spinner: NgxSpinnerService,
    public toast:ToastrService,
    public route: Router,
  ) {
    this.productService.getToken().subscribe(res =>{
      console.log(this.authBool,'тут')
      this.authBool = res

    })
    this.productService.isAuth$.subscribe(res =>{
      this.productService.getToken().subscribe(res =>{
        console.log(this.authBool,'тут')
        this.authBool = res

      })
    })

  }

  ngOnInit(): void {
    this.spinner.show()
    this.productService.showOrderBasket().subscribe((res:basketShow) =>{
      this.showBasketProduct = res
      console.log(this.showBasketProduct,'def basket')
      this.spinner.hide()
    },error => {
      this.spinner.hide()
    })


      this.productService.showBasket$.subscribe(res =>{
        console.log('TRIGGER',console.log(res))
        this.spinner.show()
        this.productService.showOrderBasket().subscribe((res:basketShow) =>{
          this.showBasketProduct = res
          console.log('UPDATE BASKET')
          this.spinner.hide()
        },error => {
          this.showBasketProduct = null
          this.spinner.hide()
        })
    })
  }
  logout() {
    this.spinner.show()
    this.productService.logout().subscribe(res =>{
      console.log(res,'11122121')
      localStorage.clear()
      document.location.reload()
      this.route.navigate(['/'])
      this.spinner.hide()
    },error => {
      this.spinner.hide()
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

  deleteBasket(cart_id: string) {


    console.log(this.showBasketProduct)
    this.spinner.show()
    this.productService.deleteCard(cart_id).subscribe(res =>{
      this.showBasketProduct.items.forEach(item =>{
        // @ts-ignore

        // // @ts-ignore
        item.sizes = item.sizes.filter(item =>{
          return   item.cart_id !== cart_id
        })

      })
      // @ts-ignore
      this.showBasketProduct.items = this.showBasketProduct.items.filter(item=>{
        // @ts-ignore
        return  item.sizes.length !== 0
      })
      this.toast.success('delete product')
      this.spinner.hide()

    },error => {
      this.toast.error('delete product')
      this.spinner.hide()
    })
  }
}
