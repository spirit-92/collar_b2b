import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {switchMap} from "rxjs/operators";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Design} from "../shared/interfaces";



@Component({
  selector: 'app-design-product',
  templateUrl: './design-product.component.html',
  styleUrls: ['./design-product.component.scss']
})
export class DesignProductComponent implements OnInit {
  designs: Design
  id__categoriesDes: number;
  constructor(
    private productService: ProductService,
    private loader: NgxSpinnerService,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loader.show()

    this.route.params.pipe(
      switchMap((params):any => {
        this.id__categoriesDes = params['design']
        return this.productService.getCategories_des(params['design'])

      })
    ).subscribe(product => {
      // console.log(product)

      if (product.hasOwnProperty('design')){
          // @ts-ignore
        this.designs = product.design
        }else {
        // @ts-ignore
        this.productService.underCategories(product.category)

        this.route.params.subscribe(params =>{
          console.log(params['design'])
          // @ts-ignore
          // this.router.navigate(['/catalog/',product.name ,this.id__categoriesDes]);

        })




      }
      this.loader.hide()
    })
  }

}
