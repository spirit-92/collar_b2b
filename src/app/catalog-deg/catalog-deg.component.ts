import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-catalog-deg',
  templateUrl: './catalog-deg.component.html',
  styleUrls: ['./catalog-deg.component.scss']
})
export class CatalogDegComponent implements OnInit {
  categories: any[]
  constructor(
    private productService: ProductService,
    private loader: NgxSpinnerService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loader.show()


    this.productService.getCategories().subscribe(res =>{
      console.log(res)
      this.categories = res.category
      this.loader.hide()
    },error => {
      this.toaster.error(error.error.type)
      this.loader.hide()
    })
  }

}
