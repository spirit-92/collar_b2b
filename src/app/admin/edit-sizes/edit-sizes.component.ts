import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../shared/services/admin.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-sizes',
  templateUrl: './edit-sizes.component.html',
  styleUrls: ['./edit-sizes.component.scss']
})
export class EditSizesComponent implements OnInit {
  sizes = []
  form: FormGroup
  inputValue = {
    value: null,
    id: null
  }

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    public toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   editSizes: new FormControl('', [
    //     Validators.required,
    //   ]),
    //   addSizes: new FormControl('', [
    //     Validators.required,
    //   ]),
    // })
    // this.adminService.getSizesProducts().subscribe(res => {
    //   this.sizes = res.sizes
    //   // console.log(this.sizes)
    // })
  }

  submitAdd() {
    // if (this.form.get('addSizes').valid) {
    //   this.adminService.addSizes(this.form.get('addSizes').value).subscribe(res => {
    //     this.toastr.success(res.size.dimensions + ' был добавлен')
    //     this.sizes.push(res.size)
    //   }, error => {
    //     if (error.error.errors.value_size[0]) {
    //       this.toastr.error('это название размера уже занято')
    //     } else {
    //       this.toastr.error('что то пошло не так')
    //     }
    //   })
    // }
  }

  changValue(category: any, id: any) {
    //
    // this.inputValue.value = category
    // this.inputValue.id = id
  }

  deleteSize(id: any) {
    // this.adminService.deleteSizes(id).subscribe(res => {
    //   this.toastr.success(res.size)
    //   this.sizes = this.sizes.filter(size => {
    //     return size.id !== id
    //   })
    // }, error => {
    //   this.toastr.error(error.error.error)
    // })
  }

  submit() {
    // if (this.form.get('editSizes').value !== null) {
    //   let value = this.form.get('editSizes').value
    //   this.adminService.updateSize(this.inputValue.id, this.form.get('editSizes').value).subscribe(res => {
    //     this.toastr.success('название магазина сохранено')
    //     this.sizes.forEach(size => {
    //       if (size.id === this.inputValue.id) {
    //         size.dimensions = value
    //       }
    //     })
    //   }, error => {
    //     this.toastr.error('что бы сохранить нужно изменить магазин')
    //   })
    //   this.form.reset()
    // } else {
    //   this.toastr.error('что бы сохранить нужно изменить магазин')
    // }
  }
}
