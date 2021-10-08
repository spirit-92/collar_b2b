import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
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
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params):any => {
        this.id__categoriesDes = params['id']
        return this.productService.getCategories_des(params['id'])

      })
    ).subscribe(product => {
      // @ts-ignore
      this.categories = product.category

      this.loader.hide()
    })
  }


}
