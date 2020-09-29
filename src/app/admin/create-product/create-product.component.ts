import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../shared/services/admin.service";
import {Shops} from "../../shared/interfaces";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup
  loading: boolean = false;
  shops: Shops[];
  file: any;
  fileFormat: string;
  errorImg = false
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    this.createForm()
  }

  ngOnInit(): void {
    this.adminService.getShops().subscribe((res: any) => {
      this.shops = res.shops;

    })
  }

  private createForm() {
    // this.form = this.fb.group({
    //   title: ['', Validators.required],
    //   body: ['', Validators.required],
    //   sku: ['', Validators.required],
    //   shops: ['', Validators.required],
    //   image: null
    // })
    this.form = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      sku: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      shops: new FormControl('', [
        Validators.required
      ]),
      image: new FormControl('', [
        Validators.required
      ]),
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.file = event.target.files[0];
      this.fileFormat = this.file.type.split('/')[1]
      this.form.get('image').setValue(file)
      this.errorImg = false
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('name', this.form.get('sku').value)
    input.append('image', this.form.get('image').value)
    return input
  }

  onSubmit() {


    if (this.form.status === 'VALID') {
      const formModel = this.prepareSave();
      formModel.append('title', this.form.value.title)
      formModel.append('body', this.form.value.body)
      formModel.append('sku', this.form.value.sku)
      formModel.append('shop_id', this.form.value.shops)
      formModel.set('image', this.file, this.form.value.sku + `.${this.fileFormat}`)

      this.spinner.show()
      this.adminService.saveProduct(formModel).subscribe(res => {
        this.toast.success('товар сохранен')
        this.form.reset()
        this.spinner.hide()
      },error => {

        if (error.error.errors.sku[0]){
          this.toast.error('артикул уже занят')
        }
        this.spinner.hide()
      },()=>{
        this.spinner.hide()
      })
      this.spinner.hide()
    }
    if(this.form.value.image == ''||this.form.value.image == null){
      this.toast.error('загрузите картинку')
      this.errorImg = true
    }
    this.loading = true;

  }

  clearFile() {
    this.form.get('image').setValue(null);
    this.form.reset();
    this.fileInput.nativeElement.value = ''
  }
}
