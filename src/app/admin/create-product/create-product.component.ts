import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../shared/services/admin.service";
import {Shops} from "../../shared/interfaces";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form: FormGroup
  loading: boolean = false;
  shops: Shops[];
  categories: any[];
  sizes:any[];
  file: any;
  fileFormat: string;
  errorImg = false
  filteredStates: Observable<any[]>;
  stateCtrl = new FormControl();
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
  ) {
    this.createForm()
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.categories.slice())
      );
  }
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.categories.filter(state => state.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    this.adminService.getShops().subscribe((res: any) => {
      this.shops = res.shops;
    })
    this.adminService.getCategories().subscribe((res: any) => {
      this.categories = res.category
      console.log(this.categories)
    })
    this.adminService.getSizesProducts().subscribe((res:any)=>{
      this.sizes = res.sizes

    })
  }

  private createForm() {
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
      price: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      shops: new FormControl('', [
        Validators.required
      ]),
      size: new FormControl('', [
        Validators.required
      ]),
      categories: new FormControl('', [
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
    const formModel = this.prepareSave();
    if (this.form.status === 'VALID') {

      formModel.append('title', this.form.value.title)
      formModel.append('body', this.form.value.body)
      formModel.append('sku', this.form.value.sku)
      formModel.append('shop_id', this.form.value.shops)
      formModel.append('categories', this.form.value.categories)
      formModel.append('price', this.form.value.price)
      formModel.append('size', this.form.value.size)
      formModel.set('image', this.file, this.form.value.sku + `.${this.fileFormat}`)
      this.spinner.show()

      this.adminService.saveProduct(formModel).subscribe(res => {
        this.toast.success('товар сохранен')
        this.form.reset()
        this.spinner.hide()
      }, error => {

        if (error.error.errors.sku[0]) {
          this.toast.error('артикул уже занят')
        }
        this.spinner.hide()
      }, () => {
        this.spinner.hide()
      })
      this.spinner.hide()
    }
    if (this.form.value.image == '' || this.form.value.image == null) {
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
