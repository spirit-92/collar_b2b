import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductComponent } from './shared/components/product/product.component';
import {MatButtonModule} from '@angular/material/button';

import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from "./shared/shared.module";
import { ToastrModule } from 'ngx-toastr';
import {NgxSpinnerModule} from "ngx-spinner";

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CatalogDegComponent } from './catalog-deg/catalog-deg.component';
import { DesignProductComponent } from './design-product/design-product.component';
import { UnderCatalogComponent } from './under-catalog/under-catalog.component';
import {MatIconModule} from "@angular/material/icon";
import {HeaderComponent} from "./shared/components/header/header.component";
import {FooterComponent} from "./shared/components/footer/footer.component";
import { OrderPageComponent } from './order-page/order-page.component';

// import {Swiper} from "swiper";
// import {SwiperModule} from "swiper/angular";


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    ProductPageComponent,
    ProductComponent,
    CatalogDegComponent,
    DesignProductComponent,
    UnderCatalogComponent,
    HeaderComponent,
    FooterComponent,
    OrderPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatListModule,
    MatCardModule,
    SharedModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    IvyCarouselModule,
    MatIconModule,
    // SwiperModule
    // ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
