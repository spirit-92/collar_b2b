import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../shared/services/admin.service";
import {Shops} from "../../shared/interfaces";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup
  loading: boolean = false;
  shops:Shops[];
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.createForm()
  }

  ngOnInit(): void {
    this.adminService.getShops().subscribe((res:any) =>{
      this.shops = res.shops;

    })
  }

  private createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      sku: ['', Validators.required],
      shops: ['', Validators.required],
      image: null
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('image').setValue(file)
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('name', this.form.get('sku').value)
    input.append('image', this.form.get('image').value)
    return input
  }

  onSubmit() {

    if (this.form.status === 'VALID'){
      const formModel = this.prepareSave();
      formModel.append('title',this.form.value.title)
      formModel.append('body',this.form.value.body)
      formModel.append('sku',this.form.value.sku)
      formModel.append('shop_id',this.form.value.shops)
      this.adminService.saveProduct(formModel).subscribe(res =>{
        console.log(res)
      })

    }

    this.loading = true;

  }

  clearFile() {
    // this.form.get('image').setValue(null);
    this.form.reset();
    this.fileInput.nativeElement.value = ''
  }
}
