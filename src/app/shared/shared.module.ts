import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import { LazyLoadingImgDirective } from './lazy-loading-img.directive';


@NgModule({
  imports: [HttpClientModule],
  exports: [
    HttpClientModule,
    LazyLoadingImgDirective,
  ],
  declarations: [
    LazyLoadingImgDirective,

  ]
})
export class SharedModule {

}
