import {Component, ElementRef, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product, ProductB2b} from "../shared/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product: any
  black = null
  white = null
  productOption: ProductB2b
  sum = 0
  defSize
  auth:boolean =false;
  customer_id;
  addToCart = {
    "client_id":0,
    "item_id":'',
    "options":{
      "size":[]
    }
  }
  designID
  productId

  constructor(
    private serviceProduct: ProductService,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private toaster: ToastrService,
    private loader: NgxSpinnerService,
    private router: Router,

  ) {

  }

  ngOnInit(): void {
    this.serviceProduct.getUser().subscribe(res =>{
      console.log(res,'!!!!!')
      this.auth = res.success
      this.customer_id = res.customer_id
    },error => {
      console.log(error)
      this.auth = false
    })
    this.loader.show()


    this.route.params.subscribe(res => {
      // this.serviceProduct.getProductByIdOrder(res.id).subscribe(res => {
      //   console.log(res,'!!')
      //   this.product = res.product
      // },error => {
      //   console.log(error)
      // })
      this.designID = res.design
      this.productId = res.id
      console.log(res.design, '!!',res.id)

      this.serviceProduct.getProduct(res.design, res.id).subscribe((res: ProductB2b) => {

        this.defSize = res.options.size
        this.productOption = res
        this.addToCart.options.size = res.options.sizes

        this.black =  this.productOption.options.hasOwnProperty('color')?this.productOption.options.color[0].id:null
        // @ts-ignore
        this.white = this.productOption.options.hasOwnProperty('color')?this.productOption.options.color[1].id:null

        this.addToCart.client_id = this.customer_id
        this.addToCart.item_id = this.productOption.item.item_id
        this.loader.hide()

      }, error => {
        this.toaster.error('error')
      })

    }, error => {

      this.toaster.error('error')
    })

  }

  changeColor(color) {


  }

  changeCount(event: Event, price, idTotal,color =0) {
    this.addToCart.options.size.forEach(size =>{
      if (size.id === idTotal){
        if (+size.color === +color){
          size.qt = (event.target as HTMLInputElement).value
          size.color = color
        }
      }
    })
    let allPrice = this.elRef.nativeElement.querySelectorAll(`.priceClass`)

    let sum = 0
    allPrice.forEach(price => {

      let totalPrice = price.value * price.getAttribute('data-price')
      sum += +totalPrice
    })
    this.sum = sum

  }

  addCart() {

    let triggerAdd = false



    this.elRef.nativeElement.querySelectorAll(`.priceClass`).forEach(item =>{
      if (item.value !== '0'){
        triggerAdd = true
      }
    })

    if (triggerAdd){

      this.sum = 0
      this.elRef.nativeElement.querySelectorAll(`.priceClass`).forEach(item =>{
          item.value = 0
        })
      console.log(this.addToCart,'set')
      this.serviceProduct.addCart(this.addToCart).subscribe(res =>{
        this.elRef.nativeElement.querySelectorAll(`.priceClass`).forEach(item =>{
          item.value = 0
        })

        this.toaster.success('add to cart')
        this.serviceProduct.showBasket()
        this.serviceProduct.getProduct(this.designID, this.productId).subscribe((res: ProductB2b) => {
          this.defSize = res.options.sizes
          this.addToCart = {
            "client_id":this.customer_id,
            "item_id": res.item.item_id,
            "options":{
              "size":this.defSize
            }
          }
          this.loader.hide()

        }, error => {
          this.toaster.error('error')
        })

      },error =>     {
        console.log(error)
        this.toaster.error('error add to cart')
        console.log(this.defSize,'def')

        this.serviceProduct.getProduct(this.designID, this.productId).subscribe((res: ProductB2b) => {
          console.log(res)
          this.defSize = res.options.sizes
          this.addToCart = {
            "client_id":this.customer_id,
            "item_id": res.item.item_id,
            "options":{
              "size":this.defSize
            }
          }
          this.loader.hide()

        }, error => {
          this.toaster.error('error')
        })
      })
    }else {
      this.toaster.error('plz add to cart')
    }

  }
}
