import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../shared/services/admin.service";
import {switchMap} from "rxjs/operators";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-edit-product-page',
  templateUrl: './edit-product-page.component.html',
  styleUrls: ['./edit-product-page.component.scss']
})
export class EditProductPageComponent implements OnInit {
  form: FormGroup;
  shops: [];
  category: [];
  sizes: [];
  sizesProduct: any[];
  errorImg: any;
  idProduct: number;
  file: any;
  loading: boolean = false;
  fileFormat: string;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {

    // this.route.params.pipe(
    //   switchMap(params => {
    //     this.idProduct = params['id']
    //     return this.adminService.getProductById(params['id'])
    //   })
    // ).subscribe(product => {
    //   // console.log(product.product)
    //   this.shops = product.product.shops;
    //   this.category = product.product.category;
    //   this.sizes = product.product.sizes
    //
    //   this.form = this.fb.group({
    //     title: new FormControl(product.product.title, [
    //       Validators.required,
    //       Validators.minLength(6)
    //     ]),
    //     size: new FormControl(' ', []),
    //     body: new FormControl(product.product.body, [
    //       Validators.required,
    //       Validators.minLength(6)
    //     ]),
    //     sku: new FormControl({value: product.product.sku, disabled: true}, [
    //       Validators.required,
    //       Validators.minLength(4)
    //     ]),
    //     shops: new FormControl(product.product.shop_id, [
    //       Validators.required
    //     ]),
    //     price: new FormControl(product.product.price, [
    //       Validators.required,
    //       Validators.min(1)
    //     ]),
    //     category: new FormControl(product.product.categories_id, [
    //       Validators.required
    //     ]),
    //
    //     image: new FormControl(''),
    //   })
    // })
    // this.getSizeProduct()
  }

  onFileChange(event) {
    // if (event.target.files.length > 0) {
    //   let file = event.target.files[0];
    //   this.file = event.target.files[0];
    //   this.fileFormat = this.file.type.split('/')[1]
    //   this.form.get('image').setValue(file)
    //   this.errorImg = false
    // }
  }

  private getSizeProduct() {
    // this.adminService.getSizeProduct(this.idProduct).subscribe(res => {
    //   this.sizesProduct = res
    //   console.log(this.sizesProduct)
    // })
  }

  private prepareSave(): any {
    // let input = new FormData();
    // input.append('name', this.form.controls.sku.value)
    // input.append('image', this.form.get('image').value)
    // return input
  }

  submit() {

    // if (this.form.status === 'VALID') {
    //   let formModel = new FormData();
    //   if (this.file !== undefined) {
    //     formModel = this.prepareSave();
    //     formModel.set('image', this.file, this.form.controls.sku.value + `.${this.fileFormat}`)
    //     formModel.append('title', this.form.value.title)
    //     formModel.append('body', this.form.value.body)
    //     formModel.append('price', this.form.value.price)
    //     formModel.append('sku', this.form.controls.sku.value)
    //     formModel.append('shop_id', this.form.value.shops)
    //     formModel.append('categories', this.form.value.category)
    //   } else {
    //     formModel.append('title', this.form.value.title)
    //     formModel.append('body', this.form.value.body)
    //     formModel.append('price', this.form.value.price)
    //     formModel.append('sku', this.form.controls.sku.value)
    //     formModel.append('shop_id', this.form.value.shops)
    //     formModel.append('categories', this.form.value.category)
    //   }
    //   formModel.append('id', this.idProduct + '')
    //   // console.log(formModel.get('image'),formModel.get('categories_id'),formModel.get('body'),formModel.get('title'))
    //   this.spinner.show()
    //   this.adminService.editProduct(formModel).subscribe(res => {
    //     console.log(res)
    //     this.toast.success('товар сохранен')
    //
    //     this.spinner.hide()
    //   }, error => {
    //
    //     // if (error.error.errors.sku[0]) {
    //     //   this.toast.error('артикул уже занят')
    //     // }
    //     this.spinner.hide()
    //
    //   }, () => {
    //     this.spinner.hide()
    //   })
    //   this.spinner.hide()
    // }
    // this.loading = true;
  }

  submitAddSize() {
    // if (this.form.value.size.id !== undefined) {
    //   this.adminService.saveSize(this.idProduct + '', this.form.value.size.id).subscribe(res => {
    //     this.toast.success('был добавлен размер')
    //     this.getSizeProduct()
    //   }, error => {
    //     if (error.error.status == 'уже записан в базу' && error.error.status !== undefined) {
    //       this.toast.error(error.error.status)
    //     }
    //   })
    //
    // }
    // console.log(this.form.value.size.id)
  }

  deleteSizes(id: any) {
    // this.adminService.deleteSizeProduct(id).subscribe(res => {
    //   this.toast.success('удален')
    //   this.sizesProduct = this.sizesProduct.filter(size => {
    //     return size.id !== id
    //   })
    // })
    // console.log(id)
  }
}
