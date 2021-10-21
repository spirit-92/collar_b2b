import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {basketShow} from "../shared/interfaces";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

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
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.productService.showOrderBasket().subscribe((res:basketShow) =>{
      this.showBasketProduct = res
      this.spinner.hide()
    },error => {
      this.spinner.hide()
    })
  }

  saveOrder() {
    this.spinner.show()
    this.productService.orderSave().subscribe(res =>{
      console.log(res)
      this.toaster.success('save')
      this.productService.showBasket()
      this.spinner.hide()
      this.route.navigate(['/catalog'])
    },error => {
      this.spinner.hide()
    })
  }
}
