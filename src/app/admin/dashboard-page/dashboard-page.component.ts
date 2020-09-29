import {Component, OnInit} from '@angular/core';
import {AdminService} from "../shared/services/admin.service";
import {Product} from "../../shared/interfaces";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  products:Product[]

  constructor(
    private adminService: AdminService,
    private toast:ToastrService
  ) {
  }

  ngOnInit(): void {
    this.adminService.getProducts().subscribe(res => {
      this.products = res.product
    })
  }

  deleteProduct(id) {

    this.adminService.deleteProduct(id).subscribe(res =>{
      this.toast.success('Удалено')
      this.products= this.products.filter(item =>{
        return item.id !== id
      })

    },error => {
      console.log(error)
    })
  }
}
