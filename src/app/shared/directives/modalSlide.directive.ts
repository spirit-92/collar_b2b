import {Directive, ElementRef, HostListener, Input} from "@angular/core";

@Directive({
  selector:'[appModalSlide]'
})
export class ModalSlideDirective {
  @Input('appModalSlide') id:number
  constructor(
    private el:ElementRef
  ) {}
  @HostListener('click') onClick(){
    console.log(this.id)
  }
}
