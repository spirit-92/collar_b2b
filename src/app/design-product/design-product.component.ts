import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {switchMap} from "rxjs/operators";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-design-product',
  templateUrl: './design-product.component.html',
  styleUrls: ['./design-product.component.scss']
})
export class DesignProductComponent implements OnInit {
  categories__des: any[]
  id__categoriesDes: number;
  constructor(
    private productService: ProductService,
    private loader: NgxSpinnerService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params):any => {
        this.id__categoriesDes = params['id']
        return this.productService.getCategories_des(params['id'])

      })
    ).subscribe(product => {
      console.log(product)
    })
  }

}
