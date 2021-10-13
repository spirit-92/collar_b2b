import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-under-catalog',
  templateUrl: './under-catalog.component.html',
  styleUrls: ['./under-catalog.component.scss']
})
export class UnderCatalogComponent implements OnInit {
  categories: any
  id__categoriesDes;
  designs
  constructor(
    private  productService: ProductService,
    private route: ActivatedRoute,
    private loader: NgxSpinnerService,
    private router:Router
  ) { }

  ngOnInit(): void {


    this.route.params.pipe(
      switchMap((params):any => {
        this.id__categoriesDes = params['design']
        return this.productService.getCategories_des(params['design'])

      })
    ).subscribe(product => {
      console.log(product)
      // @ts-ignore
      this.categories = product.category

      this.loader.hide()
    })
  }


}
