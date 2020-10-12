import {Component, OnInit} from '@angular/core';
import {AdminService} from "../shared/services/admin.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit {
  categories = []
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
    this.adminService.getCategories().subscribe(res => {
      this.categories = res.category
    })
    this.form = this.fb.group({
      editCategory: new FormControl('', [
        Validators.required,
      ]),
      addCategories: new FormControl('', [
        Validators.required,
      ]),
    })
  }

  changValue(category: any, id: any) {

    this.inputValue.value = category
    this.inputValue.id = id
  }

  deleteShop(id: any) {
    this.adminService.deleteCategory(id).subscribe(res => {
      this.toastr.success(res.category)
      this.categories = this.categories.filter(category => {
        return category.id !== id
      })
    }, error => {
      console.log(error)
      this.toastr.error(error.error.error)
    })
  }

  submitAdd() {
    if (this.form.get('addCategories').valid) {
      this.adminService.addCategory(this.form.get('addCategories').value).subscribe(res => {
        this.toastr.success(res.category.category + ' был добавлен')
        this.categories.push(res.category)
      }, error => {
        if (error.error.errors.value_categories[0]){
          this.toastr.error('это название категории уже занято')
        }else {
          this.toastr.error('что то пошло не так')
        }
      })
    }
  }

  submit() {
    if (this.form.get('editCategory').value !== null) {
      let value = this.form.get('editCategory').value

      this.adminService.updateCategory(this.inputValue.id, this.form.get('editCategory').value).subscribe(res => {
        this.toastr.success('название магазина сохранено')
        console.log(res)
        this.categories.forEach(category => {
          if (category.id === this.inputValue.id) {
            category.category = value
          }
        })
      }, error => {
        console.log(error)
        this.toastr.error('что бы сохранить нужно изменить магазин')
      })
      this.form.reset()
    } else {
      this.toastr.error('что бы сохранить нужно изменить магазин')
    }
  }
}
