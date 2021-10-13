import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {AdminService} from "../shared/services/admin.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-optipns-admin',
  templateUrl: './optipns-admin.component.html',
  styleUrls: ['./optipns-admin.component.scss']
})
export class OptipnsAdminComponent implements OnInit {
  shops: any[]
  form: FormGroup
  inputValue = {
    value: null,
    id: null
  }

  constructor(
    public toastr: ToastrService,
    private fb: FormBuilder,
    public spinner: NgxSpinnerService,
    public adminService: AdminService,
  ) {

  }

  ngOnInit(): void {
    // this.adminService.getShops().subscribe(res => {
    //   this.shops = res.shops
    //
    // })
    // this.form = this.fb.group({
    //   editShop: new FormControl(this.inputValue.value, [
    //     Validators.required,
    //   ]),
    //   addShop: new FormControl(this.inputValue.value, [
    //     Validators.required,
    //   ]),
    // })
  }

  deleteShop(id) {
    // this.adminService.deleteShop(id).subscribe(res => {
    //   this.toastr.success(res.shop)
    //   this.shops = this.shops.filter(shop => {
    //     return shop.id !== id
    //   })
    // }, error => {
    //   this.toastr.error(error.error.error)
    // })
  }

  submit() {

    // if (this.form.get('editShop').value !== null) {
    //   let value = this.form.get('editShop').value
    //   this.adminService.updateShop(this.inputValue.id, this.form.get('editShop').value).subscribe(res => {
    //     this.toastr.success('название магазина сохранено')
    //     this.shops.forEach(shop => {
    //       if (shop.id === this.inputValue.id) {
    //         shop.shop = value
    //       }
    //     })
    //   }, error => {
    //     this.toastr.error('что то пошло не так')
    //   })
    //
    //
    //   this.form.reset()
    // } else {
    //   this.toastr.error('что бы сохранить нужно изменить магазин')
    // }
  }

  changValue(shop: any, id: number) {
    // this.inputValue.value = shop
    // this.inputValue.id = id
  }

  submitAdd() {
    // if (this.form.get('addShop').valid) {
    //   this.adminService.addShop(this.form.get('addShop').value).subscribe(res => {
    //     this.toastr.success(res.shop.shop)
    //     this.shops.push(res.shop)
    //
    //   }, error => {
    //     if (error.error.errors.value[0]){
    //       this.toastr.error('это название магазина уже занято')
    //     }else {
    //       this.toastr.error('что то пошло не так')
    //     }
    //   })
    // }
  }
}
