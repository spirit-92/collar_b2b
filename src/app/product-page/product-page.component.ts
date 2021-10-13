import {Component, ElementRef, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product, ProductB2b} from "../shared/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit  {
  product: any
  black:boolean = true
  white:boolean;
  productOption:ProductB2b
  sum = 0
  constructor(
    private serviceProduct: ProductService,
    private route: ActivatedRoute,
    private elRef:ElementRef,
    private toaster: ToastrService,
    private loader: NgxSpinnerService,
    private router :Router
  ) {
  }

  ngOnInit(): void {
    this.loader.show()


    this.route.params.subscribe(res => {
      // this.serviceProduct.getProductByIdOrder(res.id).subscribe(res => {
      //   console.log(res,'!!')
      //   this.product = res.product
      // },error => {
      //   console.log(error)
      // })
      console.log(res.design,'!!')
      this.serviceProduct.getProduct(res.design,res.id).subscribe((res:ProductB2b) =>{
        this.productOption = res
        this.loader.hide()
        console.log(this.productOption)
      },error => {
        this.toaster.error('error')
      })

    },error => {
      this.toaster.error('error')
    })

  }

  changeColor(color){
    if (color === 'black'){
      this.white = false
      this.black = true
    }else {
      this.white = true
      this.black = false
    }

  }

  changeCount(event:Event,price,idTotal) {
    let allPrice = this.elRef.nativeElement.querySelectorAll(`.priceClass`)
    let sum = 0
    allPrice.forEach( price =>{


      let totalPrice = price.value * price.getAttribute('data-price')
      sum += +totalPrice
    })
    this.sum = sum

  }

}
