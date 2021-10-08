import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../shared/interfaces";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product: any

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

  }


}
