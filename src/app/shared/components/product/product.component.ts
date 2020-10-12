import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../interfaces";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
@Input() product:Product
  visibleSlide:boolean = false;
  productImg:any[]
  constructor(
   public productService:ProductService
  ) { }

  ngOnInit(): void {
  }
  showAboutProduct(id){
  this.visibleSlide = !this.visibleSlide

    this.productService.getImagesProduct(id).subscribe(res =>{
      this.productImg = res.productImg
      console.log(this.productImg)
    })
  }

}
