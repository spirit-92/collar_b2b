import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product, ProductB2b} from "../shared/interfaces";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product: any
  black:boolean = true
  white:boolean;
  productOption:ProductB2b
  constructor(
    private serviceProduct: ProductService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      // this.serviceProduct.getProductByIdOrder(res.id).subscribe(res => {
      //   console.log(res,'!!')
      //   this.product = res.product
      // },error => {
      //   console.log(error)
      // })
    })
    this.serviceProduct.getProduct(1).subscribe((res:ProductB2b) =>{

      this.productOption = res
      console.log(this.productOption)
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

}
