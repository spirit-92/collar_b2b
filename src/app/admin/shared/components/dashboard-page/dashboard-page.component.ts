import {Component, OnInit,} from '@angular/core';
import {AdminService} from "../../services/admin.service";

import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  auth:boolean

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private loader: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
  this.auth =   this.authService.isAuthenticated()

  this.authService.isAuth$.subscribe(res =>{

    this.auth = res
  })
    // this.loader.show()
    // this.adminService.getProducts().subscribe(res => {
    //   this.products = res.product;
    //   this.loader.hide()
    // }, error => {
    //   console.log(error)
    //   this.loader.hide()
    // }, () => {
    //   this.loader.hide()
    // })

  }

  deleteProduct(id) {

    // this.adminService.deleteProduct(id).subscribe(res => {
    //   this.toast.success('Удалено')
    //   this.products = this.products.filter(item => {
    //     return item.id !== id
    //   })
    //
    // }, error => {
    //   console.log(error)
    // })
  }

}
