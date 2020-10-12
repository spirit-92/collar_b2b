import {NgModule, Provider} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {EditProductPageComponent} from './edit-product-page/edit-product-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {NgxSpinnerModule} from "ngx-spinner";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {AuthService} from "./shared/services/auth.service";
import {SharedModule} from "../shared/shared.module";
import {AuthGuard} from "./shared/services/auth.guard";
import {MatSelectModule} from "@angular/material/select";
import {AdminService} from "./shared/services/admin.service";
import {MatCardModule} from "@angular/material/card";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth.interceptor";
import {SearchPipe} from "./shared/pipes/search.pipe";
import { AddImgProductPageComponent } from './add-img-product-page/add-img-product-page.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

import { OptipnsAdminComponent } from './optipns-admin/optipns-admin.component';
import {MatMenuModule} from "@angular/material/menu";
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { EditSizesComponent } from './edit-sizes/edit-sizes.component';


const INTERCEPTOR_PROVIDER:Provider = {
  provide:HTTP_INTERCEPTORS,
  multi:true,
  useClass:AuthInterceptor
}
@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreateProductComponent,
    EditProductPageComponent,
    SearchPipe,
    AddImgProductPageComponent,
    OptipnsAdminComponent,
    EditCategoriesComponent,
    EditSizesComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatListModule,
        NgxSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
                    {path: 'login', component: LoginPageComponent},
                    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
                    {path: 'create', component: CreateProductComponent, canActivate: [AuthGuard]},
                    {path: 'edit/shop', component: OptipnsAdminComponent, canActivate: [AuthGuard]},
                    {path: 'edit/categories', component: EditCategoriesComponent, canActivate: [AuthGuard]},
                    {path: 'edit/sizes', component: EditSizesComponent, canActivate: [AuthGuard]},
                    {path: 'product/:id/edit', component: EditProductPageComponent, canActivate: [AuthGuard]},
                    {
                        path: 'product/:id/addImgProduct',
                        component: AddImgProductPageComponent,
                        canActivate: [AuthGuard]
                    },
                ]
            }
        ]),
        MatSelectModule,
        MatCardModule,
        MatProgressBarModule,
        MatMenuModule,


    ],
  exports: [RouterModule],
  providers: [AuthService, AuthGuard,AdminService,INTERCEPTOR_PROVIDER]

})
export class AdminModule {

}
