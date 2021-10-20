import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {basketShow} from "../shared/interfaces";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  showBasketProduct:basketShow
  constructor(
    private productService:ProductService,
    private toaster: ToastrService,
    public route: Router,
  ) { }

  ngOnInit(): void {
    this.productService.showOrderBasket().subscribe((res:basketShow) =>{
      this.showBasketProduct = res
      console.log(this.showBasketProduct,'def basket')

    })
  }

  saveOrder() {
    this.productService.orderSave().subscribe(res =>{
      console.log(res)
      this.toaster.success('save')
      this.productService.showBasket()
      this.route.navigate(['/catalog'])
    })
  }
}
