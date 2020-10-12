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
  product: Product

  constructor(
    private serviceProduct: ProductService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.serviceProduct.getProductByIdOrder(res.id).subscribe(res => {
        this.product = res.product
        console.log(this.product.img)
      },error => {
        console.log(error)
      })
    })

  }

}
