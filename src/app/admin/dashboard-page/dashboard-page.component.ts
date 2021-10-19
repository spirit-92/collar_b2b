import {Component, OnInit} from '@angular/core';
import {AdminService} from "../shared/services/admin.service";
import {Product} from "../../shared/interfaces";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  products: Product[];
  searchSku:string = '';
  constructor(
    private adminService: AdminService,
    private toast: ToastrService,
    private loader: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
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
    this.adminService.getCountry().subscribe(res =>{
      console.log(res)
    })
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
