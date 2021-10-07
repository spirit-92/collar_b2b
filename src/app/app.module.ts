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

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    ProductPageComponent,
    ProductComponent,
    CatalogDegComponent,
    DesignProductComponent,
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
    IvyCarouselModule
    // ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
