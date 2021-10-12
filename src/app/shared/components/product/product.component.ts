import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../interfaces";
import {ProductService} from "../../../services/product.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: any
  visibleSlide: boolean = false;
  productImg: any[];
  description= ''

  constructor(
    public productService: ProductService,
    private toast: ToastrService,
    private spinner:NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.description  = this.product.description

  }

  showAboutProduct(id) {
    this.spinner.show()
    this.productService.getImagesProduct(id).subscribe(res => {
      console.log(res)
      if (res.status === "not found product") {
        this.toast.error('картинок нету')
        this.spinner.hide()
      } else {
        this.productImg = res.productImg
        this.visibleSlide = !this.visibleSlide
        this.spinner.hide()
      }

    })
  }

}
