import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AdminService} from "../shared/services/admin.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {basketShow, getOrders, orders} from "../../shared/interfaces";
import {Observable} from "rxjs";
import {animate, style, transition, trigger} from "@angular/animations";




@Component({
  selector: 'app-create-product',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height:0,  opacity: 0,top:0 }),
            animate('0.5s ease-out',
              style({ height: '100vh', opacity: 1,top:0 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({  opacity: 1,top:0  }),
            animate('0.5s ease-in',
              style({ height: 0, opacity: 0,top:-100 }))
          ]
        )
      ]
    )
  ]
})
export class OrderComponent implements OnInit {
  showMoreToggle:boolean = false
  orders: getOrders
  showBasketProduct:basketShow
  orders2 = {
    "currency": 'EUR',
    "user": 12,
    "orders":  [
      {
        cart_id: 1,
        client_id:1,
        id: 1,
        order_date_time: 1,
        order_num:1,
        total:12,
        currency:'EUR'
      },
      {
        cart_id: 2,
        client_id: 2,
        id: 2,
        order_date_time: 2,
        order_num:2,
        total:12,
        currency:'EUR'
      },
      {
        cart_id: 2,
        client_id: 2,
        id: 2,
        order_date_time: 2,
        order_num:2,
        total:12,
        currency:'EUR'
      }
    ]
  }

  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
   this.adminService.getOrder().subscribe(res =>{
     console.log(res)
     this.orders = res
   })
  }

  deleteOrder(id: any) {
      this.spinner.show()
    this.adminService.deleteOrder(id).subscribe(res =>{
      this.orders.orders = this.orders.orders.filter(item =>{
        return item.id !== id
      })
      this.spinner.hide()
      this.toast.success('delete order')
    },error => {
      this.spinner.hide()
      this.toast.error('delete error')
      console.log(error)
    })


  }

  showMore(id: any) {

    this.adminService.basketOrder(id).subscribe(res =>{
      console.log(res,'!_! SHOW MORE')
      this.showBasketProduct = res
      this.showMoreToggle = !this.showMoreToggle
    })
  }

  download(id: string) {
    this.adminService.orderDownload(id).subscribe(res =>{
      console.log(res,'!P!P!P!P!P')
    })
  }
}
