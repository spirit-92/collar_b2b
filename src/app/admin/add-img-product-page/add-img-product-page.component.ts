import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {AdminService} from "../shared/services/admin.service";
import {HttpEventType} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-add-img-product-page',
  templateUrl: './add-img-product-page.component.html',
  styleUrls: ['./add-img-product-page.component.scss']
})
export class AddImgProductPageComponent implements OnInit {

  @ViewChild('realFile', {static: false}) realFile: ElementRef;
  @ViewChild('customButton', {static: false}) customButton: ElementRef;
  @ViewChild('customText', {static: false}) customText: ElementRef;
  @ViewChild('saveBtn', {static: true}) saveBtn: ElementRef;
  @ViewChild('bar', {static: false}) progressBar: ElementRef;
  progress = 0;
  showProgress = false;
  saveAudio: any[];
  ulTrek: any;
  img: any[];
  public idProduct: any;


  constructor(
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    public adminService: AdminService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.idProduct = res.id
    })

  }

  onSubmit() {

    if (this.saveAudio.length > 10) {
      this.toastr.error('максимально загрузить можно 10 картинок');
      this.ulTrek.remove();
      this.saveAudio = [];
      return;
    } else if (this.saveAudio.length !== 0) {
      this.showProgress = true;
      const fb = new FormData;
      for (let i = 0; i < this.saveAudio.length; i++) {
        fb.append('img[]', this.saveAudio[i], this.saveAudio[i].name);
      }
      fb.append('id', this.idProduct)
      this.adminService.addImgByProduct(fb).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = event.loaded / event.total * 100
        } else if (event.type === HttpEventType.Response) {
          this.saveAudio = [];
          this.showProgress = false;
          this.img = event.body.status.img
          this.ulTrek.remove()
          this.toastr.success('save img')
          if (event.body.status.error) {
            event.body.status.error.forEach(error => {
              console.log(error)
              this.toastr.error(error)
            })
          }
          if (event.body.status.success) {
            event.body.status.success.forEach(success => {
              this.toastr.success(success)
              this.saveAudio = []
              this.ulTrek.remove()
            })
            if (this.ulTrek) {
              this.ulTrek.remove()
            }
          }
        }
      }, error => {

        this.showProgress = false;
        this.ulTrek.remove()
        this.img = error.error.status.img
        if (error.error.status.error === 'max length 5 img') {
          this.toastr.error('максимальное количество загруженых картинок к товару 5')
        }if (error.error.status.error === 'img exists'){
          this.toastr.error('эта картинка уже загружена')
        }
        else {
          this.toastr.error('не правильный формат')
        }
      })


    }
  }

  chooseFile() {
    this.getRealFile();
    this.saveAudio = [];
    this.realFile.nativeElement.files = null;
  }

  getRealFile() {
    if (this.ulTrek) {
      this.ulTrek.remove();
    }
    if (this.realFile.nativeElement.files.length < 11) {
      if (this.realFile.nativeElement.value) {
        this.ulTrek = document.createElement('ul');
        console.log(this.realFile.nativeElement.files.length)
        for (let i = 0; i < this.realFile.nativeElement.files.length; i++) {
          let li = document.createElement('li');
          li.innerText = this.realFile.nativeElement.files[i].name;
          this.ulTrek.appendChild(li);
          this.saveAudio.push(this.realFile.nativeElement.files[i]);

        }
        this.customText.nativeElement.appendChild(this.ulTrek);
      } else {
        this.customText.nativeElement.innerHTML = 'Картинка сохранена';
      }
    } else {
      this.toastr.error('максимально загрузить можно 10 картинок');

    }
  }


  deleteImg(id) {
    this.adminService.deleteBaseImg(id).subscribe(res =>{
      this.img = this.img.filter( img => {
        return img.id !== id
      })
      console.log(res)
      this.toastr.success('удалено')
    },error => {
      this.toastr.error('что то пошло не так')
    })
  }
}
